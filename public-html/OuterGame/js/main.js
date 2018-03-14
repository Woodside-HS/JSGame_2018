window.onload = init;
//new branch
//  This is for demo purposes
var canvas;
var ctx;
var worlds = [];
var currentLevel = -1;

var playerShip = function() { // Mostly-useless function but sometimes important
	return System().ship;
}

var FPS = 60; // Frames per second

var System = function() {
	return worlds[currentLevel];
}

//var ship;

function init(){
	canvas = document.getElementById('cnv');

	canvas.width = 1200;
	canvas.height = 600;

	/*canvas.width = window.innerWidth * 0.97;
	canvas.height = window.innerHeight * 0.97;*/


	canvas.style.backgroundColor = 'black';
	ctx = canvas.getContext('2d');

	makeWorld();

	setTimeout(animate, 1000/FPS);
}

function makeWorld(){
  //increase current level number-- first one starts at 0
  currentLevel++;
  var w = new World(currentLevel);
  //add world to array
  worlds.push(w);
}

function animate(){
  //requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  //run this level's world
  worlds[currentLevel].run();
  setTimeout(animate, 1000/FPS);
}
