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
	windowbody.appendChild(document.createElement('br'));

	var abut1 = windowbody.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = '/drones/';
	abut1.target = '_blank';
	but1.textContent = 'Drones';
	windowbody.appendChild(document.createElement('br'));
	windowbody.appendChild(document.createElement('br'));

	var abut2 = windowbody.appendChild(document.createElement('a'));
	var but2 = abut2.appendChild(document.createElement('button'));
	abut2.href = '/screaming-insects/';
	abut2.target = '_blank';
	but2.textContent = 'Screaming Insects';
	windowbody.appendChild(document.createElement('br'));
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
	but4.textContent = 'Gitlab';


	var custom = createWindow({ body: windowbody, title: 'WeekOldRoadkill' })
	addWindow(custom, 426, 236);
}

function zigzag1001() {
	var windowbody = document.createElement('div');
	windowbody.className = 'window-body profile';

	var wincontainer = windowbody.appendChild(document.createElement('div'));
	wincontainer.className = 'profileImgContainer';
	var img = wincontainer.appendChild(document.createElement('img'));
	// img.src = 'https://avatars.githubusercontent.com/u/72932714?v=4';
	img.src = 'https://private-user-images.githubusercontent.com/72932714/365347125-07ca5e0a-2755-4466-bc87-58645d984027.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjU2ODk4MjksIm5iZiI6MTcyNTY4OTUyOSwicGF0aCI6Ii83MjkzMjcxNC8zNjUzNDcxMjUtMDdjYTVlMGEtMjc1NS00NDY2LWJjODctNTg2NDVkOTg0MDI3LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MDclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTA3VDA2MTIwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQ1M2M3YzBiZGM1MDlmNDVkMjI3OTc0MzY4NmUwYTAyMDQ4ZGQ3YjU3MGNkYTUxMzU2YTg3YmU1NzczNTJkNmQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.rirx_mCixALHWCmBjWvNSss6s48nbegrX_szOPwsPVc';

	windowbody.appendChild(document.createElement('br'));
	windowbody.appendChild(document.createElement('br'));

	var abut1 = windowbody.appendChild(document.createElement('a'));
	var but1 = abut1.appendChild(document.createElement('button'));
	abut1.href = 'https://github.com/zigzag1001';
	abut1.target = '_blank';
	but1.textContent = 'Github';
	
	var custom = createWindow({ body: windowbody, title: 'zigzag1001' })
	addWindow(custom, 1180, 252);
}

window.onload = function() {
	weekoldroadkill();
	zigzag1001();
}
