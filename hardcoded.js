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

	// Row 1
	var flex1 = windowbody.appendChild(document.createElement('div'));
	flex1.style.display = 'flex';
	// iframe
	var iframebutton1 = flex1.appendChild(document.createElement('button'));
	iframebutton1.textContent = 'Base Converter';
	iframebutton1.style.flex = '3';
	iframebutton1.onclick = function() {
		baseConverterIframe();
	}
	// source
	var asbut = flex1.appendChild(document.createElement('a'));
	var sbut = asbut.appendChild(document.createElement('button'));
	asbut.href = 'https://gitlab.com/weekOldRoadkill/base-converter';
	asbut.target = '_blank';
	asbut.style.flex = '1';
	sbut.textContent = 'Source';
	sbut.style.minWidth = '0';
	// direct site
	var abut1 = flex1.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = WURL + '/base-converter/';
	abut1.target = '_blank';
	abut1.style.flex = '1';
	but1.textContent = 'Site';
	but1.style.minWidth = '0';

	windowbody.appendChild(document.createElement('br'));

	// Row 2
	var flex2 = windowbody.appendChild(document.createElement('div'));
	flex2.style.display = 'flex';
	// iframe
	var iframebutton2 = flex2.appendChild(document.createElement('button'));
	iframebutton2.textContent = 'Screaming Insects';
	iframebutton2.style.flex = '3';
	iframebutton2.onclick = function() {
		screaminginsectsIframe();
	}
	// source
	var asbut2 = flex2.appendChild(document.createElement('a'));
	var sbut2 = asbut2.appendChild(document.createElement('button'));
	asbut2.href = 'https://gitlab.com/weekOldRoadkill/screaming-insects';
	asbut2.target = '_blank';
	asbut2.style.flex = '1';
	sbut2.textContent = 'Source';
	sbut2.style.minWidth = '0';
	// direct site
	var abut2 = flex2.appendChild(document.createElement('a'));
	var but2 = abut2.appendChild(document.createElement('button'));
	abut2.href = WURL + '/screaming-insects/';
	abut2.target = '_blank';
	abut2.style.flex = '1';
	but2.textContent = 'Site';
	but2.style.minWidth = '0';

	windowbody.appendChild(document.createElement('br'));

	// Row 3
	var flex3 = windowbody.appendChild(document.createElement('div'));
	flex3.style.display = 'flex';
	// iframe
	var iframebutton3 = flex3.appendChild(document.createElement('button'));
	iframebutton3.textContent = 'Traveling Salesman';
	iframebutton3.style.flex = '3';
	iframebutton3.style.padding = '0';
	iframebutton3.onclick = function() {
		travelingsalesmanIframe();
	}
	// source
	var asbut3 = flex3.appendChild(document.createElement('a'));
	var sbut3 = asbut3.appendChild(document.createElement('button'));
	asbut3.href = 'https://gitlab.com/weekOldRoadkill/traveling-salesman';
	asbut3.target = '_blank';
	asbut3.style.flex = '1';
	sbut3.textContent = 'Source';
	sbut3.style.minWidth = '0';
	// direct site
	var abut3 = flex3.appendChild(document.createElement('a'));
	var but3 = abut3.appendChild(document.createElement('button'));
	abut3.href = WURL + '/traveling-salesman/';
	abut3.target = '_blank';
	abut3.style.flex = '1';
	but3.textContent = 'Site';
	but3.style.minWidth = '0';

	windowbody.appendChild(document.createElement('br'));

	// Row 4
	var flex4 = windowbody.appendChild(document.createElement('div'));
	flex4.style.display = 'flex';
	// iframe
	var iframebutton4 = flex4.appendChild(document.createElement('button'));
	iframebutton4.textContent = 'Kinematics';
	iframebutton4.style.flex = '3';
	iframebutton4.onclick = function() {
		inverseKinematicsIframe();
	}
	// source
	var asbut4 = flex4.appendChild(document.createElement('a'));
	var sbut4 = asbut4.appendChild(document.createElement('button'));
	asbut4.href = 'https://gitlab.com/weekOldRoadkill/inverse-kinematics';
	asbut4.target = '_blank';
	asbut4.style.flex = '1';
	sbut4.textContent = 'Source';
	sbut4.style.minWidth = '0';
	// direct site
	var abut4 = flex4.appendChild(document.createElement('a'));
	var but4 = abut4.appendChild(document.createElement('button'));
	abut4.href = WURL + '/inverse-kinematics/';
	abut4.target = '_blank';
	abut4.style.flex = '1';
	but4.textContent = 'Site';
	but4.style.minWidth = '0';

	windowbody.appendChild(document.createElement('br'));

	// Row 5
	var flex5 = windowbody.appendChild(document.createElement('div'));
	flex5.style.display = 'flex';
	// iframe
	var iframebutton5 = flex5.appendChild(document.createElement('button'));
	iframebutton5.textContent = 'Sorting';
	iframebutton5.style.flex = '3';
	iframebutton5.onclick = function() {
		sortingIframe();
	}
	// source
	var asbut5 = flex5.appendChild(document.createElement('a'));
	var sbut5 = asbut5.appendChild(document.createElement('button'));
	asbut5.href = 'https://gitlab.com/weekOldRoadkill/sorting';
	asbut5.target = '_blank';
	asbut5.style.flex = '1';
	sbut5.textContent = 'Source';
	sbut5.style.minWidth = '0';
	// direct site
	var abut5 = flex5.appendChild(document.createElement('a'));
	var but5 = abut5.appendChild(document.createElement('button'));
	abut5.href = WURL + '/sorting/';
	abut5.target = '_blank';
	abut5.style.flex = '1';
	but5.textContent = 'Site';
	but5.style.minWidth = '0';

	windowbody.appendChild(document.createElement('br'));

	// SASO
	var flex5 = windowbody.appendChild(document.createElement('div'));
	flex5.style.display = 'flex';
	// iframe
	var but5 = flex5.appendChild(document.createElement('button'));
	but5.onclick = function() {
		SaSoIframe();
	}
	but5.textContent = 'SaSo Media';
	but5.style.flex = '3';
	// site
	var abut5 = flex5.appendChild(document.createElement('a'));
	var but5 = abut5.appendChild(document.createElement('button'));
	abut5.href = WURL + '/saso-media/';
	abut5.target = '_blank';
	abut5.style.flex = '1';
	but5.textContent = 'Site';

	windowbody.appendChild(document.createElement('br'));

	var abut5 = windowbody.appendChild(document.createElement('a'));
	var but5 = abut5.appendChild(document.createElement('button'));
	abut5.href = 'https://gitlab.com/weekOldRoadkill';
	abut5.target = '_blank';
	but5.textContent = 'GitLab';


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

