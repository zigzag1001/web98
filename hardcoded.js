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

function createProfileFromJson(profileJson, halfpage = true, side = 'left') {
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

    for (let i = 0; i < rows.length; i++) {
        // For column-reverse, first element is visually bottom, so bottomMargin only for last
        // let bottomMargin = i === rows.length - 1 ? true : false;
        let bottomMargin = i === 0 ? false : true;
        let flexRow = createFlexRow(
            link_container,
            rows[i].buttonText,
            rows[i].iframeCallback,
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
        height: height
    });

    if (halfpage) {
        var mx = window.innerWidth / 2;
        var x = (side === "right") ? mx : 0;
        addWindow(custom, x, 0, mx);
    } else {
        addWindow(custom);
    }
}

function weekoldroadkill(halfpage = true, side = 'left') {
    createProfileFromJson({
        title: '🦌\xa0\xa0\xa0\xa0weekOldRoadkill',
        img: 'https://gitlab.com/uploads/-/system/user/avatar/10934353/avatar.png?width=800',
        rows: [
            {
                buttonText: 'Base Converter',
                iframeCallback: baseConverterIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/base-converter',
                siteUrl: WURL + '/base-converter/'
            },
            {
                buttonText: 'Screaming Insects',
                iframeCallback: screaminginsectsIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/screaming-insects',
                siteUrl: WURL + '/screaming-insects/'
            },
            {
                buttonText: 'Traveling Salesman',
                iframeCallback: travelingsalesmanIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/traveling-salesman',
                siteUrl: WURL + '/traveling-salesman/'
            },
            {
                buttonText: 'Inverse Kinematics',
                iframeCallback: inverseKinematicsIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/inverse-kinematics',
                siteUrl: WURL + '/inverse-kinematics/'
            },
            {
                buttonText: 'Sorting',
                iframeCallback: sortingIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/sorting',
                siteUrl: WURL + '/sorting/'
            },
            {
                buttonText: 'Boids',
                iframeCallback: boidsIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/boids',
                siteUrl: WURL + '/boids/'
            },
            {
                buttonText: 'Verlet',
                iframeCallback: verletIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/verlet',
                siteUrl: WURL + '/verlet/'
            },
            {
                buttonText: 'Perlin',
                iframeCallback: perlinIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/perlin',
                siteUrl: WURL + '/perlin/'
            },
            {
                buttonText: 'Drones',
                iframeCallback: dronesIframe,
                sourceUrl: 'https://gitlab.com/weekOldRoadkill/drones',
                siteUrl: WURL + '/drones/'
            }
        ],
        sourceLink: 'https://gitlab.com/weekOldRoadkill',
        sourceText: 'GitLab'
    }, halfpage, side);
}

function travelingsalesmanIframe() {
	addWindow(simpleIframe(WURL + '/traveling-salesman/index.html', opts = { title: 'Traveling Salesman', max: true, canResize: true, height: windowSize.height, width: windowSize.width }), 0, 0);
}

function baseConverterIframe() {
	addWindow(simpleIframe(WURL + '/base-converter/index.html', opts = { title: 'Base Converter', width: 271, height: 347, canResize: true }), 0, 0);
}

