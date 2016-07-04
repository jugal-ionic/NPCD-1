/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/

function BarsListScreen() {

	var self = this;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'bars-list-screen';
	this.name = 'Bars list page';
	this.templateId = 'bars-list-template';

	function showBarsMap(){
		// console.log('Will change page and switch to map view');
		self.scrManager.addScreen(MapPageScreen);
	}

	//Do post container creation processing
	this.processContainer = function() {

		this.events.publish(this.id + 'ContainerReady', this);

		document.getElementById("show-map").addEventListener("click", showBarsMap);


		return this.container;

	}

}

BarsListScreen.prototype = new Screen();