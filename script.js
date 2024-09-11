const intro = 'bounceInUp';
const outro = 'bounceOutRight';
let count = 0;
var winnum = 50;
var body = document.body;
let maxz = 50;
let removing = false;

// returns window element
// opts: title, body, width, height, className, closeDelay, canResize, max
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
		minimizeWindow(window_);
	}
	maxbutton.onclick = function() {
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

	if (opts.canResize != false) {
		var dragcorner = document.createElement('div');
		dragcorner.className = 'drag-corner';
		window_.children[1].appendChild(dragcorner);
		handleResizing(dragcorner);
	}

	if (opts.width) {
		window_.style.width = opts.width + 'px';
	} else {
		window_.style.width = '250px';
	}
	if (opts.height) {
		window_.style.height = opts.height + 'px';
	}

	window_.style.margin = '32px';

	handleDragging(window_);

	if (opts.max)
		window_.dataset.max = true;

	return window_;
}

function addWindow(win, x = 0, y = 0, mx = 0, my = 0) {

	taskbar(win, 'add');

	if (mx == 0)
		mx = window.innerWidth - 500;
	if (my == 0)
		my = window.innerHeight - 240;

	if (x == 0 && y == 0) {
		x = Math.floor(Math.random() * mx);
		y = Math.floor(Math.random() * my);
	}
	win.style.zIndex = maxz++;
	win.style.left = x + 'px';
	win.style.top = y + 'px';
	body.appendChild(win);

	if (win.dataset.max) {
		maximizeWindow(win);
	}

	setTimeout(() => {
		win.classList.remove('animate__' + intro);
	}, 1000);
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

	let screenWidth = window.innerWidth;
	let screenHeight = window.innerHeight;
	let winWidth = 256;
	let winHeight = 240;

	let x = Math.floor(Math.random() * (screenWidth - winWidth));
	let y = Math.floor(Math.random() * (screenHeight - winHeight));

	addWindow(div, x, y);

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
		taskbarbutton.className = 'taskbar-button';
		taskbarbutton.textContent = winname;
		taskbarbutton.onclick = function() {
			if ((parseInt(win.style.zIndex) + 1) < maxz) {
				win.style.zIndex = maxz++;
			} else {
				minimizeWindow(win);
			}
		}

		winbarmap.set(win, taskbarbutton);
		openwins.appendChild(taskbarbutton);
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
	const maxHeightStr = 'calc(100% - 30px)';
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
	item.style.position = 'absolute';
	item.addEventListener('mousedown', (e) => {
		item.style.zIndex = maxz++;
		if (e.target.classList.contains('title-bar-controls')) return;
		if (allowedDragClasses.some((classname) => e.target.classList.contains(classname))) {
			e.preventDefault();
			let margin = parseInt(item.style.margin.substring(0, item.style.margin.length - 2));
			offsetX = e.clientX + margin - item.getBoundingClientRect().left;
			offsetY = e.clientY + margin - item.getBoundingClientRect().top;
			isDragging = true;
		}
	});
	document.addEventListener('mousemove', (e) => {
		if (isDragging) {
			item.style.left = e.clientX - offsetX + 'px';
			item.style.top = e.clientY - offsetY + 'px';
		}
	});
	document.addEventListener('mouseup', () => {
		isDragging = false;
	});
}

let items = document.querySelectorAll('.mainwin .window');
items.forEach(handleDragging);

// ---------


function toggleStartmenu() {
	var startmenu = document.querySelector('.startmenu');
	if (startmenu.style.display == 'block') {
		startmenu.classList.add('animate__slideOutDown');
		setTimeout(() => {
			startmenu.classList.remove('animate__slideOutDown');
			startmenu.style.display = 'none';
			startmenu.style.zIndex = 0;
		}, 200);
	} else {
		startmenu.classList.add('animate__slideInUp');
		startmenu.style.display = 'block';
		startmenu.style.zIndex = maxz++;
	}
}


function desktopSelectSquare() {
	var desktop = document.querySelector('.desktop');
	desktop.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('icon') || e.target.classList.contains('iconimg')) return;
		let x = e.clientX;
		let y = e.clientY;
		let square = document.createElement('div');
		square.className = 'square';
		square.style.left = x + 'px';
		square.style.top = y + 'px';
		desktop.appendChild(square);
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
		});
		desktop.addEventListener('mouseup', () => {
			square.remove();
			desktop.removeEventListener('mousemove', () => { });
			desktop.removeEventListener('mouseup', () => { });
		});
	});
}
desktopSelectSquare();

// bottom right resize corner
function handleResizing(corner) {
	var item = corner.closest('.window');
	let offsetX, offsetY, isResizing = false;
	var minWidth, minHeight;
	setTimeout(() => {
		minWidth = item.offsetWidth - 6;
		minHeight = item.offsetHeight - 6;
	}, 1000);
	corner.addEventListener('mousedown', (e) => {
		e.preventDefault();
		offsetX = e.clientX - item.getBoundingClientRect().right;
		offsetY = e.clientY - item.getBoundingClientRect().bottom;
		isResizing = true;
	});
	document.addEventListener('mousemove', (e) => {
		if (isResizing) {
			var width = e.clientX - item.getBoundingClientRect().left + offsetX;
			var height = e.clientY - item.getBoundingClientRect().top + offsetY;
			if (width < minWidth) {
				width = minWidth;
			}
			if (height < minHeight) {
				height = minHeight;
			}
			item.style.width = width + 'px';
			item.style.height = height + 'px';
		}
	});
	document.addEventListener('mouseup', () => {
		isResizing = false;
	});
}

function simpleIframe(src, title = 'Iframe', max = false) {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body';
	var iframe = windowbody.appendChild(document.createElement('iframe'));
	iframe.src = src;
	var c = createWindow({
		body: windowbody,
		title: title,
		width: window.innerWidth / 2,
		height: window.innerHeight / 2,
		className: 'window',
		closeDelay: 0,
		max: max
	});
	c.dataset.aniDelay = 1;
	return c;
}

// desktop icons
function createIcon(iconPth, title, onclick) {
	var icon = document.createElement('div');
	icon.className = 'icon';
	icon.addEventListener('dblclick', function() {
		icon.style.background = 'rgba(0, 0, 0, 0.3)';
		setTimeout(() => {
			onclick();
			icon.style.background = null;
		}, 100);
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
	if (icony < 810) {
		icony += iconheight + 16;
	} else {
		icony = 0;
		iconx += 84;
	}
}

// close all icon
var closeAllIcon = createIcon('msg_error-0.png', 'Close All', closeAll);
addIcon(closeAllIcon);

// recursive window
addIcon(createIcon(null, 'da heaeell', () => {
	addWindow(simpleIframe('http://weekoldroadkill.com', 'nahhh', false));
}));

window.onload = function() {
	var clock = document.querySelector('.clock');
	clock.innerHTML = "📅 " + new Date().toLocaleTimeString();
}
