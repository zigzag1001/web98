// ==================== APP DEFINITIONS ====================
// Define default settings for all apps

// Random Windows app definition
APP_REGISTRY.appDefinitions.utilities.randomWindows = {
	id: 'randomWindows',
	name: 'Random Windows',
	type: 'utility',
	icon: 'msg_warning-0.png',
	cascade: true,  // Enable cascade by default
	width: 250,
	height: 200,
	handler: randomWinodws
};

// Custom Window app definition
APP_REGISTRY.appDefinitions.utilities.customWindow = {
	id: 'customWindow',
	name: 'Custom Window',
	type: 'utility',
	icon: 'internet_connection_wiz-4.png',
	cascade: false,
	handler: customWin
};

// Random window (individual) definition
APP_REGISTRY.appDefinitions.utilities.randwin = {
	id: 'randwin',
	name: 'Random Window',
	type: 'utility',
	cascade: true,  // Individual random windows can cascade
	width: 250,
	height: 200
};

// random winow creation controller
function randomWinodws() {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body';
	windowbody.appendChild(document.createElement('p')).textContent = 'AAAAAAAAAAAAAAAAA';

	var input = windowbody.appendChild(document.createElement('input'));
	input.type = 'number';
	input.value = 50;
	input.min = 1;
	input.max = 500;
	input.style.width = '170px';
	input.style.marginBottom = '10px';

	var buttons = windowbody.appendChild(document.createElement('div'));
	buttons.style.textAlign = 'center';

	var okbutton = buttons.appendChild(document.createElement('button'));
	okbutton.textContent = 'OK';
	okbutton.onclick = function() {
		windowbody.closest('.window').classList.add('animate__bounceInUp');
		winnum = input.value;
		if (winnum > 500) {
			winnum = 500;
		}

		input.remove();
		buttons.style.textAlign = 'left';
		x = Math.floor(Math.random() * (window.innerWidth - 500));
		y = Math.floor(Math.random() * (window.innerHeight - 240));
		windowbody.closest('.window').style.left = x + 'px';
		windowbody.closest('.window').style.top = y + 'px';

		fillRandWin();
		setTimeout(function() {
			windowbody.closest('.window').classList.remove('animate__bounceInUp');
		}, 1000);
	}

	var cancelbutton = buttons.appendChild(document.createElement('button'));
	cancelbutton.textContent = 'Cancel';
	cancelbutton.onclick = function() {
		clearWins('randwin');
		setTimeout(function() {
			removeWindow(windowbody.closest('.window'));
		}, 350);
	}

	var div = createWindow({ body: windowbody });
	div.classList.add('randwincontrol');

	// Register as a control window for random windows
	addWindow(div, 0, 0, 0, 0, true, false, 'randomWindowsControl', APP_REGISTRY.appDefinitions.utilities.randomWindows);
}


// custom window creation controller
function customWin() {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body';

	var form = windowbody.appendChild(document.createElement('div'));
	form.style.display = 'flex';
	form.style.flexDirection = 'column';
	var in_winname = form.appendChild(document.createElement('input'));
	var in_winbody = form.appendChild(document.createElement('textarea'));
	var submit = form.appendChild(document.createElement('button'));
	in_winname.style.padding = '5px';
	in_winname.placeholder = 'Window Title';
	in_winbody.placeholder = 'Window Body';
	in_winbody.style.padding = '5px';
	submit.textContent = 'Submit';
	submit.onclick = function() {
		removeWindow(windowbody.closest('.window'));
		var div = createWindow({
			title: in_winname.value,
			body: simplebody(in_winbody.value)
		});
		div.classList.add('customwin');
		addWindow(div, 0, 0, 0, 0, true, false, 'customWindow', APP_REGISTRY.appDefinitions.utilities.customWindow);
		umami.track('customwin');
	}

	var custom = createWindow({ body: windowbody, title: 'Create Custom Window' })
	custom.classList.add('customwincontrol');

	addWindow(custom, 0, 0, 0, 0, true, false, 'customWindowControl', APP_REGISTRY.appDefinitions.utilities.customWindow);
}


