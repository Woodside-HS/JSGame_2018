window.onload = loadImages;
//new branch
//  This is for demo purposes

//change 2
var canvas;
var ctx;
var planet;
var Images = {};
var SpritesheetArray = [];
var worlds = [];
var imageArray = [];
var currentLevel = -1;

var playerShip = function() { // Mostly-useless function but sometimes important
	return System().ship;
}

var FPS = 60; // Frames per second

var System = function() {
	return worlds[currentLevel];
}

//var ship;

function loadImages(){
	//start of loading promises into Images
	Promise.all(
		[new Promise(function(resolve, reject){
			time1 = Date.now();
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'js/Planet/Asteroid1.png';
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
			img.src = 'js/Planet/Asteroid2.png';
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
			img.src = 'js/Planet/Asteroid3.png';
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
			img.src = 'js/Planet/Asteroid4.png';
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
			img.src = 'js/Planet/Asteroid5.png';
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
			img.src = 'js/Planet/Asteroid6.png';
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
			img.src = 'js/Planet/Asteroid7.png';
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
			img.src = 'js/Planet/Asteroid8.png';
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
			img.src = 'js/Planet/Asteroid9.png';
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
			img.src = 'js/Planet/Asteroid10.png';
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
			img.src = 'js/Planet/PlanetTestRender0001.png';
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
			img.src = 'js/Planet/PlanetTestRender0002.png';
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
			img.src = 'js/Planet/PlanetTestRender0003.png';
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
			img.src = 'js/Planet/PlanetTestRender0004.png';
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
			img.src = 'js/Planet/PlanetTestRender0005.png';
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
			img.src = 'js/Planet/PlanetTestRender0006.png';
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
			img.src = 'js/Planet/PlanetTestRender0007.png';
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
			img.src = 'js/Planet/PlanetTestRender0008.png';
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
			img.src = 'js/Planet/PlanetTestRender0009.png';
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
			img.src = 'js/Planet/PlanetTestRender0010.png';
		}).then(function(img){
			Images['Planet10'] = img;
			time2 = Date.now();
			console.log("Seperate Image Load Time: " , time2-time1);
		})
	]).then(function(){
		new Promise(function(resolve, reject){
			time3 = Date.now();
			var img = new Image();
			img.addEventListener('load', function(){
				resolve(img);
			});
			img.addEventListener('error', function(){
				reject();
			});
			img.src = 'js/Planet/spritesheet.png';
		}).then(function(img){
			Images['Spritesheet'] = img;
			time4 = Date.now();
			console.log("Spritesheet Load Time: " , time4-time3);
			init();
		});
		//end of promises
	})
}
function init(){
	canvas = document.getElementById('cnv');

	canvas.width = 1024;
	canvas.height = 676;

	/*canvas.width = window.innerWidth * 0.97;
	canvas.height = window.innerHeight * 0.97;*/


	canvas.style.backgroundColor = 'black';
	ctx = canvas.getContext('2d');
	makeWorld();
	var wrapper = document.getElementById('wrapper');
	var loaderwrapper = document.getElementById('loader-wrapper');
	loaderwrapper.style.display = 'none';
	wrapper.style.display = 'block';
	setTimeout(animate, 1000/FPS);
}

function makeWorld(){
  //increase current level number-- first one starts at 0
  currentLevel++;
  var w = new World(currentLevel);
  //add world to array
  worlds.push(w);
  w.initialize();
}

function animate(){
  //requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  //run this level's world
  worlds[currentLevel].run();
  setTimeout(animate, 1000/FPS);
}
