/*farmMain.js - constants and runtime variables*/

var fMain = {
	running: true,
	gfps: 60,
	rfps: 60,
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