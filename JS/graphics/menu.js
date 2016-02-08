/* menus - gui logic */
"use strict";
const menu = function() {
	const buttonHeight = 20,
		buttonWidth = 100,
		buttonSpacing = 200,
		cushion = 5,
		menuObjects = [];

	menu.addMenuObject = function(obj) {
		menuObjects.push(obj);
	};

	menu.addTestButton = function() {
		const testButton = menuAssets.getNewButton(cushion, 
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