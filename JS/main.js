/*farmMain.js - constants and runtime variables*/

var fMain = {
	running: true,
	gfps: 1000,
	rfps: 35,
	stop: function() { 
		clearInterval(gL);
		clearInterval(rL);
		return true;
	},
	start: function() {
		gL = setInterval(gameLoop, 1000/fMain.gfps);
		rL = setInterval(renderLoop, 1000/fMain.rfps);
		return true;
	}
}