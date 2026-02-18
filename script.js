const intro = 'bounceInUp';
const outro = 'bounceOutRight';
let count = 0;
var winnum = 50;
var body = document.body;
let maxz = 50;
let removing = false;

// returns window element
// opts: title, body, width, height, className, closeDelay, canResize, max, maxheight, maxwidth
function createWindow(opts = {}) {
	var window_ = document.createElement('div');
	if (opts.className) {
		window_.className = opts.className;
	} else {
		window_.className = 'window animate__animated animate__' + intro;
	}

	var titlebar = window_.appendChild(document.createElement('div'));
	titlebar.className = 'title-bar';
	titlebar.addEventListener('dblclick', () => {
		umami.track('maximizeWindow');
		maximizeWindow(window_);
	});

	var titlebartext = titlebar.appendChild(document.createElement('div'));
	titlebartext.className = 'title-bar-text';
	if (opts.title) {
		titlebartext.textContent = opts.title;
	} else {
		titlebartext.textContent = 'Warning';
	}

	var titlebarcontrols = titlebar.appendChild(document.createElement('div'));
	var minbutton = titlebarcontrols.appendChild(document.createElement('button'));
	var maxbutton = titlebarcontrols.appendChild(document.createElement('button'));
	var closebutton = titlebarcontrols.appendChild(document.createElement('button'));
	titlebarcontrols.className = 'title-bar-controls';
	minbutton.ariaLabel = 'Minimize';
	maxbutton.ariaLabel = 'Maximize';
	closebutton.ariaLabel = 'Close';
	minbutton.onclick = function() {
		umami.track('minimizeWindow');
		minimizeWindow(window_);
	}
	maxbutton.onclick = function() {
		umami.track('maximizeWindow');
		maximizeWindow(window_);
	}
	if (opts.closeDelay != undefined) {
		closebutton.onclick = function() {
			removeWindow(window_, opts.closeDelay);
		}
	} else {
		closebutton.onclick = function() {
			removeWindow(window_);
		}
	}

	if (opts.body) {
		window_.appendChild(opts.body);
	} else {
		var simplebody = simplebody('This is a warning message.');
		window_.appendChild(simplebody);
	}

	// if (opts.canResize != false) {
	// 	var dragcorner = document.createElement('div');
	// 	dragcorner.className = 'drag-corner';
	// 	window_.children[1].appendChild(dragcorner);
	// 	handleResizing(dragcorner);
	// }
	if (opts.canResize != false) {
		const sides = [
			{ cls: 'r-n', cursor: 'n-resize' },
			{ cls: 'r-e', cursor: 'e-resize' },
			{ cls: 'r-s', cursor: 's-resize' },
			{ cls: 'r-w', cursor: 'w-resize' },
			{ cls: 'r-ne', cursor: 'ne-resize' },
			{ cls: 'r-nw', cursor: 'nw-resize' },
			{ cls: 'r-se', cursor: 'se-resize' },
			{ cls: 'r-sw', cursor: 'sw-resize' },
		];
		sides.forEach(({ cls, cursor }) => {
			const resizer = document.createElement('div');
			resizer.className = cls + ' resizer';
			resizer.style.cursor = cursor;
			window_.appendChild(resizer);
			handleEdgeResizing(resizer, cls);
		});
	}

    // if (opts.width == undefined || opts.maxwidth < opts.width) {
    //     opts.width = opts.maxwidth;
    // }
    // if (opts.height == undefined || opts.maxheight < opts.height) {
    //     opts.height = opts.maxheight;
    // }

	if (opts.width) {
		window_.style.width = opts.width + 'px';
	} else {
		window_.style.width = '250px';
	}
	if (opts.height) {
		window_.style.height = opts.height + 'px';
	}

    if (opts.maxwidth) {
        window_.style.maxWidth = opts.maxwidth + 'px';
    }
    if (opts.maxheight) {
        window_.style.maxHeight = opts.maxheight + 'px';
    }

	window_.dataset.minWidth = window_.style.width;
	window_.dataset.minHeight = window_.style.height;

	window_.style.margin = '32px';

	handleDragging(window_);

	if (opts.max)
		window_.dataset.max = true;

    if (opts.tag)
        window_.dataset.tag = opts.tag;

	return window_;
}


// Default cascade settings (can be overridden per-app)
const DEFAULT_CASCADE_OFFSET = 15;
const DEFAULT_MAX_CASCADE = 4;

// ==================== APP REGISTRY ====================
// Central registry for all applications
const APP_REGISTRY = {
	// App definitions - templates/configuration for all possible apps
	appDefinitions: {
		profiles: {},      // Profile apps (weekoldroadkill, zigzag1001)
		utilities: {},     // Utility apps (randomWindows, customWindow)
		projects: {}       // Individual project apps
	},
	// Active instances - currently open windows/apps with their state
	activeInstances: {}   // Format: {appId: {id, cascadeState, cascadeOffset, maxCascade, wins: [{div, metadata}]}}
};

