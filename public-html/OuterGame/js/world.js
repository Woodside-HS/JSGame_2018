class World{

  constructor(level){
    this.level = level;
    this.planets = [];
	this.entities = []; // Array of entities
    //area is greater than that of canvas
    this.height = 2400;
    this.width = 2400;

	// Player control mode (either 0, WASD movement, or 1, so ship follows the cursor)
	this.playerControl = 0;

	// Debug mode determines whether certain measurements appear for testing purposes
	this.debugMode = true;

	//create rocketship at center of canvas
    this.ship  = new Rocketship(new Vector2D(canvas.width/2, canvas.height/2));
	playerShip = this.ship;
	this.entities.push(this.ship);

    this.makePlanets(50);
	  this.makeAsteroids(180, true); //issue 12, will spawn in canvas

	this.cursorX = 0;
	this.cursorY = 0;

	document.addEventListener("mousemove", (e) => {
        var rect = canvas.getBoundingClientRect(); // abs. size of element

        this.cursorX = e.clientX - rect.left;   // scale mouse coordinates after they have
        this.cursorY = e.clientY - rect.top;     // been adjusted to be relative to element
    });

	// Create camera object which follows the Rocketship
	this.camera = new Camera();

    //add event listeners that toggle acceleration/deceleration/turning on
    //  when key is down and off when key is up

	document.addEventListener("keypress", (event) => {
		switch (event.key) {
			case "u":
			this.debugMode = !this.debugMode;
		}
	});

    document.addEventListener("keydown", function(event){;
      switch (event.key) {
        case "s":
          worlds[currentLevel].ship.down = true;
        break;
        case "w":
          worlds[currentLevel].ship.up = true;
        break;
        case "a":
          worlds[currentLevel].ship.left = true;
        break;
        case "d":
          worlds[currentLevel].ship.right = true;
        break;
      }
    });
    document.addEventListener("keyup", function(event){;
      switch (event.key) {
        case "s":
          worlds[currentLevel].ship.down = false;
        break;
        case "w":
          worlds[currentLevel].ship.up = false;
        break;
        case "a":
          worlds[currentLevel].ship.left = false;
        break;
        case "d":
          worlds[currentLevel].ship.right = false;
        break;
      }
    });
  }

  makePlanets(num){
    for(var i = 0; i < num; i++){
      var radius = Math.random() * 50 + 10;
      //set location vector, prevent planet overlap by choosing new location for planet
      //until all planets are far enough apart
      while (true) {
        var x = Math.random() * this.width*2 - this.width;
        var y = Math.random() * this.height*2 - this.height;
        var loc = new Vector2D(x, y);
        for(var i = 0; i < this.planets.length; i++){
          var dist = Vector2D.distance(this.planets[i].loc, loc);
          if(dist <= (this.planets[i].radius + radius)*1.5){break;}
        }
        if(i === this.planets.length){break;}
      }
      var p = new Planet(radius, loc);
      this.planets.push(p);
    }
  }

  makeAsteroids(num, bool){ //issue 12
    let counter = num;
    var a = true; //check if is far enough away from other entities to be drawn
    while(counter>0){
      a = true;
      var r = (Math.random()*20)+5;
      var x = (Math.random() * this.width*2) - this.width;
      var y = (Math.random() * this.height*2) - this.height;
      var vel = new Vector2D(Math.random()*6-3,Math.random()*6-3);
      var ast = new Asteroid(new Vector2D(x,y),vel,null,r);
      if(!bool){ //bool=if asteroids can show up in canvas
        let b1 = (x+r)<(this.ship.loc.x+(canvas.width/2));
        let b2 = (x-r)>(this.ship.loc.x-(canvas.width/2));
        let b3 = (y+r)<(this.ship.loc.y+(canvas.height/2));
        let b4 = (y-r)>(this.ship.loc.y-(canvas.height/2));
        //all the b vars check if the loc+radius are in the canvas
        if (b1||b2||b3||b4) { // if it's inside the canvas
          a = false; //asteroid should not be pushed to entities array
        }
      }
      // goes through array of entities and checks that new asteroid isn't too close to any
      for(let i=0;i<this.entities.length;i++){
        let dist = Vector2D.distance(this.entities[i].loc,ast.loc);
        let radii = this.entities[i].radius+ast.radius;
        if(dist<(radii*1.5)){ //if it's too close to something else
          a = false; //will not be pushed to entities
        }
      }
      if(a){ //if not too close to any other entities
        this.entities.push(ast);
        counter--;
      }
    }
  }

  checkHitPlanet(){ //issue 9
    for(let i=0;i<this.planets.length;i++){
      if(Vector2D.distance(this.planets[i].loc,this.ship.loc)<(this.planets[i].radius+20)){
        ctx.fillStyle="white";
        ctx.font = "20px Georgia";
        ctx.fillText("[X] to land on planet",canvas.width/2-50,canvas.height/2-50);
      }
    }
  }

  drawWorldEdge(){ //issue 45
    ctx.beginPath();
    ctx.moveTo(-(this.width-this.ship.loc.x),-(this.height-this.ship.loc.y));
    ctx.lineTo((this.width-this.ship.loc.x),-(this.height-this.ship.loc.y));
    ctx.lineTo((this.width-this.ship.loc.x),(this.height-this.ship.loc.y));
    ctx.lineTo(-(this.width-this.ship.loc.x),(this.height-this.ship.loc.y));
    ctx.lineTo(-(this.width-this.ship.loc.x),-(this.height-this.ship.loc.y));
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

	screenCursorPos() { // Position of cursor relative to CENTER OF SCREEN
		return new Vector2D(this.cursorX, this.cursorY);
	}

	worldCursorPos() { // Position of cursor relative to WORLD
		let posX = canvas.width/2 - this.cursorX;
		let posY = canvas.height/2 - this.cursorY;
		return new Vector2D(posX, posY);
	}

	update(){
		this.camera.update();
		this.checkHitPlanet(); //issue 9

		if(this.debugMode) { // Display coordinates of ship and cursor
			ctx.fillStyle="white";
			ctx.font = "20px Georgia";

			ctx.fillText("Press [U] to toggle Debug Mode",20,25);

			ctx.fillText("Cursor Coords: (" + Math.round(this.worldCursorPos().x) + ", " + Math.round(this.worldCursorPos().y) + ")",20,canvas.height-15);
			ctx.fillText("Ship Coords: (" + Math.round(this.ship.loc.x) + ", " + Math.round(this.ship.loc.y) + ")",20,canvas.height-40);

			ctx.fillText("Ship Velocity: " + Math.round(this.ship.vel.magnitude()) + " (" + Math.round(this.ship.vel.x) + ", " + Math.round(this.ship.vel.y) + ")",20,canvas.height-95);
			ctx.fillText("Number of Entities: " + this.entities.length,20,canvas.height-150);
			ctx.fillText("Number of Planets: " + this.planets.length,20,canvas.height-175);
		}

		for(let i in this.entities) {
			let entity = this.entities[i];
			entity.update();
			let collisions = entity.checkCollide();
			for(let j in collisions) {
				//entity.collide(collisions[j]);
			}
		}
	}

  render(){

    ctx.save();
    //keep ship in center of canvas
    ctx.translate(canvas.width/2 - this.ship.loc.x, canvas.height/2 - this.ship.loc.y);

    //ctx.translate(this.ship.loc.x, this.ship.loc.y);
    //ctx.rotate(-this.ship.dir)
    //ctx.translate(this.ship.loc.x, this.ship.loc.y);
    //ctx.translate(canvas.width/2 - this.ship.loc.x, canvas.height/2 - this.ship.loc.y);
    //ctx.translate(canvas.width/2, canvas.height/2);
    //draw all planets & ship
    for(var i = 0; i < this.planets.length; i++){
      this.planets[i].render();
    }
  	for(let i in this.entities) {
  		this.entities[i].render();
  	}
    ctx.restore();

  }

  run(){
    this.render();
    this.update();
    this.drawWorldEdge(); //issue 45
  }

}
