enyo.kind({
	name: "App",
	kind: "FittableRows",
	classes: "enyo-fit dark-scene",
	fit: true,
	components:[
		{
			kind: "Panels",
			name: "pane",
			onTransitionStart: "viewSelected",
			arrangerKind: "enyo.CardSlideInArranger",
			fit: true,
			draggable: false,
			classes: "panels enyo-border-box",
			components: [
				{kind: "favouriteView", onError: "showError", onStationSelected: "loadDepartures"},
				{kind: "statusView", onError: "showError", onShowNotice: "showBanner"},
				{kind: "lineView", onError: "showError", onLineSelected: "loadStations"},
				{kind: "aboutView", onError: "showError"},
				{kind: "stationView", onError: "showError", onStationSelected: "loadDepartures"},
				{kind: "depatureView", onError: "showError"}
			]
		},
		{name: "errorDialog", kind: "onyx.Popup", modal: true, centered: true, classes: "popup", autoDismiss: false, components: [
			{ name: "errorTitle", classes: "errorDialogTitle", content: ""},
			{ name: "errorDescription", classes: "errorDialogDescription", content: ""},
			{ name: "btn", kind : "onyx.Button", content: "OK", ontap: "closePopup", classes: "onyx-negative errorDialogBtn"}
		]},
		{kind: "onyx.MoreToolbar", layoutKind: "FittableColumnsLayout", components: [
			{name: "left", tag: "span"},
			{kind: "Group", fit: true, defaultKind: "onyx.IconButton", components: [
				{ name: "favouriteIcon", src: "assets/menu-icon-favorites.png",  ontap: "favourite", active: true},
				{ src: ""},
				{ name: "statusIcon", src: "assets/menu-icon-bookmark.png", ontap: "status"},
				{ src: ""},
				{ name: "searchIcon", src: "assets/menu-icon-search.png", ontap: "search"},
				{ src: ""},
				{ name: "aboutIcon", src: "assets/menu-icon-info.png", ontap: "about"}
			]},
			{name: "right", tag: "span"}
		]},
		{name: "database", kind: "Database"},
		{kind: "enyo.Signals", ondeviceready: "deviceready"}, // for PhoneGap
		{kind: "enyo.Signals", onbackbutton: "backHandler"} // for WebOS and browser esc
	],

	deviceready: function() {
		enyo.dispatcher.listen(document, "backbutton");
		// enyo.dispatcher.listen(document, "menubutton");
		this.handleWebOSLaunch();
	},

	handleWebOSLaunch: function() {
		// If it was launched by Just-Type kick of a search
        if(enyo.platform.webos || window.PalmSystem) {
        	var launchParams = enyo.webos.launchParams();
        	this.log("LauncherParams=" + JSON.stringify(launchParams));	
        	if(launchParams && launchParams.productSearch){
        		this.log(launchParams);
        	}
        }
	},

	create: function(){
        this.inherited(arguments);

        var padding = (window.innerWidth - 330)/2;
        this.$.left.applyStyle("padding-right", padding + "px");
        this.$.right.applyStyle("padding-left", padding + "px");

        this.$.statusView.setDatabase(this.$.database);
        this.$.stationView.setDatabase(this.$.database);
        this.$.favouriteView.setDatabase(this.$.database);
        this.$.depatureView.setDatabase(this.$.database);
        this.$.lineView.setDatabase(this.$.database);
        this.$.aboutView.setDatabase(this.$.database);
		
		this.history = new Array();
		this.favourite();
        
        // initialise tips array, these will be removed after showing once.
        //this.tips = [];
        //this.tips[2] = 'Pull down the list to refresh deals'; // featured
        //this.tips[5] = 'Refine results using the menu on top'; // search

    },

	showBanner: function(inSender, banner) {
    	if((enyo.platform.webos || window.PalmSystem) && banner) {
   			navigator.notification.showBanner(banner.message);
    	}
    },

    changeView: function(viewIndex) {
 		//this.log("changeView: " + viewIndex);

 		var currentIndex = this.$.pane.getIndex();

 		if(currentIndex == viewIndex) {
 			//this.log("Current View is the requested view, nothing to do");
 			return;
 		}

 		if(typeof(viewIndex)  === "number") {
 			this.history.push(viewIndex);	
 		}
 		
    	this.$.pane.setIndex(viewIndex);

    },

    showError: function(inSender, error) {
    	//this.log(arguments);
    	//this.log("showError - " + error.title);
    	//this.log("showError - " + error.message);
		this.$.errorTitle.setContent(error.title);
		this.$.errorDescription.setContent(error.message);
		this.$.errorDialog.show();
	},

	closePopup: function() {
 		//this.log();
 		this.$.errorDialog.hide();
 	},

    backHandler: function() {
		this.log("backHandler");
		//this.log(this.history);

		//this.log(this.$.pane.getPanels());

		//var currentView = this.$.pane.getActive().getName();
		//this.log(currentView);

		//this.log(this.history);

		var currentIndex = this.history.pop();
		var previousIndex = this.history.pop();

		//this.log(previousIndex);

		if(typeof(previousIndex)  === "number") {
			this.changeView(previousIndex);	
		} 

		
		
	},

	favourite: function() {
		this.$.favouriteView.refresh();
		this.changeView(0);	
	},

	status: function() {
		this.changeView(1);
	},

	search: function() {
		this.changeView(2);	
	},

	about: function() {
		this.changeView(3);
	},

	loadStations: function() {
		this.$.stationView.setLine(this.$.lineView.getSelectedLine());
		this.changeView(4);
	},

	loadDepartures: function(inSender, station) {
		//this.log(station);
		this.$.depatureView.setStation(station);
		this.changeView(5);	
	}

	
});