// Backwards compatibility aliases
Object.defineProperty(APP_REGISTRY, 'profiles', {
	get() { return this.appDefinitions.profiles; },
	set(value) { this.appDefinitions.profiles = value; }
});
Object.defineProperty(APP_REGISTRY, 'utilities', {
	get() { return this.appDefinitions.utilities; },
	set(value) { this.appDefinitions.utilities = value; }
});

/**
 * Register an active app instance
 * @param {string} appId - Unique identifier for the app
 * @param {HTMLElement} div - The window div element
 * @param {Object} metadata - Additional metadata about the instance
 * @param {Object} appDefinition - App definition with default settings
 */
function registerActiveApp(appId, div, metadata = {}, appDefinition = {}) {
	if (!APP_REGISTRY.activeInstances[appId]) {
		APP_REGISTRY.activeInstances[appId] = {
			id: appId,
			definition: appDefinition,
			// Per-app cascade settings with defaults
			cascadeOffset: appDefinition.cascadeOffset !== undefined ? appDefinition.cascadeOffset : DEFAULT_CASCADE_OFFSET,
			maxCascade: appDefinition.maxCascade !== undefined ? appDefinition.maxCascade : DEFAULT_MAX_CASCADE,
			cascadeState: {
				enabled: appDefinition.cascade !== false, // Default to true unless explicitly disabled
				x: 0,
				y: 0,
				stackLength: 0
			},
			wins: []
		};
	}
	
	APP_REGISTRY.activeInstances[appId].wins.push({
		div: div,
		metadata: metadata,
		timestamp: Date.now()
	});
}

/**
 * Unregister an active app instance
 * @param {string} appId - App identifier
 * @param {HTMLElement} div - The window div to remove
 */
function unregisterActiveApp(appId, div) {
	const activeApp = APP_REGISTRY.activeInstances[appId];
	if (activeApp) {
		activeApp.wins = activeApp.wins.filter(win => win.div !== div);
		// Clean up if no more instances
		if (activeApp.wins.length === 0) {
			delete APP_REGISTRY.activeInstances[appId];
		}
	}
}

/**
 * Get active app by ID
 * @param {string} appId - App identifier
 * @returns {Object|null} Active app object or null
 */
function getActiveApp(appId) {
	return APP_REGISTRY.activeInstances[appId] || null;
}

/**
 * Get all active apps of a specific type
 * @param {string} type - Type filter (optional)
 * @returns {Array} Array of active app objects
 */
function getAllActiveApps(type = null) {
	const apps = Object.values(APP_REGISTRY.activeInstances);
	if (type) {
		return apps.filter(app => app.definition && app.definition.type === type);
	}
	return apps;
}

// Reset cascade for a specific app
function resetCascade(appId) {
	const activeApp = getActiveApp(appId);
	if (activeApp && activeApp.cascadeState) {
		activeApp.cascadeState.x = 0;
		activeApp.cascadeState.y = 0;
		activeApp.cascadeState.stackLength = 0;
	}
}

// Get cascade state for an app (creates if doesn't exist)
function getCascadeState(appId) {
	let activeApp = getActiveApp(appId);
	if (!activeApp) {
		// Create a temporary entry if it doesn't exist
		registerActiveApp(appId, null, {}, { cascade: true });
		activeApp = getActiveApp(appId);
	}
	return activeApp.cascadeState;
}