function createFlexRow(parent, buttonText, iframeCallback, sourceUrl, siteUrl, bottomMargin = true) {
	var flexRow = parent.appendChild(document.createElement('div'));
	flexRow.style.display = 'flex';

	// Iframe button
	var iframeButton = flexRow.appendChild(document.createElement('button'));
	iframeButton.textContent = buttonText;
	iframeButton.style.flex = '3';
	iframeButton.style.padding = '0px'
	iframeButton.onclick = () => {
		umami.track(buttonText);
		iframeCallback();
	};
	// iframeButton.onclick = iframeCallback;

	// Source link
	var sourceLink = flexRow.appendChild(document.createElement('a'));
	var sourceButton = sourceLink.appendChild(document.createElement('button'));
	sourceLink.href = sourceUrl;
	sourceLink.target = '_blank';
	sourceLink.style.flex = '1';
	sourceButton.textContent = 'Source';
	sourceButton.style.minWidth = '0';
    sourceButton.onclick = () => {
        umami.track(buttonText + '-Source');
    }

	// Direct site link
	var siteLink = flexRow.appendChild(document.createElement('a'));
	var siteButton = siteLink.appendChild(document.createElement('button'));
	siteLink.href = siteUrl;
	siteLink.target = '_blank';
	siteLink.style.flex = '1';
	siteButton.textContent = 'Site';
	siteButton.style.minWidth = '0';
    siteButton.onclick = () => {
        umami.track(buttonText + '-Site');
    }

	// parent.appendChild(document.createElement('br'));
    if (bottomMargin) flexRow.style.marginBottom = '8px';
    return flexRow;
}


const WURL = 'https://weekoldroadkill.com'
const ZURL = 'https://weekoldroadkill.com'

const windowSize = {
	height: 612,
	width: 1044
};

// ==================== PROFILE DATA ====================
// Add weekoldroadkill profile to APP_REGISTRY
APP_REGISTRY.profiles.weekoldroadkill = {
	id: 'weekoldroadkill',
	name: 'weekOldRoadkill',
	icon: null, // Will be set dynamically
	handler: weekoldroadkill,
	projects: [
		{
			buttonText: 'Base Converter',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/base-converter',
			siteUrl: WURL + '/base-converter/',
			width: 271,
			height: 347,
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Screaming Insects',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/screaming-insects',
			siteUrl: WURL + '/screaming-insects/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Traveling Salesman',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/traveling-salesman',
			siteUrl: WURL + '/traveling-salesman/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Inverse Kinematics',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/inverse-kinematics',
			siteUrl: WURL + '/inverse-kinematics/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Sorting',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/sorting',
			siteUrl: WURL + '/sorting/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Boids',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/boids',
			siteUrl: WURL + '/boids/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Verlet',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/verlet',
			siteUrl: WURL + '/verlet/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Perlin',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/perlin',
			siteUrl: WURL + '/perlin/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Drones',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/drones',
			siteUrl: WURL + '/drones/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Programmable Drones',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/programmable-drones',
			siteUrl: WURL + '/programmable-drones/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Pixel Art Anti Aliasing',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/bevy_pixel_art',
			siteUrl: WURL + '/bevy_pixel_art/',
			icon: 'gears-0.png',
		},
		{
			buttonText: 'Web XP',
			sourceUrl: 'https://gitlab.com/weekOldRoadkill/web_xp',
			siteUrl: WURL + '/web_xp/',
			icon: 'gears-0.png',
		}
	],
	profileData: {
		title: '🦌\xa0\xa0\xa0\xa0weekOldRoadkill',
		img: 'https://gitlab.com/uploads/-/system/user/avatar/10934353/avatar.png?width=800',
		defaultIcon: 'gears-0.png',
		sourceLink: 'https://gitlab.com/weekOldRoadkill',
		sourceText: 'GitLab'
	}
};

