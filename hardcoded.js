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
		var currentwindow = windowbody.closest('.window');
		var x = parseInt(currentwindow.style.left);
		var y = parseInt(currentwindow.style.top);
		removeWindow(windowbody.closest('.window'));
		var div = createWindow({
			title: in_winname.value,
			body: simplebody(in_winbody.value)
		});
		div.classList.add('customwin');
		addWindow(div, x, y);
	}

	var custom = createWindow({ body: windowbody, title: 'Create Custom Window' })
	custom.classList.add('customwincontrol');

	addWindow(custom);
}


const WURL = 'https://weekoldroadkill.com'


function weekoldroadkill() {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body profile';

	var wincontainer = windowbody.appendChild(document.createElement('div'));
	wincontainer.className = 'profileImgContainer';
	var img = wincontainer.appendChild(document.createElement('img'));
	img.src = 'https://gitlab.com/uploads/-/system/user/avatar/10934353/avatar.png?width=800';

	windowbody.appendChild(document.createElement('br'));

	var flex1 = windowbody.appendChild(document.createElement('div'));
	flex1.style.display = 'flex';
	var iframebutton1 = flex1.appendChild(document.createElement('button'));
	var abut1 = flex1.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = WURL + '/base-converter/';
	abut1.target = '_blank';
	abut1.style.flex = '1';
	but1.textContent = 'Direct';
	iframebutton1.textContent = 'Base Converter';
	iframebutton1.style.flex = '3';
	iframebutton1.onclick = function() {
		baseConverterIframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var flex2 = windowbody.appendChild(document.createElement('div'));
	flex2.style.display = 'flex';
	var iframebutton2 = flex2.appendChild(document.createElement('button'));
	var abut2 = flex2.appendChild(document.createElement('a'));
	var but2 = abut2.appendChild(document.createElement('button'));
	abut2.href = WURL + '/screaming-insects/';
	abut2.target = '_blank';
	abut2.style.flex = '1';
	but2.textContent = 'Direct';
	iframebutton2.textContent = 'Screaming Insects';
	iframebutton2.style.flex = '3';
	iframebutton2.onclick = function() {
		screaminginsectsIframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var flex3 = windowbody.appendChild(document.createElement('div'));
	flex3.style.display = 'flex';
	var iframebutton3 = flex3.appendChild(document.createElement('button'));
	var abut3 = flex3.appendChild(document.createElement('a'));
	var but3 = abut3.appendChild(document.createElement('button'));
	abut3.href = WURL + '/traveling-salesman/';
	abut3.target = '_blank';
	abut3.style.flex = '1';
	but3.textContent = 'Direct';
	iframebutton3.textContent = 'Traveling Salesman';
	iframebutton3.style.flex = '3';
	iframebutton3.onclick = function() {
		travelingsalesmanIframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var but3 = windowbody.appendChild(document.createElement('button'));
	but3.onclick = function() {
		SaSoIframe();
	}
	but3.textContent = 'SaSo';

	windowbody.appendChild(document.createElement('br'));
	windowbody.appendChild(document.createElement('br'));

	var abut4 = windowbody.appendChild(document.createElement('a'));
	var but4 = abut4.appendChild(document.createElement('button'));
	abut4.href = 'https://gitlab.com/weekOldRoadkill';
	abut4.target = '_blank';
	but4.textContent = 'GitLab';


	var custom = createWindow({ body: windowbody, title: '🦌\xa0\xa0\xa0\xa0weekOldRoadkill' })

	var mx = window.innerWidth / 2;
	addWindow(custom, 0, 0, mx = mx);
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

function SaSoIframe() {
	addWindow(simpleIframe('/saso/', opts = { title: 'SaSo', max: false, canResize: false, height: 565 }), 0, 0);
}

function zigzag1001() {
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
	iframebutton1.textContent = 'pixelWind';
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
	but2.textContent = 'web98';
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

	var mx = window.innerWidth / 2;

	addWindow(custom, window.innerWidth / 2, 0, mx = mx);
}

function pixelWindIframe() {
	addWindow(simpleIframe('/pixelWind/index.html', opts = { title: 'pixelWind', max: true, canResize: false, height: 612, width: 1044 }), 0, 0);
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
	numprofiles = 30;
	// numprofiles = 2;
	i = 0;
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
	var clock = document.querySelector('.clock');
	clock.innerHTML = "📅 " + new Date().toLocaleTimeString();
}