function addWindow(win, x = 0, y = 0, mx = 0, my = 0, randomize = true, cascade = false, appId = null, appDefinition = {}) {

	taskbar(win, 'add');

	body.appendChild(win);
	var winwidth = win.offsetWidth + parseInt(win.style.margin);
	var winheight = win.offsetHeight + parseInt(win.style.margin);

	if (mx == 0) {
		mx = window.innerWidth;
	}
	if (my == 0) {
		my = window.innerHeight;
	}
	mx -= winwidth + parseInt(win.style.margin) * 2;
	my -= winheight + 56 + parseInt(win.style.margin) * 2;
	if (mx < 0) {
		mx = 0;
	}
	if (my < 0) {
		my = 0;
	}

	// Auto-detect appId from window title if not provided
	if (!appId) {
		const titleElement = win.querySelector('.title-bar-text');
		if (titleElement && titleElement.textContent) {
			// Use title as appId, sanitized for use as ID
			appId = titleElement.textContent.trim();
		}
	}
	
	// Use appId for cascade tracking (backward compatible with profileId)
	const cascadeId = appId;
	
	if (cascade && cascadeId) {
		const state = getCascadeState(cascadeId);
		const activeApp = getActiveApp(cascadeId);
		const cascadeOffset = activeApp?.cascadeOffset || DEFAULT_CASCADE_OFFSET;
		const maxCascadeLimit = activeApp?.maxCascade || DEFAULT_MAX_CASCADE;
		
		// console.log('cascade', state.stackLength, state.x, state.y, mx, my);
		if (state.stackLength >= maxCascadeLimit) {
			resetCascade(cascadeId);
		} else if (x - state.x + cascadeOffset > mx || y - state.y + cascadeOffset > my) {
			console.log(state.x, state.y, mx, my);
			resetCascade(cascadeId);
		}
	}

	if (randomize || (cascade && cascadeId && getCascadeState(cascadeId).x == 0 && getCascadeState(cascadeId).y == 0)) {

		x += Math.floor(Math.random() * mx);
		y += Math.floor(Math.random() * my);

		if (cascade && cascadeId) {
			const state = getCascadeState(cascadeId);
			state.x = x;
			state.y = y;
		}

	} else {

		x = Math.min(x, mx);
		y = Math.min(y, my);

	}

	if (cascade && cascadeId) {
		const state = getCascadeState(cascadeId);
		const activeApp = getActiveApp(cascadeId);
		const cascadeOffset = activeApp?.cascadeOffset || DEFAULT_CASCADE_OFFSET;
		
		x = state.x;
		y = state.y;
		state.x += cascadeOffset;
		state.y += cascadeOffset;
		state.stackLength++;
	}


	win.style.zIndex = maxz++;
	win.style.left = x + 'px';
	win.style.top = y + 'px';

	if (win.dataset.max) {
		maximizeWindow(win);
	}

	setTimeout(() => {
		win.classList.remove('animate__' + intro);
	}, 1000);
	
	// Register the window in active instances if appId is provided (or auto-detected)
	if (appId) {
		registerActiveApp(appId, win, {
			x: x,
			y: y,
			width: win.style.width,
			height: win.style.height
		}, appDefinition);
	}
}

function simplebody(text) {
	if (text == "") {
		text = 'This is a warning message.';
	}
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body';
	windowbody.appendChild(document.createElement('p')).textContent = text;

	var okbutton = windowbody.appendChild(document.createElement('button'));
	okbutton.textContent = 'OK';
	okbutton.onclick = function() {
		randwin();
	}

	var cancelbutton = windowbody.appendChild(document.createElement('button'));
	cancelbutton.textContent = 'Cancel';
	cancelbutton.onclick = function() {
		removeWindow(windowbody.closest('.window'));
	}

	return windowbody;
}

function randwin() {
	var windowbody = simplebody('AAAAAAAAaaaaa');

	var div = createWindow({ body: windowbody });

	div.classList.add('randwin');

	div.onmouseover = function() {
		// closeCurrentWindow(div);
		div.onmouseover = null;
		count--;
		removeWindow(div);
	};

	// Get app definition for randwin and use cascade if enabled
	const appDef = APP_REGISTRY.appDefinitions.utilities?.randwin || { cascade: true };
	addWindow(div, 0, 0, 0, 0, true, appDef.cascade, 'randwin', appDef);

	setTimeout(() => {
		div.classList.remove('animate__' + intro);
	}, 1000);
}

// Fancy window removal
function removeWindow(win, delay = 1000) {
	if (win.dataset.aniDelay) {
		delay = win.dataset.aniDelay;
	}
	win.classList.add('animate__' + outro);
	taskbar(win, 'remove');
	
	// Unregister from all active apps
	for (const appId in APP_REGISTRY.activeInstances) {
		unregisterActiveApp(appId, win);
	}
	
	setTimeout(() => {
		win.remove();
	}, delay);
}

const winbarmap = new Map();
const openwins = document.querySelector('.open-windows');
const namemap = {
	'randwincontrol': '💥AAAAAAA',
	'customwincontrol': '📁NEW WINDOW',
	'customwin': '✅CUSTOM WINDOW',
};

const taskbarButtAnim = 'animate__headShake';

// handles taskbar to window interaction
function taskbar(win, action) {
	if (action == 'add') {
		var winname;
		for (var classname of win.classList) {
			if (classname in namemap) {
				var winname = namemap[classname];
				break;
			}
		}
		if (!winname) {
			var winname = win.querySelector('.title-bar-text').textContent;
		}
		var taskbarbutton = document.createElement('button');
		taskbarbutton.className = 'taskbar-button animate__animated';
		taskbarbutton.textContent = winname;
		taskbarbutton.onclick = function() {
			umami.track('taskbarButton');

			taskbarbutton.classList.add(taskbarButtAnim);
			setTimeout(() => {
				taskbarbutton.classList.remove(taskbarButtAnim)
			}, 500);

			if ((parseInt(win.style.zIndex) + 1) < maxz) {
				win.style.zIndex = maxz++;
			} else {
				minimizeWindow(win);
			}
		}

		winbarmap.set(win, taskbarbutton);
		openwins.appendChild(taskbarbutton);

		taskbarbutton.classList.add(taskbarButtAnim);
		setTimeout(() => {
			taskbarbutton.classList.remove(taskbarButtAnim)
		}, 500);

		return;
	} else if (action == 'remove') {
		if (winbarmap.has(win)) {
			winbarmap.get(win).remove();
			winbarmap.delete(win);
			return;
		}
	}
}

