/* menus - gui logic */

var menu = function() {
	var buttonHeight = 20,
		buttonWidth = 100,
		buttonSpacing = 200,
		cushion = 5,
		menuObjects = [];

	menu.addMenuObject = function(obj) {
		menuObjects.push(obj);
	};

	menu.addTestButton = function() {
		var testButton = menuAssets.getNewButton(cushion, 
											 cushion, 
											 buttonWidth, 
											 buttonHeight, 
											 "Test");
		graphics.addRenderObject(testButton, "menu");
		menu.addMenuObject(testButton);
	}
};

menu();
menu.addTestButton();