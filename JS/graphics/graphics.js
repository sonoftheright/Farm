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
			menuObjectsToRender = [],
			animationFrame = 0;
		graphics.graphicsCache = {};

		/* Local-Only Utilities */

		//cached images for greater performance awesomeness!
		graphics.getStaticCachedObject = function (object) {

			if(object.type in graphics.graphicsCache){ 
				return graphics.graphicsCache[object.type];
			}

			var can = document.createElement('canvas'),
				ctx = can.getContext('2d');
				ctx.beginPath();

			if (object.type == "strafingSquare") {
				
				can.width = object.width + 1;
				can.height = object.height + 1;

            	ctx.rect(0, 0, object.width, object.height);

				can.width = object.width + 2;
				can.height = object.height + 2;

            	ctx.rect(1, 1, object.width, object.height);

            	ctx.stroke();

				graphics.graphicsCache["strafingSquare"] = can;

				return can;

			}
			else if (object.type == "button"){

				can.width = object.width + 1;
				can.height = object.height + 1;

				can.width = object.width + 2;
				can.height = object.height + 2;

				console.log("Button width: " + object.width + "\n" + 
							"Button height: " + object.height + "\n" + 
							"Button x: " + object.x + "\n" +
							"Button y: " + object.y + "\n");

				ctx.rect(0, 0, object.width, object.height);

				ctx.rect(1, 1, object.width, object.height);

				ctx.fillStyle = "white";
				ctx.fill();
				ctx.stroke();

				graphics.graphicsCache["button"] = can;

				return can;
			}
			else if (object.type == "text") {
				if("text" + object.text in graphics.graphicsCache) {
					return graphics.graphicsCache["text" + object.text];
				}

				can.width = ctx.measureText(object.text).width;
				can.height = object.size;
				ctx.textBaseline = "bottom";
				ctx.font = object.size + "px";
				ctx.strokeText(object.text, 0, object.size);

				can.width = ctx.measureText(object.text).width + 2; 
				can.height = object.size + 2;
				ctx.textBaseline = "bottom";
				ctx.font = object.size + "px";
				ctx.strokeText(object.text, 0, object.size + 1);

				graphics.graphicsCache["text" + object.text] = can;
				
				return can;
			}

			console.log("ERROR: Could not find cache OR could not create new cache! Unhandled type!");
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
		graphics.addRenderObject = function(obj, array) {
			if(array == "objects") {objectsToRender.push(obj);}
			if(array == "menu") {menuObjectsToRender.push(obj);}
		};

		//clears render stack completely
		graphics.clearRenderObjects = function(){
			objectsToRender = [];
		};

		//removes specific render object
		graphics.removeRenderObject = function(id) {
			for(var a = 0, b = objectsToRender.length; a < b; a++) {
				if(objectsToRender[a].id == id){ objectsToRender.splice(a, 1); break; }
			}
			console.log('ERROR: Object could not be removed from render stack as it does not exist.');
		};

		graphics.getRenderArray = function(){
			return objectsToRender;
		};

		//calls the 'render' function on each object in render stack - unsustainable, as rendering should happen here and not in the object
		graphics.render = function(objects){
			for (var a = 0, b = objects.length; a < b; a++){
				objects[a].render(context);
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

		graphics.getTextLength = function(text) {
			return context.measureText(text).width;
		};

		graphics.getCanvasPosition = function() { return graphics.getObjectPosition(canvas); };

		graphics.getAnimationFrame = function() { return animationFrame; };
		graphics.resetAnimationFrame = function() { animationFrame = 0; };

		graphics.renderFrame = function(){
			graphics.clearCanvas();
			graphics.render(objectsToRender);
			graphics.render(menuObjectsToRender);
			window.requestAnimationFrame(function() { animationFrame++; });
		};
};

graphics();
graphics.updateWindowSize();