class World{

  constructor(level){
    this.level = level;
    this.planets = [];
	this.entities = []; // Array of entities
	this.visuals = []; // Array of visual movers that, to save time, don't interact with other objects (they're purely visual)

  this.stations = []; //issue 54

    //area is greater than that of canvas
    this.height = 2400;
    this.width = 2400;

	document.addEventListener("mousemove", (e) => {
        var rect = canvas.getBoundingClientRect(); // Gets the absolute size of the canvas

        this.cursorX = e.clientX - rect.left; // Adjust cursor coordinates to be relative to element
        this.cursorY = e.clientY - rect.top;
    });

	this.cursorTarget = false; // The currently-selected target
	this.cursorTargetRotation = Math.random() * Math.PI * 2; // Degrees of rotation for selection circle visual
	this.targetWheelRotation = 0; // This is just used for the "Scanning..." visual effect

	document.addEventListener("click", (e) => {
    if(this.atStation){ //if player is at a station, will use listener to click on buttons
      let cursorLoc = new Vector2D(e.offsetX,e.offsetY);
      this.stations[0].checkClickButton(cursorLoc);
    } else{
      let target = this.getCursorTarget(); // Finds the right target
  		this.target(target);
    }
	})

    //add event listeners that toggle acceleration/deceleration/turning on
    //  when key is down and off when key is up

	document.addEventListener("keypress", (event) => {
		switch (event.key) {
			case "u":
				this.debugMode = !this.debugMode; // Toggle debug mode on/off
			break;
			case "e":
				this.ship.firing = !this.ship.firing; // Toggle frontal cannon on/off
			break;
			case "r":
				this.targetNearestEntity();
			break;
			case "t":
				this.ship.attemptTorpedoLaunch(); // Launch torpedos, or prime torpedos for launch
			break;
      case "l": //issue 54
        for(let i=0;i<this.stations.length;i++){
          if(this.stations[i].canLandOn){
            //^^if player is close enough to a station to land on it
            gameState = "station";
            var div = document.getElementById("spacestation");
            div.style.display = "block";
            //^^will render station instead of space in run function
          }
        }
      break;
		}
	});

    document.addEventListener("keydown", function(event){;
      switch (event.key) {
        case "s":
          worlds[currentLevel].ship.down = true; // DEACCELERATE
        break;
        case "w":
          worlds[currentLevel].ship.up = true; // ACCELERATE
        break;
        case "a":
          worlds[currentLevel].ship.left = true; // TURN LEFT
        break;
        case "d":
          worlds[currentLevel].ship.right = true; // TURN RIGHT
        break;
      }
    });
    document.addEventListener("keyup", function(event){;
      switch (event.key) {
        case "s":
          worlds[currentLevel].ship.down = false; // DEACCELERATE
        break;
        case "w":
          worlds[currentLevel].ship.up = false; // ACCELERATE
        break;
        case "a":
          worlds[currentLevel].ship.left = false; // TURN LEFT
        break;
        case "d":
          worlds[currentLevel].ship.right = false; // TURN RIGHT
        break;
      }
    });
  }

  initialize() {
	// Debug mode determines whether certain measurements appear for testing purposes
	this.debugMode = true;

	//create rocketship at center of canvas
    this.ship  = new Rocketship(new Vector2D(0, 0));
	playerShip = this.ship; // A dumb global variable we have for some reason
	this.entities.push(this.ship);

    this.makePlanets(50);
	this.makeAsteroids(100, true); //issue 12, will spawn in canvas
      this.makeStations(1); //issue 54

	this.makeEnemies(15); // Spawns in drone ships

	this.cursorX = -50;
	this.cursorY = -50; // The -50 means the cursor doesn't start on the canvas, which is purely for convenience. No in-game effect except a visual tweak.

	// Create camera object which follows the Rocketship
	this.camera = new Camera(); // TODO: make this actually do something?
  }

