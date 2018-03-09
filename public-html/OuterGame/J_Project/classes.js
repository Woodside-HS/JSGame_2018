class StatBlock { // Contains statistics (just health for now) for an entity; without a StatBlock, an entity ignores damage. This effect can be recreated by enabling the 'invulnerable' flag.
    constructor(parent) {
        this.maxHp = 0;
        this.damageTaken = 0;
    }
        
    hp() {
        return this.maxHp - this.damageTaken;
    }
};

class Entity {
	constructor(position, velocity, facing, acc) {
		this.position = position || World.centerPoint.clone();
		this.velocity = velocity || new Vector(0,0);
		this.facing = facing || new Vector(1,0);
		this.accel = acc || new Vector(0,0);

		this.flags = { // A number of tags that change how this interacts. VERY important!

			collider: true, // TRUE: hits & interacts with other objects. FALSE: passes through other objects without affecting them.

			edgeCollider: true, // TRUE: hits edge of map and bounces off. FALSE: ignores map boundaries. Be careful & only use this for e.g. missiles and explosions, NOT players!!

			invisible: false, // TRUE: ignored when drawing objects. FALSE: default. This isn't a gameplay effect, this is visual.

			showHealth: true, // TRUE: health bars are visible when the entity is damaged. FALSE: health bars are never visible. If this is false, the 'alwaysShowHealth' tag is redundant.
			
			alwaysShowHealth: false, // TRUE: even when undamaged, health bars are visible. FALSE: health bars are only visible when the entity is damaged. This is largely just style.
			
			showHealthDividers: true, // TRUE: display dividers in health bars for each point of health. FALSE: health bars are a single block, with no dividers.
			
			showHealthDividersMissing: false, // TRUE: display dividers in parts of the health bar where health has been lost. Less visually nice but more informative. FALSE: don't do that.
			
			showHealthNumbers: false, // TRUE: display the health number to the left of the health bar. FALSE: don't.
			
			invulnerable: false, // TRUE: cannot take damage. FALSE: can take damage as normal.

			indestructible: false, // TRUE: cannot be destroyed by damage. FALSE: can be destroyed by damage as normal.
			
			bounceOnCollision: true, // TRUE: when this entity hits another, it bounces away, as per default. FALSE: it doesn't bounce and continues in the same direction.
			
			infiniteMaxSpeed: false, // TRUE: this can be sped up to any speed, as it has no means of decelerating; use for e.g. asteroids. FALSE: has a maximum speed, can't go faster. 
			
			dealsBodyDamage: true, // TRUE: when this collides with another object, it deals damage to the other object equal to its bodyDamage. FALSE: never deals body damage.
			
			takesBodyDamage: true, // TRUE: when this collides with another object, it takes damage equal to the other object's bodyDamage. FALSE: never takes body damage.

			receivesPush: true, // TRUE: can be pushed by collisions, FALSE: can't

			givesPush: true, // TRUE: can give push through collisions, FALSE: can't

		};

		this.maximumSpeed = 0;

		this.bodyDamage = 1;
		this.recentlyBodyDamaged = []; // List of entities recently body-damaged by this entity.
		this.bodyDamageCooldown = 0.75; // Time before this entity can body damage another entity again.

		this.addStatBlock(3);
		this.healthColor = "#00FF00";
		this.healthDividerColor = "#004400";

		this.radius = 30; // Even if this isn't relevant to drawing, this tells the game things about its size for collision, camera settings, etc.
		this.mass = 20; // Affects collision (and how much it's affected)

		this.frameEvents = [];
		this.logicEvents = [];
		this.collideEvents = [];
		this.graphicsBlocks = []; // Once actual art is added these will be less relevant
		this.graphicsBlocks.push(() => {
			if(this.graphicsBlocks.length == 1) { // Only displays if there aren't any other graphics blocks; adding others will render this irrelevant, so no need to remove
				World.ctx.lineWidth = 1;
				World.ctx.strokeStyle = "white";
				World.ctx.beginPath();
				World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
				World.ctx.stroke();
			}
			// Whether or not the "placeholder" is visible, this block adds a health bar
			if(this.stats && (this.stats.hp() < this.stats.maxHp || this.flags.alwaysShowHealth) && this.flags.showHealth) {
                
				let barLength = this.radius * 4;
				let barStart = -2 * this.radius;
				let barWidth = 10;
				
				World.ctx.fillStyle="#777777";
				World.ctx.fillRect(barStart, this.radius + 10, barLength, barWidth);
				World.ctx.fillStyle=this.healthColor;
				let healthValue = this.stats.hp() / this.stats.maxHp;
				if(healthValue < 0) {
					healthValue = 0;
				}
				World.ctx.fillRect(-2 * this.radius, this.radius + 10, healthValue * barLength, barWidth);
				if(this.flags.showHealthDividers) {
					World.ctx.strokeStyle = this.healthDividerColor;
					World.ctx.lineWidth = 2;
					let pointSegmentLength = barLength / (this.stats.maxHp < 25 ? this.stats.maxHp : 25);
					for(let i = 1; ((i <= this.stats.hp() && i <= 25 - this.stats.damageTaken) || this.flags.showHealthDividersMissing) && i < this.stats.maxHp && i < 25; i++) {
						let pos = barStart + (pointSegmentLength * i);
						World.ctx.beginPath();
						World.ctx.moveTo(pos, this.radius + 10);
						World.ctx.lineTo(pos, this.radius + 10 + barWidth);
						World.ctx.stroke();
					}
				}
				if(this.flags.showHealthNumbers) {
					let hp = "" + Numbers.roundTo(this.stats.hp(), 2);
					World.ctx.font = "25px Arial";
					World.ctx.fillText(hp, barStart - 6 - (14 * hp.length), this.radius + 12.5 + barWidth);
				}
            }
		});
		this.collideEvents.push((other) => { // Default collision effect - the object bounces away when it's hit. Pretty much everything should have this, but it can be disabled with a flag.
			if(!this.flags.bounceOnCollision) {
				return; // To disable this effect, do NOT remove it from the array, just set this flag to false.
			}
			if(!this.flags.receivesPush || !other.flags.givesPush) {
				return;
			}
			let multiplier = other.mass/this.mass * 2;
			this.velocity = this.velocity.add(other.position.vectorTo(this.position).setLength((other.velocity.length() * multiplier) + 5)).divide(2);
		});
		this.collideEvents.push((other) => { // Causes body damage when the entity collides with another object, as long as the 'dealsBodyDamage' flag is true.
			if(!this.flags.dealsBodyDamage || !other.flags.takesBodyDamage) {
				return; // To disable this effect, do NOT remove it from the array, just set this flag to false.
			}
			for(let i in this.recentlyBodyDamaged) {
				if(this.recentlyBodyDamaged[i].entity == other) { // If 'other' has been recently damaged by this entity...
					return; // ...Don't damage them again.
				}
			}
			other.takeDamage(this.bodyDamage, this);
			this.recentlyBodyDamaged.push({entity: other, timer: 0});
		});
		this.logicEvents.push(() => {
			let arr = this.recentlyBodyDamaged.slice();
			for(let i in arr) {
				let obj = arr[i];
				obj.timer += 1/World.LFPS;
				if(obj.timer > this.bodyDamageCooldown) {
					this.recentlyBodyDamaged.splice(this.recentlyBodyDamaged.indexOf(obj), 1);
				}
			}
		})
	}

