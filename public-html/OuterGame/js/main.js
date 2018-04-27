window.onload = init;
//new branch
//  This is for demo purposes

//change 2
var canvas;
var ctx;
var worlds = [];
var currentLevel = -1;
var currentGame = 'outer';
var gameState;

var playerShip = function() { // Mostly-useless function but sometimes important
	return System().ship;
}

var FPS = 40; // Desired (intended) Frames per second

var System = function() {
	return worlds[currentLevel];
}

//var ship;

function init(){
	canvas = document.getElementById('cnv');

	canvas.width = 1024;
	canvas.height = 676;

	/*canvas.width = window.innerWidth * 0.97;
	canvas.height = window.innerHeight * 0.97;*/


	canvas.style.backgroundColor = 'black';
	ctx = canvas.getContext('2d');

	gameState = "outer";

	makeWorld();

	animate();
}

function makeWorld(){
  //increase current level number-- first one starts at 0
  currentLevel++;
  var w = new World(currentLevel);
  //add world to array
  worlds.push(w);
  w.initialize();
	setInterval(animate, 1000/FPS)
}

function animate(){
	if(gameState!="station"){
	  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	  //run this level's world
		if(gameState=="outer"){
			worlds[currentLevel].run();
		} else if(gameState=="inner"){
			//inner world
			game.update();
			game.render();
		}
	}
}
