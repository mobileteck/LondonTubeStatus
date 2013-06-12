enyo.kind({
	name: "depatureView",
	kind: "FittableRows",
	classes: "aboutView enyo-fit",
	fit: true,
	events: {
  		onError: ""
	},
	published: {
		database: ""
	},
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "Departures"},
		]},
		{name: "spinner", kind: "onyx.Popup", centered: true, floating: true, scrim: true, autoDismiss: false, components: [
				{kind: "onyx.Spinner"}
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{kind: "onyx.Groupbox", style: "padding: 5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Departures"},
				{kind: "Repeater", classes: "enyo-list",count: 0, name: "list", onSetupItem: "getItem", components: [
					{ name: "departureRow", components:[
						{name: "platform", classes: "platformDivider"},
						{ layoutKind: "FittableColumnsLayout", components: [
							{name: "destination", style: "padding: 3px;"},
							{name: "time", style: "padding: 3px; float: right;"}
						]}
						
					]}
		    	]}
    		]},
    		{tag: "br"},
    		{kind: "onyx.InputDecorator", name: "addToMyStation", style: "padding: 5px;", layoutKind: "FittableColumnsLayout", components: [
				{kind: "Control", content: "Add to My Stations", fit: true},
				{kind: "onyx.ToggleButton", name: "favouriteToggle", onChange: "favouriteToggleChanged"}
			]}
		]},
		{name: "nativeUtils", kind: "NativeUtils"}
	],

 	create: function(){
        this.inherited(arguments);
        this.$.addToMyStation.applyStyle("width", (window.innerWidth - 15) + "px");
    },

    setStation: function(station){
    	this.init = false;
    	this.station = station;
    	this.$.viewHeader.setContent(this.station.sn);
    	this.$.favouriteToggle.setValue(this.station.my);
    	

    	this.departureList = [];
    	this.$.list.setCount(0);

    	this.getDepartures();
    	this.init = true;

    },

    getDepartures: function(){
    	this.$.spinner.show();
    	var query = "line=" + this.station.lc + "&mode=tube&station=" + this.station.sc;
    	// line=bakerloo&mode=tube&station=CHX
		var url = "http://www.tfl.gov.uk/tfl/livetravelnews/departure-boards/departureboards.aspx?" + query;
		if(mockData) {
			url = "http://127.0.0.1:9009/res/services/home/file/LondonTubeStatus/mock/departureboards.html?" + query;
		}
		
		if(this.$.nativeUtils.checkInternetConnection()){
			new enyo.Ajax({url: url, handleAs: "text"}).go().response(this, "gotResults").error(this, "gotFailure");	
		} else {
			this.$.spinner.hide();
		}
        
	},

	gotResults: function(inSender, inResponse) {
		this.$.spinner.hide();
    	//this.log("gotResults");
    	var myDiv = window.document.createElement("div");
		myDiv.innerHTML = inResponse;
    	this.departureList = this.parseResults(myDiv);

    	//this.log(this.featuredList);
    	if(this.departureList){
    		this.$.list.setCount(this.departureList.length);
    		this.$.list.build();
    	} else {
    		this.doError({title: 'Service Error', message: 'Looks like we are having some trouble loading data. Please try again shortly.'});
    	}
    	
    },

    parseResults: function(xml){

		var x = xml.querySelectorAll("table.board");
		var departures = [];
		if(x.length > 0) {

			for(var i = 0; i < x.length; i++) {
				var a = x[i];
				var z = null;
				var p = null;

				// direction
				var zNodes = a.querySelectorAll("caption > span:nth-child(1)");
				if(zNodes.length > 0) {
					z = this.cleanString(zNodes[0].innerText);	
				}

				// platform
				var pNodes = a.querySelectorAll("caption > span:nth-child(2)");
				if(pNodes.length > 0) {
					p = this.cleanString(pNodes[0].innerText);	
				}

				var d = a.querySelectorAll("tr > td.destination");
				//var m = a.select("tr > td.message");
				var t = a.querySelectorAll("tr > td.time");
				
				for(var j = 0; j < d.length; j++) {

					var dest = "";
					if(d[j]) {
						dest = this.cleanString(d[j].innerText);
					}

					var time = "";
					if(t[j]) {
						time = this.cleanString(t[j].innerText);
					}

					departures.push({
						z : z,
						p : p,
						d : dest,
						t : time
					});
				}
			}

		} else {
			departures.push({
				m : "No Departure Information found"
			});
			this.log("No Departure Information found");
		}
		//this.log(JSON.stringify(departures));
		return departures;
    },

    gotFailure: function(inSender, inResponse) {
    	this.$.spinner.hide();
		this.log("gotFailure");
		//this.log(inResponse);
		if(inResponse === 0 || inResponse === ""){
			this.doError({ title: 'Service Error', message: 'Unable to load data. Please ensure you have an internet connection and try again.'});
		} else{
			this.doError({ title: 'Service Error', message: 'Looks like we are having some trouble loading data. Please try again shortly.'});				
		}
	},


	cleanString: function(a) {
		return a.replace(/\t/g, "").replace(/^\s+|\s+$/g, '');
	},
    

    getItem: function(inSender, inEvent) {
    	var index = inEvent.index;
    	var item = inEvent.item;
    	var r = this.departureList[index];
    	if(r){
    		item.$.platform.setContent(r.z + " " + r.p);	
    		item.$.platform.setShowing(this.getDivider(inEvent.index, r));
    		item.$.destination.setContent(r.d);	
    		item.$.time.setContent(r.t);	
    	}
    	
    	return true;
	},

	getDivider: function(inIndex, currentItem) {
		if(inIndex === 0) {
			return true;
		}
	
		if(inIndex > 0) {
			var previousItem = this.departureList[inIndex-1];
			if(previousItem && previousItem.p === currentItem.p) {
				return false;
			}
		}
	
		return true;	
	},


	favouriteToggleChanged: function(inSender, inEvent) {
		if(this.init){
			this.log("setting favourite :" + this.$.favouriteToggle.getValue());
			this.database.setFavourite(this.station,this.$.favouriteToggle.getValue());		
		}
		
	}
	
 	
});