// handles minimizing windows
const minAnimation = 'animate__fadeOutDownBig';
const unminAnimation = 'animate__fadeInUpBig';
function minimizeWindow(win) {
	if (win.style.display == 'none') {
		win.classList.add(unminAnimation);
		win.style.zIndex = maxz++;
		win.style.display = 'block';
		setTimeout(() => {
			win.classList.remove(unminAnimation);
		}, 500);
	} else {
		// win.classList.add('animate__bounceOutDown');
		win.classList.add(minAnimation)
		setTimeout(() => {
			win.style.display = 'none';
			win.classList.remove(minAnimation)
		}, 500);
	}
}

// handles maximizing windows
function maximizeWindow(win) {
	const maxWidthStr = 'calc(100% - 6px)';
	const maxHeightStr = 'calc(100% - 39px)';
	if (win.style.width == maxWidthStr) {
		win.style.width = win.dataset.width;
		win.style.height = win.dataset.height;
		win.style.left = win.dataset.x;
		win.style.top = win.dataset.y;
		win.children[1].style.marginLeft = null;
	} else {
		win.dataset.width = win.style.width;
		win.dataset.height = win.style.height;
		win.dataset.x = win.style.left;
		win.dataset.y = win.style.top;
		win.style.top = '-' + win.style.margin;
		win.style.left = '-' + win.style.margin;
		win.style.width = maxWidthStr;
		win.style.height = maxHeightStr;
		win.children[1].style.marginLeft = '7px';
	}
}

// fill the screen with random windows
function fillRandWin() {
	if (typeof umami !== 'undefined') {
		umami.track('fillRandWin');
	}
	if (removing) return;
	const interval = setInterval(() => {
		randwin();
		count++;
		if (count >= winnum) {
			clearInterval(interval);
		}
	}, 10);
};

// clear all random windows
// and hide control window
function clearWins(classname, except = 'norem') {
	if (removing) return;
	removing = true;
	count = 0;
	var targets = document.querySelectorAll('.' + classname);
	targets.forEach((target) => {
		if (target.classList.contains(except)) return;
		removeWindow(target);
	});
	removing = false;
}

function closeAll() {
	clearWins('window');
	maxz = 50;
}

// MOVEABLE WINDOWS

const allowedDragClasses = ['title-bar', 'title-bar-text', 'icon', 'iconimg'];

function handleDragging(item) {
	let offsetX, offsetY, isDragging = false;
	var isIcon = false;
	var iconUpdate = true;
	if (item.classList.contains('icon')) {
		isIcon = true;
		var lastX, lastY;
	}
	item.style.position = 'absolute';
	let marginLeft = parseInt(item.style.marginLeft.substring(0, item.style.marginLeft.length - 2));
	let marginTop = parseInt(item.style.marginTop.substring(0, item.style.marginTop.length - 2));
	item.addEventListener('mousedown', (e) => {
		item.style.zIndex = maxz++;
		if (e.target.classList.contains('title-bar-controls')) return;
		if (allowedDragClasses.some((classname) => e.target.classList.contains(classname))) {
			e.preventDefault();
			// let margin = parseInt(item.style.margin.substring(0, item.style.margin.length - 2));
			offsetX = e.clientX + marginLeft - item.getBoundingClientRect().left;
			offsetY = e.clientY + marginTop - item.getBoundingClientRect().top;
			isDragging = true;
			// disable iframe pointer events
			document.querySelectorAll('iframe').forEach((iframe) => {
				iframe.style.pointerEvents = 'none';
			});
		}
	});
	document.addEventListener('mousemove', (e) => {
		if (isDragging) {
			item.style.left = e.clientX - offsetX + 'px';
			item.style.top = e.clientY - offsetY + 'px';
			iconUpdate = true;
		}
	});
	document.addEventListener('mouseup', () => {
		isDragging = false;
		// re-enable iframe pointer events
		document.querySelectorAll('iframe').forEach((iframe) => {
			iframe.style.pointerEvents = '';
		});
		// snap icon to grid
		if (isIcon && iconUpdate) {
			const grid = 90;
			var x = Math.round(parseInt(item.style.left) / grid) * grid;
			var y = Math.round(parseInt(item.style.top) / grid) * grid;
			var good = true;
			document.querySelectorAll('.icon').forEach((icon) => {
				if (icon == item) return;
				var iconx = parseInt(icon.style.left) - 3;
				var icony = parseInt(icon.style.top);
				if (x == iconx && y == icony) {
					good = false;
					return;
				}
			});

			if (good || lastX == undefined) {
				item.style.left = (x + 3) + 'px';
				item.style.top = y + 'px';
				lastX = x + 3;
				lastY = y;
			} else {
				item.style.left = lastX + 'px';
				item.style.top = lastY + 'px';
			}
			iconUpdate = false;
		}
	});
}

