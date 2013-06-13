enyo.kind({
	name: "favouriteView",
	kind: "FittableRows",
	classes: "aboutView enyo-fit",
	fit: true,
	events: {
  		onStationSelected: ""
	},
	published: {
		database: ""
	},
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "My Stations"},
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{name: "message", style: "padding: 5px; font-size: 18px;", content: "No favorite Stations found. Add your favourite Stations for quick access to departure boards."},
			{name: "myStations", kind: "onyx.Groupbox", style: "padding: 5px;", components: [
			{kind: "onyx.GroupboxHeader", content: "My Stations"},
				{kind: "Repeater", classes: "enyo-list",count: 0, name: "list", onSetupItem: "getItem", components: [
					{ name: "stationRow", classes: "enyo-border-box stationRow",  ontap: "selectItem", components:[
						{name: "station", style: "padding: 3px;"}
					]}
		    	]}
			]}
		]}
	],

 	create: function(){
        this.inherited(arguments);
        this.myStationList = [];
    },


    refresh: function(inSender, inEvent) {
		this.myStationList = this.database.findFavouriteStations();
		var len = this.myStationList.length;
		this.$.list.setCount(len);
		if(len === 0) {
			this.$.message.setShowing(true);
			this.$.myStations.setShowing(false)
		} else{
			this.$.message.setShowing(false);
			this.$.myStations.setShowing(true);
		}
    	
    },

    selectItem: function(inSender, inEvent) {
    	var index = inEvent.index;
		var r = this.myStationList[index];
		if(r){
			//var line = this.database.findLineByID(r.li); // append line code to station
			// make a copy of the object to prevent enyo instances been inserted to the database copy
			// when its sent using event propagation which then create a circular reference
			this.doStationSelected({"sc": r.sc, "lc": r.lc, "sn": r.sn, "my": r.my, "li": r.li, "lc": r.lc});
		}
	},

    getItem: function(inSender, inEvent) {
    	var index = inEvent.index;
    	var item = inEvent.item;
    	var r = this.myStationList[index];
    	if(r){
    		item.$.station.setContent(r.sn);	
    		item.$.stationRow.setClassAttribute(r.lc + " enyo-border-box favouriteRow");	
    	}
    	
    	return true;
	}
 	
});