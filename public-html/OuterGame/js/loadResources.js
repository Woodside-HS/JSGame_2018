function loadImages(){
	Promise.all(
		[new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid1.png';
		}).then(function(img){
			Images['Asteroid1'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid2.png';
		}).then(function(img){
			Images['Asteroid2'] = img;
		}), new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid3.png';
		}).then(function(img){
			Images['Asteroid3'] = img;
		}), new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid4.png';
		}).then(function(img){
			Images['Asteroid4'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid5.png';
		}).then(function(img){
			Images['Asteroid5'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid6.png';
		}).then(function(img){
			Images['Asteroid6'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid7.png';
		}).then(function(img){
			Images['Asteroid7'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid8.png';
		}).then(function(img){
			Images['Asteroid8'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid9.png';
		}).then(function(img){
			Images['Asteroid9'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/Asteroid10.png';
		}).then(function(img){
			Images['Asteroid10'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0001.png';
		}).then(function(img){
			Images['Planet1'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0002.png';
		}).then(function(img){
			Images['Planet2'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0003.png';
		}).then(function(img){
			Images['Planet3'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0004.png';
		}).then(function(img){
			Images['Planet4'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0005.png';
		}).then(function(img){
			Images['Planet5'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0006.png';
		}).then(function(img){
			Images['Planet6'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0007.png';
		}).then(function(img){
			Images['Planet7'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0008.png';
		}).then(function(img){
			Images['Planet8'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0009.png';
		}).then(function(img){
			Images['Planet9'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/sprites/Planet/PlanetTestRender0010.png';
		}).then(function(img){
			Images['Planet10'] = img;
		}),

		// Inner game Images

		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/ships/enemyShip.png';
		}).then(function(img){
			Images['enemyShip'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'res/ships/playerShip.png';
		}).then(function(img){
			Images['playerShip'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/grass.png';
		}).then(function(img){
			Images['grass'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/fog.png';
		}).then(function(img){
			Images['fog'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/rocks2c.png';
		}).then(function(img){
			Images['rocks2c'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/tractor.png';
		}).then(function(img){
			Images['tractor'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/WATERTiles.png';
		}).then(function(img){
			Images['water'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/hpPU.png';
		}).then(function(img){
			Images['hpPU'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/shieldPU.png';
		}).then(function(img){
			Images['shieldPU'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/moneyPU.png';
		}).then(function(img){
			Images['moneyPU'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/techPU.png';
		}).then(function(img){
			Images['techPU'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = '../InnerGame/res/sprites/arrowPU.png';
		}).then(function(img){
			Images['arrowPU'] = img;
		}),
    new Promise(function(resolve, reject){
	    var img = new Image();
    	img.addEventListener('load', function(){
    		resolve(img);
    	});
    	img.addEventListener('error', function(){
    		reject();
    	});
	  	img.src = '../InnerGame/res/sprites/splash/youdied.jpg';
		}).then(function(img){
			Images['splash'] = img;
		}),

		// Trading post images

		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/background.png';
		}).then(function(img){
			Images['shopBackground'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/brownie.png';
		}).then(function(img){
			Images['brownie'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/button.png';
		}).then(function(img){
			Images['shopButton'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/cake.png';
		}).then(function(img){
			Images['cake'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/coffee.png';
		}).then(function(img){
			Images['coffee'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/cookie.png';
		}).then(function(img){
			Images['cookie'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'shopIMGS/cupcake.png';
		}).then(function(img){
			Images['cupcake'] = img;
		}),
		new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'Panels/panel.png';
		}).then(function(img){
			Images['panel01'] = img;
		}),
	]).then(function(){
		loadSounds();
	})
}

function loadSounds(){
	Promise.all([]).then(function(){
		init();
	})
}
