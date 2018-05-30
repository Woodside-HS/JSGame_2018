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
var playerStats = {revealLevel: 1};//which reveal method to use. 1,2,3,4
var frameCount = 0;	// one per animation frame
var realFPS = 0;	// observed frames per second

var FPS = 60; // Desired (intended) Frames per second
function checkFPS() {
	var frames = frameCount;
	frameCount = 0;
	realFPS = frames * 4;
}

setInterval(checkFPS, 250);	// observe FPS every quarter second

var playerShip = function() { // Mostly-useless function but sometimes important
	return System().ship;
}

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
		shieldLevel : 1,
		innerWeaponsLevel : 1, //may have to split into different weapons/tools
		innerEngineLevel : 1,
		outerWeaponsLevel : 1, //may have to split into different weapons/tools
		outerEngineLevel : 1,
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
			//this.updateMoney();
		},
		buy : function(object){ //add object to inventory
			this.money -= object.price;
			//this.updateMoney();
			console.log(object.cat);
			switch (object.cat){
			case "Shield Boost":
				this.shieldLevel += 1;
				break;
			case "Fruit Cake":
				this.shieldLevel += 1;
				break;
			case "Gandalf":
				this.shieldLevel += 1;
				break;
			case "Cannon":
				this.outerWeaponsLevel += 1;
				break;
			case "Missiles":
				this.outerWeaponsLevel += 1;
				break;
			case "datrepoji2k_1":
				this.innerWeaponsLevel += 1;
				break;
			case "garminian_2":
				this.innerWeaponsLevel += 1;
				break;
			case "gaze_3":
				this.innerWeaponsLevel += 1;
				break;
			case "Engine One":
				break;
			case "Engine Two":
				this.outerEngineLevel += 1;
				break;
			case "Engine Three":
				this.innerEngineLevel += 1;
				break;
			case "Max HP Increase":
				this.health.maxHp += 3;
				player_config.max_hp+=10;
				ui_elements.player_healthbar.max_value+=10;
				break;
			case "Instant Health Boost":
				if(System().ship.stats.damageTaken==0){ //if ship isn't damaged, don't buy
					this.money += object.price;
				} else{
					System().ship.stats.healDamage(10);
				}
				break;
			case "Minions":
				this.minions+=1;
				break;
			case "Fog Remover":
				if(playerStats.revealLevel<=4)
				playerStats.revealLevel+=1;
				break;
			}
		},


		// updateMoney : function(){
		// 	var div = document.getElementById("moneyDiv");
		// 	document.getElementById("amount").remove();
		// 	var node = document.createTextNode("$"+this.money.toFixed(2));
		// 	var text = document.createElement("p");
		// 	text.appendChild(node);
		// 	text.id = "amount";
		// 	div.appendChild(text);
		// }
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
	frameCount++;
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
