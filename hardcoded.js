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
		var currentwindow = windowbody.closest('.window');
		var x = currentwindow.getBoundingClientRect().left + parseInt(currentwindow.style.margin.substring(0, currentwindow.style.margin.length - 2));
		var y = currentwindow.getBoundingClientRect().top + parseInt(currentwindow.style.margin.substring(0, currentwindow.style.margin.length - 2));
		addWindow(div, x, y);
	}

	var custom = createWindow({ body: windowbody, title: 'Create Custom Window' })
	custom.classList.add('customwincontrol');

	addWindow(custom);
}


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
	var iframebutton = flex1.appendChild(document.createElement('button'));
	var abut1 = flex1.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = '/drones/';
	abut1.target = '_blank';
	abut1.style.flex = '1';
	but1.textContent = 'Direct';
	iframebutton.textContent = 'Drones';
	iframebutton.style.flex = '3';
	iframebutton.onclick = function() {
		dronesIframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var flex2 = windowbody.appendChild(document.createElement('div'));
	flex2.style.display = 'flex';
	var iframebutton2 = flex2.appendChild(document.createElement('button'));
	var abut2 = flex2.appendChild(document.createElement('a'));
	var but2 = abut2.appendChild(document.createElement('button'));
	abut2.href = '/screaming-insects/';
	abut2.target = '_blank';
	abut2.style.flex = '1';
	but2.textContent = 'Direct';
	iframebutton2.textContent = 'Screaming Insects';
	iframebutton2.style.flex = '3';
	iframebutton2.onclick = function() {
		screaminginsectsIframe();
	}

	windowbody.appendChild(document.createElement('br'));

	var abut3 = windowbody.appendChild(document.createElement('a'));
	var but3 = abut3.appendChild(document.createElement('button'));
	abut3.href = '/saso/';
	abut3.target = '_blank';
	but3.textContent = 'SaSo';

	windowbody.appendChild(document.createElement('br'));
	windowbody.appendChild(document.createElement('br'));

	var abut4 = windowbody.appendChild(document.createElement('a'));
	var but4 = abut4.appendChild(document.createElement('button'));
	abut4.href = 'https://gitlab.com/weekOldRoadkill';
	abut4.target = '_blank';
	but4.textContent = 'GitLab';


	var custom = createWindow({ body: windowbody, title: '🦌\xa0\xa0\xa0\xa0weekOldRoadkill' })

	// var x = Math.floor(Math.random() * (window.innerWidth / 2 - 300));
	// var y = Math.floor(Math.random() * (window.innerHeight * 0.4));
	//
	// addWindow(custom, x, y);
	addWindow(custom, 0, 0, mx = 585, my = 456);
}

function dronesIframe() {
	addWindow(simpleIframe('/drones/index.html', 'Drones', true), 0, 0, mx = 900, my = 380);
}

function screaminginsectsIframe() {
	addWindow(simpleIframe('/screaming-insects/index.html', 'Screaming Insects', true), 0, 0, mx = 900, my = 380);
}

function zigzag1001() {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body profile';

	var wincontainer = windowbody.appendChild(document.createElement('div'));
	wincontainer.className = 'profileImgContainer';
	var img = wincontainer.appendChild(document.createElement('img'));
	// img.src = 'https://avatars.githubusercontent.com/u/72932714?v=4';
	img.src = '/img/pfp.gif';

	windowbody.appendChild(document.createElement('br'));

	var abut1 = windowbody.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = 'https://github.com/zigzag1001';
	abut1.target = '_blank';
	but1.textContent = 'GitHub';

	var custom = createWindow({ body: windowbody, title: '👑\xa0\xa0\xa0\xa0zigzag1001' })

	var x = Math.floor(Math.random() * (window.innerWidth / 2 - 350) + window.innerWidth / 2);
	var y = Math.floor(Math.random() * (window.innerHeight * 0.5));

	addWindow(custom, x, y);
}


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
	}, 87);
	var clock = document.querySelector('.clock');
	clock.innerHTML = "📅 " + new Date().toLocaleTimeString();
}
