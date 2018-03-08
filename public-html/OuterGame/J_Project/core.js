
// XENOLOGY ENGINE

var WORLD_WIDTH = 4000;
var WORLD_HEIGHT = 4000;

window.onload = () => {
	let cnv = document.getElementById("cnv");
	cnv.style.backgroundColor = "black";
	cnv.style.textAlign = "center";
	cnv.width = window.innerWidth * 0.97;
	cnv.height = window.innerHeight * 0.97;
	//cnv.width = WORLD_WIDTH;
	//cnv.height = WORLD_HEIGHT;
	World.canvas = cnv;
	World.ctx = cnv.getContext("2d");
	setInterval(runFrame, 1000/World.FPS); // Every frame it updates drawing. Feel free to use this for most things, but work-intensive behaviors (flocking, etc..) should be logic
	setInterval(runLogicFrame, 1000/World.LFPS); // Every logic frame (less frequent then regular frames) it does logic - this reduces strain.

	World.keys = [];
    window.onkeyup = function(e) {
        World.keys[e.keyCode] = false;
    };
    
    window.onkeydown = function(e) {
        World.keys[e.keyCode] = true;
    };

	World.width = WORLD_WIDTH;
	World.height = WORLD_HEIGHT;

	World.centerPoint = new Vector(World.width/2, World.height/2);
	World.cameraCenter = new Vector(World.canvas.width/2, World.canvas.height/2);

	let player = new Player(World.centerPoint.clone());
	World.addEntity(player);
	World.player = player;

	let camera = new Camera();
	World.addEntity(camera);
	World.camera = camera;

	for(let i = 0; i < 100; i++) {
		let obj = new Entity(new Vector(Math.random() * World.width, Math.random() * World.height));
		World.addEntity(obj);
	}

	for(let i = 0; i < 10; i++) {
		let obj = new EnemyShip(new Vector(Math.random() * World.width, Math.random() * World.height));
		World.addEntity(obj);
	}

	for(let i = 0; i < 4; i++) {
		let obj = new EnemyCruiser(new Vector(Math.random() * World.width, Math.random() * World.height));
		World.addEntity(obj);
	}

	for(let i = 0; i < 6; i++) {
		let obj = new EnemyDevourer(new Vector(Math.random() * World.width, Math.random() * World.height));
		World.addEntity(obj);
	}
}

function runFrame() {
	
	let movingX, movingY = false;

	let vector = new Vector(0,0);
    if(World.keys[87] || World.keys[38]) { // W
        vector.y -= World.player.accelerationRate/World.FPS;
        movingY = -1;
    }
    if(World.keys[65] || World.keys[37]) { // A
        vector.x -= World.player.accelerationRate/World.FPS;
        movingX = -1;
    }
    if(World.keys[83] || World.keys[40]) { // S
        vector.y += World.player.accelerationRate/World.FPS;
        movingY = 1;
    }
    if(World.keys[68] || World.keys[39]) { // D
        vector.x += World.player.accelerationRate/World.FPS;
        movingX = 1;
    }
    World.player.velocity = World.player.velocity.add(vector).limit(World.player.accelerationRate);

	if(!movingX) {
        World.player.velocity.x *= 1-(World.player.deaccelerationRate/100)/World.FPS;
    }
    if(!movingY) {
        World.player.velocity.y *= 1-(World.player.deaccelerationRate/100)/World.FPS;
    }

	// ++++++++++++++++++++++++++++++++++++++
	
	World.ctx.clearRect(0, 0, World.canvas.width, World.canvas.height); // clears so redraw can begin

	World.ctx.translate(World.cameraCenter.x, World.cameraCenter.y);
	for(let i in World.entities) {
		let relPos = World.entities[i].position.subtract(World.camera.position);
		if(Math.abs(relPos.x) - World.entities[i].radius > World.canvas.width / 2 || Math.abs(relPos.y) - World.entities[i].radius > World.canvas.height / 2) {
			continue;
		}
		if(World.entities[i].flags.invisible) {
			continue; // Don't draw invisible entities!
		}
		World.ctx.translate(relPos.x, relPos.y);
		for(let j in World.entities[i].graphicsBlocks) {
			World.entities[i].graphicsBlocks[j]();
		}
		World.ctx.translate(-1 * relPos.x, -1 * relPos.y);
	}
	World.ctx.translate(-1*World.cameraCenter.x, -1*World.cameraCenter.y);

	for(let i in World.entities) {

		for(let j in World.entities[i].frameEvents) {
			World.entities[i].frameEvents[j]();
		}
		World.entities[i].velocity = World.entities[i].velocity.add(World.entities[i].accel.divide(World.FPS)).limit(World.entities[i].maxSpeed);
		World.entities[i].position = World.entities[i].position.add(World.entities[i].velocity.divide(World.FPS));
		World.entities[i].checkEdgeCollision();
	}

	let arr = World.entities.slice();
    let collisions = [];
    for(let i in arr) {
        let entity = arr[i];
        let list = entity.checkObjCollision();
        for(let j in list) {
            collisions.push(list[j]);
        }
    }
    for(let i in collisions) {
        let coll = collisions[i];
		for(let j in coll.collider.collideEvents) {
			coll.collider.collideEvents[j](coll.other);
		}
    }
}

function runLogicFrame() {
	for(let i in World.entities) {
		for(let j in World.entities[i].logicEvents) {
			World.entities[i].logicEvents[j]();
		}
	}
}