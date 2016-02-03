import debugUtils from 'utils/debug';
import { isNumber } from 'utils/numbers';
import EventTarget from 'libs/eventTarget';

const SANDBOX = "SANDBOX";
const LINEAIR = "LINEAIR";
const GPS_AVAILABLE = 'GPS_AVAILABLE';
const GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
const POSITION_UPDATED = 'POSITION_UPDATED';
const REFRESH_RATE = 1000;

let ET = new EventTarget();

class CmdGeo {
	
	constructor() {

		this.currentPosition = false; 
		this.currentPositionMarker = false;
		this.customDebugging = false;
		this.debugId = false;
		this.map = false;
		this.interval = false;
		this.intervalCounter = false;
		this.updateMap = false;
		this.locations = [];
		this.markers = [];

		this.init();

	}

	init() {

		debugUtils.debugMessage("Test if GPS is avaible");

		ET.addListener(GPS_AVAILABLE, this.startInterval);
		ET.addListener(GPS_UNAVAILABLE, function(){debugUtils.debugMessage('GPS is not avaible.')});

		(geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);

	}

	startInterval() {
		
		debugUtils.debugMessage("GPS is not avaible: ask for a position");
    	
    	this.updatePosition();
    	this.interval = setInterval(this.updateCurrentPosition, REFRESH_RATE);
    	
    	ET.addListener(POSITION_UPDATED, this.checkLocations);

	}

	updateCurrentPosition() {
		
		this.intervalCounter++;
    	geo_position_js.getCurrentPosition(this.setPosition, _geo_error_handler, {enableHighAccuracy:true});

	}

	updatePosition() {
		
		let newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
    	
    	this.map.setCenter(newPos);
    	this.currentPositionMarker.setPosition(newPos);

	}

	setPosition(pos) {

		this.currentPosition = pos;

	    debugUtils.debugMessage(intervalCounter+" position lat:"+position.coords.latitude+" long:"+position.coords.longitude);

	    ET.fire("POSITION_UPDATED");

	}
	
	checkLocations() {

	    for (let i = 0; i < locations.length; i++) {
	        
	        let location = { 
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

	calculateDistance(pos1, pos2) {

		let pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
    	let pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
    	
    	return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);

	}

	generateMap(options, canvasId) {

	    debugUtils.debugMessage("Generate Google Maps and show in"+canvasId)
	    this.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

	    let routeList = [];
	    
	    debugUtils.debugMessage("Draw locations, tourtype is: "+tourType);

	    for (let i = 0; i < locaties.length; i++) {

	        try {
	            
	            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;

	        } catch (error) {
	            
	            debugUtils.debugMessage("Localstorage is not avaible: "+error);

	        }

	        let markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
	        routeList.push(markerLatLng);

	        this.markers[i] = {};

	        for (let attr in locationMarker) {

	            this.markers[i][attr] = locationMarker[attr];

	        }

	        this.markers[i].scale = locaties[i][2]/3;

	        let marker = new google.maps.Marker({
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

	    this.currentPositionMarker = new google.maps.Marker({
	        position: kaartOpties.center,
	        map: map,
	        icon: positieMarker,
	        title: 'U bevindt zich hier'
	    });

	    ET.addListener(POSITION_UPDATED, this.updatePosition);

	}

}

export default CmdGeo;