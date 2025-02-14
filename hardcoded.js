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
	}

	var custom = createWindow({ body: windowbody, title: 'Create Custom Window' })
	custom.classList.add('customwincontrol');

	addWindow(custom);
}


function createFlexRow(parent, buttonText, iframeCallback, sourceUrl, siteUrl) {
	var flexRow = parent.appendChild(document.createElement('div'));
	flexRow.style.display = 'flex';

	// Iframe button
	var iframeButton = flexRow.appendChild(document.createElement('button'));
	iframeButton.textContent = buttonText;
	iframeButton.style.flex = '3';
	iframeButton.style.padding = '0px'
	iframeButton.onclick = iframeCallback;

	// Source link
	var sourceLink = flexRow.appendChild(document.createElement('a'));
	var sourceButton = sourceLink.appendChild(document.createElement('button'));
	sourceLink.href = sourceUrl;
	sourceLink.target = '_blank';
	sourceLink.style.flex = '1';
	sourceButton.textContent = 'Source';
	sourceButton.style.minWidth = '0';

	// Direct site link
	var siteLink = flexRow.appendChild(document.createElement('a'));
	var siteButton = siteLink.appendChild(document.createElement('button'));
	siteLink.href = siteUrl;
	siteLink.target = '_blank';
	siteLink.style.flex = '1';
	siteButton.textContent = 'Site';
	siteButton.style.minWidth = '0';

	parent.appendChild(document.createElement('br'));
}


const WURL = 'https://weekoldroadkill.com'
const ZURL = 'https://zigzag.weekoldroadkill.com'


function weekoldroadkill(halfpage = true) {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body profile';

	var wincontainer = windowbody.appendChild(document.createElement('div'));
	wincontainer.className = 'profileImgContainer';
	var img = wincontainer.appendChild(document.createElement('img'));
	img.src = 'https://gitlab.com/uploads/-/system/user/avatar/10934353/avatar.png?width=800';

	windowbody.appendChild(document.createElement('br'));

	// base converter
	createFlexRow(windowbody, 'Base Converter', baseConverterIframe, 'https://gitlab.com/weekOldRoadkill/base-converter', WURL + '/base-converter/');

	// screaming insects
	createFlexRow(windowbody, 'Screaming Insects', screaminginsectsIframe, 'https://gitlab.com/weekOldRoadkill/screaming-insects', WURL + '/screaming-insects/');

	// traveling salesman
	createFlexRow(windowbody, 'Traveling Salesman', travelingsalesmanIframe, 'https://gitlab.com/weekOldRoadkill/traveling-salesman', WURL + '/traveling-salesman/');

	// inverse kinematics
	createFlexRow(windowbody, 'Inverse Kinematics', inverseKinematicsIframe, 'https://gitlab.com/weekOldRoadkill/inverse-kinematics', WURL + '/inverse-kinematics/');

	// sorting
	createFlexRow(windowbody, 'Sorting', sortingIframe, 'https://gitlab.com/weekOldRoadkill/sorting', WURL + '/sorting/');

	// boids
	createFlexRow(windowbody, 'Boids', boidsIframe, 'https://gitlab.com/weekOldRoadkill/boids', WURL + '/boids/');

	// verlet
	createFlexRow(windowbody, 'Verlet', verletIframe, 'https://gitlab.com/weekOldRoadkill/verlet', WURL + '/verlet/');

	// gitlab
	sourceLink = windowbody.appendChild(document.createElement('a'));
	sourceButton = sourceLink.appendChild(document.createElement('button'));
	sourceLink.href = 'https://gitlab.com/weekOldRoadkill';
	sourceLink.target = '_blank';
	sourceButton.textContent = 'GitLab';

	var custom = createWindow({ body: windowbody, title: '🦌\xa0\xa0\xa0\xa0weekOldRoadkill' })

	if (halfpage) {
		var mx = window.innerWidth / 2;
		addWindow(custom, 0, 0, mx = mx);
	} else {
		addWindow(custom);
	}
}

