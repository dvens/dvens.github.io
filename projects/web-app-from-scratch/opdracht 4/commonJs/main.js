var CmdGeo = require('ui/mapHandler.js');

var _mainInstance = new Main();
_mainInstance.init();


function Main () {

    var _this = this;
    var _cmdGeo;

    _this.init = function () {

       	_cmdGeo = new CmdGeo('main');

    }


}