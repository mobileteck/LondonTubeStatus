enyo.kind({
	name: "searchView",
	kind: "FittableRows",
	classes: "aboutView enyo-fit",
	fit: true,
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "Search"},
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{kind: "onyx.Groupbox", style: "padding: 5px;", components: [
			{kind: "onyx.GroupboxHeader", content: "Tube Lines"},
			{kind: "Repeater", classes: "enyo-list",count: 11, name: "list", onSetupItem: "getItem", components: [
				{ name: "lineRow", components:[
					{name: "line", style: "padding: 3px;"}
				]}
	    	]}
    	]},
		]}
	],

 	create: function(){
        this.inherited(arguments);
    },


    getItem: function(inSender, inEvent) {
    	var index = inEvent.index;
    	var item = inEvent.item;
    	var r = this.lineData[index];
    	if(r){
    		item.$.line.setContent(r.ln);	
    		item.$.lineRow.setClassAttribute(r.lc + " lineRow");	
    	}
    	
    	return true;
	},

	lineData : [{
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "0",
		"lc" : "bakerloo",
		"ln" : "Bakerloo"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "1",
		"lc" : "central",
		"ln" : "Central"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "2",
		"lc" : "circle",
		"ln" : "Circle"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "3",
		"lc" : "district",
		"ln" : "District"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "4",
		"lc" : "hammersmith",
		"ln" : "H'Smith & City"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "5",
		"lc" : "jubilee",
		"ln" : "Jubilee"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "6",
		"lc" : "metropolitan",
		"ln" : "Metropolitan"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "7",
		"lc" : "northern",
		"ln" : "Northern"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "8",
		"lc" : "piccadilly",
		"ln" : "Piccadilly"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "9",
		"lc" : "victoria",
		"ln" : "Victoria"
	}, {
		_kind : "com.mobileteck.thetube.lines:1",
		"li" : "10",
		"lc" : "waterlooandcity",
		"ln" : "W'loo & City"
	}]

 	
});