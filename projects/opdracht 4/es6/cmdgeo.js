const SANDBOX = "SANDBOX";
const LINEAIR = "LINEAIR";
const GPS_AVAILABLE = 'GPS_AVAILABLE';
const GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
const POSITION_UPDATED = 'POSITION_UPDATED';
const REFRESH_RATE = 1000;


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

}

export default CmdGeo