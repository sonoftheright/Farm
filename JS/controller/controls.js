/*controller.js*/

var controls = function() {
	var up = false,
		down = false,
		left = false,
		right = false,
		escape = false,
		shift = false,
		space = false,
		inputQueue = [],
		mouse = {
			x: null, 
			y: null, 
			down: null, 
			wheel: null
	};

	/* Internal Utils */

	
	/*Mouse*/

	window.addEventListener('mousemove', function(event){
		mouse.x = event.pageX - graphics.getCanvasPosition().x;
		mouse.y = event.pageY - graphics.getCanvasPosition().y;
	});
	
	window.addEventListener('mouseDown', function(event){ 
		mouse.down = true; 
		inputQueue.push({ event: 'mouseDown', data: controls.getKeyStates() })});

	window.addEventListener('mouseup', function(event){ 
		mouse.down = false;
		inputQueue.push({event: 'mouseUp', data: controls.getKeyStates() });
		/*console.log(inputQueue);*/});

	window.addEventListener('mousewheel', function(event){/*handle mousewheel*/});

	/*Keyboard*/

	window.addEventListener('keydown', function(event){
		var keyPressed = (event.keyCode) ? event.keyCode : e.which;

	    if (keyPressed === 37 || keyPressed === 65) { left = true; inputQueue.push({event: 'left', data: controls.getKeyStates()});}
	    if (keyPressed === 38 || keyPressed === 87) { up = true; inputQueue.push({event: 'up', data: controls.getKeyStates()});}
	    if (keyPressed === 39 || keyPressed === 68) { right = true; inputQueue.push({event: 'right', data: controls.getKeyStates()});}
	    if (keyPressed === 40 || keyPressed === 83) { down = true; inputQueue.push({event: 'down', data: controls.getKeyStates()});}
	    if (keyPressed === 16) { shift = true; inputQueue.push({event: 'shift', data: controls.getKeyStates()});}
	    if (keyPressed === 27) { escape = true; inputQueue.push({event: 'escape', data: controls.getKeyStates()});}
		if (keyPressed === 32) { space = true; inputQueue.push({event: 'space', data: controls.getKeyStates()});}
		});
	window.addEventListener('keyup', function (event) {
	    var keyPressed = (event.keyCode) ? event.keyCode : e.which;

	    if (keyPressed === 38 || keyPressed === 87) { up = false; }
	    if (keyPressed === 37 || keyPressed === 65) { left = false; }
	    if (keyPressed === 39 || keyPressed === 68) { right = false; }
	    if (keyPressed === 40 || keyPressed === 83) { down = false; }
	    if (keyPressed === 32) 						{ space = false; }
	    if (keyPressed === 16)						{ shift = false; }
	    if (keyPressed === 27) 						{ escape = false; }

	});

	controls.getKeyStates = function() {
		return {
			up: up,
			down: down, 
			left: left,
			right: right,
			escape: escape,
			shift: shift,
			space: space, 
			mouse: mouse
		};
	};
	controls.mouseDown = function() { /*do something here*/ }; 
	controls.pause = function() { /*do something here*/ }; 

	/* Variable Access Functions */

	controls.getMouseData = function() { return {x: mouse.x, y: mouse.y, down: mouse.down}; };
	controls.clearInputQueue = function() { inputQueue = []; };


};

controls();