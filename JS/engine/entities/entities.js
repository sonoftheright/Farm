/*entities.js*/
"use strict";
const entities = function(){
	const entitiesToUpdate = [],
	entityProperties = {
		behaviors: {
			strafe: function(obj){
				obj.strafeCounter++;
				obj.stride = obj.strafeLength / 300;
				if(obj.strafeCounter < obj.strafeLength){
					obj.x += obj.stride;
				}
				else if(obj.strafeCounter > obj.strafeLength && 
						obj.strafeCounter < (obj.strafeLength * 2)){
					obj.x -= obj.stride;
				}
				else if(obj.strafeCounter > obj.strafeLength){
					obj.strafeCounter = 0;
				}
			}
		},
		graphics: {}
	},
	square = function(width, height) { 
		//make sure there's a cached graphics object to render of this square
		graphics.getStaticCachedObject(
			{type: 'square', width: width, height: height}
		);

		return {
			type: "square",
			x: Math.random()*graphics.getCanvasWidth(),
			y: Math.random()*graphics.getCanvasHeight(),
			width: width,
			height: height,
			render: function(ctx, x, y, width, height) {
				ctx.beginPath();
	            ctx.rect(x, y, width, height);
	            ctx.stroke();
			}
		};
	},
	strafingSquare = function(width, height) { 
		const myCan = graphics.getStaticCachedObject(
			{type: 'strafingSquare', width: width, height: height}
		);

		const obj = {
			canvas: myCan,
			type: "strafingSquare",
			x: Math.random()*graphics.getCanvasWidth(),
			y: Math.random()*graphics.getCanvasHeight(),
			width: width,
			height: height,
			strafeLength: (Math.random()*50) + 200,
			stride: 0,
			render: function() {
				graphics.context.drawImage(obj.canvas, obj.x, obj.y);
			},
			strafeCounter: 0,
			behaviors: [ entityProperties.behaviors.strafe ]
		};
		return obj;
	},
	circle = {};

	entities.newSquare = function(width, height) { return strafingSquare(width, height); };

	entities.updateEntity = function(obj) {
		if(obj.behaviors) {
			for (var a = 0, b = obj.behaviors.length; a < b; a++) {
				obj.behaviors[a](obj);
			}
		}
	};

	entities.addEntityToUpdate = function(obj) {
		if(obj.behaviors) {
			entitiesToUpdate.push(obj);
		}
	};

	entities.updateAllEntities = function() { 
		for(var a = 0, b = entitiesToUpdate.length; a < b; a++){
			entities.updateEntity(entitiesToUpdate[a]);
		}
	};

	entities.getEntityReferences = function() {
		var batch = [];
		for(var a = 0, b = entitiesToUpdate.length; a < b; a++){ batch[a] = entitiesToUpdate[a]; }
		return batch;
	};
};

function testAddSquare(){
	var square = {};

	for(var a = 0, b = 15000; a < b; a++){
		square = entities.newSquare(10, 10);
		entities.addEntityToUpdate(square);
		graphics.addRenderObject(square, "objects");
	}
}

entities();
testAddSquare();