	visible() { // Returns TRUE if the target is on the screen. Useful for animations and stuff.
		// TODO
	}

	addStatBlock(hp, override = true) { // Gives the entity a StatBlock, or overrides an existing one. The parameter 'override' can be set to false to prevent overriding existing stats.
        if(!this.stats || override) {
			this.stats = new StatBlock(this);
			this.stats.maxHp = hp;
		}
    }

	removeStatBlock() { // Removes an existing stat block.
		this.stats = undefined;
	}

	takeDamage(num) {
		if(!this.stats || this.flags.invulnerable) {
			return; // If the entity doesn't have a StatBlock or it's invulnerable, damage does nothing.
		}
		this.stats.damageTaken += num;
		if(this.stats.hp() <= 0) {
			if(!this.flags.indestructible) { // This flag prevents the entity from dying, which can be used for things like entering a new phase. It does NOT prevent lethal damage.
				this.destroy();
			}
		}
	}

	destroy() { // Destroys the entity, removing it from the world.
		World.removeEntity(this);
		// TODO - make this more expansive.
	}

	checkEdgeCollision() {
		if(!this.flags.edgeCollider) {
			return;
		}
        // Checks for collisions with edges of world
        if(this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -0.5;
        }
        if(this.position.x + this.radius > World.width) {
            this.position.x = World.width - this.radius;
            this.velocity.x *= -0.5;
        }
            
        if(this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -0.5;
        }
        if(this.position.y + this.radius > World.height) {
            this.position.y = World.height - this.radius;
            this.velocity.y *= -0.5;
        }
    }

