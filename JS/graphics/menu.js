/* menus - gui logic */

var menu = function() {
	var buttonHeight = 20,
		buttonWidth = 100,
		buttonSpacing = 200,
		cushion = 5;

	var testButton = menuAssets.getNewButton(cushion, 
											 cushion, 
											 buttonWidth, 
											 buttonHeight, 
											 "Testing something pretty preposterously long");
	graphics.addRenderObject(testButton);

};

menu();