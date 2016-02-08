/* menus - gui logic */

var menu = function() {
	var buttonHeight = 100,
		buttonWidth = 40,
		buttonSpacing = 20,
		cushion = 20;

	var testButton = menuAssets.getNewButton(cushion, cushion, buttonHeight, buttonWidth, "Testing...");
	graphics.addRenderObject(testButton);

};

menu();