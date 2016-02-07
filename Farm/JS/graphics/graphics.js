/* graphics.js */

var graphics = function() {
		var canvas = document.getElementById('canvas');
			canvas.offset = 0.95;
		var context    = canvas.getContext('2d');
		var camera = {
				position: {x: 0, y: 0}, //top left corner, not center
				scale: 1				//arbitrary?
			},
			objectsToRender = [],
			animationFrame = 0;
		graphics.graphicsCache = {};

		/* Local-Only Utilities */

		//cached images for greater performance awesomeness!
		graphics.getStaticCachedObject = function (object) {
			var name = object.type + object.width + object.height + '';

			if(name in graphics.graphicsCache){ 
				return graphics.graphicsCache[name];
			}
			else {

				var can = document.createElement('canvas'),
					ctx = can.getContext('2d');
					can.width = object.width + 1;
					can.height = object.height + 1;

				ctx.beginPath();
            	ctx.rect(0, 0, object.width, object.height);
            	ctx.stroke();

				graphics.graphicsCache[name] = can;

				return graphics.graphicsCache[name];

			}
		};

		window.addEventListener('resize', function (event){
		    graphics.updateWindowSize();
		});

		/* Live Responsiveness */

		graphics.updateWindowSize  = function() {
			// graphics.setCanvasOffset();
			canvas.width = window.innerWidth * canvas.offset; 
			canvas.height = window.innerHeight * canvas.offset; 
			canvas.style.left = ((window.innerWidth - canvas.width) / 2) + "px";
    		canvas.style.top = ((window.innerHeight - canvas.height) / 2) + "px";
    		canvas.style.position = 'absolute';
		};
		
		/* Private Variables */

		graphics.getCanvasWidth = function() { return canvas.width;	};
		graphics.getCanvasHeight = function() { return canvas.height; };
		graphics.getWindowHeight = function() { return window.innerWidth; };
		graphics.getCameraPosition = function() { return [camera.position.x, camera.position.y]; };

		/* Mutable Variables */

		graphics.setCanvasOffset = function(offset) {
			if(offset < 1){
				canvas.offset = offset;
				return true;
			}
			else {
				console.log("ERROR: canvas offset variable was invalid.");
				return false;
			}
		};

		graphics.getCanvasOffset = function() {
			return canvas.offset;
		};

		/* Methods */

		//clears draw space each frame from renderFrame()
		graphics.clearCanvas = function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			// graphics.updateWindowSize();
		};

		//adds a draw function to the render stack to be run 
		graphics.addRenderObject = function(obj) {

			objectsToRender.push(obj);

		};

		//clears render stack completely
		graphics.clearRenderObjects = function(){
			objectsToRender = [];
		};

		//removes specific render object
		graphics.removeObjectToRender = function(id) {
			for(var a = 0, b = objectsToRender.length; a < b; a++) {
				if(objectsToRender[a].id == id){ objectsToRender.splice(a, 1); break; }
			}
			console.log('ERROR: Object could not be removed from render stack as it does not exist.');
		};

		//calls the 'render' function on each object in render stack - unsustainable, as rendering should happen here and not in the object
		graphics.render = function(objects){
			for (var a = 0, b = objects.length; a < b; a++){
				
				if(objects[a].type == "square" || objects[a].type == "strafingSquare") {
					objects[a].render(context);
				}
			}
		};

		graphics.getObjectPosition = function (obj) {
		    var exLeft = 0, exTop = 0;
		    if (obj.offsetParent) {
		        do {
		            exLeft += obj.offsetLeft;
		            exTop += obj.offsetTop;
		        } while (obj === obj.offsetParent);
		        return {x: exLeft, y: exTop};
		    }
	    	return {x: 0, y: 0};
		};

		graphics.getCanvasPosition = function() { return graphics.getObjectPosition(canvas); };


		graphics.getAnimationFrame = function() { return animationFrame; };
		graphics.resetAnimationFrame = function() { animationFrame = 0; };

		graphics.renderFrame = function(){
			graphics.clearCanvas();
			graphics.render(objectsToRender);
			window.requestAnimationFrame(function() { animationFrame++; });
		};
};

graphics();
graphics.updateWindowSize();