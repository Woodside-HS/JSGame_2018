let imageSources = {//Properties of imageSources match names of images
	//outer game images
	Asteroid1: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid1.png",
	},
	Asteroid2: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid2.png",
	},
	Asteroid3: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid3.png",
	},
	Asteroid4: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid4.png",
	},
	Asteroid5: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid5.png",
	},
	Asteroid6: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid6.png",
	},
	Asteroid7: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid7.png",
	},
	Asteroid8: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid8.png",
	},
	Asteroid9: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid9.png",
	},
	Asteroid10: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/Asteroid10.png",
	},
	Planet1: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/p0001.png",
	},
	Planet2: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/p0010.png",
	},
	Planet3: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/p0011.png",
	},
	Planet4: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/p0008.png",
	},
	Planet5: {
		sourceString: "public-html/OuterGame/res/sprites/Planet/p0006.png",
	},
	playerShip: {
		sourceString: "public-html/OuterGame/res/sprites/Finalimgs/SpaceShip.png",
	},
	starfield: {
		sourceString: "public-html/OuterGame/res/starfield.png"
	},
	Station: {
		sourceString: "public-html/OuterGame/res/sprites/Finalimgs/AllySpaceStation4.png"
	},
	Drone1: {
		sourceString: "public-html/OuterGame/res/sprites/Finalimgs/Drone2.png"
	},
	Drone2: {
		sourceString: "public-html/OuterGame/res/sprites/Finalimgs/Drone3.png"
	},
	Drone3: {
		sourceString: "public-html/OuterGame/res/sprites/Finalimgs/Drone4.png"
	},
	//inner game images
	grass: {
		sourceString: "public-html/InnerGame/res/sprites/grass.png",
	},
	fog: {
		sourceString: "public-html/InnerGame/res/sprites/fog.png",
	},
	rocks2c: {
		sourceString: "public-html/InnerGame/res/sprites/rocks2c.png",
	},
	tractor: {
		sourceString: "public-html/InnerGame/res/sprites/tractor.png",
	},
	WATERTiles: {
		sourceString: "public-html/InnerGame/res/sprites/WATERTiles.png",
	},
	hpPU: {
		sourceString: "public-html/InnerGame/res/sprites/hpPU.png",
	},
	shieldPU: {
		sourceString: "public-html/InnerGame/res/sprites/shieldPU.png",
	},
	moneyPU: {
		sourceString: "public-html/InnerGame/res/sprites/moneyPU.png",
	},
	techPU: {
		sourceString: "public-html/InnerGame/res/sprites/techPU.png",
	},
	arrowPU: {
		sourceString: "public-html/InnerGame/res/sprites/arrowPU.png",
	},
	splash: {
		sourceString:"public-html/InnerGame/res/sprites/splash/youdied.jpg",
	},
	creature1: {
		sourceString:"public-html/InnerGame/res/sprites/creatures/FatBat.png"
	},
	creature2: {
		sourceString:"public-html/InnerGame/res/sprites/creatures/green.png"
	},
	creature3: {
		sourceString:"public-html/InnerGame/res/sprites/creatures/chickenwithabelt.png"
	},
	creature4: {
		sourceString:"public-html/InnerGame/res/sprites/creatures/Ratwithahood.png"
	},
	creature5: {
		sourceString:"public-html/InnerGame/res/sprites/creatures/AlienMage.png"
	},
	// Panels
	logohead: {
		sourceString:"public-html/OuterGame/res/panels/header.png",
	},
	question: {
		sourceString:"public-html/OuterGame/res/panels/questionMark.png",
	},
	splashpanel: {
		sourceString:"public-html/OuterGame/res/panels/TheSplash.png",
	},
	helpinner: {
		sourceString:"public-html/OuterGame/res/panels/panel_IG.png",
	},
	helpouter: {
		sourceString:"public-html/OuterGame/res/panels/panel_OG.png",
	},
	panel00: {
		sourceString:"public-html/OuterGame/res/panels/IntroText2.png",
	},
	panel01: {
		sourceString:"public-html/OuterGame/res/panels/bluedown.png",
	},
	panel02: {
		sourceString:"public-html/OuterGame/res/panels/greendown.png",
	},
	panel03: {
		sourceString:"public-html/OuterGame/res/panels/greydown.png",
	},
	panel04: {
		sourceString:"public-html/OuterGame/res/panels/purpledown.png",
	},
	panel05: {
		sourceString:"public-html/OuterGame/res/panels/reddown.png",
	},
	// Trading post images
	stationBackground: {
		sourceString:"public-html/OuterGame/shopIMGS/background.png",


		roverEngine: {
			sourceString:"public-html/OuterGame/shopIMGS/engine2.png",
		},
		fogRemover: {
			sourceString:"public-html/OuterGame/shopIMGS/fog.png",
		},
		health: {
			sourceString:"public-html/OuterGame/shopIMGS/health.png",
		},
		lasergun: {
			sourceString:"public-html/OuterGame/shopIMGS/lasergun.png",
		},
		turret: {
			sourceString:"public-html/OuterGame/shopIMGS/turret.png",
		},
		shield: {
			sourceString:"public-html/OuterGame/shopIMGS/shield.png",
		},
		minion: {
			sourceString:"public-html/OuterGame/shopIMGS/minion.png",
		},
		exitButton: {
			sourceString:"public-html/OuterGame/shopIMGS/exit.png",
		}
	},
	minion: {
		sourceString: "public-html/InnerGame/res/sprites/minions/minion.png",
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
