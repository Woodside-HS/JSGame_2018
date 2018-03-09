
// The World object stores data about what exists in the game and on the map - mostly through an array of entities.

var World = {

	FPS: 60, // Frames Per Second
	LFPS: 10, // Logic Frames Per Second

	entities: [],

	visuals: [], // Not entities, just visual things that appear.
	
	addEntity: (obj, pos) => {
		World.entities.push(obj);
		obj.position = obj.position || pos;
	},

	removeEntity: (obj) => {
		World.entities.splice(World.entities.indexOf(obj), 1);
	},

	setUniversalFlag: (flag, bool) => {
		for(let i in this.entities) {
			this.entities[i].flags[flag] = bool;
		}
		console.log("Set the \"" + flag + "\" flag to " + bool + " for all entities.");
	}
};