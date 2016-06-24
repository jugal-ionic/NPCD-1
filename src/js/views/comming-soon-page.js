/*********************

Authors:
	Luis Rodrigues

Description:
	CommingSoonScreen over class

*********************/

function CommingSoonScreen() {

	var self = this;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'comming-soon-screen';
	this.name = 'CommingSoon';
	this.templateId = 'comming-soon-template';

	function loadPrivacyPolicy(e){
		e.preventDefault();
		self.scrManager.addScreen(PrivacyPolicyScreen);
	}

	//Do post container creation processing
	this.processContainer = function() {

		this.events.publish(this.id + 'ContainerReady', this);

		//document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);

		return this.container;

	}

}

CommingSoonScreen.prototype = new Screen();