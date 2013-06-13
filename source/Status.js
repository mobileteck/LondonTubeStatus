enyo.kind({
	name: "statusView",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	events: {
  		onShowNotice: "",
  		onError: ""
	},
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "Tube Status"},
			{name: "refreshButton", kind: "onyx.IconButton", src: "assets/icon-refresh.png", ontap: "doStatus", style: "width: 32x; float: right;"}
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{kind: "onyx.Groupbox", style: "padding: 5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Tube Status"},
				{kind: "Repeater", classes: "enyo-list",count: 15, name: "list", onSetupItem: "getItem", components: [
			       {classes: "item enyo-border-box", layoutKind: "FittableRowsLayout", components: [
			        	{ kind: "FittableColumns", ontap: "selectItem",components: [
			        		{name: "line", style: "font-size: 14px; font-weight: normal; width: 125px; height: 30px; line-height: 30px; padding-right: 10px; padding-left: 2px;", allowHtml: true},
			        		{name: "status", style: "font-size: 14px; font-weight: normal; margin-left: 10px; height: 30px; line-height: 30px;"},
			        	]},
			        	{name: "drawer", kind: "onyx.Drawer", open: false, classes: "messageRow", components: [
			        		{name: "message", allowHtml: true}
	            		]}
			        ]}
		    	]}
    		]},
    		{tag: "br"}
    	]},
       	{name: "spinner", kind: "onyx.Popup", centered: true, floating: true, scrim: true, autoDismiss: false, components: [
				{kind: "onyx.Spinner"}
		]},
		{name: "nativeUtils", kind: "NativeUtils"}
	],

	create: function(){
        this.inherited(arguments);
        this.statusList = [];
        this.deal = null;
        this.selectedRow = null;
        this.dataNotLoaded = true;
        this.selectedRow = -1;
        
	    enyo.job("search", enyo.bind(this, "doStatus"), 1000);
    },

	getItem: function(inSender, inEvent) {

		//this.log("getItem");
		if(this.statusList) {

			var index = inEvent.index;
			var rowControl = inEvent.row;
			var item = inEvent.item;
			r = this.statusList[index];

			if(r) {
				//this.log(r);
		  		item.$.line.setContent(r.n);	
				item.$.line.setClassAttribute(r.c);
		  		item.$.status.setContent(r.s);	
		  		item.$.status.setClassAttribute(r.t);	
		  		item.$.message.setContent(r.m);	

		  		 if(this.selectedRow == index){
		  		 	item.$.drawer.setOpen(true);
		  		 } else{
		  		 	item.$.drawer.setOpen(false);
		  		 }
	    		return true;
	    	}
		}
		return true;
	},

	selectItem: function(inSender, inEvent) {
		this.selectedRow = inEvent.index;
		if(this.selectedRow){
			this.$.list.renderRow(this.selectedRow);
			this.$.list.build();
		}

	},

	doStatus: function(){
		var url = "http://api.tubeupdates.com/?method=get.status&lines=all&format=json&return=name,id,status,messages";
		if(mockData){
			url = "http://127.0.0.1:9009/res/services/home/file/LondonTubeStatus/mock/status.json";
		}
		
		if(this.$.nativeUtils.checkInternetConnection()){
			new enyo.Ajax({url: url}).go().response(this, "gotResults").error(this, "gotFailure");	
		} else {
			this.$.spinner.hide();
		}
        
	},

	gotResults: function(inSender, inResponse) {
		this.$.spinner.hide();
    	//this.log("gotResults");
    	this.statusList = this.parseResults(inResponse.response);
    	//this.log(this.featuredList);
    	if(this.statusList){
    		this.$.list.setCount(this.statusList.length);
   			//this.$.list.completePull();	
   			//this.$.list.build();
    		this.dataNotLoaded = false;
    		this.doShowNotice({ message: "Tube Status loaded"});
    	} else {
    		this.doError({title: 'Service Error', message: 'Looks like we are having some trouble loading Tube Status. Please try again shortly.'});
    	}
    	
    },

    parseResults: function(r){
		lines = [];
		var map = {};
        for (i = 0; i < r.lines.length; i++) {
            var a = r.lines[i];
            l = {};
            l.n = a.name;
            l.c = a.id;
            l.s = this.getStatus(a.status, a.messages);
            l.t = this.getCategory(a.status);
            l.m = a.messages.join('<hr>');

            // instead of checking status_starts, rely on the fact that results are in chronological order and by putting it to map and getting it back
            // will make sure only the latest entry is retained, thus eliminating the older entry saving the effort of parsing dates.
            // Sun, 28 Apr 2013 12:27:01 +0100
            //var statusStart = a.status_starts;
            //this.log(statusStart);
            //if(statusStart && statusStart.length > 16){
            //	var input = statusStart.substring(5,16);
            //	var parts = input.match(/(\S+)/g);
            //	var d = parts[0];
            //	var m = parts[1];
            //	var y = parts[2];
			//
            //}
            map[l.c] = l;
        }

		//this.log(map);

        for (var line in map) {
        	//this.log(line);
        	lines.push(map[line]);
        }
        
        //this.log(lines);
        return lines;
    },

    getCategory: function(s){
        if (s.indexOf("good") != -1) {
            return "good";
        }
        if (s.indexOf("minor") != -1) {
            return "minor";
        }
        
        return "problem";
        
    },
    
    getStatus: function(s, m){
        if (s.indexOf("good") != -1) {
            if (m.length > 0) {
                return "See Details";
            }
        }
        
        return s;
    },

    gotFailure: function(inSender, inResponse) {
    	this.$.spinner.hide();
		this.log("gotFailure");
		this.log(inResponse);
		if(inResponse === 0 || inResponse === ""){
			this.doError({ title: 'Service Error', message: 'Unable to load data. Please ensure you have an internet connection and try again.'});
		} else{
			this.doError({ title: 'Service Error', message: 'Looks like we are having some trouble loading Tube Status. Please try again shortly.'});				
		}
	},

	getDeal: function() {
    	return this.deal;
    }

    
});