// Add zigzag1001 profile to APP_REGISTRY
APP_REGISTRY.profiles.zigzag1001 = {
	id: 'zigzag1001',
	name: 'zigzag1001',
	icon: null, // Will be set dynamically
	handler: zigzag1001,
	projects: [
		{
			buttonText: 'Pixel Wind',
			sourceUrl: 'https://github.com/zigzag1001/pixelWind/tree/wasm',
			siteUrl: ZURL + '/pixelWind/',
			icon: 'defragment-0.png',
		},
		{
			buttonText: 'web98',
			sourceUrl: 'https://github.com/zigzag1001/web98',
			siteUrl: ZURL + '/web98/',
			icon: 'defragment-0.png',
		},
		{
			buttonText: 'Pixel Sort',
			sourceUrl: 'https://github.com/zigzag1001/pixel-sort-rs',
			siteUrl: ZURL + '/pixel-sort-rs/',
			icon: 'defragment-0.png',
		}
	],
	profileData: {
		title: '👑\xa0\xa0\xa0\xa0zigzag1001',
		img: './img/pfp.gif',
		defaultIcon: 'defragment-0.png',
		sourceLink: 'https://github.com/zigzag1001',
		sourceText: 'GitHub'
	}
};

// Add utility applications to APP_REGISTRY
APP_REGISTRY.utilities.randomWindows = {
	id: 'randomWindows',
	name: 'Random Windows',
	icon: 'msg_warning-0.png',
	handler: randomWinodws
};

APP_REGISTRY.utilities.customWindow = {
	id: 'customWindow',
	name: 'Custom Window',
	icon: 'internet_connection_wiz-4.png',
	handler: customWin
};

/**
 * Create a profile window from a JSON object.
 * @param {Object} profileJson - The profile data.
 * @param {string} [profileJson.title] - Title of the window.
 * @param {string} [profileJson.img] - Profile image URL.
 * @param {String} [proifleJson.defaultIcon='circle_question-0.png'] - Default icon for the profile.
 *
 * @param {Array} profileJson.rows - Array of row objects for createFlexRow.
 * Each row: { buttonText, ~iframeCallback~, sourceUrl, siteUrl, width, height, max, canResize, x, y, icon }
 * @param {string} [profileJson.sourceLink] - Optional source link URL.
 * @param {string} [profileJson.sourceText] - Button text for source link.
 *
 *
 * @param {boolean} [halfpage=true] - Whether to use halfpage layout.
 * @param {string} [side='left'] - Side for halfpage layout ('left' or 'right').
 */