let items = document.querySelectorAll('.mainwin .window');
items.forEach(handleDragging);

// ---------


function toggleStartmenu(forceClose = false) {
	var startmenu = document.querySelector('.startmenu');
	if (startmenu.style.display == 'block' || forceClose) {
		startmenu.classList.add('animate__slideOutDown');
		setTimeout(() => {
			startmenu.classList.remove('animate__slideOutDown');
			startmenu.style.display = 'none';
			startmenu.style.zIndex = 0;
		}, 200);
	} else {
		umami.track('startmenu');
		startmenu.classList.add('animate__slideInUp');
		startmenu.style.display = 'block';
		startmenu.style.zIndex = maxz++;
	}
}


function desktopSelectSquare() {
	var desktop = document.querySelector('.desktop');
	var selectedIcons = [];
	desktop.addEventListener('mousedown', (e) => {
        toggleStartmenu(true);
		selectedIcons = [];
		var icons = document.querySelectorAll('.icon');
		if (e.target.classList.contains('icon') || e.target.classList.contains('iconimg')) return;
		let x = e.clientX;
		let y = e.clientY;
		let square = document.createElement('div');
		square.className = 'square';
		square.style.left = x + 'px';
		square.style.top = y + 'px';
		desktop.appendChild(square);
		umami.track('desktopSelectSquare');

        // disable pointer events on windows
        document.querySelectorAll('.window').forEach((win) => {
            win.style.pointerEvents = 'none';
        });

		desktop.addEventListener('mousemove', (e) => {
			let width = e.clientX - x;
			let height = e.clientY - y;
			if (width < 0) {
				square.style.left = e.clientX + 'px';
				width = -width;
			}
			if (height < 0) {
				square.style.top = e.clientY + 'px';
				height = -height;
			}
			square.style.width = width + 'px';
			square.style.height = height + 'px';
			icons.forEach((icon) => {
				if (icon.style.display == 'none') return;
				if (icon.getBoundingClientRect().left < square.getBoundingClientRect().right &&
					icon.getBoundingClientRect().right > square.getBoundingClientRect().left &&
					icon.getBoundingClientRect().top < square.getBoundingClientRect().bottom &&
					icon.getBoundingClientRect().bottom > square.getBoundingClientRect().top) {
					icon.style.background = 'rgba(0, 0, 0, 0.1)';
                    icon.style.outline = '2px dotted rgba(0,0,0,0.3)';
					selectedIcons.push(icon);
				} else {
                    icon.style.outline = null;
					icon.style.background = null;
					selectedIcons = selectedIcons.filter((selectedIcon) => selectedIcon != icon);
				}
			});
		});
		desktop.addEventListener('mouseup', () => {
			square.remove();

            // re-enable pointer events on windows
            document.querySelectorAll('.window').forEach((win) => {
                win.style.pointerEvents = '';
            });

			desktop.removeEventListener('mousemove', () => { });
			desktop.removeEventListener('mouseup', () => { });
		});
	});
}
desktopSelectSquare();

