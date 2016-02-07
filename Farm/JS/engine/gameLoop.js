/*gameLoop.js*/

var gameLoop = function(callback) {

	entities.updateAllEntities();
	// graphics.renderFrame();

	if(graphics.getAnimationFrame() % 200 == 0 ){
		console.log("Animation frame: " + graphics.getAnimationFrame() + "\n" +
					"Loop frame: " + gameLoop.frame + "\n" +
					"Render frame: " + renderLoop.frame);
	}
	gameLoop.frame++;
};

var renderLoop = function(callback) {	
	graphics.renderFrame();
	renderLoop.frame++;
}

renderLoop.frame = 0;
gameLoop.frame = 0;
var gL = setInterval(gameLoop, 1000/fMain.gfps),	
	rL = setInterval(renderLoop, 1000/fMain.rfps);