function SaSoIframe() {
	addWindow(simpleIframe(WURL + '/saso-media/', opts = { title: 'SaSo Media', max: false, canResize: false, height: 565 }), 0, 0);
}

function sortingIframe() {
	addWindow(simpleIframe(WURL + '/sorting/', opts = { title: 'Sorting', max: true, canResize: false, height: window.innerHeight - 36 }), 0, 0);
}

function zigzag1001(halfpage = true) {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body profile';

	var wincontainer = windowbody.appendChild(document.createElement('div'));
	wincontainer.className = 'profileImgContainer';
	var img = wincontainer.appendChild(document.createElement('img'));
	// img.src = 'https://avatars.githubusercontent.com/u/72932714?v=4';
	img.src = './img/pfp.gif';

	windowbody.appendChild(document.createElement('br'));

	var flex1 = windowbody.appendChild(document.createElement('div'));
	flex1.style.display = 'flex';
	var iframebutton1 = flex1.appendChild(document.createElement('button'));
	var abut1 = flex1.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = 'https://github.com/zigzag1001/pixelWind/tree/wasm';
	abut1.target = '_blank';
	abut1.style.flex = '1';
	but1.textContent = 'Source';
	iframebutton1.textContent = 'Pixel Wind';
	iframebutton1.style.flex = '3';
	iframebutton1.onclick = function() {
		pixelWindIframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var flex2 = windowbody.appendChild(document.createElement('div'));
	flex2.style.display = 'flex';
	var iframebutton2 = flex2.appendChild(document.createElement('button'));
	var abut2 = flex2.appendChild(document.createElement('a'));
	var but2 = abut2.appendChild(document.createElement('button'));
	abut2.href = 'https://github.com/zigzag1001/web98';
	abut2.target = '_blank';
	abut2.style.flex = '1';
	but2.textContent = 'Source';
	iframebutton2.textContent = 'This Website';
	iframebutton2.style.flex = '3';
	iframebutton2.onclick = function() {
		web98Iframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var abut1 = windowbody.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = 'https://github.com/zigzag1001';
	abut1.target = '_blank';
	but1.textContent = 'GitHub';

	var custom = createWindow({ body: windowbody, title: '👑\xa0\xa0\xa0\xa0zigzag1001' })

	if (halfpage) {
		var mx = window.innerWidth / 2;
		addWindow(custom, window.innerWidth / 2, 0, mx = mx);
	} else {
		addWindow(custom);
	}
}

function pixelWindIframe(max = true) {
	addWindow(simpleIframe('/pixelWind/index.html', opts = { title: 'pixelWind', max: max, canResize: false, height: 612, width: 1044 }), 0, 0);
}

function web98Iframe() {
	addWindow(simpleIframe('/web98/index.html', opts = { title: 'web98', max: true, canResize: false, height: 612, width: 1044 }), 0, 0);
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
	} else if (query.has('rw')) {
		randomWinodws();
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

	if (query.has('app')) {
		var app = query.get('app');
		if (app == 'pixelwind') {
			pixelWindIframe(false);
		}
	}
	var clock = document.querySelector('.clock');
	clock.innerHTML = "📅 " + new Date().toLocaleTimeString();
}
