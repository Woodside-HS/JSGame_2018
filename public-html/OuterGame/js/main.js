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
		health: null,
		money : 100,
		inventory : [], //each has a value
		// boosts : [], //boost speed, firing frequency
		// repairs : [], //repair/upgrade shield
		// weapons : [], //add different kinds of weapons to use
		// aliens : [], //objects with png and name/planet
		shieldLevel : 1,
		weaponsLevel : 1, //may have to split into different weapons/tools
		engineLevel : 1,
		minions: 5,
		fogLevel: 1,

		sellItem : function(item){
			let name = item.id;
			let available = false;
			for(let i=0;i<this.inventory.length;i++){
				if(this.inventory[i].name==name){
					this.money += this.inventory[i].value;
					this.inventory.splice(i,1);
					available = true;
					SpaceStation.infoDiv.render(item,false);
				}
			}
			if(!available){ //if item is not available in inventory (player doesn't have it to sell anymore)
				//disable button to show cant sell anymore
				let button = document.getElementById("invInfo").children[3];
				button.disabled = true;
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
				if(object.id=="Max HP Increase"){
					this.health.maxHp +=3;
				} else if(object.id == "Instant Health Boost"){
					if(System().ship.stats.damageTaken==0){ //if ship isn't damaged, don't buy
						this.money += object.price;
					} else{
						System().ship.stats.healDamage(10);
					}
				}
			} else if (object.cat==="miscDiv"){
				if(object.id=="Minions"){
					this.minions+=1;
				} else if(object.id=="Fog Remover"){
					fogLevel +=1;
				}
			}
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
  w.initialize();
	setInterval(animate, 1000/FPS);
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
