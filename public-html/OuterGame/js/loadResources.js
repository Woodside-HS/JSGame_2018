let imageSources = {//Properties of imageSources match names of images
	//outer game images
	Asteroid1: {
		sourceString: "res/sprites/Planet/Asteroid1.png",
	},
	Asteroid2: {
		sourceString: "res/sprites/Planet/Asteroid2.png",
	},
	Asteroid3: {
		sourceString: "res/sprites/Planet/Asteroid3.png",
	},
	Asteroid4: {
		sourceString: "res/sprites/Planet/Asteroid4.png",
	},
	Asteroid5: {
		sourceString: "res/sprites/Planet/Asteroid5.png",
	},
	Asteroid6: {
		sourceString: "res/sprites/Planet/Asteroid6.png",
	},
	Asteroid7: {
		sourceString: "res/sprites/Planet/Asteroid7.png",
	},
	Asteroid8: {
		sourceString: "res/sprites/Planet/Asteroid8.png",
	},
	Asteroid9: {
		sourceString: "res/sprites/Planet/Asteroid9.png",
	},
	Asteroid10: {
		sourceString: "res/sprites/Planet/Asteroid10.png",
	},
	Planet1: {
		sourceString: "res/sprites/Planet/p0001.png",
	},
	Planet2: {
		sourceString: "res/sprites/Planet/p0010.png",
	},
	Planet3: {
		sourceString: "res/sprites/Planet/p0011.png",
	},
	Planet4: {
		sourceString: "res/sprites/Planet/p0008.png",
	},
	Planet5: {
		sourceString: "res/sprites/Planet/p0006.png",
	},
	playerShip: {
		sourceString: "res/sprites/Finalimgs/SpaceShip.png",
	},
	starfield: {
		sourceString: "res/starfield.png"
	},
	Station: {
		sourceString: "res/sprites/Finalimgs/AllySpaceStation4.png"
	},
	Drone1: {
		sourceString: "res/sprites/Finalimgs/Drone2.png"
	},
	Drone2: {
		sourceString: "res/sprites/Finalimgs/Drone3.png"
	},
	Drone3: {
		sourceString: "res/sprites/Finalimgs/Drone4.png"
	},
	//inner game images
	grass: {
		sourceString: "../InnerGame/res/sprites/grass.png",
	},
	fog: {
		sourceString: "../InnerGame/res/sprites/fog.png",
	},
	rocks2c: {
		sourceString: "../InnerGame/res/sprites/rocks2c.png",
	},
	tractor: {
		sourceString: "../InnerGame/res/sprites/tractor.png",
	},
	WATERTiles: {
		sourceString: "../InnerGame/res/sprites/WATERTiles.png",
	},
	hpPU: {
		sourceString: "../InnerGame/res/sprites/hpPU.png",
	},
	shieldPU: {
		sourceString: "../InnerGame/res/sprites/shieldPU.png",
	},
	moneyPU: {
		sourceString: "../InnerGame/res/sprites/moneyPU.png",
	},
	techPU: {
		sourceString: "../InnerGame/res/sprites/techPU.png",
	},
	arrowPU: {
		sourceString: "../InnerGame/res/sprites/arrowPU.png",
	},
	splash: {
		sourceString:"../InnerGame/res/sprites/splash/youdied.jpg",
	},
	creature1: {
		sourceString:"../InnerGame/res/sprites/creatures/FatBat.png"
	},
	creature2: {
		sourceString:"../InnerGame/res/sprites/creatures/green.png"
	},
	creature3: {
		sourceString:"../InnerGame/res/sprites/creatures/chickenwithabelt.png"
	},
	creature4: {
		sourceString:"../InnerGame/res/sprites/creatures/Ratwithahood.png"
	},
	creature5: {
		sourceString:"../InnerGame/res/sprites/creatures/AlienMage.png"
	},
	// Panels
	panel01: {
		sourceString:"res/panels/bluedown.png",
	},
	panel02: {
		sourceString:"res/panels/greendown.png",
	},
	panel03: {
		sourceString:"res/panels/greydown.png",
	},
	panel04: {
		sourceString:"res/panels/purpledown.png",
	},
	panel05: {
		sourceString:"res/panels/reddown.png",
	},
	// Trading post images
	stationBackground: {
		sourceString:"shopIMGS/background.png",


		roverEngine: {
			sourceString:"shopIMGS/engine2.png",
		},
		fogRemover: {
			sourceString:"shopIMGS/fog.png",
		},
		health: {
			sourceString:"shopIMGS/health.png",
		},
		lasergun: {
			sourceString:"shopIMGS/lasergun.png",
		},
		turret: {
			sourceString:"shopIMGS/turret.png",
		},
		shield: {
			sourceString:"shopIMGS/shield.png",
		},
		minion: {
			sourceString:"shopIMGS/minion.png",
		},
		exitButton: {
			sourceString:"shopIMGS/exit.png",
		}
	},
	minion1: {
		sourceString: "../InnerGame/res/sprites/minions/1.png",
	},
	minion2: {
		sourceString: "../InnerGame/res/sprites/minions/2.png",
	},
	minion3: {
		sourceString: "../InnerGame/res/sprites/minions/3.png",
	},
	minion4: {
		sourceString: "../InnerGame/res/sprites/minions/4.png",
	},
	minion5: {
		sourceString: "../InnerGame/res/sprites/minions/5.png",
	},
	minion6: {
		sourceString: "../InnerGame/res/sprites/minions/6.png",
	},
	minion7: {
		sourceString: "../InnerGame/res/sprites/minions/7.png"
	}
}


