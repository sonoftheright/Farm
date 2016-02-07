/*entities.js*/

var entities = function(){
	var entitiesToUpdate = [],
	entityProperties = {
		behaviors: {
			strafe: function(obj){
				var count = obj.strafeCounter,
					length = obj.strafeLength;
				obj.strafeCounter++;
				if(count < length){
					obj.x += obj.stride();
				}
				else if(count > length && count < length * 2){
					obj.x -= obj.stride();
				}
				else if(count > length){
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
		var w = width, h = height;
		var myCan = graphics.getStaticCachedObject(
			{type: 'strafingSquare', width: w, height: h}
		);
		return {
			type: "strafingSquare",
			x: Math.random()*graphics.getCanvasWidth(),
			y: Math.random()*graphics.getCanvasHeight(),
			width: w,
			height: h,
			strafeLength: Math.random()*500,
			stride: function(){return this.strafeLength / 300;},
			render: function(ctx) {
				ctx.drawImage(myCan, this.x, this.y);
			},
			strafeCounter: 5,
			behaviors: [ entityProperties.behaviors.strafe ]
		};
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
	for(var a = 0, b = 3000; a < b; a++){
		var square = entities.newSquare(10, 10);
		entities.addEntityToUpdate(square);
		graphics.addRenderObject(square);
	}
}

entities();
testAddSquare();