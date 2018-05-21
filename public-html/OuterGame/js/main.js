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
var gamePlanet;
var playerStats = {revealLevel: 2};//which reveal method to use. 1,2,3,4







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
	loot_types.init();
	resources = { //all the player's resources (ie money, aliens, equipment, etc)
		health: 10,
		money : 100,
		inventory : [], //each has a value
		// boosts : [], //boost speed, firing frequency
		// repairs : [], //repair/upgrade shield
		// weapons : [], //add different kinds of weapons to use
		aliens : [], //objects with png and name/planet
		shieldLevel : 1,
		weaponsLevel : 1, //may have to split into different weapons/tools
		engineLevel : 1,
		minions: 5,

		sellItem : function(itemName){
			for(let i=0;i<this.inventory.length;i++){
				if(this.inventory[i].name==itemName){
					this.money += this.inventory[i].value;
					this.inventory.splice(i,1);
					break;
				}
			}
			this.updateMoney();
		},
		buy : function(object){ //add object to inventory
			this.money -= object.price;
			this.updateMoney();
			if(object.cat == "shieldsDiv"){
				this.shieldLevel += 1;
				this.updateLevels(0);
			} else if(object.cat == "weaponsDiv"){
				this.weaponsLevel += 1;
				this.updateLevels(1);
			} else if(object.cat == "enginesDiv"){
				this.engineLevel += 1;
				this.updateLevels(2);
			} else if(object.cat == "healthDiv"){
				this.health +=1;
				this.updateHealth();
			} else if (object.cat==="miscDiv"){//it's minions for some reason?
				this.minions+=1;
			}
		},

		infoPanel : document.getElementById("infoPanel"),
		clearSubDiv : function(num){
			var div = infoPanel.children[num];
	    for(let i = 1; i<div.children.length;i++){
	      div.children[i].remove();
	    }
		},
		updateHealth : function(){
			var div = document.getElementById("Health");
			div.children[0].innerHTML = "" + this.health*10 + "%";
		},
		updateMoney : function(){
			var div = document.getElementById("Money");
			div.children[0].innerHTML = "$" + this.money.toFixed(2);
		},
		updateLevels : function(num){
			var div = document.getElementById("Ship Levels");
			if(num==0){
				div.children[num].innerHTML = "Shield: " + this.shieldLevel;
			} else if(num==1){
				div.children[num].innerHTML = "Weapons: " + this.weaponsLevel;
			} else if(num==2){
				div.children[num].innerHTML = "Engines: " + this.engineLevel;
			}
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
	let panel = document.getElementById("gamepanel0");
	panel.style.display = "block";
	document.addEventListener("keypress", function handler(event) {
		switch(event.key) {
			case " ":
				document.removeEventListener("keypress", handler);
				panel.style.display = "none";
				break;
			default:
				return;
		}
	});
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
		} else if(gameState=="transition"){

		}
	}
}
