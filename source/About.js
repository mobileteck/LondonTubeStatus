enyo.kind({
	name: "aboutView",
	kind: "FittableRows",
	classes: "aboutView enyo-fit",
	fit: true,
	components: [
		{kind: "onyx.Toolbar",  layoutKind: "FittableColumnsLayout", style: "height: 50px;", components: [
			{name: "viewHeader",  style: "font-weight: bold;", content: "About"},
		]},
		{kind: "Scroller", name: "scroller",  classes: "enyo-scroller", style: "margin: 5px;", thumb: false, fit: true, touch: true, horizontal: "hidden", components: [
			{tag: "br"},
			{kind: "onyx.Groupbox",classes: "inputGroup", components: [
				{kind: "onyx.GroupboxHeader", content: "Support"},
				{ kind: "onyx.InputDecorator", align: "center", ontap: "doEmail", components:[
					{ kind: "onyx.IconButton", src: "assets/application-email.png", style: "margin-right: 10px;",  align: "left"},
					{ content: "feedback@mobileteck.com"}
				]},
				{ kind: "onyx.InputDecorator", align: "center", ontap: "doWebsite", components:[
					{ kind: "onyx.IconButton", src: "assets/browser-32x32.png", style: "margin-right: 10px;",  align: "left"},
					{ content: "Mobileteck Inc"}
				]},
				{ kind: "onyx.InputDecorator", align: "center", ontap: "doFaceBook", components:[
					{ kind: "onyx.IconButton", src: "assets/facebook-32x32.png", style: "margin-right: 10px;",  align: "left"},
					{ content: "Mobileteck"}
				]},
				{ kind: "onyx.InputDecorator", align: "center", ontap: "doTwitter", components:[
					{ kind: "onyx.IconButton", src: "assets/twitter-icon.png", style: "margin-right: 10px;",  align: "left"},
					{ content: "@Mobileteck"}
				]},
				{ kind: "onyx.InputDecorator", align: "center", ontap: "doYouTube", components:[
					{ kind: "onyx.IconButton", src: "assets/you-tube-icon.png", style: "margin-right: 10px;",  align: "left"},
					{ content: "Mobileteck"}
				]}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", classes: "inputGroup", components: [
				{kind: "onyx.GroupboxHeader", content: "Important Notices"},
				{allowHtml: true, classes: "helpText", content: "Tube Status Feeds are provided by <a href='http://tubeupdates.com', target='external'>TubeUpdates.com<a/>. If you find this app useful, please consider <a href='http://tubeupdates.com/donate' target='external'>donating</a> to TubeUpdates.com, so they can keep the service running."}
			]},
			{name: "version", allowHtml: true, style: "font-size: 14px; font-weight: normal; margin: 5px"},
			{name: "copyright", allowHtml: true, style: "font-size: 14px; font-weight: normal; margin: 5px"},
		]}
	],

 	create: function(){
        this.inherited(arguments);
        this.$.version.setContent("London Tube Status v1.0.2");
		this.$.copyright.setContent("&copy; Copyright " + new Date().getFullYear() + " Mobileteck.com");
    },

    doWebsite: function() {
   		window.open('http://www.mobileteck.com','external');	
    },

    doFaceBook: function() {
   		window.open('http://www.facebook.com/mobileteck','external');	
    },

    doTwitter: function() {
   		window.open('https://twitter.com/mobileteck','external');	
    },

    doYouTube: function() {
   		window.open('http://www.youtube.com/user/mobileteckCom','external');	
    },
    

    doEmail: function() {
   		 window.location.replace('mailto:feedback@mobileteck.com?subject=London Tube Status Feedback');	
    },

	doDonate: function() {
   		window.open('http://tubeupdates.com/donate','external');	
    }
    

 	
});