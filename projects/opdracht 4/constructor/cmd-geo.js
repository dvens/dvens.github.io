
'use strict';

// Constants
var SANDBOX = "SANDBOX";
var LINEAIR = "LINEAIR";
var GPS_AVAILABLE = 'GPS_AVAILABLE';
var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
var POSITION_UPDATED = 'POSITION_UPDATED';
var REFRESH_RATE = 1000;
var ET = new EventTarget();

function CmdGeo() {

	var _this = this;
	
	_this.currentPosition = false; 
	_this.currentPositionMarker = false;
	_this.customDebugging = false;
	_this.debugId = false;
	_this.map = false;
	_this.interval = false;
	_this.intervalCounter = false;
	_this.updateMap = false;
	_this.locations = [];
	_this.markers = [];

	_this.init();

}

CmdGeo.prototype.init = function() {

	debugUtils.debugMessage("Test if GPS is avaible");

	ET.addListener(GPS_AVAILABLE, this.startInterval);
	ET.addListener(GPS_UNAVAILABLE, function(){debugUtils.debugMessage('GPS is not avaible.')});

	(geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);

}

CmdGeo.prototype.startInterval = function() {
	
	debugUtils.debugMessage("GPS is not avaible: ask for a position");
	
	this.updatePosition();
	this.interval = setInterval(this.updateCurrentPosition, REFRESH_RATE);
	
	ET.addListener(POSITION_UPDATED, this.checkLocations);

}

CmdGeo.prototype.updateCurrentPosition = function() {
	
	this.intervalCounter++;
	geo_position_js.getCurrentPosition(this.setPosition, _geo_error_handler, {enableHighAccuracy:true});

}

CmdGeo.prototype.updatePosition = function() {
	
	var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
	
	this.map.setCenter(newPos);
	this.currentPositionMarker.setPosition(newPos);

}

CmdGeo.prototype.setPosition = function(pos) {

	this.currentPosition = pos;

    debugUtils.debugMessage(intervalCounter+" position lat:"+position.coords.latitude+" long:"+position.coords.longitude);

    ET.fire("POSITION_UPDATED");

}

CmdGeo.prototype.checkLocations = function() {

    for (var i = 0; i < locations.length; i++) {
        
        var location = { 
        	coords: {
        		latitude: locations[i][3],
        		longitude: locations[i][4]
        	}
        };

        if(_calculate_distance(location, currentPosition)<locations[i][2]){

            if(window.location!=locations[i][1] && localStorage[locations[i][0]]=="false"){

                try {
                    
                    (localStorage[locations[i][0]]=="false")?localStorage[locations[i][0]]=1:localStorage[locations[i][0]]++;

                } catch(error) {
                    
                    debugUtils.debugMessage("Localstorage kan niet aangesproken worden: "+error);

                }

                window.location = locations[i][1];
                
                debugUtils.debugMessage("Speler is binnen een straal van "+ locations[i][2] +" meter van "+locations[i][0]);
            }
        }
    }
}

CmdGeo.prototype.calculateDistance = function(pos1, pos2) {

	var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
	var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
	
	return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);

}

CmdGeo.prototype.generateMap = function(options, canvasId) {

    debugUtils.debugMessage("Generate Google Maps and show in"+canvasId)
    this.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

    var routeList = [];
    
    debugUtils.debugMessage("Draw locations, tourtype is: "+tourType);

    for (var i = 0; i < locaties.length; i++) {

        try {
            
            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;

        } catch (error) {
            
            debugUtils.debugMessage("Localstorage is not avaible: "+error);

        }

        var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
        routeList.push(markerLatLng);

        this.markers[i] = {};

        for (var attr in locationMarker) {

            this.markers[i][attr] = locationMarker[attr];

        }

        this.markers[i].scale = locaties[i][2]/3;

        var marker = new google.maps.Marker({
            position: markerLatLng,
            map: map,
            icon: this.markers[i],
            title: locaties[i][0]
        });
    }

    if(tourType == LINEAIR){

        debugUtils.debugMessage("Draw route");

        var route = new google.maps.Polyline({
            clickable: false,
            map: map,
            path: routeList,
            strokeColor: 'Black',
            strokeOpacity: .6,
            strokeWeight: 3
        });

    }

    _this.currentPositionMarker = new google.maps.Marker({
        position: kaartOpties.center,
        map: map,
        icon: positieMarker,
        title: 'U bevindt zich hier'
    });

    ET.addListener(POSITION_UPDATED, this.updatePosition);

}

module.exports = CmdGeo;