function screaminginsectsIframe() {
	addWindow(simpleIframe(WURL + '/screaming-insects/index.html', opts = { title: 'Screaming Insects', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function inverseKinematicsIframe() {
	addWindow(simpleIframe(WURL + '/inverse-kinematics/', opts = { title: 'Inverse Kinematics', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function sortingIframe() {
	addWindow(simpleIframe(WURL + '/sorting/', opts = { title: 'Sorting', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function boidsIframe() {
	addWindow(simpleIframe(WURL + '/boids/', opts = { title: 'Boids', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function verletIframe() {
	addWindow(simpleIframe(WURL + '/verlet/', opts = { title: 'Verlet', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function perlinIframe() {
	addWindow(simpleIframe(WURL + '/perlin/', opts = { title: 'Perlin', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function dronesIframe() {
    addWindow(simpleIframe(WURL + '/drones/', opts = { title: 'Drones', max: true, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function zigzag1001(halfpage = true, side = 'right') {
    createProfileFromJson({
        title: '👑\xa0\xa0\xa0\xa0zigzag1001',
        img: './img/pfp.gif',
        rows: [
            {
                buttonText: 'Pixel Wind',
                iframeCallback: pixelWindIframe,
                sourceUrl: 'https://github.com/zigzag1001/pixelWind/tree/wasm',
                siteUrl: ZURL + '/pixelWind/'
            },
            {
                buttonText: 'web98',
                iframeCallback: web98Iframe,
                sourceUrl: 'https://github.com/zigzag1001/web98',
                siteUrl: ZURL + '/web98/'
            },
            {
                buttonText: 'Pixel Sort',
                iframeCallback: pixelSortIframe,
                sourceUrl: 'https://github.com/zigzag1001/pixel-sort-rs',
                siteUrl: ZURL + '/pixel-sort-rs/'
            }
        ],
        sourceLink: 'https://github.com/zigzag1001',
        sourceText: 'GitHub'
    }, halfpage, side);
}

function pixelWindIframe(max = true) {
	addWindow(simpleIframe('/pixelWind/index.html', opts = { title: 'pixelWind', max: max, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function web98Iframe() {
	addWindow(simpleIframe('/web98/index.html', opts = { title: 'web98', max: false, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
}

function pixelSortIframe(max = true) {
	addWindow(simpleIframe('/pixel-sort-rs/index.html', opts = { title: 'Pixel Sort', max: max, canResize: true, width: windowSize.width, height: windowSize.height }), 0, 0);
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


var apps = [createIcon('msg_warning-0.png', 'Random Windows', randomWinodws),
createIcon('internet_connection_wiz-4.png', 'Custom Window', customWin),
createIcon('defragment-0.png', 'pixelWind', pixelWindIframe),
createIcon('defragment-0.png', 'Pixel Sort', pixelSortIframe),

createIcon('accessibility_big_keys.png', 'Base Converter', baseConverterIframe),
createIcon('msn3-5.png', 'Screaming Insects', screaminginsectsIframe),
createIcon('gears-0.png', 'Traveling Salesman', travelingsalesmanIframe),
createIcon('gears-0.png', 'Inverse Kinematics', inverseKinematicsIframe),
createIcon('gears-0.png', 'Sorting', sortingIframe),
createIcon('gears-0.png', 'Boids', boidsIframe),
createIcon('gears-0.png', 'Verlet', verletIframe),
createIcon('gears-0.png', 'Perlin', perlinIframe),
];
shuffleArray(apps);
for (var i = 0; i < apps.length; i++) {
	addIcon(apps[i]);
}

addWindow(simpleImage('https://i1.sndcdn.com/avatars-YRVj4sLMyUloU5Fp-XKkMPA-t1080x1080.jpg'))
addWindow(simpleImage('https://camo.githubusercontent.com/ed3b0212c8a48e5115aa87c48e4fc5fccf3d602f9dbd95bf460d895a91c47576/68747470733a2f2f692e6962622e636f2f4e7979313370302f706f67676572732e706e67', opts = { width: 400, height: 130 }))


window.onload = function() {
	const query = new URLSearchParams(window.location.search);

	numprofiles = 30;
	singlenumprofiles = 3;
	i = 0;
	if (query.has('z')) {
		var tmp = query.get('z');
		if (tmp > 0) {
			singlenumprofiles = tmp;
		}
		const interval = setInterval(function() {
			zigzag1001(false);
			i++;
			if (i >= singlenumprofiles) {
				clearInterval(interval);
			}
		}, 86);
	} else if (query.has('w')) {
		var tmp = query.get('w');
		if (tmp > 0) {
			singlenumprofiles = tmp;
		}
		const interval = setInterval(function() {
			weekoldroadkill(false);
			i++;
			if (i >= singlenumprofiles) {
				clearInterval(interval);
			}
		}, 86);
	} else if (!query.has('z') && !query.has('w') && !query.has('no')) {
		const interval = setInterval(function() {
			if (i % 2 == 0) {
				weekoldroadkill();
			} else {
				zigzag1001();
			}
			i++;
			if (i >= numprofiles) {
				clearInterval(interval);
			}
		}, 43);
	}

	if (query.has('rw')) {
		setTimeout(function() {
			randomWinodws();
		}, 1000);
	}

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