  addEntity(entity) { // Function to add an entity to the world
  	  this.entities.push(entity);
  }
  addVisual(visual) { // Function to add a visual to the world. Visuals are entities that don't interact with each other.
  	  this.visuals.push(visual);
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
      var vel = new Vector2D(Math.random()*50-25,Math.random()*50-25);
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

  makeEnemies(num) { // Spawn in a bunch of DroneShips.
	for(let i = 0; i < num; i++) {
		let x = Math.random() * this.width * 2 - this.width;
		let y = Math.random() * this.height * 2 - this.height;
		let drone = new DroneShip(new Vector2D(x, y));
		if(i % 6 == 0) {
			//drone = new TorpedoCruiser(new Vector2D(x, y));
		}
		if(i % 14 == 0) {
			//drone = new ShieldPlatform(new Vector2D(x, y));
		}
		this.addEntity(drone);
		drone.initialize();
		// TODO: add more types of enemies
	}
}

  makeStations(num){ //issue 54
    for(let i=0;i<num;i++){
      // let x = (Math.random() * this.width*2) - this.width;
      // let y = (Math.random() * this.height*2) - this.height;
      let x = 0;
      let y = 0;
      this.stations[i] = new SpaceStation(new Vector2D(x,y));
    }
  }

  checkHitPlanet(){ //issue 9
    //if ship is over a planet, text will say player can press a key to land on planet
    for(let i=0;i<this.planets.length;i++){
      if(Vector2D.distance(this.planets[i].loc,this.ship.loc)<(this.planets[i].radius+20)){
        //check if ship is close to any of the planets
        ctx.fillStyle="white";
        ctx.font = "20px Georgia";
        ctx.fillText("[X] to land on planet",canvas.width/2-50,canvas.height/2-50);
      }
    }
  }

  checkHitStation(){ //issue 54,
    //if the ship is hovering over a station, text will pop up on canvas
    for(let i=0;i<this.stations.length;i++){
      if(Vector2D.distance(this.stations[i].loc,this.ship.loc)<40){
        ctx.fillStyle="white";
        ctx.font = "20px Georgia";
        ctx.fillText("[L] to land at station",canvas.width/2-50,canvas.height/2-50);
        this.stations[i].canLandOn = true;
      } else{
        this.stations[i].canLandOn = false;
      }
    }
  }

  drawWorldEdge(){ //issue 45
    ctx.beginPath();
    ctx.moveTo(-this.width,-this.height);
    ctx.lineTo(this.width,-this.height);
    ctx.lineTo(this.width,this.height);
    ctx.lineTo(-this.width,this.height);
    ctx.lineTo(-this.width,-this.height);
    ctx.strokeStyle = "red";
    ctx.stroke();
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

	getCursorTarget() { // Returns entity & planet the cursor is hovering over (for selection purposes)
		let cursorPos = this.worldCursorPos();
		for(let i in this.planets) {
			let other = this.planets[i];

			if(!other.selectable) {
				continue;
			}

			let distance = cursorPos.distance(other.loc);
			if(distance <= other.radius) {
				return other;
			}

		}
		for(let i in this.entities) {
			let other = this.entities[i];

			if(!other.selectable) {
				continue;
			}

			let distance = cursorPos.distance(other.loc);
			if(distance <= other.radius) {
				return other;
			}
		}
		return false;
	}

	targetNearestEntity() { // It's easier than clicking
		let bestDist = {dist: 0, entity: false}; // Stores the best (nearest) distance to the ship
		for(let i in this.entities) {
			let ent = this.entities[i];
			if(ent == this.ship) {
				continue; // Shouldn't target self
			}
			if(!ent.selectable) {
				continue; // Obviously can't target enemies that aren't targetable
			}
			let dist = this.ship.loc.distanceSq(ent.loc); // distanceSq is slightly faster than distance and we're only using it for ">" so it doesn't matter.
			if(dist < bestDist.dist || !bestDist.entity) { // If this distance is better than our PREVIOUS best (or there is no previous best)...
				bestDist.dist = dist; // Set best distance to this distance
				bestDist.entity = ent; // Set best entity to this entity
			}
		}

		if(Math.sqrt(bestDist.dist) > 600) {
			bestDist.entity = false; // Don't target things that are TOO far away...
		}

		this.target(bestDist.entity);
	}

	target(target) {
		if(this.cursorTarget != target) {
			this.ship.targetScanTimer = 0; // Resets timer for scanning
		}
		this.cursorTarget = target; // Sets the target
	}

  drawCursor(){
    // Recolor cursor based on what it's hovering over

    let cursorColor = '#00FFFF'; // Defaults to light blue

    ctx.save();
		let cursorPos = this.screenCursorPos();
		ctx.translate(cursorPos.x, cursorPos.y);
		ctx.beginPath();
		ctx.fillStyle = cursorColor;
		ctx.strokeStyle = cursorColor;
	    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(0, 0, 6, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();
  }

	update(){
		this.camera.update(); // No effect until the camera is implemented
		this.checkHitPlanet(); //issue 9
    this.checkHitStation(); //issue 54

		if(this.debugMode) { // Display coordinates of ship and cursor

			// Typing out debug mode information

			ctx.fillStyle="white";
			ctx.font = "20px Georgia";

			ctx.fillText("Press [U] to toggle Debug Mode",20,175);

			ctx.fillText("Cursor World Coordinates: (" + Math.round(this.worldCursorPos().x) + ", " + Math.round(this.worldCursorPos().y) + ")",20,canvas.height-15);
			ctx.fillText("Cursor Screen Coordinates: (" + Math.round(this.shipCursorPos().x) + ", " + Math.round(this.shipCursorPos().y) + ")",20,canvas.height-40);
			ctx.fillText("Ship Coordinates: (" + Math.round(this.ship.loc.x) + ", " + Math.round(this.ship.loc.y) + ")",20,canvas.height-65);

			ctx.fillText("Ship Velocity: " + Math.round(this.ship.vel.magnitude()) + " (" + Math.round(this.ship.vel.x) + ", " + Math.round(this.ship.vel.y) + ")",20,canvas.height-120);
			let facing = -this.ship.vel.theta() / Math.PI;
			if(facing < 0) {
				facing = 2 + facing;
			}
			ctx.fillText("Ship Facing: " + Math.round(facing * 180) + "° (" + (Math.round(facing * 100)/100) + "π Rad)",20,canvas.height-145);

			ctx.fillText("Number of Entities: " + this.entities.length,20,canvas.height-200);
			ctx.fillText("Number of Planets: " + this.planets.length,20,canvas.height-225);

			// Debug mode information for the cursor target (if one exists)

			ctx.fillStyle = "#00FFFF";
			if(this.cursorTarget) {
				ctx.fillText("Target Name: " + (this.cursorTarget.name ? this.cursorTarget.name : "-None-"), 20, 230);
				ctx.fillText("Target Coordinates: (" + Math.round(this.cursorTarget.loc.x) + ", " + Math.round(this.cursorTarget.loc.y) + ")", 20, 255);
				ctx.fillText((this.cursorTarget.vel ? "Target Velocity: " + Math.round(this.cursorTarget.vel.magnitude()) + " (" + Math.round(this.cursorTarget.vel.x) + ", " + Math.round(this.cursorTarget.vel.y) + ")" : "No Target Velocity"), 20, 280);
				ctx.fillText((this.cursorTarget.stats ? "Target Health: " + Math.round(this.cursorTarget.stats.health()) + "/" + Math.round(this.cursorTarget.stats.maxHp) : "No Target Health"), 20, 305);
			} else {
				ctx.fillText("-No Target-", 20, 230);
			}
		}



		// Draw cursor
		this.drawCursor();

		if(this.cursorTarget) {

			let position = this.getScreenPosition(this.cursorTarget); // Get position of the target on the screen

			ctx.save();
			ctx.translate(position.x, position.y);
			ctx.beginPath();
			ctx.strokeStyle = '#00FFFF';
			ctx.arc(0, 0, this.cursorTarget.radius * 1.2 + 1, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();

			if(!this.cursorTarget.targetScanned) {
				this.ship.targetScanTimer++;
				if(this.ship.targetScanTimer >= this.ship.targetScanDuration * FPS) {
					this.cursorTarget.targetScanned = true;
					this.ship.targetScanTimer = 0;
				}
			}

			for(let i = 0; i < 3; i++) {

				let secondPos = position.clone().add(new AngularVector2D(this.cursorTarget.radius * 1.2, this.cursorTargetRotation + (i * Math.PI * 2 / 3)));

				ctx.save();
				ctx.translate(secondPos.x, secondPos.y);
				ctx.beginPath();
				ctx.fillStyle = '#00FFFF';
				ctx.arc(0, 0, this.cursorTarget.radius / 12 + 2, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			}

			this.cursorTargetRotation += (2 * Math.PI) / FPS / 4; // 4 seconds per rotation

		}

		// Draw a visual for the ship's health in the top left corner

		let pos = new Vector2D(canvas.width * 0.075, canvas.height * 0.125);

		let segments = 36; // Number of segments in the health wheel
		for(let i = 0; i < segments; i++) {

			let color = '#008800'; // GREEN. Default health color
			if(this.ship.stats.health() / this.ship.stats.maxHp <= i / segments) {
				color = '#AA0000'; // The wheel turns RED when the ship is damaged.
			}
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 30, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
			let width = 20;
			if(i%2==0) {
				width = 30; // This causes a nice visual effect.
			}
			ctx.lineWidth = width;
			ctx.strokeStyle = color;
			ctx.stroke();
			ctx.lineWidth = 2;

			for(let x in this.ship.shields) {

				let color = this.ship.shields[x].color; // Defaults to the shield's color
				if(this.ship.shields[x].offline && (this.ship.shields[x].offlineTimer / (this.ship.shields[x].rechargeDuration * FPS)) > (i / segments)) {
					color = '#444444'; // If the shield is offline, then it's GREY instead
				}
				if(this.ship.shields[x].stats.health() / this.ship.shields[x].stats.maxHp <= i / segments) {
					color = '#660000'; // Damaged part of the shield is red
				}

				ctx.beginPath();
				ctx.arc(pos.x, pos.y, 30 + 12 * (x) + 15 - 1, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
				let width = 10;
				if(i%2==(x%2)) {
					width = 20;
				}
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.lineWidth = 2;
			}
		}

		let i = 0;
		if(this.ship.shield && this.ship.shield.offline) {
			i++;
			ctx.textAlign = "center";
			ctx.fillStyle = "#AA0000";
			ctx.fillText("Shields Offline!",pos.x,pos.y + 75);
			ctx.textAlign = "start";
		}
		if(this.ship.stats.health() <= (this.ship.stats.maxHp * 0.25)) {
			ctx.textAlign = "center";
			ctx.fillStyle = "#AA0000";
			ctx.fillText("Damage Critical!",pos.x,pos.y + 75 + 25*i);
			ctx.textAlign = "start";
		}

		if(this.cursorTarget && this.cursorTarget.stats && this.cursorTarget != this.ship) {

			pos = new Vector2D(canvas.width * 0.175, canvas.height * 0.125);
			let segments = 36;
			if(this.targetWheelRotation < segments) {
				this.targetWheelRotation = segments;
			}
			this.targetWheelRotation += segments/FPS;
			for(let i = 0; i < segments; i++) {

				let color = '#888800';
				if(this.cursorTarget.stats.health() / this.cursorTarget.stats.maxHp <= i / segments) {
					color = '#AA0000';
				}

				if(!this.cursorTarget.targetScanned) {
					if(Math.abs(this.targetWheelRotation - i) % (segments/2) <= (segments/8)) {
						color = "#00FFFF";
					} else {
						color = "#444444";
					}
				}

				ctx.beginPath();
				ctx.arc(pos.x, pos.y, 30, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
				let width = 20;
				if(i%2==0) {
					width = 30;
				}
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.lineWidth = 2;

				for(let x in this.cursorTarget.shields) {

					if(!this.cursorTarget.targetScanned) {
						break;
					}

					let color = this.cursorTarget.shields[x].color;
					if(this.cursorTarget.shields[x].offline && (this.cursorTarget.shields[x].offlineTimer / (this.cursorTarget.shields[x].rechargeDuration * FPS)) > (i / segments)) {
						color = '#444444';
					}
					if(this.cursorTarget.shields[x].stats.health() / this.cursorTarget.shields[x].stats.maxHp <= i / segments) {
						color = '#660000';
					}

					if(!this.cursorTarget.targetScanned) {
						if(Math.abs(this.targetWheelRotation - i) % (segments/2) <= (segments/8)) {
							color = "#00FFFF";
						} else {
							color = "#444444";
						}
					}

					ctx.beginPath();
					ctx.arc(pos.x, pos.y, 30 + 12 * (x) + 15 - 1, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
					let width = 10;
					if(i%2==(x%2)) {
						width = 20;
					}
					ctx.lineWidth = width;
					ctx.strokeStyle = color;
					ctx.stroke();
					ctx.lineWidth = 2;
				}
			}

			if(!this.cursorTarget.targetScanned) {
				ctx.textAlign = "center";
				ctx.fillStyle = "#00FFFF";
				ctx.fillText("Scanning...",pos.x,pos.y + 75);
				ctx.textAlign = "start";
			}
		}

		let collisions = []; // Empty array to be filled with collisions
		for(let i in this.entities) { // Looks through every entity
			let entity = this.entities[i]; // Just for convenience
			entity.update(); // Update every entity every frame
			let cols = entity.checkCollide(); // Get an array of collisions between THIS entity and any other colliding entities
			for(let j in cols) {
				collisions.push(cols[j]); // Add all of this entity's collisions to the overall collision array
			}
		}

		// A collision object has a [SOURCE] and an [OTHER], which are the two entities hitting each other

		for(let i in collisions) { // Looks through each collision
			for(let j in collisions[i].source.collisionEvents) { // Looks at all of the collision events for the SOURCE of the collision (one of the two entities)
				collisions[i].source.collisionEvents[j](collisions[i].other); // Execute the collision event with the OTHER (the second entity). This is what actually executes functionality.
			}
		}

		for(let i in this.visuals) { // VISUALS are entities, except they don't interact with other entities by default
			let visual = this.visuals[i];
			visual.update(); // Update visuals just like entities
		}
	}

  render(){

    ctx.save();
    //keep ship in center of canvas
    ctx.translate(canvas.width/2 - this.ship.loc.x, canvas.height/2 - this.ship.loc.y);
    this.drawWorldEdge(); //issue 45
    //draw all planets & ship

	let arr = []; // Building an array of every entity and planet

    for(var i = 0; i < this.planets.length; i++){
      arr.push(this.planets[i]); // Adding planets
    }
    for(let i in this.stations){ //issue 54
      this.stations[i].renderInSpace();
    }
  	for(let i in this.entities) {
  		arr.push(this.entities[i]); // Adding entities
	}
	for(let i in this.visuals) {
		arr.push(this.visuals[i]); // Adding visuals
	}

	for(let i in arr) {
		arr[i].render(); // Render everything visible in the universe
  	}

	ctx.restore();

  }

  run(){
    this.update();
    this.render();
  }

}
