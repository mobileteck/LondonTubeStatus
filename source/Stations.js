enyo.kind({
	name: "stationView",
	kind: "FittableRows",
	classes: "aboutView enyo-fit",
	fit: true,
	events: {
  		onBack: "",
  		onError: "",
  		onStationSelected: ""
	},
	published: {
		selectedStation: "",
		database: ""
	},
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "Station"},
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{kind: "onyx.Groupbox", style: "padding: 5px;", components: [
				{kind: "onyx.GroupboxHeader", name: "lineHeader", content: ""},
				{
					kind: "SearchInput",
					placeholder: "Search Station", 
					name: "stationFilter", 
					onInputChanged: "filterInputChange",
					onInputClear: "resetFilter"
				},	
				{kind: "Repeater", classes: "enyo-list",count: 0, name: "list", onSetupItem: "getItem", components: [
					{ name: "stationRow", classes: "enyo-border-box stationRow",  ontap: "selectItem", components:[
						{name: "station", style: "padding: 3px;"}
					]}
		    	]}
    		]},
		]}
	],

 	create: function(){
        this.inherited(arguments);
        this.line = null;
        this.$.stationFilter.resize(window.innerWidth-10);
    },

    setLine: function(line){
    	this.line = line;
    	this.$.lineHeader.setContent(line.ln + " Line");
    	this.stationList = this.database.findStationsForLine(line);
    	//this.log(this.stationList);
    	this.stationFilteredList = this.stationList;
    	this.$.list.setCount(this.stationList.length);
    	
    },


    getItem: function(inSender, inEvent) {
    	if(this.stationFilteredList){
    		var index = inEvent.index;
    		var item = inEvent.item;
    		var r = this.stationFilteredList[index];
    		if(r){
    			item.$.station.setContent(r.sn);	
    			//item.$.stationRow.setClassAttribute(r.lc + " lineRow");	
    		}
		}
		return true;
    	
	},

	selectItem: function(inSender, inEvent) {
    	var index = inEvent.index;
		var r = this.stationFilteredList[index];
		if(r){
			// make a copy of the object to prevent enyo instances been inserted to the database copy
			// when its sent using event propagation which then create a circular reference
			this.doStationSelected({"sc": r.sc, "lc": r.lc, "sn": r.sn, "my": r.my, "li": r.li, "lc": this.line.slc});
		}
	},

	filterInputChange: function(inSender, inEvent) {
        enyo.job("filterChange", enyo.bind(this, "filterChange"), 400);
    },
    
    filterChange: function() {
		var filterString = this.$.stationFilter.getValue();
		if(filterString) {
			var subset = [];
			var listItems = this.stationList;
			filterString = filterString.toLowerCase();	
			var i = 0;
			while(i < listItems.length) {
				if(listItems[i].sn.toLowerCase().indexOf(filterString) >= 0) {
					subset.push(listItems[i]);
				}		
				i++;
			}
			this.stationFilteredList = subset;
			this.$.list.setCount(this.stationFilteredList.length);
			this.$.list.build();
		} else{
			this.resetFilter();
		}
		
	},

	resetFilter: function(inSender, inEvent) {
		this.stationFilteredList = this.stationList;
		this.$.list.setCount(this.stationFilteredList.length);
        this.$.list.build();
    }

	

 	
});