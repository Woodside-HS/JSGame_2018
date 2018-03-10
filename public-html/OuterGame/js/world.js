class World{

  constructor(level){
    this.level = level;
    this.planets = [];
	this.entities = []; // Array of entities
    //area is greater than that of canvas
    this.height = 4800;
    this.width = 4800;

	//create rocketship at center of canvas
    this.ship  = new Rocketship(new Vector2D(canvas.width/2, canvas.height/2));
	playerShip = this.ship;
	this.entities.push(this.ship);

    this.makePlanets(50);
	this.makeAsteroids(180);
	// Create camera object which follows the Rocketship
	this.camera = new Camera();

    //add event listeners that toggle acceleration/deceleration/turning on
    //  when key is down and off when key is up

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
        var x = Math.random() * this.width - this.width/2;
        var y = Math.random() * this.height - this.height/2;
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

	makeAsteroids(num){
		
		for(let i = 0; i < num; i++) {
			let radius = Math.random() * 15 + 4;
			let loc = false;
			let repetitions = 0;
			while(true) {
				repetitions++;
				if(repetitions > 100000) {
					throw new Error("Repetitions exceeded 100,000 in Asteroid creation.");
				}
				let x = Math.random() * this.width - this.width / 2;
				let y = Math.random() * this.height - this.height / 2;
				loc = new Vector2D(x, y);
				for(var j = 0; j < this.entities.length; j++) { // Check each entity
					let dist = Vector2D.distance(this.entities[i].loc, loc);
					if(dist <= (this.entities[i].radius + this.radius) * 1.5) { // If the two are too close to each other...
						break; // Break out of the for loop, back to the while loop, making a new location.
					}
				}
				
				// To escape from the while loop, get through the entire for loop.
				if(j==this.entities.length) {
					break;
				}
			}

			let a = new Asteroid(loc, radius);
			this.entities.push(a);
		}
  }

  checkHitPlanet(){ //issue 9
    for(let i=0;i<this.planets.length;i++){
      if(Vector2D.distance(this.planets[i].loc,this.ship.loc)<(this.planets[i].radius+20)){
        ctx.fillStyle="white";
        ctx.font = "20px Georgia";
        ctx.fillText("[X] to land on planet",canvas.width/2-50,canvas.height/2-50);
        // console.log("hit planet");
      }
    }
  }

	update(){
		this.camera.update();
		this.checkHitPlanet(); //issue 9

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
  }

}
