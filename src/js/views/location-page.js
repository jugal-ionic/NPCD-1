/*********************

Authors:
	Luis Rodrigues

Description:
	Location over class

*********************/

function LocationScreen() {

	var self = this;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'location-screen';
	this.name = 'Location';
	this.templateId = 'location-template';

	function loadAgeGatePage(e){
		e.preventDefault();
		self.scrManager.addScreen(AgeGateScreen);
	}

	function loadPrivacyPolicy(e){
		e.preventDefault();
		self.scrManager.addScreen(PrivacyPolicyScreen);
	}

	//Do post container creation processing
	this.processContainer = function() {

		this.events.publish(this.id + 'ContainerReady', this);

		document.getElementById("register-anyway-btn").addEventListener("click", loadAgeGatePage);
		document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);
		return this.container;

	}

}

LocationScreen.prototype = new Screen();