function handleEdgeResizing(resizer, dir) {
	const item = resizer.closest('.window');
	let startX, startY, startWidth, startHeight, startLeft, startTop, maxLeft, maxTop;

	var minWidth, minHeight;
	setTimeout(() => {
		minWidth = item.dataset.minWidth ? parseInt(item.dataset.minWidth) : null;
		minHeight = item.dataset.minHeight ? parseInt(item.dataset.minHeight) : null;
		if (minWidth == null || minHeight == null) {
			minWidth = item.offsetWidth - 6;
			minHeight = item.offsetHeight - 6;
		}
	}, 1000);

	resizer.addEventListener('mousedown', e => {
		e.preventDefault();

		// disable iframe pointer events
		document.querySelectorAll('iframe').forEach((iframe) => {
			iframe.style.pointerEvents = 'none';
		});

		startX = e.clientX;
		startY = e.clientY;
		startWidth = parseInt(document.defaultView.getComputedStyle(item).width, 10);
		startHeight = parseInt(document.defaultView.getComputedStyle(item).height, 10);
		startLeft = parseInt(document.defaultView.getComputedStyle(item).left, 10);
		startTop = parseInt(document.defaultView.getComputedStyle(item).top, 10);

		marginLeft = parseInt(item.style.marginLeft.substring(0, item.style.marginLeft.length - 2));
		marginTop = parseInt(item.style.marginTop.substring(0, item.style.marginTop.length - 2));

		maxLeft = item.getBoundingClientRect().right - minWidth - marginLeft - 6;
		maxTop = item.getBoundingClientRect().bottom - minHeight - marginTop - 6;

		document.body.style.userSelect = "none";

		function doDrag(ev) {
			let dx = ev.clientX - startX;
			let dy = ev.clientY - startY;
			let newWidth, newHeight, newLeft, newTop;
			if (dir.includes('e')) {
				newWidth = startWidth + dx;
				if (minWidth && newWidth < minWidth) {
					newWidth = minWidth;
				}
				item.style.width = newWidth + 'px';
			}
			if (dir.includes('s')) {
				newHeight = startHeight + dy;
				if (minHeight && newHeight < minHeight) {
					newHeight = minHeight;
				}
				item.style.height = newHeight + 'px';
			}
			if (dir.includes('w')) {
				newWidth = startWidth - dx;
				newLeft = startLeft + dx;
				if (minWidth && newWidth < minWidth) {
					newWidth = minWidth;
					newLeft = maxLeft
				}
				item.style.width = newWidth + 'px';
				item.style.left = newLeft + 'px';
			}
			if (dir.includes('n')) {
				newHeight = startHeight - dy;
				newTop = startTop + dy;
				if (minHeight && newHeight < minHeight) {
					newHeight = minHeight;
					newTop = maxTop;
				}
				item.style.height = newHeight + 'px';
				item.style.top = newTop + 'px';
			}
		}
		function stopDrag() {

			// re-enable iframe pointer events
			document.querySelectorAll('iframe').forEach((iframe) => {
				iframe.style.pointerEvents = '';
			});

			document.removeEventListener('mousemove', doDrag);
			document.removeEventListener('mouseup', stopDrag);
			document.body.style.userSelect = "";
		}
		document.addEventListener('mousemove', doDrag);
		document.addEventListener('mouseup', stopDrag);
	});
}

// opts: title, max, canResize, width, height
function simpleIframe(src, opts = {}) {
	if (!opts.title) {
		opts.title = 'Iframe';
	}
	if (opts.max == undefined) {
		opts.max = false;
	}
	if (opts.canResize == undefined) {
		opts.canResize = true;
	}
	if (opts.width == undefined) {
		opts.width = window.innerWidth / 2;
	}
	if (opts.height == undefined) {
		opts.height = window.innerHeight / 2;
	}
	// Enable cascade by default for iframes (can be disabled with cascade: false)
	if (opts.cascade == undefined) {
		opts.cascade = true;
	}
	
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body';
	var iframe = windowbody.appendChild(document.createElement('iframe'));
	iframe.src = src;
	var c = createWindow({
		body: windowbody,
		title: opts.title,
		width: opts.width,
		height: opts.height,
		className: 'window',
		closeDelay: 0,
		max: opts.max,
		canResize: opts.canResize
	});
	c.dataset.aniDelay = 1;
	
	// Store cascade option for use with addWindow
	c.dataset.cascade = opts.cascade;

    // TODO: testing to get title from iframe
    iframe.onload = function() {
        const iframeTitle = iframe.contentDocument.title;
        console.log('Iframe title:', iframeTitle);
    };

	return c;
}

// desktop icons
// https://win98icons.alexmeub.com/ -> get /png/* -> put into /img/icon/
function createIcon(iconPth, title, onclick) {
	var icon = document.createElement('div');
	icon.className = 'icon';
	icon.addEventListener('dblclick', function() {
		// icon.style.background = 'rgba(0, 0, 0, 0.3)';
        icon.style.outline = '2px dotted rgba(0,0,0,0.3)';
		umami.track(title);
		setTimeout(() => {
			onclick();
			// icon.style.background = null;
            icon.style.outline = null;
		}, 80);
	});
	icon.style.margin = '16px';

	var iconimg = document.createElement('img');
	if (iconPth == null)
		iconPth = 'windows_slanted-1.png';
	iconimg.src = 'img/icon/' + iconPth;
	iconimg.className = 'iconimg';
	iconimg.setAttribute('draggable', false);
	var icontext = document.createElement('p');
	icontext.textContent = title;
	icon.appendChild(iconimg);
	icon.appendChild(icontext);

	handleDragging(icon);

	return icon;
}