function createProfileFromJson(profileJson, halfpage = true, side = 'left', profileId = null) {

    // count number of windows with dataset tag profileJson.title
    var count = 0;
    document.querySelectorAll('.window').forEach((win) => {
            count += (win.dataset.tag === profileJson.title) ? 1 : 0;
        }
    );

    var windowbody = document.createElement('div');
    windowbody.className = 'window-body profile';

    var wincontainer = windowbody.appendChild(document.createElement('div'));
    wincontainer.className = 'profileImgContainer';
    if (profileJson.img) {
        var img = wincontainer.appendChild(document.createElement('img'));
        img.src = profileJson.img;
    }

    var link_container = windowbody.appendChild(document.createElement('div'));
    link_container.className = 'profileLinkContainer';

    let rows = profileJson.rows || [];
    let height = rows.length > 5 ? 500 : undefined;
    let flexRows = [];

    // iterate over projects
    for (let i = 0; i < rows.length; i++) {
        // iframeCreate function instead of iframeCallback
        let iframeCreate = () => {
            addWindow(simpleIframe(
                rows[i].siteUrl,
                opts = {
                    title: rows[i].buttonText,
                    max: rows[i].max,
                    canResize: rows[i].canResize,
                    width: rows[i].width || windowSize.width,
                    height: rows[i].height || windowSize.height
                },
                rows[i].x || 0,
                rows[i].y || 0
            ));
        }

        if (count == 0) {
            addIcon(createIcon(
                rows[i].icon || profileJson.defaultIcon || 'circle_question-0.png',
                rows[i].buttonText,
                iframeCreate
            ));
        }

        // For column-reverse, first element is visually bottom, so bottomMargin only for last
        // let bottomMargin = i === rows.length - 1 ? true : false;
        let bottomMargin = i === 0 ? false : true;
        let flexRow = createFlexRow(
            link_container,
            rows[i].buttonText,
            iframeCreate,
            rows[i].sourceUrl,
            rows[i].siteUrl,
            bottomMargin
        );
        flexRows.push(flexRow);
    }

    // Animate and scroll last row (visually top due to column-reverse)
    if (flexRows.length > 0) {
        setTimeout(function() {
            let last = flexRows[flexRows.length - 1];
            last.scrollIntoView({ behavior: 'smooth', block: 'end' });
            setTimeout(function() {
                last.classList.add('animate__animated', 'animate__headShake');
            }, 300);
        }, 1500);
    }

    if (profileJson.sourceLink) {
        let sourceLink = windowbody.appendChild(document.createElement('a'));
        let sourceButton = sourceLink.appendChild(document.createElement('button'));
        sourceLink.href = profileJson.sourceLink;
        sourceLink.target = '_blank';
        sourceButton.textContent = profileJson.sourceText || 'Source';
        sourceLink.style.marginTop = '8px';
        sourceButton.onclick = () => {
            umami.track((profileJson.title || 'Profile') + '-GitProfile');
        }
    }

    var custom = createWindow({
        body: windowbody,
        title: profileJson.title || '',
        height: height,
        tag: profileJson.title || ''
    });

    // Get app definition for the profile
    const appDef = APP_REGISTRY.appDefinitions.profiles[profileId] || APP_REGISTRY.profiles[profileId] || { cascade: true };
    
    if (halfpage) {
        var mx = window.innerWidth / 2;
        var x = (side === "right") ? mx : 0;
        addWindow(custom, x, 0, mx, 0, false, true, profileId, appDef);
    } else {
        addWindow(custom, 0, 0, 0, 0, true, false, profileId, appDef);
    }
}

function weekoldroadkill(halfpage = true, side = 'left', profileId = 'weekoldroadkill') {
    const profile = APP_REGISTRY.profiles.weekoldroadkill;
    createProfileFromJson({
        ...profile.profileData,
        rows: profile.projects
    }, halfpage, side, profileId);
}


function zigzag1001(halfpage = true, side = 'right', profileId = 'zigzag1001') {
    const profile = APP_REGISTRY.profiles.zigzag1001;
    createProfileFromJson({
        ...profile.profileData,
        rows: profile.projects
    }, halfpage, side, profileId);
}


function shuffleArray(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Initialize profile icons with random icons
var icons = ["doctor_watson.png", "msagent-3.png", "msagent_file-1.png", "address_book_user.png", "msagent-4.png", "utopia_smiley.png", "media_player_stream_sun4.png"]
shuffleArray(icons);
APP_REGISTRY.profiles.weekoldroadkill.icon = icons[1];
APP_REGISTRY.profiles.zigzag1001.icon = icons[0];

// Create desktop icons for profiles
addIcon(createIcon(APP_REGISTRY.profiles.weekoldroadkill.icon, APP_REGISTRY.profiles.weekoldroadkill.name, weekoldroadkill));
addIcon(createIcon(APP_REGISTRY.profiles.zigzag1001.icon, APP_REGISTRY.profiles.zigzag1001.name, zigzag1001));

/**
 * Main startup function - now data-driven!
 */
window.onload = function() {
	const startupConfig = getStartupConfig();
	executeStartup(startupConfig);
}
