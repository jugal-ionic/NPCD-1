/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/

function ThankYouScreen() {
	var self = this;
	Screen.apply(this, Array.prototype.slice.call(arguments));

	var subscribeSection,
		subscribeBtn;
	this.id = 'thank-you-screen';
	this.name = 'Thank you page';
	this.templateId = 'thank-you-template';
	this.templateData = {
		userName: currentUser.attributes.name,
		userSubscribedNewsletter: currentUser.attributes.receiveEmails
	};
	function loadPrivacyPolicy(e){
		e.preventDefault();
		self.scrManager.addScreen(PrivacyPolicyScreen);
	}

	this.subscribeNewsletter = function(e) {

		currentUser.set('receiveEmails', true);
		currentUser.save();

		signUpNewsletter();

		subscribeSection.innerHTML = '<p>Thank you!</p>';

	};
	
	//Do post container creation processing
	this.processContainer = function() {
		subscribeSection = document.getElementById('newsletter-signup-section');

		if (subscribeSection) {
			subscribeBtn = subscribeSection.querySelector('#subscribe-newsletter-btn');
			subscribeBtn.addEventListener('click', this.subscribeNewsletter);
		}

		this.events.publish(this.id + 'ContainerReady', this);
		//document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);
		return this.container;

	};

}

ThankYouScreen.prototype = new Screen();