var iconx = 3;
var icony = 0;
function addIcon(icon) {
	icon.style.left = iconx + 'px';
	icon.style.top = icony + 'px';
	document.querySelector('.desktop').appendChild(icon);
	var iconheight = icon.offsetHeight;
    var taskbarHeight = document.querySelector('.taskbar').offsetHeight;
    var screenHeight = window.innerHeight - taskbarHeight;
    var maxHeight = screenHeight - (iconheight + 16)*2;
    icon.dataset.test = icony + ' ' + maxHeight;
	if (icony < maxHeight) {
		icony += iconheight + 16;
	} else {
		icony = 0;
		iconx += 90;
	}
}

// close all icon
var closeAllIcon = createIcon('msg_error-0.png', 'Close All', closeAll);
addIcon(closeAllIcon);

// recursive window
addIcon(createIcon(null, 'web98', () => {
	const iframe = simpleIframe('https://weekoldroadkill.com', { title: 'nahhh', max: false });
	const useCascade = iframe.dataset.cascade === 'true';
	addWindow(iframe, 0, 0, 0, 0, !useCascade, useCascade);
}));

// opts: title, width, height
function simpleImage(src, opts = {}) {
	if (!opts.title) {
		opts.title = 'Image';
	}
	if (!opts.width) {
		opts.width = 256;
	}
	if (!opts.height) {
		opts.height = 240;
	}
	windowbody = document.createElement('div');
	windowbody.className = 'window-body';

	bodyimg = document.createElement('img');
	bodyimg.className = 'imgviewer_img';
	bodyimg.src = src;

	windowbody.appendChild(bodyimg);

	w = createWindow({
		body: windowbody,
		title: opts.title,
		width: opts.width,
		height: opts.height,
	});

	return w;
}

// ==================== STARTUP CONFIGURATION ====================
// Default startup configuration
const DEFAULT_STARTUP_CONFIG = {
	// Profile windows configuration
	profiles: {
		enabled: true,
		count: 10, // Number of each profile window to spawn
		delay: 100, // Delay in ms between spawning each window
		cascade: true, // Use cascade layout
		sequence: [] // Order of profiles to spawn - populated by hardcoded.js
	},
	// Utility applications to show on startup
	utilities: {
		enabled: true,
		delay: 2000, // Delay before showing utilities
		apps: ['randomWindows'] // List of utility apps to show on startup
	},
	// Static windows to show on startup
	staticWindows: {
		enabled: true,
		windows: [
			{
				type: 'image',
				src: 'https://i1.sndcdn.com/avatars-YRVj4sLMyUloU5Fp-XKkMPA-t1080x1080.jpg'
			},
			{
				type: 'image',
				src: 'https://camo.githubusercontent.com/65b4f007ed9bd5acc0b0cf783286fed2c564f8799d84e54e54c4d0267eabb004/68747470733a2f2f692e6962622e636f2f4e7979313370302f706f67676572732e706e67',
				width: 400,
				height: 130
			}
		]
	},
	// Apps to launch on startup (via ?app parameter)
	directApp: null
};

/**
 * Get startup configuration from URL parameters or use default
 * @returns {Object} Startup configuration
 */
function getStartupConfig() {
	const query = new URLSearchParams(window.location.search);
	const config = JSON.parse(JSON.stringify(DEFAULT_STARTUP_CONFIG)); // Deep clone
	
	// Set default sequence from available profiles if not set
	if (config.profiles.sequence.length === 0) {
		config.profiles.sequence = Object.keys(APP_REGISTRY.profiles);
	}
	
	// Handle legacy ?z and ?w parameters - they can now work together
	let zCount = null;
	let wCount = null;
	let hasZ = query.has('z');
	let hasW = query.has('w');
	
	if (hasZ) {
		zCount = parseInt(query.get('z')) || 3;
	}
	if (hasW) {
		wCount = parseInt(query.get('w')) || 3;
	}
	
	// If either z or w is specified, build custom sequence
	if (hasZ || hasW) {
		config.profiles.enabled = true;
		config.profiles.cascade = false;
		config.profiles.sequence = [];
		
		// Build sequence based on which parameters are present
		if (hasZ && APP_REGISTRY.profiles.zigzag1001) {
			config.profiles.sequence.push({
				id: 'zigzag1001',
				count: zCount
			});
		}
		if (hasW && APP_REGISTRY.profiles.weekoldroadkill) {
			config.profiles.sequence.push({
				id: 'weekoldroadkill',
				count: wCount
			});
		}
	}
	// Handle ?no parameter (no profiles)
	else if (query.has('no')) {
		config.profiles.enabled = false;
	}
	
	// Handle ?app parameter (launch specific app)
	if (query.has('app')) {
		config.directApp = query.get('app');
	}
	
	// Handle new standardized parameters
	if (query.has('profileCount')) {
		config.profiles.count = parseInt(query.get('profileCount')) || config.profiles.count;
	}
	if (query.has('profileDelay')) {
		config.profiles.delay = parseInt(query.get('profileDelay')) || config.profiles.delay;
	}
	if (query.has('profiles')) {
		// Comma-separated list of profile IDs
		const profileList = query.get('profiles').split(',').filter(p => p);
		if (profileList.length > 0) {
			config.profiles.sequence = profileList;
		}
	}
	if (query.has('utilities')) {
		// Comma-separated list of utility IDs
		const utilityList = query.get('utilities').split(',').filter(u => u);
		if (utilityList.length > 0) {
			config.utilities.apps = utilityList;
		}
	}
	if (query.has('noUtilities')) {
		config.utilities.enabled = false;
	}
	if (query.has('noStatic')) {
		config.staticWindows.enabled = false;
	}
	
	return config;
}

