/*********************

Authors:
	Luis Rodrigues

Description:
	Start screen class

*********************/

function StartScreen() {

	var self = this,
		endDate = new Date(2016, 6, 12, 0, 0, 0, 0),
		now = new Date(),
		contentLoadedCheck,
		cssLoaded = false,
		greenBackground,
		whiteBackground,
		headerBackground,
		progressContainer,
		loggedIn = false,
		sessionExpired = false,
		isAllow = false,
		geoCoder = new google.maps.Geocoder(),
		errorMessage = document.getElementById('dateErrorMessage'),
		errorWrapper = document.getElementById('error-overlay'),
		isReceivingData = false;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'start-screen';
	this.name = 'Loading';
	this.templateId = 'start-template';
	this.transition = false;

	// CACHE geolocation -- I suppose it's a good thing to do it here as later it takes way too much time...(on the map page)
	function getUserLocation() {
		if (navigator.geolocation) 
			{
				navigator.geolocation.getCurrentPosition(callbackPosition, errorPositionCallBack, {timeout:10000});
			}
	}

	function showRestrictedResults(isAllow) {

		//errorMessage.textContent = 'You are restricted search from '+uk_only;
		//errorWrapper.style.display = 'block';
		//localStorage.setItem("uk_only", false);
		//isReceivingData = false;
		//isAllow=true;
		if(isAllow)
			{
				return self.scrManager.addScreen(AgeGateScreen);
			}
			else
			{
				return self.scrManager.addScreen(LocationScreen);
			}
	}

	function callbackPosition(position) {
		localStorage.setItem("uk_only", true);
		//console.log(position);
		var latitude = position.coords.latitude,
			longitude = position.coords.longitude;  
		var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
		if (navigator.geolocation) 
			{
			  geoCoder.geocode({'location': latlng}, 
			  	function(results, status) {
			  		if (status === google.maps.GeocoderStatus.OK) {
				  		console.log(results);
				  		var addr=results[0].address_components;
						var add_length=addr.length;

						for (var i = addr.length - 1; i >= 0; i--) {
							var uk_only=addr[i].short_name;
							console.log(uk_only);
							if(uk_only=='England' || uk_only=='Wales' || uk_only=='GB')
							{
								isAllow = true;
							}
						}
						//isAllow = true;
						showRestrictedResults(isAllow);
						console.log(isAllow);
					}
				});
			}
		else 
			{
            	window.alert('Geocoder failed due to: ' + status);
          	}
		window.UsersLat = latitude;
		window.UsersLng = longitude;
		window.UsersLatLng = [latitude, longitude];

		localStorage.setItem("usersLocation", JSON.stringify(UsersLatLng));

	}

	function errorPositionCallBack(){
		//alert("Please enable geolocation on your device");
	}

	function updateProgress(loaded, total) {

	}

	function checkLoadedAssets() {

		var loadedAssets = 1,
			totalAssets = 7;

		if (currentUser) {
			totalAssets = 8;
		}

		if (currentUser && loggedIn) {
			loadedAssets += 1;
		}

		//Check if Facebook SDK is loaded
		//Only needed if a user is not logged in
		if (typeof FB !== 'undefined') {
			loadedAssets += 1;
		}

		//Check if Google Maps is loaded
		if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
			loadedAssets += 1;
		}

		//Check if the CSS is loaded
		if (cssLoaded) {
			loadedAssets += 1;
		}

		//Check if the green background is loaded
		if (greenBackground.complete) {
			loadedAssets += 1;
		}

		//Check if the white background is loaded
		if (whiteBackground.complete) {
			loadedAssets += 1;
		}

		//Check if the header background is loaded
		if (headerBackground.complete) {
			loadedAssets += 1;
		}

		progressContainer.style.width = Math.round((loadedAssets / totalAssets) * 100) + '%';

		if (loadedAssets < totalAssets) {
			return false;
		}

		clearInterval(contentLoadedCheck);

		self.routeUser();

	}

	self.routeUser = function() {

		if (now >= endDate) {
			return self.scrManager.addScreen(PromotionOverScreen, {standalone: true}, true);
		}

		if (window.location.pathname === '/bars') {
			return self.scrManager.addScreen(MapPageScreen, {standalone: true}, true);
		}

		if (window.location.pathname === '/privacy-policy') {
			return self.scrManager.addScreen(PrivacyPolicyScreen, {standalone: true}, true);
		}
		
		if (loggedIn && !sessionExpired && currentUser.attributes.drinkRedeemed) {
			return self.scrManager.addScreen(ThankYouScreen);
		} else if (loggedIn && !sessionExpired) {
			return self.scrManager.addScreen(HomePageScreen);
		} else {
			currentUser = new Parse.User();
			getUserLocation();
		}

	};

	//Do post container creation processing
	self.processContainer = function() {

		currentUser = Parse.User.current();

		if (currentUser) {
			Parse.User.logIn(currentUser.attributes.email, currentUser.attributes.name, {
				success: function(user) {
					currentUser = user;
					loggedIn = true;
					sessionExpired = false;
					welcomeNewUser();
				},
				error: function(user, error) {
					Parse.User.logOut();
					loggedIn = true;
					sessionExpired = true;
					console.warn(user, error);
				}
			});
		}

		self.events.publish(self.id + 'ContainerReady', self);

		progressContainer = document.getElementById('progress-container');
		progressContainer.style.width = '0%';

		//getUserLocation();

		greenBackground = new Image();
		greenBackground.src = '/assets/img/backgrounds/mobile-footer-wrap-bg.png';

		whiteBackground = new Image();
		whiteBackground.src = '/assets/img/backgrounds/mobile-body-bg.png';

		headerBackground = new Image();
		headerBackground.src = '/assets/img/backgrounds/mobile-header-bg.png';

		self.cssRequest = new XMLHttpRequest();

		self.cssRequest.onreadystatechange = function(e) {
			self.processLoadedCSS.call(self, e);
		};

		self.cssRequest.open('GET', '/assets/css/main.css');
		self.cssRequest.send();

		contentLoadedCheck = setInterval(checkLoadedAssets, 100);

		return self.container;

	};

	self.processLoadedCSS = function(e) {

		var target = e.target;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {
			document.getElementById('mainStylesheet').innerHTML = target.responseText;
			cssLoaded = true;
		}

		return;

	};

}

StartScreen.prototype = new Screen();