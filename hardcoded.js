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

	addWindow(div);
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
		addWindow(div);
		umami.track('customwin');
	}

	var custom = createWindow({ body: windowbody, title: 'Create Custom Window' })
	custom.classList.add('customwincontrol');

	addWindow(custom);
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
function createProfileFromJson(profileJson, halfpage = true, side = 'left', x = null, y = null) {

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

    if (x!= null && y != null) {
        addWindow(custom, x, y, 0, 0, false, false);
    }
    else if (halfpage) {
        var mx = window.innerWidth / 2;
        var x = (side === "right") ? mx : 0;
        addWindow(custom, x, 0, mx, 0, false, true);
    } else {
        addWindow(custom);
    }
}

function weekoldroadkill(halfpage = true, side = 'left', x = null, y = null) {
    createProfileFromJson({
        title: '🦌\xa0\xa0\xa0\xa0weekOldRoadkill',
        img: 'https://gitlab.com/uploads/-/system/user/avatar/10934353/avatar.png?width=800',
        defaultIcon: 'gears-0.png',
        rows: [
            {
                buttonText: 'Base Converter',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/base-converter',
                siteUrl: WURL + '/base-converter/',
                width: 271,
                height: 347,
            },
            {
                buttonText: 'Screaming Insects',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/screaming-insects',
                siteUrl: WURL + '/screaming-insects/'
            },
            {
                buttonText: 'Traveling Salesman',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/traveling-salesman',
                siteUrl: WURL + '/traveling-salesman/'
            },
            {
                buttonText: 'Inverse Kinematics',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/inverse-kinematics',
                siteUrl: WURL + '/inverse-kinematics/'
            },
            {
                buttonText: 'Sorting',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/sorting',
                siteUrl: WURL + '/sorting/'
            },
            {
                buttonText: 'Boids',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/boids',
                siteUrl: WURL + '/boids/'
            },
            {
                buttonText: 'Verlet',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/verlet',
                siteUrl: WURL + '/verlet/'
            },
            {
                buttonText: 'Perlin',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/perlin',
                siteUrl: WURL + '/perlin/'
            },
            {
                buttonText: 'Drones',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/drones',
                siteUrl: WURL + '/drones/'
            },
            {
                buttonText: 'Programmable Drones',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/programmable-drones',
                siteUrl: WURL + '/programmable-drones/'
            },
            {
                buttonText: 'Pixel Art Anti Aliasing',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/bevy_pixel_art',
                siteUrl: WURL + '/bevy_pixel_art/'
            },
            {
                buttonText: 'Web XP',
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/web_xp',
                siteUrl: WURL + '/web_xp/'
            }
        ],
        sourceLink: 'https://gitlab.com/weekOldRoadkill',
        sourceText: 'GitLab'
    }, halfpage, side, x, y);
}


function zigzag1001(halfpage = true, side = 'right', x = null, y = null) {
    createProfileFromJson({
        title: '👑\xa0\xa0\xa0\xa0zigzag1001',
        img: './img/pfp.gif',
        defaultIcon: 'defragment-0.png',
        rows: [
            {
                buttonText: 'Pixel Wind',
                sourceUrl: 'https://github.com/zigzag1001/pixelWind/tree/wasm',
                siteUrl: ZURL + '/pixelWind/'
            },
            {
                buttonText: 'web98',
                sourceUrl: 'https://github.com/zigzag1001/web98',
                siteUrl: ZURL + '/web98/'
            },
            {
                buttonText: 'Pixel Sort',
                sourceUrl: 'https://github.com/zigzag1001/pixel-sort-rs',
                siteUrl: ZURL + '/pixel-sort-rs/'
            }
        ],
        sourceLink: 'https://github.com/zigzag1001',
        sourceText: 'GitHub'
    }, halfpage, side, x, y);
}


