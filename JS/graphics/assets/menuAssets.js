/*menu assets*/

var menuAssets = function() {
	var button = function(xCoord, yCoord, width, height, text) {
		var w = width,  h = height, t = text, 
			bCan = graphics.getStaticCachedObject(
				{type: "button", width: w, height: h}),
			tCan = graphics.getStaticCachedObject(
				{type: "text", text: t, size: 12});
		var obj =  {
			type: "button",
			buttonCanvas: bCan, 
			textCanvas: tCan,
			x: xCoord, 
			y: yCoord,
			width: w,
			height: h,
			text: t, 
			render: function(ctx){
				ctx.drawImage(button.buttonCanvas, button.x, button.y);
				ctx.drawImage(button.textCanvas, button.x / 2, button.y / 2);
			}
		};
		return obj;
	};

	menuAssets.getNewButton = function(x, y, w, h, t) {
		return new button(x, y, w, h, t);
	};
};

menuAssets();