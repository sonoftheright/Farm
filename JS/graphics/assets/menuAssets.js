/*menu assets*/

var menuAssets = function() {
	var button = function(xCoord, yCoord, width, height, text) {
		var w = width,  h = height, x = xCoord, y = yCoord, t = text, 
			size = 12,
			bCan = graphics.getStaticCachedObject(
				{type: "button", width: w, height: h}),
			tCan = graphics.getStaticCachedObject(
				{type: "text", text: t, size: size});
		
		//text position variables
		var tL = graphics.getTextLength(text),
			textX = (x + (w/2) - (tCan.width/2)),
			textY = (y + (h/2) - (size/2));

		var obj =  {
			type: "button",
			x: x, 
			y: y,
			width: w,
			height: h,
			text: t, 
			render: function(ctx){
				ctx.drawImage(bCan, obj.x, obj.y);
				ctx.drawImage(tCan, textX, textY);
			},
			action: function() { console.log("button pressed!");}
		};
		return obj;
	};

	menuAssets.getNewButton = function(x, y, w, h, t) {
		return new button(x, y, w, h, t);

	};
};

menuAssets();