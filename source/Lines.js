enyo.kind({
	name: "lineView",
	kind: "FittableRows",
	classes: "aboutView enyo-fit",
	fit: true,
	events: {
  		onBack: "",
  		onError: "",
  		onLineSelected: ""
	},
	published: {
		selectedLine: "",
		database: ""
	},
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "Lines"},
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{kind: "onyx.Groupbox", style: "padding: 5px;", components: [
			{kind: "onyx.GroupboxHeader", content: "Tube Lines"},
			{kind: "Repeater", classes: "enyo-list",count: 0, name: "list", onSetupItem: "getItem", components: [
				{ name: "lineRow", ontap: "selectItem", components:[
					{name: "line", style: "padding: 3px;"}
				]}
	    	]}
    	]},
		]}
	],

 	create: function(){
        this.inherited(arguments);
    },

    setDatabase: function(database){
    	this.database = database;
    	this.$.list.setCount(database.getLineCount());
    },

    selectItem: function(inSender, inEvent) {
    	var index = inEvent.index;
		var r = this.database.findLineByIndex(index);
		if(r){
			//this.log("Selected Line=" + r.li);
			this.selectedLine = r;
			this.doLineSelected();
		}
	},

    getItem: function(inSender, inEvent) {
    	var index = inEvent.index;
    	var item = inEvent.item;
    	var r = this.database.findLineByIndex(index);
    	if(r){
    		item.$.line.setContent(r.ln);	
    		item.$.lineRow.setClassAttribute(r.lc + " lineRow");	
    	}
    	
    	return true;
	}

	

 	
});