
class StatBlock { // A block containing health, armor, resistance, etc.
	constructor(hp, extras) {
		this.maxHp = hp;
		this.killable = true;
		this.damageTaken = 0;
		for(let i in extras) {
			this[i] = extras[i];
		}
	}

	health() {
		return this.maxHp - this.damageTaken;
	}

	assign(entity) { // Assigns the StatBlock to an entity
		this.entity = entity;
		entity.stats = this;
	}

	takeDamage(dmg) {
		this.damageTaken += dmg;
		if(this.health() <= 0 && this.killable) {
			this.entity.kill();
		}
	}

	healDamage(dmg) {
		this.damageTaken -= dmg;
		if(this.damageTaken < 0) {
			this.damageTaken = 0; // Can't go above max health
		}
	}
}