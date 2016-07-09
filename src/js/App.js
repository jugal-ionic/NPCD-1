/*********************

Authors:
	Luis Rodrigues

Description:
	Main application script

*********************/

var parseIds = {
		
		"npcd2016dd.parseapp.com":{
			appId: 'RiEFoQ055cNLaajQ1k55wr5M7vBGmQkc29a7Oc22',
			jsKey: 'hV7qz0gYIDV1CXddhwOs7rMdahnduQodfpNLBnSz'
		},
		"127.0.0.1":{
			appId: 'RiEFoQ055cNLaajQ1k55wr5M7vBGmQkc29a7Oc22',
			jsKey: 'hV7qz0gYIDV1CXddhwOs7rMdahnduQodfpNLBnSz'
		}
		,
		"192.168.10.100":{
			appId: 'RiEFoQ055cNLaajQ1k55wr5M7vBGmQkc29a7Oc22',
			jsKey: 'hV7qz0gYIDV1CXddhwOs7rMdahnduQodfpNLBnSz'
		}	
	},
	parseId = {
		appId: '',
		jsKey: ''
	}; // default (invalid host)                

if(!parseIds[window.location.host.replace('/', '')]) {
	console.error('Parse ID error: Host not valid (no Parse id defined).');
} else {
	parseId = parseIds[window.location.host.replace('/', '')];
}

Parse.initialize(parseId['appId'], parseId['jsKey']);

window.getCookie = function(name) {
	
	var name = name;
	match = document.cookie.match(new RegExp(name + '=([^;]+)'));
	if (match) return match[1];

};

function setCookie(){

	var cssString = "margin-top: 0px; transition: all 0.2s ease-in;";

	document.getElementById('app').style.cssText = cssString;

	document.getElementById('cookieWrap').style.display = "none";
    document.cookie = "MalibuNpcdCookie2016 = accepted";

}

function hideErrorWrapper(){
	var errorWrapper = document.getElementById('error-overlay');
	errorWrapper.style.display = 'none';
}

function App() {

	var screenMngr;

	this.destroy = function() {

		if (screenMngr) {
			screenMngr.destroy();
		}

		window.removeEventListener('unload', this.destroy);

	};

	this.checkCookie = function(){
		
		var cookie = window.getCookie("MalibuNpcdCookie2016");

	    if (cookie == "accepted") {
	        document.getElementById('cookieWrap').style.display = "none";
	    } else {
	    	document.getElementById('cookieWrap').style.display = "block";
	    }

	};

	this.init = function() {

		screenMngr = new ScreenManager();
		document.getElementById("cookie-alert").addEventListener("click", setCookie);
		document.getElementById("close-btn").addEventListener("click", hideErrorWrapper);
		
	};

	this.checkCookie();
	this.init();

}

function welcomeNewUser() {


	var formData = getUserCrmData();

	function getUserCrmData() {

		var userData = {
				email: currentUser.attributes.email,
			},
			keyValuePairs = [],
			i;

		for (i in userData) {
			if (userData.hasOwnProperty(i)) {
				keyValuePairs.push(encodeURIComponent(i) + '=' + encodeURIComponent(userData[i]));
			}
		}

		return keyValuePairs.join('&');

	}

	function emailTriggerResponse(e) {

		var target = e.target,
			response;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {

			response = JSON.parse(target.responseText);

			if (response.success) {
				console.log(response);
			} else {
				console.error(response);
			}

		} else {
			console.error('Error submitting form.', target.responseText);
		}

	}

	 var emailTriggerRequest = new XMLHttpRequest();
	 emailTriggerRequest.onreadystatechange = emailTriggerResponse;
	 emailTriggerRequest.open('POST', '/subscribe-exactTarget', true);
	 emailTriggerRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	 emailTriggerRequest.send(formData);

}

function signUpNewsletter() {

	if (window.location.host !== 'www.pinacoladaday.co.uk') {
		return;
	}

	var newsletterRequest,
		formData = getUserCrmData();
		console.log(formData);
	function getUserCrmData() {

		var userData = {
				email: currentUser.attributes.email,
				name: currentUser.attributes.name,
				dobDay: currentUser.attributes.birthday.getDate(),
				dobMonth: currentUser.attributes.birthday.getMonth() + 1,
				dobYear: currentUser.attributes.birthday.getFullYear(),
				postCode: currentUser.attributes.postcode || '',
				optIn: (currentUser.attributes.receiveEmails ?true : false)
			},
			keyValuePairs = [],
			i;

		for (i in userData) {
			if (userData.hasOwnProperty(i)) {
				keyValuePairs.push(encodeURIComponent(i) + '=' + encodeURIComponent(userData[i]));
			}
		}

		return keyValuePairs.join('&');

	}

	function signupResponse(e) {

		var target = e.target,
			response;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {

			response = JSON.parse(target.responseText);

			if (response.success) {
				console.log(response);
			} else {
				console.error(response);
			}

		} else {
			console.error('Error submitting form.', target.responseText);
		}

	}

	newsletterRequest = new XMLHttpRequest();
	newsletterRequest.onreadystatechange = signupResponse;
	newsletterRequest.open('POST', '/subscribe-exactTarget', true);
	newsletterRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	newsletterRequest.send(formData);

}

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
	// do something when device orientation changes
	var appContainer = document.getElementById(app),
		scrollableContainer = document.getElementsByClassName('scrollable')[0],
		fullHeight = window.innerHeight;
	
	appContainer.style.height = fullHeight;
	scrollableContainer.style.height = fullHeight;

}, false);

var currentUser,
	app = new App();