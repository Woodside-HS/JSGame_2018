class World{

  constructor(level){
    this.level = level;
    this.planets = [];
	this.entities = []; // Array of entities
    //area is greater than that of canvas
    this.height = 2400;
    this.width = 2400;

	// Debug mode determines whether certain measurements appear for testing purposes
	this.debugMode = true;

	//create rocketship at center of canvas
    this.ship  = new Rocketship(new Vector2D(0, 0));
	playerShip = this.ship;
	this.entities.push(this.ship);

	this.cursorX = 0;
	this.cursorY = 0;

	document.addEventListener("mousemove", (e) => {
        var rect = canvas.getBoundingClientRect(); // abs. size of element
    
        this.cursorX = e.clientX - rect.left;   // scale mouse coordinates after they have
        this.cursorY = e.clientY - rect.top;     // been adjusted to be relative to element
    });

	document.addEventListener("click", (e) => {
		let arr = this.getCursorTargets();
		let target = arr[Math.floor(Math.random() * arr.length)]; // Random thing in the array
		this.cursorTarget = target;
	})

    this.makePlanets(40);
	//this.makeAsteroids(100);
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
      }
    }
  }

	screenCursorPos() { // Position of cursor relative to CENTER OF SCREEN
		return new Vector2D(this.cursorX, this.cursorY);
	}

	shipCursorPos() { // Position of cursor relative to SHIP

		let posX = canvas.width/2 - this.screenCursorPos().x;
		let posY = canvas.height/2 - this.screenCursorPos().y;

		return new Vector2D(posX, posY);
	}

	worldCursorPos() { // Position of cursor relative to WORLD

		let relativePos = this.shipCursorPos();

		let posX = this.ship.loc.x - relativePos.x;
		let posY = this.ship.loc.y - relativePos.y;

		return new Vector2D(posX, posY);
	}

	getScreenPosition(object) { // Find position (relative to center of screen) of any object
	
		let posX = canvas.width / 2 + object.loc.x - this.ship.loc.x;
		let posY = canvas.height / 2 + object.loc.y - this.ship.loc.y;

		return new Vector2D(posX, posY);
	}

	getCursorTargets() { // Returns an array of entities & planets the cursor is hovering over (for selection purposes)
		let arr = [];
		let cursorPos = this.worldCursorPos();
		for(let i in this.planets) {
			let other = this.planets[i];
			
			let distance = cursorPos.distance(other.loc);
			if(distance <= other.radius) {
				arr.push(other);
			}

		}
		for(let i in this.entities) {
			let other = this.entities[i];

			let distance = cursorPos.distance(other.loc);
			if(distance <= other.radius) {
				arr.push(other);
			}
		}
		return arr;
	}

	update(){
		this.camera.update();
		this.checkHitPlanet(); //issue 9

		if(this.debugMode) { // Display coordinates of ship and cursor
			ctx.fillStyle="white";
			ctx.font = "20px Georgia";

			ctx.fillText("Press [U] to toggle Debug Mode",20,25);

			ctx.fillText("Cursor World Coordinates: (" + Math.round(this.worldCursorPos().x) + ", " + Math.round(this.worldCursorPos().y) + ")",20,canvas.height-15);
			ctx.fillText("Cursor Screen Coordinates: (" + Math.round(this.shipCursorPos().x) + ", " + Math.round(this.shipCursorPos().y) + ")",20,canvas.height-40);
			ctx.fillText("Ship Coordinates: (" + Math.round(this.ship.loc.x) + ", " + Math.round(this.ship.loc.y) + ")",20,canvas.height-65);

			ctx.fillText("Ship Velocity: " + Math.round(this.ship.vel.magnitude()) + " (" + Math.round(this.ship.vel.x) + ", " + Math.round(this.ship.vel.y) + ")",20,canvas.height-120);
			ctx.fillText("Number of Entities: " + this.entities.length,20,canvas.height-175);
			ctx.fillText("Number of Planets: " + this.planets.length,20,canvas.height-200);


			ctx.fillStyle = "#00FFFF";
			if(this.cursorTarget) {
				ctx.fillText("Target Name: " + (this.cursorTarget.name ? this.cursorTarget.name : "-None-"), 20, 80);
				ctx.fillText("Target Coordinates: (" + Math.round(this.cursorTarget.loc.x) + ", " + Math.round(this.cursorTarget.loc.y) + ")", 20, 105);
				ctx.fillText((this.cursorTarget.vel ? "Target Velocity: " + Math.round(this.cursorTarget.vel.magnitude()) + " (" + Math.round(this.cursorTarget.vel.x) + ", " + Math.round(this.cursorTarget.vel.y) + ")" : "No Target Velocity"), 20, 130);
			} else {
				ctx.fillText("-No Target-", 20, 80);
			}
		}

		ctx.save();
		let cursorPos = this.screenCursorPos();
		ctx.translate(cursorPos.x, cursorPos.y);
		ctx.beginPath();
		ctx.fillStyle = '#00FFFF';
		ctx.strokeStyle = '#00FFFF';
	    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(0, 0, 6, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();

		if(this.cursorTarget) {

			let position = this.getScreenPosition(this.cursorTarget);

			ctx.save();
			ctx.translate(position.x, position.y);
			ctx.beginPath();
			ctx.strokeStyle = '#00FFFF';
			ctx.arc(0, 0, this.cursorTarget.radius * 1.2 + 1, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();
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
  }

}