function loadImages() {
	let promises = [];
	for (let index in imageSources) {
		if (imageSources.hasOwnProperty(index)) {
			promises.push(new Promise(function (resolve, reject) {
				var img = new Image();
				var sourceString = imageSources[index].sourceString;
				img.addEventListener('load', function () {
					resolve(img);
				});
				img.addEventListener('error', function (error) {
					console.log('Failed to load: ' + sourceString);
					reject();
				});
				img.src = sourceString;
			}).then(function (img) {
				Images[index] = img;
			}))
		}
	}
	Promise.all(promises).then(function () {
		loadSounds();
	});
}

// let soundSources = {//Properties of soundSources match names of sounds
// 	backgroundMusic: {
// 		sourceString:"res/sounds/A/bgS.mp3",
// 	},
// 	backgroundMusicAlt: {
// 		sourceString:"res/sounds/B/bgS.mp3",
// 	},
// 	badNoiseDontUse: {
// 		sourceString:"res/sounds/B/GoodNoiseplsuse.wav",
// 	},
// 	click: {
// 		sourceString:"res/sounds/A/click.mp3",
// 	},
// 	cllsn: {
// 		sourceString:"res/sounds/A/cllsn.mp3",
// 	},
// 	ding: {
// 		sourceString:"res/sounds/A/ding.mp3",
// 	},
// 	doom: {
// 		sourceString:"res/sounds/A/doom.mp3",
// 	},
// 	error: {
// 		sourceString:"res/sounds/B/err.wav",
// 	},
// 	keyStroke1: {
// 		sourceString:"res/sounds/B/computernoise1.wav",
// 	},
// 	keyStroke2: {
// 		sourceString:"res/sounds/B/computernoise2.wav",
// 	},
// 	keyStroke3: {
// 		sourceString:"res/sounds/B/computernoise3.wav",
// 	},
// 	mchn: {
// 		sourceString:"res/sounds/A/mchn.mp3",
// 	},
// 	money: {
// 		sourceString:"res/sounds/A/money.mp3",
// 	},
// 	point: {
// 		sourceString:"res/sounds/B/points.wav",
// 	},
// 	mS1: {
// 		sourceString:"res/sounds/A/mS1.mp3",
// 	},
// 	shipCollide1: {
// 		sourceString:"res/sounds/B/CollidingwithOtherShips1.wav",
// 	},
// 	shipCollide2: {
// 		sourceString:"res/sounds/B/CollidingwithOtherShips3.wav",
// 	},
// 	shipForwards: {
// 		sourceString:"res/sounds/B/ShipNoiseForward.wav",
// 	},
// 	shipLand: {
// 		sourceString:"res/sounds/B/SpaceShipLanding1.wav",
// 	},
// 	smash: {
// 		sourceString:"res/sounds/A/smash.mp3",
// 	},
// 	spaceSounds: {
// 		sourceString:"res/sounds/B/spaceambience1.wav",
// 	},
// 	takeoff: {
// 		sourceString:"res/sounds/B/Takeoff.wav",
// 	},
// 	tDest: {
// 		sourceString:"res/sounds/A/tDest.mp3",
// 	},
// 	tNoise: {
// 		sourceString:"res/sounds/A/tNoise.mp3",
// 	},
// 	tpLand: {
// 		sourceString:"res/sounds/B/LandingonTradePost.wav",
// 	},
// 	tradeErr: {
// 		sourceString:"res/sounds/B/unsuccessfultrade.wav",
// 	},
// 	uPup: {
// 		sourceString:"res/sounds/A/uPup.mp3",
// 	},
// 	water: {
// 		sourceString:"res/sounds/A/water.mp3",
// 	},
// 	weaponPulse: {
// 		sourceString:"res/sounds/A/weapon.mp3",
// 	},
// 	xplsn1: {
// 		sourceString:"res/sounds/B/explosion4.wav",
// 	},
// 	xplsn2: {
// 		sourceString:"res/sounds/B/explosion5.wav",
// 	},
// 	xplsn3: {
// 		sourceString:"res/sounds/B/explosion3.wav",
// 	}
// }


  function loadSounds(){
	let promises = [];
	// for(let index in soundSources){
	// 	if(soundSources.hasOwnProperty(index)){
	// 		promises.push(new Promise(function(resolve,reject){
	// 			var sourceString = soundSources[index].sourceString;
	// 			var sou = new Audio(sourceString);
	// 			sou.addEventListener('load', function(){
	// 				resolve(img);
	// 			});
	// 			sou.addEventListener('error', function(){
	// 				reject();
	// 			});
	// 		}).then(function(img){
	// 			Sounds[index] = sou;
	// 		}))
	// 	}
	// }
	Promise.all(promises).then(function(){
		init();
	});
}