function shuffleArray(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// choose random icons
var icons = ["doctor_watson.png", "msagent-3.png", "msagent_file-1.png", "address_book_user.png", "msagent-4.png", "utopia_smiley.png", "media_player_stream_sun4.png"]
shuffleArray(icons);
var zigzag1001icon = icons[0];
var weekoldroadkillicon = icons[1];

//weekoldroadkill
addIcon(createIcon(weekoldroadkillicon, 'weekOldRoadkill', weekoldroadkill));
//zigzag1001
addIcon(createIcon(zigzag1001icon, 'zigzag1001', zigzag1001));


// var apps = [createIcon('msg_warning-0.png', 'Random Windows', randomWinodws),
// createIcon('internet_connection_wiz-4.png', 'Custom Window', customWin),
// createIcon('defragment-0.png', 'pixelWind', pixelWindIframe),
// createIcon('defragment-0.png', 'Pixel Sort', pixelSortIframe),
//
// createIcon('accessibility_big_keys.png', 'Base Converter', baseConverterIframe),
// createIcon('msn3-5.png', 'Screaming Insects', screaminginsectsIframe),
// createIcon('gears-0.png', 'Traveling Salesman', travelingsalesmanIframe),
// createIcon('gears-0.png', 'Inverse Kinematics', inverseKinematicsIframe),
// createIcon('gears-0.png', 'Sorting', sortingIframe),
// createIcon('gears-0.png', 'Boids', boidsIframe),
// createIcon('gears-0.png', 'Verlet', verletIframe),
// createIcon('gears-0.png', 'Perlin', perlinIframe),
// ];
// shuffleArray(apps);
// for (var i = 0; i < apps.length; i++) {
// 	addIcon(apps[i]);
// }




window.onload = function() {
	const query = new URLSearchParams(window.location.search);

    let zCount = 10;
    let wCount = 10;

    let extra_params = {}

    let zigzagX = null;
    let weekoldX = null;
    let commonY = null;

	// 's' parameter forces simple layout
    // center on each half of the screen, 1 profile each, no random windows
	if (query.has('s')) {
		zCount = 1;
		wCount = 1;

        extra_params.noRandom = true;

        // calculate center positions for each profile
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        let winHalfWidth = screenWidth / 2;

        weekoldX = winHalfWidth / 2 - 250/2 - 32;
        zigzagX = winHalfWidth + winHalfWidth / 2 - 250/2 - 32;

        commonY = screenHeight / 2 - 300;

	} else {
        addWindow(simpleImage('https://camo.githubusercontent.com/65b4f007ed9bd5acc0b0cf783286fed2c564f8799d84e54e54c4d0267eabb004/68747470733a2f2f692e6962622e636f2f4e7979313370302f706f67676572732e706e67', opts = { width: 400, height: 130 }))
    }

	// 'z' parameter sets zigzag1001 count
	if (query.has('z')) {
		let val = parseInt(query.get('z'));
		if (!isNaN(val)) zCount = val;
	}

	// 'w' parameter sets weekoldroadkill count
	if (query.has('w')) {
		let val = parseInt(query.get('w'));
		if (!isNaN(val)) wCount = val;
	}

	let i = 0;
	const interval = setInterval(function() {
		if (i < zCount) {
			zigzag1001(true, 'right', zigzagX, commonY);
		}
		
		if (i >= zCount && i == zCount) {
             resetCascade();
        }

		if (i >= zCount && i < zCount + wCount) {
			weekoldroadkill(true, 'left', weekoldX, commonY);
		}

		i++;
		if (i >= zCount + wCount) {
			clearInterval(interval);
		}
	}, 100);


    //centered
    let centerX = window.innerWidth / 2 - 262/2 - 32;
    let centerY = window.innerHeight / 2 - 246/2 - 32;

    setTimeout(function() {
        if (!extra_params.noRandom) {
                randomWinodws();
        }

        addWindow(simpleImage('https://i1.sndcdn.com/avatars-YRVj4sLMyUloU5Fp-XKkMPA-t1080x1080.jpg'), centerX, centerY, 0, 0, false, false);
    }, 2000);

	if (query.has('app')) {
		var app = query.get('app');
		if (app == 'pixelwind') {
			pixelWindIframe(max = true);
		}
		if (app == 'pixelsort') {
			pixelSortIframe(max = true);
		}
	}
}

    // params:
    // z = number of zigzag1001 profiles to open
    // w = number of weekoldroadkill profiles to open
    // s = simple hardcoded layout

	// i = 0;
	// if (query.has('z')) {
	// 	var tmp = query.get('z');
	// 	if (tmp > 0) {
	// 		singlenumprofiles = tmp;
	// 	}
	// 	const interval = setInterval(function() {
	// 		zigzag1001(false);
	// 		i++;
	// 		if (i >= singlenumprofiles) {
	// 			clearInterval(interval);
	// 		}
	// 	}, 86);
	// } else if (query.has('w')) {
	// 	var tmp = query.get('w');
	// 	if (tmp > 0) {
	// 		singlenumprofiles = tmp;
	// 	}
	// 	const interval = setInterval(function() {
	// 		weekoldroadkill(false);
	// 		i++;
	// 		if (i >= singlenumprofiles) {
	// 			clearInterval(interval);
	// 		}
	// 	}, 86);
	// } else if (!query.has('z') && !query.has('w') && !query.has('no')) {
	// 	const interval = setInterval(function() {
	//
	// 		zigzag1001();
	//
	// 		i++;
	// 		if (i >= numprofiles) {
	// 			clearInterval(interval);
	//                resetCascade();
	//                i = 0;
	//                const interval2 = setInterval(function() {
	//
	//                    weekoldroadkill();
	//
	//                    i++;
	//                    if (i >= numprofiles) {
	//                        clearInterval(interval2);
	//                    }
	//                }, 100);
	// 		}
	// 	}, 100);
	// }
	//
	//    setTimeout(function() {
	//        randomWinodws();
	//    }, 2000);
	//
	// if (query.has('app')) {
	// 	var app = query.get('app');
	// 	if (app == 'pixelwind') {
	// 		pixelWindIframe(max = true);
	// 	}
	// 	if (app == 'pixelsort') {
	// 		pixelSortIframe(max = true);
	// 	}
	// }
// }
