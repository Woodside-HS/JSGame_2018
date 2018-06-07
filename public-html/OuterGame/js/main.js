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
		health: null, //holds the ship's health statblock, can't put in here bc doesn't exist yet
		money : 100,
		inventory : [], //each has a value
		shieldLevel : 1,
		innerWeaponsLevel : 1,
		innerEngineLevel : 1,
		outerWeaponsLevel : 1,
		outerEngineLevel : 1,
		minions: 5,
		fogLevel: 1,

		sellItem : function(item){
			let name = item.id;
			for(let i=0;i<this.inventory.length;i++){
				if(this.inventory[i].name==name){
					//if there is an item in the inventory with the name of the item being sold, then can sell it
					this.money += this.inventory[i].value; //add money
					this.inventory.splice(i,1); //remove item
					let button = document.getElementById("invInfo").children[3];
					button.disabled = true;
					//disable button to show cant sell anymore
				}
			}
			this.updateMoney();
		},
		buy : function(object){ //add object to inventory
			this.money -= object.price;
			this.updateMoney();
			console.log(object.cat);
			switch (object.cat){
			case "Yokerling Bokum":
				this.shieldLevel += 1;
				document.getElementById("Yokerling Bokum").className = "oldTile";//old tiles turn gray and can't be bought again
				document.getElementById("shopInfo").children[3].disabled = true;//button disabled so can't be bought again
				break;
			case "Fruit Cake":
				this.shieldLevel += 1;
				document.getElementById("Yokerling Bokum").className = "tile"; //next level item is enabled
				document.getElementById("Fruit Cake").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "Gandalf":
				this.shieldLevel += 1;
				document.getElementById("Fruit Cake").className = "tile";
				document.getElementById("Gandalf").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "Cannon":
				this.outerWeaponsLevel += 1;
				break;
			case "Missiles":
				this.outerWeaponsLevel += 1;
				break;
			case "Biffle Ball":
				this.innerWeaponsLevel += 1;
				document.getElementById("The Holy Grail").className = "tile";
				document.getElementById("Biffle Ball").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "The Holy Grail":
				this.innerWeaponsLevel += 1;
				document.getElementById("788’481’515’’6765-132154--16").className = "tile";
				document.getElementById("The Holy Grail").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "788’481’515’’6765-132154--16":
				this.innerWeaponsLevel += 1;
				document.getElementById("788’481’515’’6765-132154--16").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "1958 Ferrari GT-3432":
			document.getElementById("[Gurgling Noises]").className = "tile";
			document.getElementById("1958 Ferrari GT-3432").className = "oldTile";
			document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "[Gurgling Noises]":
				this.outerEngineLevel += 1;
				document.getElementById("Canadian Mooseherder").className = "tile";
				document.getElementById("[Gurgling Noises]").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "Canadian Mooseherder":
				this.innerEngineLevel += 1;
				document.getElementById("Canadian Mooseherder").className = "oldTile";
				document.getElementById("shopInfo").children[3].disabled = true;
				break;
			case "Max HP Increase":
				this.health.maxHp += 3;
				player_config.max_hp+=10;
				ui_elements.player_healthbar.max_value+=10;
				break;
			case "Instant Health Boost":
				System().ship.stats.healDamage(10);
				break;
			case "Minions":
				this.minions+=1;
				break;
			case "Game Room":
				//doesn't do anything?
				break;
			case "Vision Enhancer":
				if(playerStats.revealLevel<=4)
				playerStats.revealLevel+=1;
				break;
			}
		},


		updateMoney : function(){
			var div = document.getElementById("moneyDiv");  //div in upper left corner that shows money
			document.getElementById("amount").remove();  //clear out the paragraph inside the div
			//create a new paragraph and node to add to div with new amount of money
			var node = document.createTextNode("$"+this.money.toFixed(2));
			var text = document.createElement("p");
			text.appendChild(node);
			text.id = "amount";
			div.appendChild(text);
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

	let panelo = document.getElementById("outerhelp");
	panelo.appendChild(Images["helpouter"]);
	panelo.style.display = "none";

	let paneli = document.getElementById("innerhelp");
	paneli.appendChild(Images["helpinner"]);
	paneli.style.display = "none";

	document.getElementById("help").addEventListener("click", handleHelpPanel);
	animate();
}

function makeWorld(){
  //increase current level number-- first one starts at 0
  currentLevel++;
  var w = new World(currentLevel);
  //add world to array
  worlds.push(w);
	play = false;
	let panela = document.getElementById("gamepanela");
	panela.appendChild(Images["splashpanel"]);
	panela.style.display = "block";
	document.addEventListener("keypress", function handler(event) {
		switch(event.key) {
			case " ":
				if(!play){ //Zeej: to get from splash (planela) to intro (panel1) correctly
					gameState = "transition";
					//document.removeEventListener("keypress", handler);
					panela.style.display = "none";
					let panelh = document.getElementById("titlehead");
					panelh.appendChild(Images["logohead"]);
					panelh.style.display = "block";

					let panelq = document.getElementById("help");
					panelq.appendChild(Images["question"]);
					panelq.style.display = "block";

					let panel1 = document.getElementById("gamepanel0");
					panel1.appendChild(Images["panel00"]);
					panel1.style.display = "block";
					play = true;
					break;
				}else{
					gameState = "outer";
					document.removeEventListener("keypress", handler);
					document.getElementById("gamepanel0").style.display = "none";
					w.initialize();
					setInterval(animate, 1000/FPS);
					break;
				}
			default:
				return;
		}
	});
	if(gameState === "transition"){
		// let panel1 = document.getElementById("gamepanel0");
		// panel1.appendChild(Images["panel00"]);
		// panel1.style.display = "block";
		document.addEventListener("keypress", function handler(event) {
			switch(event.key) {
				case " ":
					gameState = "outer";
					document.removeEventListener("keypress", handler);
					panel1.style.display = "none";
					w.initialize();
					setInterval(animate, 1000/FPS);
					break;
				default:
					return;
			}
		});
	}
}

function handleHelpPanel(){
	let panel;
	var go = false;
	var tempState = gameState;
		if(gameState === "outer"){
			panel = document.getElementById("outerhelp");
			panel.style.display = "block";
		} else if(gameState === "inner"){
			panel = document.getElementById("innerhelp");
			panel.style.display = "block";
		} else {
			go = true;
		}
		gameState = "transition";
		document.addEventListener("keypress", function handler(event) {
			switch(event.key) {
				case " ":
				if(!go){
					panel.style.display = "none";
					go = true;
					gameState = tempState;
					break;
				}
			}
		});
}

function animate(){
	frameCount++;
	if(gameState!="station"){
	  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	  //run this level's world
		if(gameState=="transition"){

		} else if(gameState=="outer" && play){
			worlds[currentLevel].run();
		} else if(gameState=="inner"){
			//inner world
			game.update();
			game.render();
		}
	}
}