	checkObjCollision() {
		if(!this.flags.collider) {
			return []; // Don't even try if the object doesn't do collisions
		}
		let collisions = [];
		for(let i in World.entities) {
			let other = World.entities[i];
			if(other == this) {
				continue;
			}
			if(!other.flags.collider) {
				continue;
			}
			let dist = this.position.distance(other.position);
			if(dist <= this.radius + other.radius) {
				collisions.push({collider: this, other: other}); // When tampering with collision objects, remember COLLIDER is the source and OTHER is what it's bumping into
			}
		}
		return collisions;
	}
}

class Missile extends Entity {
	constructor(p, v, f, a) {
		super(p, v, f, a);

		this.radius = 5;

		this.timedLife = 6;

		this.removeStatBlock();

		this.maximumSpeed = 400;

		this.flags.destroyedOnImpact = true;
		this.flags.missileCollider = false;
		this.flags.ownerCollider = false;

		this.flags.receivesPush = false;
		this.flags.givesPush = false;
		this.flags.edgeCollider = false;

		this.owner = this;

		this.bodyDamage = 1;

		this.frameEvents.push(() => {
			if(this.timedLife) {
				this.timedLife -= 1/World.FPS;
			}
			if(this.timedLife <= 0) {
				this.destroy();
			}
		});

		this.collideEvents.push((other) => {
			if(other == this.owner && !this.flags.ownerCollider) {
				return; // Don't collide with owner
			}
			if(!this.flags.destroyedOnImpact) {
				return;
			}
			if(other instanceof Missile && !this.flags.missileCollider) {
				return; // Don't collide with other missiles
			}
			this.destroy(); // Destroyed on first collision
		})
	}
}

class Player extends Entity {
	constructor(position, velocity, facing, acc) {
		super(position, velocity, facing, acc);

		this.accelerationRate = 200;
		this.deaccelerationRate = 20;
		this.maxSpeed = 300;

		this.addStatBlock(10);

		this.graphicsBlocks.push(() => {
			World.ctx.strokeStyle = "orange";
			World.ctx.beginPath();
			World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			World.ctx.stroke();
		});
	}
}

class Camera extends Entity {
	constructor() {
		super(World.player.position.clone());

		this.flags.collider = false;
		this.flags.invisible = true;
		this.flags.showHealth = false;

		this.frameEvents.push(() => {
			if(this.position.distance(World.player.position) < 1) {
				if(this.velocity.length() > 0) {
					this.velocity = new Vector();
				}
			} else {
				this.velocity = this.position.vectorTo(World.player.position).mult(this.position.distance(World.player.position)).divide(World.FPS*2)
				.add(this.position.vectorTo(World.player.position).setLength(40)).limit(800);
			}
			if(this.position.distance(World.player.position) < 10) {
				this.velocity = this.velocity.mult(0.25);
			}
		});

		this.graphicsBlocks.push(() => { // Camera is generally invisible, but for testing purposes if the 'invisible' flag is disabled it appears as a blue circle.
			World.ctx.strokeStyle = "blue";
			World.ctx.beginPath();
			World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			World.ctx.stroke();
		});
	}
}