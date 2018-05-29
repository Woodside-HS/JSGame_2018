class World {

	constructor(level) {
		this.level = level;
		this.planets = [];
		this.entities = []; // Array of entities
		this.visuals = []; // Array of visual movers that, to save time, don't interact with other objects (they're purely visual)

		this.stations = []; //issue 54

		//area is greater than that of canvas
		this.height = 2400;
		this.width = 2400;
		//this.pastVels = []; //array of ships velocties for canvas lag

		document.addEventListener("mousemove", (e) => {
			var rect = canvas.getBoundingClientRect(); // Gets the absolute size of the canvas

			this.cursorX = e.clientX - rect.left; // Adjust cursor coordinates to be relative to element
			this.cursorY = e.clientY - rect.top;
			if (gameState === "outer") {
				worlds[currentLevel].ship.mouseLoc = new Vector2D(this.cursorX, this.cursorY);
			}
		});

		this.cursorTarget = false; // The currently-selected target
		this.cursorTargetRotation = Math.random() * Math.PI * 2; // Degrees of rotation for selection circle visual
		this.targetWheelRotation = 0; // This is just used for the "Scanning..." visual effect

		document.addEventListener("click", (e) => {
			if (!this.atStation) {
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
				case "x": //planet landing
					if (gameState == 'outer' && (playerShip.vel.x || playerShip.vel.y) && this.checkHitPlanet()) {
						gamePlanet = this.checkHitPlanet();
						if(!gamePlanet.game){
							// issue 118 create inner games on demand
						    gamePlanet.game = new Game();
						    gamePlanet.game.init();
						}
						game = gamePlanet.game;
						gamePlanet.showPanel();
					}
					if (gameState === "inner") {
						if(game.player.checkImportantLoc()== "start")
							gameState = "outer";	// issue 138
					}
					break;
				case "f": //issue 54
					for (let i = 0; i < this.stations.length; i++) {
						if (this.stations[i].canLandOn) {
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

	}

	initialize() {
		// Debug mode determines whether certain measurements appear for testing purposes
		this.debugMode = true;

		this.makePlanets(30);
		this.makeAsteroids(40, true); //issue 12, will spawn in canvas
		this.makeStations(1); //issue 54

		this.makeEnemies(15); // Spawns in drone ships


		//create rocketship at center of canvas
		this.ship = new Rocketship(new Vector2D(0, 0));
		playerShip = this.ship; // A dumb global variable we have for some reason
		this.entities.push(this.ship);


		this.cursorX = -50;
		this.cursorY = -50; // The -50 means the cursor doesn't start on the canvas, which is purely for convenience. No in-game effect except a visual tweak.

		// Create camera object which follows the Rocketship
		this.camera = new Camera();
	}

	addEntity(entity) { // Function to add an entity to the world
		this.entities.push(entity);
	}
	addVisual(visual) { // Function to add a visual to the world. Visuals are entities that don't interact with each other.
		this.visuals.push(visual);
	}

	makePlanets(num) {
		for (var i = 0; i < num; i++) {
			var radius = Math.random() * 50 + 50;
			//set location vector, prevent planet overlap by choosing new location for planet
			//until all planets are far enough apart
			while (true) {
				var x = Math.random() * this.width * 2 - this.width;
				var y = Math.random() * this.height * 2 - this.height;
				var loc = new Vector2D(x, y);
				for (var i = 0; i < this.planets.length; i++) {
					var dist = Vector2D.distance(this.planets[i].loc, loc);
					if (dist <= (this.planets[i].radius + radius) * 1.5) { break; }
				}
				if (i === this.planets.length) { break; }
			}
			var p = new Planet(radius, loc);
			this.planets.push(p);
		}
	}

	makeAsteroids(num, bool) { //issue 12
		let counter = num;
		var a = true; //check if is far enough away from other entities to be drawn
		while (counter > 0) {
			a = true;
			var r = (Math.random() * 20) + 20;
			var x = (Math.random() * this.width * 2) - this.width;
			var y = (Math.random() * this.height * 2) - this.height;
			//var vel = new Vector2D(Math.random()*50-25,Math.random()*50-25);
			var vel = new Vector2D(Math.random() * 1000 - 500, Math.random() * 1000 - 500);
			var ast = new Asteroid(new Vector2D(x, y), vel, null, r);
			if (!bool) { //bool=if asteroids can show up in canvas
				let b1 = (x + r) < (this.camera.loc.x + (canvas.width / 2));
				let b2 = (x - r) > (this.camera.loc.x - (canvas.width / 2));
				let b3 = (y + r) < (this.camera.loc.y + (canvas.height / 2));
				let b4 = (y - r) > (this.camera.loc.y - (canvas.height / 2));
				//all the b vars check if the loc+radius are in the canvas
				if (b1 || b2 || b3 || b4) { // if it's inside the canvas
					a = false; //asteroid should not be pushed to entities array
				}
			}
			// goes through array of entities and checks that new asteroid isn't too close to any
			for (let i = 0; i < this.entities.length; i++) {
				let dist = Vector2D.distance(this.entities[i].loc, ast.loc);
				let radii = this.entities[i].radius + ast.radius;
				if (dist < (radii * 1.5)) { //if it's too close to something else
					a = false; //will not be pushed to entities
				}
			}
			if (a) { //if not too close to any other entities
				this.entities.push(ast);
				counter--;
			}
		}
	}

	makeEnemies(num) { // Spawn in a bunch of DroneShips.
		for (let i = 0; i < num; i++) {
			let x = Math.random() * this.width * 2 - this.width;
			let y = Math.random() * this.height * 2 - this.height;
			let drone = new DroneShip(new Vector2D(x, y));
			if (i % 6 == 0) {
				//drone = new TorpedoCruiser(new Vector2D(x, y));
			}
			if (i % 14 == 0) {
				//drone = new ShieldPlatform(new Vector2D(x, y));
			}
			this.addEntity(drone);
			drone.initialize();
			// TODO: add more types of enemies
		}
	}

	makeStations(num) { //issue 54
		for (let i = 0; i < num; i++) {
			// let x = (Math.random() * this.width*2) - this.width;
			// let y = (Math.random() * this.height*2) - this.height;
			let x = 0;
			let y = 0;
			this.stations[i] = new SpaceStation(new Vector2D(x, y));
		}
	}

	checkHitPlanet() { //issue 9
		//returns planet if there is one
		//if ship is over a planet, text will say player can press a key to land on planet
		let out = false;
		for (let i = 0; i < this.planets.length; i++) {
			if (Vector2D.distance(this.planets[i].loc, this.ship.loc) < (this.planets[i].radius + 20)) {
				//check if ship is close to any of the planets
				ctx.fillStyle = "white";
				ctx.font = "20px Georgia";
				ctx.fillText("[X] to land on planet", this.ship.loc.x - 100, this.ship.loc.y - 50);
				out = this.planets[i];
			}
		}
		return out;
	}

	checkHitStation() { //issue 54,
		//if the ship is hovering over a station, text will pop up on canvas
		for (let i = 0; i < this.stations.length; i++) {
			if (Vector2D.distance(this.stations[i].loc, this.ship.loc) < 40) {
				ctx.fillStyle = "white";
				ctx.font = "20px Georgia";
				ctx.fillText("[F] to land at station", canvas.width / 2 - 50, canvas.height / 2 - 50);
				this.stations[i].canLandOn = true;
			} else {
				this.stations[i].canLandOn = false;
			}
		}
	}

	drawWorldEdge() { //issue 45
		ctx.beginPath();
		ctx.moveTo(-this.width, -this.height);
		ctx.lineTo(this.width, -this.height);
		ctx.lineTo(this.width, this.height);
		ctx.lineTo(-this.width, this.height);
		ctx.lineTo(-this.width, -this.height);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}

	screenCursorPos() { // Position of cursor relative to CENTER OF SCREEN
		return new Vector2D(this.cursorX, this.cursorY);
	}

	shipCursorPos() { // Position of cursor relative to SHIP
		// Assumes that the ship is located in the center of the
		// canvas and that is not a valid assumption anymore.
		// So this function returns the cursor relative to
		// the center of the canvas.
		let posX = canvas.width / 2 - this.screenCursorPos().x;
		let posY = canvas.height / 2 - this.screenCursorPos().y;

		return new Vector2D(posX, posY);
	}

	worldCursorPos() { // Position of cursor relative to WORLD

		let relativePos = this.shipCursorPos();

		// let posX = this.ship.loc.x - relativePos.x;
		// let posY = this.ship.loc.y - relativePos.y;
		let posX = this.camera.loc.x - relativePos.x;
		let posY = this.camera.loc.y - relativePos.y;

		return new Vector2D(posX, posY);
	}

	getScreenPosition(object) { // Find position (relative to center of screen) of any object

		let posX = canvas.width / 2 + object.loc.x - this.camera.loc.x;
		let posY = canvas.height / 2 + object.loc.y - this.camera.loc.y;

		return new Vector2D(posX, posY);
	}

	getCursorTarget() { // Returns entity & planet the cursor is hovering over (for selection purposes)
		let cursorPos = this.worldCursorPos();
		for (let i in this.planets) {
			let other = this.planets[i];

			if (!other.selectable) {
				continue;
			}

			let distance = cursorPos.distance(other.loc);
			if (distance <= other.radius) {
				return other;
			}

		}
		for (let i in this.entities) {
			let other = this.entities[i];

			if (!other.selectable) {
				continue;
			}

			let distance = cursorPos.distance(other.loc);
			if (distance <= other.radius) {
				return other;
			}
		}
		return false;
	}

	targetNearestEntity() { // It's easier than clicking
		let bestDist = { dist: 0, entity: false }; // Stores the best (nearest) distance to the ship
		for (let i in this.entities) {
			let ent = this.entities[i];
			if (ent == this.ship) {
				continue; // Shouldn't target self
			}
			if (!ent.selectable) {
				continue; // Obviously can't target enemies that aren't targetable
			}
			let dist = this.ship.loc.distanceSq(ent.loc); // distanceSq is slightly faster than distance and we're only using it for ">" so it doesn't matter.
			if (dist < bestDist.dist || !bestDist.entity) { // If this distance is better than our PREVIOUS best (or there is no previous best)...
				bestDist.dist = dist; // Set best distance to this distance
				bestDist.entity = ent; // Set best entity to this entity
			}
		}

		if (Math.sqrt(bestDist.dist) > 600) {
			bestDist.entity = false; // Don't target things that are TOO far away...
		}

		this.target(bestDist.entity);
	}

	target(target) {
		if (this.cursorTarget != target) {
			this.ship.targetScanTimer = 0; // Resets timer for scanning
		}
		this.cursorTarget = target; // Sets the target
	}

	checkAsteroidCollision() {

		for (var i = 0; i < this.entities.length; i++) {
			if (!(this.entities[i] instanceof Asteroid || this.entities[i] instanceof Rocketship || this.entities[i] instanceof DroneShip)) {
				continue;
			}
			for (var j = i + 1; j < this.entities.length; j++) {
				if  (!(this.entities[j] instanceof Asteroid || this.entities[j] instanceof Rocketship || this.entities[j] instanceof DroneShip)) {
					continue;
				}

				var b1 = this.entities[i];
				var r1;
				if (b1 instanceof Rocketship || b1 instanceof DroneShip){
					r1 = b1.shields[0].radius;
				}else{
					r1 = b1.radius;
				}

				var b2 = this.entities[j];
				var r2;
				if (b2 instanceof Rocketship || b2 instanceof DroneShip){
					r2 = b2.shields[0].radius;
				}else{
					r2 = b2.radius;
				}

				//check if edges of 2 asteroids are touching
				var dist = Vector2D.distance(b1.loc, b2.loc);

				if (dist <= r1 + r2) {
					console.log('collision detected');



					// sometimes the balls will stick together if there is
					// too much overlap initially.  So separate them enough
					// that they are just touching
					var vec = Vector2D.subtract(b1.loc, b2.loc);
					vec.setMag((r1 + r2 - vec.magnitude()) / 2);
					b1.loc.add(vec);
					vec.scalarMult(-1);
					b2.loc.add(vec);

					// note the total momentum before the collision
					var p_initial = Vector2D.add(b1.momentum(), b2.momentum());

					//momentum & velocity of center of mass
					var total_mass = b1.mass() + b2.mass();
					var vel_cm = Vector2D.scalarDiv(p_initial, total_mass);
					//calculate velocities after collision using vf = 2*v_cm - vi
					//http://courses.ncssm.edu/apb11o/resources/guides/G09-4b.com.htm

					// Where is the center of mass?  It must lie on a line
					// connecting the two colliding objects with a magnitude
					// proportionate to the two masses.
					var vec_cm = Vector2D.subtract(b1.loc, b2.loc);
					vec_cm.setMag(vec_cm.magnitude() * (b1.mass() / (b1.mass() + b2.mass())));
					vec_cm.add(b2.loc); // location of CM

					// For each ball, what is the component of its velocity towards
					// the center of mass and what is the component that is not
					// in the direction of the center of mass?

					// get a vector from  ball 1 to the center of mass
					var vel_b1_cm = Vector2D.subtract(vec_cm, b1.loc);
					// its magnitude should be the magnitude of the balls velocity
					// times the cosine of the angle between itself and the
					// velocity of the ball
					var angleBetween = Vector2D.angleBetween(b1.vel, vel_b1_cm);
					var cos = Math.cos(angleBetween);
					// component of b1 velocity on a line to the CM
					vel_b1_cm.setMag(b1.vel.magnitude() * Math.cos(Vector2D.angleBetween(b1.vel, vel_b1_cm)));
					// component of the CM's velocity on a line towards b1
					var vel_cm_b1 = Vector2D.copy(vel_b1_cm); // on the same line as vel_b1_cm
					vel_cm_b1.setMag(vel_cm.magnitude() * Math.cos(Vector2D.angleBetween(vel_cm, vel_cm_b1)));

					// The component of the ball's velocity not in the direction of the
					// center of mass should be the difference between its total velocity
					// and the component in the direction of the center of mass
					var vel_b1_not_cm = Vector2D.subtract(b1.vel, vel_b1_cm);
					// is it the same as the sine of the angle between? Yes
					// var vel_b1_not_cm_mag = b1.vel.magnitude() * Math.sin(Vector2D.angleBetween(b1.vel,vel_b1_cm));
					// console.log(vel_b1_not_cm.magnitude(), vel_b1_not_cm_mag);

					// Now repeat for the second ball
					var vel_b2_cm = Vector2D.subtract(vec_cm, b2.loc);
					vel_b2_cm.setMag(b2.vel.magnitude() * Math.cos(Vector2D.angleBetween(b2.vel, vel_b2_cm)));
					var vel_b2_not_cm = Vector2D.subtract(b2.vel, vel_b2_cm);

					//  console.log('b1 initial velocity', b1.vel);
					//  console.log('b1 component velocity', vel_b1_cm);
					//  console.log('center of mass velocity', vel_cm);
					//  console.log('CM component velocity', vel_cm_b1);
					//  console.log('b2 initial velocity', b2.vel);
					//  console.log('b2 component velocity', vel_b2_cm);

					var v1_final = Vector2D.scalarMult(vel_cm_b1, 2);
					v1_final.subtract(vel_b1_cm);   // subtract velocity towards the CM
					v1_final.add(vel_b1_not_cm);    // add back the velocity not towards the CM
					// console.log(`b1 final velocity ${v1_final}`);

					var v2_final = Vector2D.scalarMult(vel_cm_b1, 2);
					v2_final.subtract(vel_b2_cm);   // subtract velocity towards the CM
					v2_final.add(vel_b2_not_cm);    // add back the velocity not towards the CM

					// console.log(`b2 final velocity ${v2_final}`);
					// var init_momentum = Vector2D.add(Vector2D.scalarMult(vel_b1_cm,b1.mass),
					//                                     Vector2D.scalarMult(vel_b2_cm,b2.mass));
					//
					// var final_momentum = Vector2D.add(Vector2D.scalarMult(v1_final,b1.mass),
					//                                     Vector2D.scalarMult(v2_final,b2.mass));
					// // console.log(`initial momentum ${init_momentum}`);
					// console.log(`final momentum ${final_momentum}`);

					b1.vel = v1_final;
					b2.vel = v2_final;

					// note the total momentum after the collision
					var p_final = Vector2D.add(b1.momentum(), b2.momentum());
					// console.log(`initial momentum ${p_initial}`);
					// console.log(`final momentum ${p_final}`);
					// console.log(totalKineticEnergy());
					// console.log(p_final.x, p_final.y);

					if (b1 instanceof Rocketship || b1 instanceof DroneShip){
						b1.shields[0].stats.takeDamage(5);
					}else{
						b1.stats.takeDamage(5);
					}

					if (b2 instanceof Rocketship || b2 instanceof DroneShip){
						b2.shields[0].stats.takeDamage(5);
					}else{
						b2.stats.takeDamage(5);
					}


				}
			}
		}

	}


	drawCursor() {
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


		if (this.cursorTarget && this.cursorTarget.stats && this.cursorTarget != this.ship) {

			let pos = new Vector2D(canvas.width * 0.175, canvas.height * 0.125);
			let segments = 36;
			if (this.targetWheelRotation < segments) {
				this.targetWheelRotation = segments;
			}
			this.targetWheelRotation += segments / FPS;
			for (let i = 0; i < segments; i++) {

				let color = '#888800';
				if (this.cursorTarget.stats.health() / this.cursorTarget.stats.maxHp <= i / segments) {
					color = '#AA0000';
				}

				if (!this.cursorTarget.targetScanned) {
					if (Math.abs(this.targetWheelRotation - i) % (segments / 2) <= (segments / 8)) {
						color = "#00FFFF";
					} else {
						color = "#444444";
					}
				}

				ctx.beginPath();
				ctx.arc(pos.x, pos.y, 30, (Math.PI / segments) * (2 * i - 0.5), (Math.PI / segments) * (2 * i + 0.5));
				let width = 20;
				if (i % 2 == 0) {
					width = 30;
				}
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.lineWidth = 2;

				for (let x in this.cursorTarget.shields) {

					if (!this.cursorTarget.targetScanned) {
						break;
					}

					let color = this.cursorTarget.shields[x].color;
					if (this.cursorTarget.shields[x].offline && (this.cursorTarget.shields[x].offlineTimer / (this.cursorTarget.shields[x].rechargeDuration * FPS)) > (i / segments)) {
						color = '#444444';
					}
					if (this.cursorTarget.shields[x].stats.health() / this.cursorTarget.shields[x].stats.maxHp <= i / segments) {
						color = '#660000';
					}

					if (!this.cursorTarget.targetScanned) {
						if (Math.abs(this.targetWheelRotation - i) % (segments / 2) <= (segments / 8)) {
							color = "#00FFFF";
						} else {
							color = "#444444";
						}
					}

					ctx.beginPath();
					ctx.arc(pos.x, pos.y, 30 + 12 * (x) + 15 - 1, (Math.PI / segments) * (2 * i - 0.5), (Math.PI / segments) * (2 * i + 0.5));
					let width = 10;
					if (i % 2 == (x % 2)) {
						width = 20;
					}
					ctx.lineWidth = width;
					ctx.strokeStyle = color;
					ctx.stroke();
					ctx.lineWidth = 2;
				}
			}

			if (!this.cursorTarget.targetScanned) {
				ctx.textAlign = "center";
				ctx.fillStyle = "#00FFFF";
				ctx.fillText("Scanning...", pos.x, pos.y + 75);
				ctx.textAlign = "start";
			}
		}
	}

	update() {

		this.camera.update(); //Update the location of the camera

		this.checkAsteroidCollision();
		this.checkHitStation(); //issue 54

		let i = 0;
		let pos = new Vector2D(canvas.width * 0.175, canvas.height * 0.125);
		if (this.ship.shield && this.ship.shield.offline) {
			i++;
			ctx.textAlign = "center";
			ctx.fillStyle = "#AA0000";
			ctx.fillText("Shields Offline!", pos.x, pos.y + 75);
			ctx.textAlign = "start";
		}
		if (this.ship.stats.health() <= (this.ship.stats.maxHp * 0.25)) {
			ctx.textAlign = "center";
			ctx.fillStyle = "#AA0000";
			ctx.fillText("Damage Critical!", pos.x, pos.y + 75 + 25 * i);
			ctx.textAlign = "start";
		}


		let collisions = []; // Empty array to be filled with collisions
		for (let i in this.entities) { // Looks through every entity
			let entity = this.entities[i]; // Just for convenience
			entity.update(); // Update every entity every frame
			let cols = entity.checkCollide(); // Get an array of collisions between THIS entity and any other colliding entities
			for (let j in cols) {
				collisions.push(cols[j]); // Add all of this entity's collisions to the overall collision array
			}
		}

		// A collision object has a [SOURCE] and an [OTHER], which are the two entities hitting each other

		for (let i in collisions) { // Looks through each collision
			for (let j in collisions[i].source.collisionEvents) { // Looks at all of the collision events for the SOURCE of the collision (one of the two entities)
				collisions[i].source.collisionEvents[j](collisions[i].other); // Execute the collision event with the OTHER (the second entity). This is what actually executes functionality.
			}
		}

		for (let i in this.visuals) { // VISUALS are entities, except they don't interact with other entities by default
			let visual = this.visuals[i];
			visual.update(); // Update visuals just like entities
		}
	}

	render() {
		this.drawBackground();

		ctx.save();
		//translate to camera
		ctx.translate(-this.camera.loc.x + canvas.width /2 , -this.camera.loc.y + canvas.height / 2);
		this.drawWorldEdge(); //issue 45
		//draw all planets & ship


		let arr = []; // Building an array of every entity and planet

		for (var i = 0; i < this.planets.length; i++) {
			arr.push(this.planets[i]); // Adding planets
		}
		for (let i in this.stations) { //issue 54
			this.stations[i].renderInSpace();
		}
		for (let i in this.entities) {
			arr.push(this.entities[i]); // Adding entities
		}
		for (let i in this.visuals) {
			arr.push(this.visuals[i]); // Adding visuals
		}

		for (let i in arr) {
			arr[i].render(); // Render everything visible in the universe
		}

		this.checkHitPlanet();

		//translate to absolute
		ctx.restore();

		this.drawHealthMeter();
		this.drawSelectionBuffer();
		this.drawCursor();
		this.drawDebug();

	}

	drawBackground(){
		let parallaxScale = 0.1;
		let backgroundImg = Images.starfield;
		let startLoc = new Vector2D(
			this.camera.loc.x-canvas.width,
			this.camera.loc.y-canvas.height
		);
		startLoc.scalarMult(parallaxScale);
		ctx.drawImage(
			backgroundImg,
			startLoc.x,
			startLoc.y,
			backgroundImg.width,
			backgroundImg.height,
			(-parallaxScale * this.camera.loc.x) - this.width/2,
			(-parallaxScale*this.camera.loc.y) - this.height/2,
			backgroundImg.width,
			backgroundImg.height
		);
	}

	drawSelectionBuffer() {
		if (this.cursorTarget) {

			let position = this.getScreenPosition(this.cursorTarget); // Get position of the target on the screen

			ctx.save();
			ctx.translate(position.x, position.y);
			ctx.beginPath();
			ctx.strokeStyle = '#00FFFF';
			ctx.arc(0, 0, this.cursorTarget.radius * 1.2 + 1, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();

			if (!this.cursorTarget.targetScanned) {
				this.ship.targetScanTimer++;
				if (this.ship.targetScanTimer >= this.ship.targetScanDuration * FPS) {
					this.cursorTarget.targetScanned = true;
					this.ship.targetScanTimer = 0;
				}
			}

			for (let i = 0; i < 3; i++) {

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
	}

	/**Draw the health meter in the upper left corner.
	 *
	 */
	drawHealthMeter() {

		let pos = new Vector2D(canvas.width * 0.075, canvas.height * 0.125);

		let segments = 36; // Number of segments in the health wheel
		for (let i = 0; i < segments; i++) {

			let color = '#008800'; // GREEN. Default health color
			if (this.ship.stats.health() / this.ship.stats.maxHp <= i / segments) {
				color = '#AA0000'; // The wheel turns RED when the ship is damaged.
			}
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 30, (Math.PI / segments) * (2 * i - 0.5), (Math.PI / segments) * (2 * i + 0.5));
			let width = 20;
			if (i % 2 == 0) {
				width = 30; // This causes a nice visual effect.
			}
			ctx.lineWidth = width;
			ctx.strokeStyle = color;
			ctx.stroke();
			ctx.lineWidth = 2;

			for (let x in this.ship.shields) {

				let color = this.ship.shields[x].color; // Defaults to the shield's color
				if (this.ship.shields[x].offline && (this.ship.shields[x].offlineTimer / (this.ship.shields[x].rechargeDuration * FPS)) > (i / segments)) {
					color = '#444444'; // If the shield is offline, then it's GREY instead
				}
				if (this.ship.shields[x].stats.health() / this.ship.shields[x].stats.maxHp <= i / segments) {
					color = '#660000'; // Damaged part of the shield is red
				}

				ctx.beginPath();
				ctx.arc(pos.x, pos.y, 30 + 12 * (x) + 15 - 1, (Math.PI / segments) * (2 * i - 0.5), (Math.PI / segments) * (2 * i + 0.5));
				let width = 10;
				if (i % 2 == (x % 2)) {
					width = 20;
				}
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.lineWidth = 2;
			}
		}
	}

	drawDebug() {
		if (this.debugMode) { // Display coordinates of ship and cursor

			// Typing out debug mode information

			ctx.fillStyle = "white";
			ctx.font = "20px Georgia";

			ctx.fillText("Press [U] to toggle Debug Mode", 20, 175);
			ctx.fillText("FPS:" + realFPS, 20, 200);

			// ctx.fillText("Cursor World Coordinates: (" + Math.round(this.worldCursorPos().x) + ", " + Math.round(this.worldCursorPos().y) + ")", 20, canvas.height - 15);
			// ctx.fillText("Cursor Screen Coordinates: (" + Math.round(this.shipCursorPos().x) + ", " + Math.round(this.shipCursorPos().y) + ")", 20, canvas.height - 40);
			// ctx.fillText("Ship Coordinates: (" + Math.round(this.ship.loc.x) + ", " + Math.round(this.ship.loc.y) + ")", 20, canvas.height - 65);
            //
			// ctx.fillText("Ship Velocity: " + Math.round(this.ship.vel.magnitude()) + " (" + Math.round(this.ship.vel.x) + ", " + Math.round(this.ship.vel.y) + ")", 20, canvas.height - 120);
			// let facing = -this.ship.vel.theta() / Math.PI;
			// if (facing < 0) {
			// 	facing = 2 + facing;
			// }
			// ctx.fillText("Ship Facing: " + Math.round(facing * 180) + "° (" + (Math.round(facing * 100) / 100) + "π Rad)", 20, canvas.height - 145);
            //
			// ctx.fillText("Number of Entities: " + this.entities.length, 20, canvas.height - 200);
			// ctx.fillText("Number of Planets: " + this.planets.length, 20, canvas.height - 225);
            //
			// // Debug mode information for the cursor target (if one exists)
            //
			// ctx.fillStyle = "#00FFFF";
			// if (this.cursorTarget) {
			// 	ctx.fillText("Target Name: " + (this.cursorTarget.name ? this.cursorTarget.name : "-None-"), 20, 230);
			// 	ctx.fillText("Target Coordinates: (" + Math.round(this.cursorTarget.loc.x) + ", " + Math.round(this.cursorTarget.loc.y) + ")", 20, 255);
			// 	ctx.fillText((this.cursorTarget.vel ? "Target Velocity: " + Math.round(this.cursorTarget.vel.magnitude()) + " (" + Math.round(this.cursorTarget.vel.x) + ", " + Math.round(this.cursorTarget.vel.y) + ")" : "No Target Velocity"), 20, 280);
			// 	ctx.fillText((this.cursorTarget.stats ? "Target Health: " + Math.round(this.cursorTarget.stats.health()) + "/" + Math.round(this.cursorTarget.stats.maxHp) : "No Target Health"), 20, 305);
			// } else {
			// 	ctx.fillText("-No Target-", 20, 230);
			// }
		}
	}

	run() {
		this.update();
		this.render();
	}

}
