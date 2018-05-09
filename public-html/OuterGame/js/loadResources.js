let imageSources = {//Properties of imageSources match names of images
	//outer game images
	Asteroid1: {
		sourceString:"res/sprites/Planet/Asteroid1.png",
	},
	Asteroid2: {
		sourceString:"res/sprites/Planet/Asteroid2.png",
	},
	Asteroid3: {
		sourceString:"res/sprites/Planet/Asteroid3.png",
	},
	Asteroid4: {
		sourceString:"res/sprites/Planet/Asteroid4.png",
	},
	Asteroid5: {
		sourceString:"res/sprites/Planet/Asteroid5.png",
	},
	Asteroid6: {
		sourceString:"res/sprites/Planet/Asteroid6.png",
	},
	Asteroid7: {
		sourceString:"res/sprites/Planet/Asteroid7.png",
	},
	Asteroid8: {
		sourceString:"res/sprites/Planet/Asteroid8.png",
	},
	Asteroid9: {
		sourceString:"res/sprites/Planet/Asteroid9.png",
	},
	Asteroid10: {
		sourceString:"res/sprites/Planet/Asteroid10.png",
	},
	Planet1: {
		sourceString:"res/sprites/Planet/PlanetTestRender0001.png",
	},
	Planet2: {
		sourceString:"res/sprites/Planet/PlanetTestRender0002.png",
	},
	Planet3: {
		sourceString:"res/sprites/Planet/PlanetTestRender0003.png",
	},
	Planet4: {
		sourceString:"res/sprites/Planet/PlanetTestRender0004.png",
	},
	Planet5: {
		sourceString:"res/sprites/Planet/PlanetTestRender0005.png",
	},
	Planet6: {
		sourceString:"res/sprites/Planet/PlanetTestRender0006.png",
	},
	Planet7: {
		sourceString:"res/sprites/Planet/PlanetTestRender0007.png",
	},
	Planet8: {
		sourceString:"res/sprites/Planet/PlanetTestRender0008.png",
	},
	Planet9: {
		sourceString:"res/sprites/Planet/PlanetTestRender0009.png",
	},
	Planet10: {
		sourceString:"res/sprites/Planet/PlanetTestRender0010.png",
	},
	enemyShip: {
		sourceString:"res/ships/enemyShip.png",
	},
	playerShip: {
		sourceString:"res/ships/playerShip.png",
	},
	//inner game images
	grass: {
		sourceString:"../InnerGame/res/sprites/grass.png",
	},
	fog: {
		sourceString:"../InnerGame/res/sprites/fog.png",
	},
	rocks2c: {
		sourceString:"../InnerGame/res/sprites/rocks2c.png",
	},
	tractor: {
		sourceString:"../InnerGame/res/sprites/tractor.png",
	},
	WATERTiles: {
		sourceString:"../InnerGame/res/sprites/WATERTiles.png",
	},
	hpPU: {
		sourceString:"../InnerGame/res/sprites/hpPU.png",
	},
	shieldPU: {
		sourceString:"../InnerGame/res/sprites/shieldPU.png",
	},
	moneyPU: {
		sourceString:"../InnerGame/res/sprites/moneyPU.png",
	},
	techPU: {
		sourceString:"../InnerGame/res/sprites/techPU.png",
	},
	arrowPU: {
		sourceString:"../InnerGame/res/sprites/arrowPU.png",
	},
	splash: {
		sourceString:"../InnerGame/res/sprites/splash/youdied.jpg",
	},
	// Trading post images
	shopBackground: {
		sourceString:"shopIMGS/background.png",
	},
	brownie: {
		sourceString:"shopIMGS/brownie.png",
	},
	shopButton: {
		sourceString:"shopIMGS/button.png",
	},
	cake: {
		sourceString:"shopIMGS/cake.png",
	},
	coffee: {
		sourceString:"shopIMGS/coffee.png",
	},
	cookie: {
		sourceString:"shopIMGS/cookie.png",
	},
	cupcake: {
		sourceString:"shopIMGS/cupcake.png",
	},
}

function loadImages(){
	let promises = [];
	for(let index in imageSources){
		if(imageSources.hasOwnProperty(index)){
			promises.push(new Promise(function(resolve,reject){
				var img = new Image();
				img.addEventListener('load', function(){
					resolve(img);
				});
				img.addEventListener('error', function(){
					reject();
				});
				img.src = imageSources[index].sourceString;
			}).then(function(img){
				Images[index] = img;
			}))
		}
	}
	Promise.all(promises).then(function(){
		loadSounds();
	});
}

function loadSounds(){
	Promise.all([]).then(function(){
		init();
	})
}
