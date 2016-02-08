/*farmMain.js - constants and runtime variables*/
"use strict";
const fMain = {
	running: true,
	gfps: 40,
	rfps: 40,
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