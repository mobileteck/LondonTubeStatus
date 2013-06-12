enyo.kind({
    name: "Database",
    kind: "enyo.Component",
    handlers: {
    },
    published: {
    },
    events: {
    },
    
    create: function() {
        this.inherited(arguments);
        this.log("create");
        var myStationsString = localStorage.getItem("myStations");

        if(myStationsString) {
            this.myStations = JSON.parse(myStationsString); 
        } else{
            this.log("Initial Loading of Station DB");
            this.myStations = this.stationData;
            localStorage.setItem("myStations", JSON.stringify(this.myStations));    
        }

    },

    findFavouriteStations: function() {
        var stationDataLength = this.myStations.length;
        var myStationList = [];        
        for(var i=0; i<stationDataLength; i++) {
            var station = this.myStations[i];
            if(station.my) {
                var line = this.findLineByID(station.li); 
                var stationCopy = JSON.parse(JSON.stringify(station));
                stationCopy.lc = line.lc;
                myStationList.push(stationCopy);
            }
        }
        return myStationList;
    },


    findStationsForLine: function(line) {
        var stationList =  [];
        var numberOfStations = this.myStations.length;
        for(var i=0; i<numberOfStations; i++) {
            var station = this.myStations[i];
            if(station.li == line.li){
                stationList.push(station);
            }
            
        }
        return stationList;
    },

    setFavourite: function(myStation,isFavourite) {
        var stationDataLength = this.myStations.length;
        for(var i=0; i<stationDataLength; i++) {
           var station = this.myStations[i];
           if(station.sc==myStation.sc && station.li==myStation.li) {
               station.my=isFavourite;
           }
        }
        
        localStorage.setItem("myStations", JSON.stringify(this.myStations));    
    },

    getLineCount: function(){
        return this.lineData.length;
    },

    findLineByIndex: function(index){
        return this.lineData[index];
    },

    findLineByID: function(LineID){
        var lineDataLength = this.lineData.length;
        for(var i=0; i<lineDataLength; i++) {
            var line = this.lineData[i];
            if(line.li==LineID) {
                return line;
            }
        }
        return null;
    },

    lineData : [{
        "li" : "0",
        "lc" : "bakerloo",
        "ln" : "Bakerloo"
    }, {
        "li" : "1",
        "lc" : "central",
        "ln" : "Central"
    }, {
        "li" : "2",
        "lc" : "circle",
        "ln" : "Circle"
    }, {
        "li" : "3",
        "lc" : "district",
        "ln" : "District"
    }, {
        "li" : "4",
        "lc" : "hammersmith",
        "ln" : "H'Smith & City"
    }, {
        "li" : "5",
        "lc" : "jubilee",
        "ln" : "Jubilee"
    }, {
        "li" : "6",
        "lc" : "metropolitan",
        "ln" : "Metropolitan"
    }, {
        "li" : "7",
        "lc" : "northern",
        "ln" : "Northern"
    }, {
        "li" : "8",
        "lc" : "piccadilly",
        "ln" : "Piccadilly"
    }, {
        "li" : "9",
        "lc" : "victoria",
        "ln" : "Victoria"
    }, {
        "li" : "10",
        "lc" : "waterlooandcity",
        "ln" : "W'loo & City"
    }],

    
    stationData : [{
        "li" : "0",
        "sc" : "BST",
        "sn" : "Baker Street"
    }, {
        "li" : "0",
        "sc" : "CHX",
        "sn" : "Charing Cross"
    }, {
        "li" : "0",
        "sc" : "ERB",
        "sn" : "Edgware Road"
    }, {
        "li" : "0",
        "sc" : "ELE",
        "sn" : "Elephant & Castle"
    }, {
        "li" : "0",
        "sc" : "EMB",
        "sn" : "Embankment"
    }, {
        "li" : "0",
        "sc" : "HSD",
        "sn" : "Harlesden"
    }, {
        "li" : "0",
        "sc" : "HAW",
        "sn" : "Harrow & Wealdstone"
    }, {
        "li" : "0",
        "sc" : "KGN",
        "sn" : "Kensal Green"
    }, {
        "li" : "0",
        "sc" : "KNT",
        "sn" : "Kenton"
    }, {
        "li" : "0",
        "sc" : "KPK",
        "sn" : "Kilburn Park"
    }, {
        "li" : "0",
        "sc" : "LAM",
        "sn" : "Lambeth North"
    }, {
        "li" : "0",
        "sc" : "MDV",
        "sn" : "Maida Vale"
    }, {
        "li" : "0",
        "sc" : "MYB",
        "sn" : "Marylebone"
    }, {
        "li" : "0",
        "sc" : "NWM",
        "sn" : "North Wembley"
    }, {
        "li" : "0",
        "sc" : "OXC",
        "sn" : "Oxford Circus"
    }, {
        "li" : "0",
        "sc" : "PAD",
        "sn" : "Paddington"
    }, {
        "li" : "0",
        "sc" : "PIC",
        "sn" : "Piccadilly Circus"
    }, {
        "li" : "0",
        "sc" : "QPK",
        "sn" : "Queen's Park"
    }, {
        "li" : "0",
        "sc" : "RPK",
        "sn" : "Regent's Park"
    }, {
        "li" : "0",
        "sc" : "SKT",
        "sn" : "South Kenton"
    }, {
        "li" : "0",
        "sc" : "SPK",
        "sn" : "Stonebridge Park"
    }, {
        "li" : "0",
        "sc" : "WAR",
        "sn" : "Warwick Avenue"
    }, {
        "li" : "0",
        "sc" : "WLO",
        "sn" : "Waterloo"
    }, {
        "li" : "0",
        "sc" : "WEM",
        "sn" : "Wembley Central"
    }, {
        "li" : "0",
        "sc" : "WJN",
        "sn" : "Willesden Junction"
    }, {
        "li" : "1",
        "sc" : "BNK",
        "sn" : "Bank"
    }, {
        "li" : "1",
        "sc" : "BDE",
        "sn" : "Barkingside"
    }, {
        "li" : "1",
        "sc" : "BNG",
        "sn" : "Bethnal Green"
    }, {
        "li" : "1",
        "sc" : "BDS",
        "sn" : "Bond Street"
    }, {
        "li" : "1",
        "sc" : "BHL",
        "sn" : "Buckhurst Hill"
    }, {
        
        "li" : "1",
        "sc" : "CYL",
        "sn" : "Chancery Lane"
    }, {
        
        "li" : "1",
        "sc" : "CHG",
        "sn" : "Chigwell"
    }, {
        
        "li" : "1",
        "sc" : "DEB",
        "sn" : "Debden"
    }, {
        
        "li" : "1",
        "sc" : "EBY",
        "sn" : "Ealing Broadway"
    }, {
        
        "li" : "1",
        "sc" : "EAC",
        "sn" : "East Acton"
    }, {
        
        "li" : "1",
        "sc" : "EPP",
        "sn" : "Epping"
    }, {
        
        "li" : "1",
        "sc" : "FLP",
        "sn" : "Fairlop"
    }, {
        
        "li" : "1",
        "sc" : "GHL",
        "sn" : "Gants Hill"
    }, {
        
        "li" : "1",
        "sc" : "GRH",
        "sn" : "Grange Hill"
    }, {
        
        "li" : "1",
        "sc" : "GFD",
        "sn" : "Greenford"
    }, {
        
        "li" : "1",
        "sc" : "HAI",
        "sn" : "Hainault"
    }, {
        
        "li" : "1",
        "sc" : "HLN",
        "sn" : "Hanger Lane"
    }, {
        
        "li" : "1",
        "sc" : "HOL",
        "sn" : "Holborn"
    }, {
        
        "li" : "1",
        "sc" : "HPK",
        "sn" : "Holland Park"
    }, {
        
        "li" : "1",
        "sc" : "LAN",
        "sn" : "Lancaster Gate"
    }, {
        
        "li" : "1",
        "sc" : "LEY",
        "sn" : "Leyton"
    }, {
        
        "li" : "1",
        "sc" : "LYS",
        "sn" : "Leytonstone"
    }, {
        
        "li" : "1",
        "sc" : "LST",
        "sn" : "Liverpool Street"
    }, {
        
        "li" : "1",
        "sc" : "LTN",
        "sn" : "Loughton"
    }, {
        
        "li" : "1",
        "sc" : "MAR",
        "sn" : "Marble Arch"
    }, {
        
        "li" : "1",
        "sc" : "MLE",
        "sn" : "Mile End"
    }, {
        
        "li" : "1",
        "sc" : "NEP",
        "sn" : "Newbury Park"
    }, {
        
        "li" : "1",
        "sc" : "NAC",
        "sn" : "North Acton"
    }, {
        
        "li" : "1",
        "sc" : "NHT",
        "sn" : "Northolt"
    }, {
        
        "li" : "1",
        "sc" : "NHG",
        "sn" : "Notting Hill Gate"
    }, {
        
        "li" : "1",
        "sc" : "OXC",
        "sn" : "Oxford Circus"
    }, {
        
        "li" : "1",
        "sc" : "PER",
        "sn" : "Perivale"
    }, {
        
        "li" : "1",
        "sc" : "QWY",
        "sn" : "Queensway"
    }, {
        
        "li" : "1",
        "sc" : "RED",
        "sn" : "Redbridge"
    }, {
        
        "li" : "1",
        "sc" : "ROD",
        "sn" : "Roding Valley"
    }, {
        
        "li" : "1",
        "sc" : "RUG",
        "sn" : "Ruislip Gardens"
    }, {
        
        "li" : "1",
        "sc" : "SBC",
        "sn" : "Shepherds Bush (Central Line)"
    }, {
        
        "li" : "1",
        "sc" : "SNB",
        "sn" : "Snaresbrook"
    }, {
        
        "li" : "1",
        "sc" : "SRP",
        "sn" : "South Ruislip"
    }, {
        
        "li" : "1",
        "sc" : "SWF",
        "sn" : "South Woodford"
    }, {
        
        "li" : "1",
        "sc" : "STP",
        "sn" : "St. Paul's"
    }, {
        
        "li" : "1",
        "sc" : "SFD",
        "sn" : "Stratford"
    }, {
        
        "li" : "1",
        "sc" : "THB",
        "sn" : "Theydon Bois"
    }, {
        
        "li" : "1",
        "sc" : "TCR",
        "sn" : "Tottenham Court Road"
    }, {
        
        "li" : "1",
        "sc" : "WAN",
        "sn" : "Wanstead"
    }, {
        
        "li" : "1",
        "sc" : "WAC",
        "sn" : "West Acton"
    }, {
        
        "li" : "1",
        "sc" : "WRP",
        "sn" : "West Ruislip"
    }, {
        
        "li" : "1",
        "sc" : "WCT",
        "sn" : "White City"
    }, {
        
        "li" : "1",
        "sc" : "WFD",
        "sn" : "Woodford"
    }, {
        
        "li" : "2",
        "sc" : "ALD",
        "sn" : "Aldgate"
    }, {
        
        "li" : "2",
        "sc" : "BST",
        "sn" : "Baker Street"
    }, {
        
        "li" : "2",
        "sc" : "BAR",
        "sn" : "Barbican"
    }, {
        
        "li" : "2",
        "sc" : "BAY",
        "sn" : "Bayswater"
    }, {
        
        "li" : "2",
        "sc" : "BLF",
        "sn" : "Blackfriars"
    }, {
        
        "li" : "2",
        "sc" : "CST",
        "sn" : "Cannon Street"
    }, {
        
        "li" : "2",
        "sc" : "ERD",
        "sn" : "Edgware Road (Cir)"
    }, {
        
        "li" : "2",
        "sc" : "EMB",
        "sn" : "Embankment"
    }, {
        
        "li" : "2",
        "sc" : "ESQ",
        "sn" : "Euston Square"
    }, {
        
        "li" : "2",
        "sc" : "FAR",
        "sn" : "Farringdon"
    }, {
        
        "li" : "2",
        "sc" : "GPS",
        "sn" : "Great Portland Street"
    }, {
        
        "li" : "2",
        "sc" : "HST",
        "sn" : "High Street Kensington"
    }, {
        
        "li" : "2",
        "sc" : "KXX",
        "sn" : "King's Cross St. Pancras"
    }, {
        
        "li" : "2",
        "sc" : "LST",
        "sn" : "Liverpool Street"
    }, {
        
        "li" : "2",
        "sc" : "MAN",
        "sn" : "Mansion House"
    }, {
        
        "li" : "2",
        "sc" : "MON",
        "sn" : "Monument"
    }, {
        
        "li" : "2",
        "sc" : "MGT",
        "sn" : "Moorgate"
    }, {
        
        "li" : "2",
        "sc" : "NHG",
        "sn" : "Notting Hill Gate"
    }, {
        
        "li" : "2",
        "sc" : "PADc",
        "sn" : "Paddington Circle"
    }, {
        
        "li" : "2",
        "sc" : "SSQ",
        "sn" : "Sloane Square"
    }, {
        
        "li" : "2",
        "sc" : "SKN",
        "sn" : "South Kensington"
    }, {
        
        "li" : "2",
        "sc" : "SJP",
        "sn" : "St. James's Park"
    }, {
        
        "li" : "2",
        "sc" : "TEM",
        "sn" : "Temple"
    }, {
        
        "li" : "2",
        "sc" : "THL",
        "sn" : "Tower Hill"
    }, {
        
        "li" : "2",
        "sc" : "VIC",
        "sn" : "Victoria"
    }, {
        
        "li" : "2",
        "sc" : "WMS",
        "sn" : "Westminster"
    }, {
        
        "li" : "3",
        "sc" : "ACT",
        "sn" : "Acton Town"
    }, {
        
        "li" : "3",
        "sc" : "ALE",
        "sn" : "Aldgate East"
    }, {
        
        "li" : "3",
        "sc" : "BKG",
        "sn" : "Barking"
    }, {
        
        "li" : "3",
        "sc" : "BCT",
        "sn" : "Barons Court"
    }, {
        
        "li" : "3",
        "sc" : "BEC",
        "sn" : "Becontree"
    }, {
        
        "li" : "3",
        "sc" : "BLF",
        "sn" : "Blackfriars"
    }, {
        
        "li" : "3",
        "sc" : "BWR",
        "sn" : "Bow Road"
    }, {
        
        "li" : "3",
        "sc" : "BBB",
        "sn" : "Bromley-by-Bow"
    }, {
        
        "li" : "3",
        "sc" : "CST",
        "sn" : "Cannon Street"
    }, {
        
        "li" : "3",
        "sc" : "CHP",
        "sn" : "Chiswick Park"
    }, {
        
        "li" : "3",
        "sc" : "DGE",
        "sn" : "Dagenham East"
    }, {
        
        "li" : "3",
        "sc" : "DGH",
        "sn" : "Dagenham Heathway"
    }, {
        
        "li" : "3",
        "sc" : "EBY",
        "sn" : "Ealing Broadway"
    }, {
        
        "li" : "3",
        "sc" : "ECM",
        "sn" : "Ealing Common"
    }, {
        
        "li" : "3",
        "sc" : "ECT",
        "sn" : "Earls Court"
    }, {
        
        "li" : "3",
        "sc" : "EHM",
        "sn" : "East Ham"
    }, {
        
        "li" : "3",
        "sc" : "EPY",
        "sn" : "East Putney"
    }, {
        
        "li" : "3",
        "sc" : "ERD",
        "sn" : "Edgware Road (H & C)"
    }, {
        
        "li" : "3",
        "sc" : "EPK",
        "sn" : "Elm Park"
    }, {
        
        "li" : "3",
        "sc" : "EMB",
        "sn" : "Embankment"
    }, {
        
        "li" : "3",
        "sc" : "FBY",
        "sn" : "Fulham Broadway"
    }, {
        
        "li" : "3",
        "sc" : "GRD",
        "sn" : "Gloucester Road"
    }, {
        
        "li" : "3",
        "sc" : "GUN",
        "sn" : "Gunnersbury"
    }, {
        
        "li" : "3",
        "sc" : "HMD",
        "sn" : "Hammersmith (District and Picc)"
    }, {
        
        "li" : "3",
        "sc" : "HST",
        "sn" : "High Street Kensington"
    }, {
        
        "li" : "3",
        "sc" : "HCH",
        "sn" : "Hornchurch"
    }, {
        
        "li" : "3",
        "sc" : "KEW",
        "sn" : "Kew Gardens"
    }, {
        
        "li" : "3",
        "sc" : "MAN",
        "sn" : "Mansion House"
    }, {
        
        "li" : "3",
        "sc" : "MLE",
        "sn" : "Mile End"
    }, {
        
        "li" : "3",
        "sc" : "MON",
        "sn" : "Monument"
    }, {
        
        "li" : "3",
        "sc" : "OLY",
        "sn" : "Olympia"
    }, {
        
        "li" : "3",
        "sc" : "PGR",
        "sn" : "Parsons Green"
    }, {
        
        "li" : "3",
        "sc" : "PLW",
        "sn" : "Plaistow"
    }, {
        
        "li" : "3",
        "sc" : "PUT",
        "sn" : "Putney Bridge"
    }, {
        
        "li" : "3",
        "sc" : "RCP",
        "sn" : "Ravenscourt Park"
    }, {
        
        "li" : "3",
        "sc" : "RMD",
        "sn" : "Richmond"
    }, {
        
        "li" : "3",
        "sc" : "SSQ",
        "sn" : "Sloane Square"
    }, {
        
        "li" : "3",
        "sc" : "SFS",
        "sn" : "Southfields"
    }, {
        
        "li" : "3",
        "sc" : "SKN",
        "sn" : "South Kensington"
    }, {
        
        "li" : "3",
        "sc" : "SJP",
        "sn" : "St. James's Park"
    }, {
        
        "li" : "3",
        "sc" : "STB",
        "sn" : "Stamford Brook"
    }, {
        
        "li" : "3",
        "sc" : "STG",
        "sn" : "Stepney Green"
    }, {
        
        "li" : "3",
        "sc" : "TEM",
        "sn" : "Temple"
    }, {
        
        "li" : "3",
        "sc" : "THL",
        "sn" : "Tower Hill"
    }, {
        
        "li" : "3",
        "sc" : "TGR",
        "sn" : "Turnham Green"
    }, {
        
        "li" : "3",
        "sc" : "UPM",
        "sn" : "Upminster"
    }, {
        
        "li" : "3",
        "sc" : "UPB",
        "sn" : "Upminster Bridge"
    }, {
        
        "li" : "3",
        "sc" : "UPY",
        "sn" : "Upney"
    }, {
        
        "li" : "3",
        "sc" : "UPK",
        "sn" : "Upton Park"
    }, {
        
        "li" : "3",
        "sc" : "VIC",
        "sn" : "Victoria"
    }, {
        
        "li" : "3",
        "sc" : "WBT",
        "sn" : "West Brompton"
    }, {
        
        "li" : "3",
        "sc" : "WHM",
        "sn" : "West Ham"
    }, {
        
        "li" : "3",
        "sc" : "WKN",
        "sn" : "West Kensington"
    }, {
        
        "li" : "3",
        "sc" : "WMS",
        "sn" : "Westminster"
    }, {
        
        "li" : "3",
        "sc" : "WCL",
        "sn" : "Whitechapel"
    }, {
        
        "li" : "3",
        "sc" : "WDN",
        "sn" : "Wimbledon"
    }, {
        
        "li" : "3",
        "sc" : "WMP",
        "sn" : "Wimbledon Park"
    }, {
        
        "li" : "4",
        "sc" : "ALE",
        "sn" : "Aldgate East"
    }, {
        
        "li" : "4",
        "sc" : "BST",
        "sn" : "Baker Street"
    }, {
        
        "li" : "4",
        "sc" : "BAR",
        "sn" : "Barbican"
    }, {
        
        "li" : "4",
        "sc" : "BKG",
        "sn" : "Barking"
    }, {
        
        "li" : "4",
        "sc" : "BWR",
        "sn" : "Bow Road"
    }, {
        
        "li" : "4",
        "sc" : "BBB",
        "sn" : "Bromley-by-Bow"
    }, {
        
        "li" : "4",
        "sc" : "EHM",
        "sn" : "East Ham"
    }, {
        
        "li" : "4",
        "sc" : "ERD",
        "sn" : "Edgware Road (Cir)"
    }, {
        
        "li" : "4",
        "sc" : "ESQ",
        "sn" : "Euston Square"
    }, {
        
        "li" : "4",
        "sc" : "FAR",
        "sn" : "Farringdon"
    }, {
        
        "li" : "4",
        "sc" : "GPS",
        "sn" : "Great Portland Street"
    }, {
        
        "li" : "4",
        "sc" : "HMS",
        "sn" : "Hammersmith (Circle and H&C)"
    }, {
        
        "li" : "4",
        "sc" : "KXX",
        "sn" : "King's Cross St. Pancras"
    }, {
        
        "li" : "4",
        "sc" : "LST",
        "sn" : "Liverpool Street"
    }, {
        
        "li" : "4",
        "sc" : "MLE",
        "sn" : "Mile End"
    }, {
        
        "li" : "4",
        "sc" : "MGT",
        "sn" : "Moorgate"
    }, {
        
        "li" : "4",
        "sc" : "PADs",
        "sn" : "Paddington H & C"
    }, {
        
        "li" : "4",
        "sc" : "PLW",
        "sn" : "Plaistow"
    }, {
        
        "li" : "4",
        "sc" : "STG",
        "sn" : "Stepney Green"
    }, {
        
        "li" : "4",
        "sc" : "UPK",
        "sn" : "Upton Park"
    }, {
        
        "li" : "4",
        "sc" : "WHM",
        "sn" : "West Ham"
    }, {
        
        "li" : "4",
        "sc" : "WCL",
        "sn" : "Whitechapel"
    }, {
        
        "li" : "5",
        "sc" : "BST",
        "sn" : "Baker Street"
    }, {
        
        "li" : "5",
        "sc" : "BER",
        "sn" : "Bermondsey"
    }, {
        
        "li" : "5",
        "sc" : "BDS",
        "sn" : "Bond Street"
    }, {
        
        "li" : "5",
        "sc" : "CWR",
        "sn" : "Canada Water"
    }, {
        
        "li" : "5",
        "sc" : "CWF",
        "sn" : "Canary Wharf"
    }, {
        
        "li" : "5",
        "sc" : "CNT",
        "sn" : "Canning Town"
    }, {
        
        "li" : "5",
        "sc" : "CPK",
        "sn" : "Canons Park"
    }, {
        
        "li" : "5",
        "sc" : "DHL",
        "sn" : "Dollis Hill"
    }, {
        
        "li" : "5",
        "sc" : "FRD",
        "sn" : "Finchley Road"
    }, {
        
        "li" : "5",
        "sc" : "GPK",
        "sn" : "Green Park"
    }, {
        
        "li" : "5",
        "sc" : "KIL",
        "sn" : "Kilburn"
    }, {
        
        "li" : "5",
        "sc" : "KBY",
        "sn" : "Kingsbury"
    }, {
        
        "li" : "5",
        "sc" : "LON",
        "sn" : "London Bridge"
    }, {
        
        "li" : "5",
        "sc" : "NEA",
        "sn" : "Neasden"
    }, {
        
        "li" : "5",
        "sc" : "NGW",
        "sn" : "North Greenwich"
    }, {
        
        "li" : "5",
        "sc" : "QBY",
        "sn" : "Queensbury"
    }, {
        
        "li" : "5",
        "sc" : "SWK",
        "sn" : "Southwark"
    }, {
        
        "li" : "5",
        "sc" : "SJW",
        "sn" : "St. John's Wood"
    }, {
        
        "li" : "5",
        "sc" : "STA",
        "sn" : "Stanmore"
    }, {
        
        "li" : "5",
        "sc" : "SFD",
        "sn" : "Stratford"
    }, {
        
        "li" : "5",
        "sc" : "SWC",
        "sn" : "Swiss Cottage"
    }, {
        
        "li" : "5",
        "sc" : "WLO",
        "sn" : "Waterloo"
    }, {
        
        "li" : "5",
        "sc" : "WPK",
        "sn" : "Wembley Park"
    }, {
        
        "li" : "5",
        "sc" : "WHM",
        "sn" : "West Ham"
    }, {
        
        "li" : "5",
        "sc" : "WHD",
        "sn" : "West Hampstead"
    }, {
        
        "li" : "5",
        "sc" : "WMS",
        "sn" : "Westminster"
    }, {
        
        "li" : "5",
        "sc" : "WLG",
        "sn" : "Willesden Green"
    }, {
        
        "li" : "6",
        "sc" : "ALD",
        "sn" : "Aldgate"
    }, {
        
        "li" : "6",
        "sc" : "AME",
        "sn" : "Amersham"
    }, {
        
        "li" : "6",
        "sc" : "BST",
        "sn" : "Baker Street"
    }, {
        
        "li" : "6",
        "sc" : "BAR",
        "sn" : "Barbican"
    }, {
        
        "li" : "6",
        "sc" : "CLF",
        "sn" : "Chalfont & Latimer"
    }, {
        
        "li" : "6",
        "sc" : "CWD",
        "sn" : "Chorleywood"
    }, {
        
        "li" : "6",
        "sc" : "CRX",
        "sn" : "Croxley"
    }, {
        
        "li" : "6",
        "sc" : "ETE",
        "sn" : "Eastcote"
    }, {
        
        "li" : "6",
        "sc" : "ESQ",
        "sn" : "Euston Square"
    }, {
        
        "li" : "6",
        "sc" : "FAR",
        "sn" : "Farringdon"
    }, {
        
        "li" : "6",
        "sc" : "FRD",
        "sn" : "Finchley Road"
    }, {
        
        "li" : "6",
        "sc" : "GPS",
        "sn" : "Great Portland Street"
    }, {
        
        "li" : "6",
        "sc" : "HOH",
        "sn" : "Harrow on the Hill"
    }, {
        
        "li" : "6",
        "sc" : "HDN",
        "sn" : "Hillingdon"
    }, {
        
        "li" : "6",
        "sc" : "ICK",
        "sn" : "Ickenham"
    }, {
        
        "li" : "6",
        "sc" : "KXX",
        "sn" : "King's Cross St. Pancras"
    }, {
        
        "li" : "6",
        "sc" : "LST",
        "sn" : "Liverpool Street"
    }, {
        
        "li" : "6",
        "sc" : "MPK",
        "sn" : "Moor Park"
    }, {
        
        "li" : "6",
        "sc" : "MGT",
        "sn" : "Moorgate"
    }, {
        
        "li" : "6",
        "sc" : "NHR",
        "sn" : "North Harrow"
    }, {
        
        "li" : "6",
        "sc" : "NWP",
        "sn" : "Northwick Park"
    }, {
        
        "li" : "6",
        "sc" : "NWD",
        "sn" : "Northwood"
    }, {
        
        "li" : "6",
        "sc" : "NWH",
        "sn" : "Northwood Hills"
    }, {
        
        "li" : "6",
        "sc" : "PIN",
        "sn" : "Pinner"
    }, {
        
        "li" : "6",
        "sc" : "RLN",
        "sn" : "Rayners Lane"
    }, {
        
        "li" : "6",
        "sc" : "RKY",
        "sn" : "Rickmansworth"
    }, {
        
        "li" : "6",
        "sc" : "RUI",
        "sn" : "Ruislip"
    }, {
        
        "li" : "6",
        "sc" : "RUM",
        "sn" : "Ruislip Manor"
    }, {
        
        "li" : "6",
        "sc" : "UXB",
        "sn" : "Uxbridge"
    }, {
        
        "li" : "6",
        "sc" : "WAT",
        "sn" : "Watford"
    }, {
        
        "li" : "6",
        "sc" : "WPK",
        "sn" : "Wembley Park"
    }, {
        
        "li" : "6",
        "sc" : "WHR",
        "sn" : "West Harrow"
    }, {
        
        "li" : "7",
        "sc" : "ANG",
        "sn" : "Angel"
    }, {
        
        "li" : "7",
        "sc" : "ARC",
        "sn" : "Archway"
    }, {
        
        "li" : "7",
        "sc" : "BAL",
        "sn" : "Balham"
    }, {
        
        "li" : "7",
        "sc" : "BNK",
        "sn" : "Bank"
    }, {
        
        "li" : "7",
        "sc" : "BPK",
        "sn" : "Belsize Park"
    }, {
        
        "li" : "7",
        "sc" : "BOR",
        "sn" : "Borough"
    }, {
        
        "li" : "7",
        "sc" : "BTX",
        "sn" : "Brent Cross"
    }, {
        
        "li" : "7",
        "sc" : "BUR",
        "sn" : "Burnt Oak"
    }, {
        
        "li" : "7",
        "sc" : "CTN",
        "sn" : "Camden Town"
    }, {
        
        "li" : "7",
        "sc" : "CHF",
        "sn" : "Chalk Farm"
    }, {
        
        "li" : "7",
        "sc" : "CHX",
        "sn" : "Charing Cross"
    }, {
        
        "li" : "7",
        "sc" : "CPC",
        "sn" : "Clapham Common"
    }, {
        
        "li" : "7",
        "sc" : "CPN",
        "sn" : "Clapham North"
    }, {
        
        "li" : "7",
        "sc" : "CPS",
        "sn" : "Clapham South"
    }, {
        
        "li" : "7",
        "sc" : "COL",
        "sn" : "Colindale"
    }, {
        
        "li" : "7",
        "sc" : "CLW",
        "sn" : "Colliers Wood"
    }, {
        
        "li" : "7",
        "sc" : "EFY",
        "sn" : "East Finchley"
    }, {
        
        "li" : "7",
        "sc" : "EDG",
        "sn" : "Edgware"
    }, {
        
        "li" : "7",
        "sc" : "ELE",
        "sn" : "Elephant & Castle"
    }, {
        
        "li" : "7",
        "sc" : "EMB",
        "sn" : "Embankment"
    }, {
        
        "li" : "7",
        "sc" : "EUS",
        "sn" : "Euston"
    }, {
        
        "li" : "7",
        "sc" : "FYC",
        "sn" : "Finchley Central"
    }, {
        
        "li" : "7",
        "sc" : "GGR",
        "sn" : "Golders Green"
    }, {
        
        "li" : "7",
        "sc" : "GST",
        "sn" : "Goodge Street"
    }, {
        
        "li" : "7",
        "sc" : "HMP",
        "sn" : "Hampstead"
    }, {
        
        "li" : "7",
        "sc" : "HND",
        "sn" : "Hendon Central"
    }, {
        
        "li" : "7",
        "sc" : "HBT",
        "sn" : "High Barnet"
    }, {
        
        "li" : "7",
        "sc" : "HIG",
        "sn" : "Highgate"
    }, {
        
        "li" : "7",
        "sc" : "KEN",
        "sn" : "Kennington"
    }, {
        
        "li" : "7",
        "sc" : "KTN",
        "sn" : "Kentish Town"
    }, {
        
        "li" : "7",
        "sc" : "KXX",
        "sn" : "King's Cross St. Pancras"
    }, {
        
        "li" : "7",
        "sc" : "LSQ",
        "sn" : "Leicester Square"
    }, {
        
        "li" : "7",
        "sc" : "LON",
        "sn" : "London Bridge"
    }, {
        
        "li" : "7",
        "sc" : "MHE",
        "sn" : "Mill Hill East"
    }, {
        
        "li" : "7",
        "sc" : "MGT",
        "sn" : "Moorgate"
    }, {
        
        "li" : "7",
        "sc" : "MOR",
        "sn" : "Morden"
    }, {
        
        "li" : "7",
        "sc" : "MCR",
        "sn" : "Mornington Crescent"
    }, {
        
        "li" : "7",
        "sc" : "OLD",
        "sn" : "Old Street"
    }, {
        
        "li" : "7",
        "sc" : "OVL",
        "sn" : "Oval"
    }, {
        
        "li" : "7",
        "sc" : "SWM",
        "sn" : "South Wimbledon"
    }, {
        
        "li" : "7",
        "sc" : "STK",
        "sn" : "Stockwell"
    }, {
        
        "li" : "7",
        "sc" : "TBE",
        "sn" : "Tooting Bec"
    }, {
        
        "li" : "7",
        "sc" : "TBY",
        "sn" : "Tooting Broadway"
    }, {
        
        "li" : "7",
        "sc" : "TCR",
        "sn" : "Tottenham Court Road"
    }, {
        
        "li" : "7",
        "sc" : "TOT",
        "sn" : "Totteridge and Whetstone"
    }, {
        
        "li" : "7",
        "sc" : "TPK",
        "sn" : "Tufnell Park"
    }, {
        
        "li" : "7",
        "sc" : "WST",
        "sn" : "Warren Street"
    }, {
        
        "li" : "7",
        "sc" : "WLO",
        "sn" : "Waterloo"
    }, {
        
        "li" : "7",
        "sc" : "WFY",
        "sn" : "West Finchley"
    }, {
        
        "li" : "7",
        "sc" : "WSP",
        "sn" : "Woodside Park"
    }, {
        
        "li" : "8",
        "sc" : "ACT",
        "sn" : "Acton Town"
    }, {
        
        "li" : "8",
        "sc" : "ALP",
        "sn" : "Alperton"
    }, {
        
        "li" : "8",
        "sc" : "AGR",
        "sn" : "Arnos Grove"
    }, {
        
        "li" : "8",
        "sc" : "ARL",
        "sn" : "Arsenal"
    }, {
        
        "li" : "8",
        "sc" : "BCT",
        "sn" : "Barons Court"
    }, {
        
        "li" : "8",
        "sc" : "BOS",
        "sn" : "Boston Manor"
    }, {
        
        "li" : "8",
        "sc" : "BGR",
        "sn" : "Bounds Green"
    }, {
        
        "li" : "8",
        "sc" : "CRD",
        "sn" : "Caledonian Road"
    }, {
        
        "li" : "8",
        "sc" : "CFS",
        "sn" : "Cockfosters"
    }, {
        
        "li" : "8",
        "sc" : "COV",
        "sn" : "Covent Garden"
    }, {
        
        "li" : "8",
        "sc" : "ECM",
        "sn" : "Ealing Common"
    }, {
        
        "li" : "8",
        "sc" : "ECT",
        "sn" : "Earls Court"
    }, {
        
        "li" : "8",
        "sc" : "ETE",
        "sn" : "Eastcote"
    }, {
        
        "li" : "8",
        "sc" : "FPK",
        "sn" : "Finsbury Park"
    }, {
        
        "li" : "8",
        "sc" : "GRD",
        "sn" : "Gloucester Road"
    }, {
        
        "li" : "8",
        "sc" : "GPK",
        "sn" : "Green Park"
    }, {
        
        "li" : "8",
        "sc" : "HMD",
        "sn" : "Hammersmith (District and Picc)"
    }, {
        
        "li" : "8",
        "sc" : "HTX",
        "sn" : "Hatton Cross"
    }, {
        
        "li" : "8",
        "sc" : "HRF",
        "sn" : "Heathrow Terminal 4"
    }, {
        
        "li" : "8",
        "sc" : "HRV",
        "sn" : "Heathrow Terminal 5"
    }, {
        
        "li" : "8",
        "sc" : "HRC",
        "sn" : "Heathrow Terminals 123"
    }, {
        
        "li" : "8",
        "sc" : "HDN",
        "sn" : "Hillingdon"
    }, {
        
        "li" : "8",
        "sc" : "HOL",
        "sn" : "Holborn"
    }, {
        
        "li" : "8",
        "sc" : "HRD",
        "sn" : "Holloway Road"
    }, {
        
        "li" : "8",
        "sc" : "HNC",
        "sn" : "Hounslow Central"
    }, {
        
        "li" : "8",
        "sc" : "HNE",
        "sn" : "Hounslow East"
    }, {
        
        "li" : "8",
        "sc" : "HNW",
        "sn" : "Hounslow West"
    }, {
        
        "li" : "8",
        "sc" : "HPC",
        "sn" : "Hyde Park Corner"
    }, {
        
        "li" : "8",
        "sc" : "ICK",
        "sn" : "Ickenham"
    }, {
        
        "li" : "8",
        "sc" : "KXX",
        "sn" : "King's Cross St. Pancras"
    }, {
        
        "li" : "8",
        "sc" : "KNB",
        "sn" : "Knightsbridge"
    }, {
        
        "li" : "8",
        "sc" : "LSQ",
        "sn" : "Leicester Square"
    }, {
        
        "li" : "8",
        "sc" : "MNR",
        "sn" : "Manor House"
    }, {
        
        "li" : "8",
        "sc" : "NEL",
        "sn" : "North Ealing"
    }, {
        
        "li" : "8",
        "sc" : "NFD",
        "sn" : "Northfields"
    }, {
        
        "li" : "8",
        "sc" : "OAK",
        "sn" : "Oakwood"
    }, {
        
        "li" : "8",
        "sc" : "OST",
        "sn" : "Osterley"
    }, {
        
        "li" : "8",
        "sc" : "PRY",
        "sn" : "Park Royal"
    }, {
        
        "li" : "8",
        "sc" : "PIC",
        "sn" : "Piccadilly Circus"
    }, {
        
        "li" : "8",
        "sc" : "RLN",
        "sn" : "Rayners Lane"
    }, {
        
        "li" : "8",
        "sc" : "RUI",
        "sn" : "Ruislip"
    }, {
        
        "li" : "8",
        "sc" : "RUM",
        "sn" : "Ruislip Manor"
    }, {
        
        "li" : "8",
        "sc" : "RSQ",
        "sn" : "Russell Square"
    }, {
        
        "li" : "8",
        "sc" : "SEL",
        "sn" : "South Ealing"
    }, {
        
        "li" : "8",
        "sc" : "SHR",
        "sn" : "South Harrow"
    }, {
        
        "li" : "8",
        "sc" : "SKN",
        "sn" : "South Kensington"
    }, {
        
        "li" : "8",
        "sc" : "SGT",
        "sn" : "Southgate"
    }, {
        
        "li" : "8",
        "sc" : "SHL",
        "sn" : "Sudbury Hill"
    }, {
        
        "li" : "8",
        "sc" : "STN",
        "sn" : "Sudbury Town"
    }, {
        
        "li" : "8",
        "sc" : "TGR",
        "sn" : "Turnham Green"
    }, {
        
        "li" : "8",
        "sc" : "TPL",
        "sn" : "Turnpike Lane"
    }, {
        
        "li" : "8",
        "sc" : "UXB",
        "sn" : "Uxbridge"
    }, {
        
        "li" : "8",
        "sc" : "WGN",
        "sn" : "Wood Green"
    }, {
        
        "li" : "9",
        "sc" : "BHR",
        "sn" : "Blackhorse Road"
    }, {
        
        "li" : "9",
        "sc" : "BRX",
        "sn" : "Brixton"
    }, {
        
        "li" : "9",
        "sc" : "EUS",
        "sn" : "Euston"
    }, {
        
        "li" : "9",
        "sc" : "FPK",
        "sn" : "Finsbury Park"
    }, {
        
        "li" : "9",
        "sc" : "GPK",
        "sn" : "Green Park"
    }, {
        
        "li" : "9",
        "sc" : "HBY",
        "sn" : "Highbury & Islington"
    }, {
        
        "li" : "9",
        "sc" : "KXX",
        "sn" : "King's Cross St. Pancras"
    }, {
        
        "li" : "9",
        "sc" : "OXC",
        "sn" : "Oxford Circus"
    }, {
        
        "li" : "9",
        "sc" : "PIM",
        "sn" : "Pimlico"
    }, {
        
        "li" : "9",
        "sc" : "SVS",
        "sn" : "Seven Sisters"
    }, {
        
        "li" : "9",
        "sc" : "STK",
        "sn" : "Stockwell"
    }, {
        
        "li" : "9",
        "sc" : "TTH",
        "sn" : "Tottenham Hale"
    }, {
        
        "li" : "9",
        "sc" : "VUX",
        "sn" : "Vauxhall"
    }, {
        
        "li" : "9",
        "sc" : "VIC",
        "sn" : "Victoria"
    }, {
        
        "li" : "9",
        "sc" : "WAL",
        "sn" : "Walthamstow Central"
    }, {
        
        "li" : "9",
        "sc" : "WST",
        "sn" : "Warren Street"
    }, {
        
        "li" : "10",
        "sc" : "BNK",
        "sn" : "Bank"
    }, {
        
        "li" : "10",
        "sc" : "WLO",
        "sn" : "Waterloo"
    }]

});