function travelingsalesmanIframe() {
	addWindow(simpleIframe(WURL + '/traveling-salesman/index.html', opts = { title: 'Traveling Salesman', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function baseConverterIframe() {
	addWindow(simpleIframe(WURL + '/base-converter/index.html', opts = { title: 'Base Converter', width: 271, height: 347, canResize: false }), 0, 0);
}

function screaminginsectsIframe() {
	addWindow(simpleIframe(WURL + '/screaming-insects/index.html', opts = { title: 'Screaming Insects', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function inverseKinematicsIframe() {
	addWindow(simpleIframe(WURL + '/inverse-kinematics/', opts = { title: 'Inverse Kinematics', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function sortingIframe() {
	addWindow(simpleIframe(WURL + '/sorting/', opts = { title: 'Sorting', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function boidsIframe() {
	addWindow(simpleIframe(WURL + '/boids/', opts = { title: 'Boids', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function verletIframe() {
	addWindow(simpleIframe(WURL + '/verlet/', opts = { title: 'Verlet', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function zigzag1001(halfpage = true) {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body profile';

	var wincontainer = windowbody.appendChild(document.createElement('div'));
	wincontainer.className = 'profileImgContainer';
	var img = wincontainer.appendChild(document.createElement('img'));
	img.src = './img/pfp.gif';

	windowbody.appendChild(document.createElement('br'));

	// pixelWind
	createFlexRow(windowbody, 'Pixel Wind', pixelWindIframe, 'https://github.com/zigzag1001/pixelWind/tree/wasm', ZURL + '/pixelWind/');

	// web98
	createFlexRow(windowbody, 'web98', web98Iframe, 'https://github.com/zigzag1001/web98', ZURL + '/web98/');

	// pixel-sort-rs
	createFlexRow(windowbody, 'Pixel Sort', pixelSortIframe, 'https://github.com/zigzag1001/pixel-sort-rs', ZURL + '/pixel-sort-rs/');

	// github
	sourceLink = windowbody.appendChild(document.createElement('a'));
	sourceButton = sourceLink.appendChild(document.createElement('button'));
	sourceLink.href = 'https://github.com/zigzag1001';
	sourceLink.target = '_blank';
	sourceButton.textContent = 'GitHub';

	var custom = createWindow({ body: windowbody, title: '👑\xa0\xa0\xa0\xa0zigzag1001' })

	if (halfpage) {
		var mx = window.innerWidth / 2;
		addWindow(custom, window.innerWidth / 2, 0, mx = mx);
	} else {
		addWindow(custom);
	}
}

function pixelWindIframe(max = true) {
	addWindow(simpleIframe('/pixelWind/index.html', opts = { title: 'pixelWind', max: max, canResize: false, height: 719, width: 1249 }), 0, 0);
}

function web98Iframe() {
	addWindow(simpleIframe('/web98/index.html', opts = { title: 'web98', max: true, canResize: false, height: 612, width: 1044 }), 0, 0);
}

function pixelSortIframe() {
	addWindow(simpleIframe('/pixel-sort-rs/index.html', opts = { title: 'Pixel Sort', max: true, canResize: false, height: 719, width: 1249 }), 0, 0);
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

createIcon('accessibility_big_keys.png', 'Base Converter', baseConverterIframe),
createIcon('msn3-5.png', 'Screaming Insects', screaminginsectsIframe),
createIcon('gears-0.png', 'Traveling Salesman', travelingsalesmanIframe),
];
shuffleArray(apps);
for (var i = 0; i < apps.length; i++) {
	addIcon(apps[i]);
}

// addWindow(simpleImage('https://i1.sndcdn.com/avatars-YRVj4sLMyUloU5Fp-XKkMPA-t1080x1080.jpg'))
// addWindow(simpleImage('https://camo.githubusercontent.com/ed3b0212c8a48e5115aa87c48e4fc5fccf3d602f9dbd95bf460d895a91c47576/68747470733a2f2f692e6962622e636f2f4e7979313370302f706f67676572732e706e67', opts = { width: 400, height: 130 }))


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
			pixelWindIframe(false);
		}
	}
	var clock = document.querySelector('.clock');
	clock.innerHTML = "📅 " + new Date().toLocaleTimeString();
}