/**
 * Execute startup based on configuration
 * @param {Object} config - Startup configuration
 */
function executeStartup(config) {
	// Show static windows
	if (config.staticWindows.enabled) {
		config.staticWindows.windows.forEach(winConfig => {
			if (winConfig.type === 'image') {
				addWindow(simpleImage(winConfig.src, {
					width: winConfig.width,
					height: winConfig.height
				}));
			}
		});
	}
	
	// Spawn profile windows
	if (config.profiles.enabled && config.profiles.sequence.length > 0) {
		let currentProfileIndex = 0;
		
		const spawnNextProfile = () => {
			if (currentProfileIndex >= config.profiles.sequence.length) {
				return; // All profiles spawned
			}
			
			// Handle both string IDs and objects with {id, count}
			const seqItem = config.profiles.sequence[currentProfileIndex];
			const profileId = typeof seqItem === 'string' ? seqItem : seqItem.id;
			const profileCount = typeof seqItem === 'object' && seqItem.count !== undefined 
				? seqItem.count 
				: config.profiles.count;
			
			const profile = APP_REGISTRY.profiles[profileId];
			
			if (!profile) {
				console.warn(`Profile ${profileId} not found in APP_REGISTRY`);
				currentProfileIndex++;
				spawnNextProfile();
				return;
			}
			
			let currentCount = 0;
			const interval = setInterval(() => {
				profile.handler(config.profiles.cascade, profileId);
				currentCount++;
				
				if (currentCount >= profileCount) {
					clearInterval(interval);
					currentProfileIndex++;
					
					// Reset cascade and spawn next profile if available
					if (currentProfileIndex < config.profiles.sequence.length) {
						resetCascade(profileId);
						// Small delay before starting next profile
						setTimeout(spawnNextProfile, 100);
					}
				}
			}, config.profiles.delay);
		};
		
		spawnNextProfile();
	}
	
	// Show utility applications
	if (config.utilities.enabled && config.utilities.apps.length > 0) {
		setTimeout(() => {
			config.utilities.apps.forEach(utilityId => {
				const utility = APP_REGISTRY.utilities[utilityId];
				if (utility && utility.handler) {
					utility.handler();
				} else {
					console.warn(`Utility ${utilityId} not found in APP_REGISTRY`);
				}
			});
		}, config.utilities.delay);
	}
	
	// Launch direct app if specified
	if (config.directApp) {
		// Check if it's a direct app reference
		if (APP_REGISTRY.apps && APP_REGISTRY.apps[config.directApp]) {
			APP_REGISTRY.apps[config.directApp].handler();
		} else {
			// Try to find it in projects across all profiles
			let foundProject = null;
			for (const profileId in APP_REGISTRY.profiles) {
				const profile = APP_REGISTRY.profiles[profileId];
				if (profile.projects) {
					foundProject = profile.projects.find(p => 
						p.buttonText.toLowerCase().replace(/\s+/g, '') === config.directApp.toLowerCase()
					);
					if (foundProject) break;
				}
			}
			
			if (foundProject) {
				// Dynamically create iframe from project
				const iframe = simpleIframe(foundProject.siteUrl, {
					title: foundProject.buttonText,
					max: true,
					width: foundProject.width || 1044,
					height: foundProject.height || 612
				});
				const useCascade = iframe.dataset.cascade === 'true';
				addWindow(iframe, 0, 0, 0, 0, !useCascade, useCascade);
			} else {
				console.warn(`App ${config.directApp} not found`);
			}
		}
	}
}

function doClock(clockdiv) {
    clockdiv.innerHTML = new Date().toLocaleTimeString();
    setInterval(() => {
        clockdiv.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
}

doClock(document.querySelector('.clock'));

function dataDrivenWindows() {
    // param -> b64 -> string -> json
    const query = new URLSearchParams(window.location.search);
    const b64str = query.get('d');
    const jsonstr = atob(b64str);
    const data = JSON.parse(jsonstr);

    // {
    // title: 'Default',
    // width: 400,
    // height: 300,
    // max: false,
    // canResize: true, 
    // x: 0,
    // y: 0,
    // }
    //
}
