class World{

  constructor(level){
    this.level = level;
    this.planets = [];
	this.entities = []; // Array of entities
	this.visuals = []; // Array of visual movers that, to save time, don't interact with other objects (they're purely visual)
    //area is greater than that of canvas
    this.height = 2400;
    this.width = 2400;

	document.addEventListener("mousemove", (e) => {
        var rect = canvas.getBoundingClientRect(); // abs. size of element

        this.cursorX = e.clientX - rect.left;   // scale mouse coordinates after they have
        this.cursorY = e.clientY - rect.top;     // been adjusted to be relative to element
    });

	this.cursorTarget = false;
	this.cursorTargetRotation = Math.random() * Math.PI * 2; // Degrees of rotation for selection circle visual
	this.targetWheelRotation = 0;
	
	document.addEventListener("click", (e) => {
		let target = this.getCursorTarget();
		this.cursorTarget = target;
		this.ship.targetScanTimer = 0;
	})

    //add event listeners that toggle acceleration/deceleration/turning on
    //  when key is down and off when key is up

	document.addEventListener("keypress", (event) => {
		switch (event.key) {
			case "u":
				this.debugMode = !this.debugMode;
			break;
			case "e":
				this.ship.firing = !this.ship.firing;
			break;
			case "t":
				this.ship.attemptTorpedoLaunch();
			break;
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

  initialize() {
	// Debug mode determines whether certain measurements appear for testing purposes
	this.debugMode = true;

	//create rocketship at center of canvas
    this.ship  = new Rocketship(new Vector2D(0, 0));
	playerShip = this.ship;
	this.entities.push(this.ship);

    this.makePlanets(50);
	this.makeAsteroids(180, true); //issue 12, will spawn in canvas

	this.makeEnemies(15); // Spawns in drone ships

	this.cursorX = -50;
	this.cursorY = -50;

	// Create camera object which follows the Rocketship
	this.camera = new Camera();
  }

  addEntity(entity) {
  	  this.entities.push(entity);
  }
  addVisual(visual) {
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

  makeEnemies(num) {
	for(let i = 0; i < num; i++) {
		let x = Math.random() * this.width * 2 - this.width;
		let y = Math.random() * this.height * 2 - this.height;
		let drone = new DroneShip(new Vector2D(x, y));
		this.addEntity(drone);
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

	update(){
		this.camera.update();
		this.checkHitPlanet(); //issue 9

		if(this.debugMode) { // Display coordinates of ship and cursor
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

		// Recolor cursor based on what it's hovering over

		let cursorColor = '#00FFFF';

		// Draw cursor
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

		if(this.cursorTarget) {

			let position = this.getScreenPosition(this.cursorTarget);

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

		// Draw a visual for the ship's health in the bottom right corner

		let pos = new Vector2D(canvas.width * 0.075, canvas.height * 0.125);

		let segments = 36;
		for(let i = 0; i < segments; i++) {
			
			let color = '#008800';
			if(this.ship.stats.health() / this.ship.stats.maxHp <= i / segments) {
				color = '#AA0000';
			}
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 30, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
			let width = 20;
			if(i%2==0) {
				width = 30;
			}
			if(!this.ship.shield) {
				width *= 1.5;
			}
			ctx.lineWidth = width;
			ctx.strokeStyle = color;
			ctx.stroke();
			ctx.lineWidth = 2;

			if(this.ship.shield) {
				
				let color = '#0066FF';
				if(this.ship.shield.offline && (this.ship.shield.offlineTimer / (this.ship.shield.rechargeDuration * FPS)) > (i / segments)) {
					color = '#444444';
				}
				if(this.ship.shield.stats.health() / this.ship.shield.stats.maxHp <= i / segments) {
					color = '#660000';
				}

				ctx.beginPath();
				ctx.arc(pos.x, pos.y, 44, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
				let width = 10;
				if(i%2==0) {
					width = 15;
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
				if(!this.cursorTarget.shield) {
					width *= 1.5;
				}
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.lineWidth = 2;

				if(this.cursorTarget.shield) {
				
					let color = '#0066FF';
					if(this.cursorTarget.shield.offline && (this.cursorTarget.shield.offlineTimer / (this.cursorTarget.shield.rechargeDuration * FPS)) > (i / segments)) {
						color = '#444444';
					}
					if(this.cursorTarget.shield.stats.health() / this.cursorTarget.shield.stats.maxHp <= i / segments) {
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
					ctx.arc(pos.x, pos.y, 44, (Math.PI / segments) * (2*i-0.5), (Math.PI / segments) * (2*i+0.5));
					let width = 10;
					if(i%2==0) {
						width = 15;
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

		let collisions = [];
		for(let i in this.entities) {
			let entity = this.entities[i];
			entity.update();
			let cols = entity.checkCollide();
			for(let j in cols) {
				collisions.push(cols[j]);
			}
		}
		for(let i in collisions) {
			for(let j in collisions[i].source.collisionEvents) {
				collisions[i].source.collisionEvents[j](collisions[i].other);
			}
		}

		for(let i in this.visuals) {
			let visual = this.visuals[i];
			visual.update();
		}
	}

  render(){

    ctx.save();
    //keep ship in center of canvas
    ctx.translate(canvas.width/2 - this.ship.loc.x, canvas.height/2 - this.ship.loc.y);
    this.drawWorldEdge(); //issue 45
    //ctx.translate(this.ship.loc.x, this.ship.loc.y);
    //ctx.rotate(-this.ship.dir)
    //ctx.translate(this.ship.loc.x, this.ship.loc.y);
    //ctx.translate(canvas.width/2 - this.ship.loc.x, canvas.height/2 - this.ship.loc.y);
    //ctx.translate(canvas.width/2, canvas.height/2);
    //draw all planets & ship

	let arr = [];

    for(var i = 0; i < this.planets.length; i++){
      arr.push(this.planets[i]);
    }
  	for(let i in this.entities) {
  		arr.push(this.entities[i]);
	}
	for(let i in this.visuals) {
		arr.push(this.visuals[i]);
	}

	for(let i in arr) {
		arr[i].render();
  	}
    
	ctx.restore();

  }

  run(){
    this.render();
    this.update();
  }

}
