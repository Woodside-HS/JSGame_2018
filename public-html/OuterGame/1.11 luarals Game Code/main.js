window.onload = init;
//new branch
var canvas;
var ctx;
var worlds = [];
var currentLevel = -1;
//var ship;

function init(){
  canvas = document.getElementById('cnv');
  canvas.width = 800;
  canvas.height = 800;
  canvas.style.backgroundColor = 'black';
  ctx = canvas.getContext('2d');

  makeWorld();
  animate();
}

function makeWorld(){
  //increase current level number-- first one starts at 0
  currentLevel++;
  var w = new World(currentLevel);
  //add world to array
  worlds.push(w);
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  //run this level's world
  worlds[currentLevel].run();

}
