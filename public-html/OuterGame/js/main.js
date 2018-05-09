window.onload = load;

var canvas;
var ctx;
var planet;
var Images = {};
var Sounds = {};
var SpritesheetArray = [];
var worlds = [];
var imageArray = [];
var currentLevel = -1;
var currentGame = 'outer';
var gameState;
var resources;
var playerStats = {reveal:'reveal5'};//which reveal method to use. 'reveal1','reveal2','reveal3','reveal4'
var playerStats = {reveal:'reveal1'};//which reveal method to use. 'reveal1','reveal2','reveal3','reveal4'

var playerShip = function() { // Mostly-useless function but sometimes important
	return System().ship;
}

var FPS = 60; // Desired (intended) Frames per second

var System = function() {
	return worlds[currentLevel];
}

//var ship;

function load(){
	loadImages();
}
function init(){
	resources = { //all the player's resources (ie money, aliens, equipment, etc)
		health: 1,
		money : 100,
		inventory : [creditEx = {value:4.75, name:"Macaron"}], //each has a value
		// boosts : [], //boost speed, firing frequency
		// repairs : [], //repair/upgrade shield
		// weapons : [], //add different kinds of weapons to use
		aliens : [], //objects with png and name/planet
		shieldLevel : 1,
		engineLevel : 1,
		weaponsLevel : 1, //may have to split into different weapons/tools

		sellItem : function(itemName){
			for(let i=0;i<this.inventory.length;i++){
				if(this.inventory[i].name==itemName){
					this.money += this.inventory[i].value;
					this.inventory.splice(i,1);
					break;
				}
			}
		},
		collect : function(object){
			this.inventory.push(object);
		},
		buy : function(object,price){
			this.collect(object);
			this.money -= price;
		},

		infoPanel : document.getElementById("infoPanel"),
		clearSubDiv : function(num){
			var div = infoPanel.children[num];
	    for(let i = 1; i<div.children.length;i++){
	      div.children[i].remove();
	    }
		},
		updateHealth : function(){

		},
		updateMoney : function(){

		},
		updateLevels : function(){

		}
	};

	canvas = document.getElementById('cnv');

	canvas.width = 1024;
	canvas.height = 676;

	/*canvas.width = window.innerWidth * 0.97;
	canvas.height = window.innerHeight * 0.97;*/


	canvas.style.backgroundColor = 'black';
	ctx = canvas.getContext('2d');
	gameState = "outer";

	makeWorld();
	var wrapper = document.getElementById('wrapper');
	var loaderwrapper = document.getElementById('loader-wrapper');
	loaderwrapper.style.display = 'none';
	wrapper.style.display = 'block';
	setTimeout(animate, 1000/FPS);
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
