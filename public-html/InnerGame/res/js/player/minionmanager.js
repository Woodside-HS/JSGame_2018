'use strict'

class MinionManager extends Updateable {
  constructor(game) {
    super();
    this.minions = [];
  }
  init() {
  }
  update() {
    for (let i = 0; i < this.minions.length; i++) {
      this.minions[i].update();
      //check if minions are dead
      if (this.minions[i].hp <= 0) {
        this.minions.splice(i, 1);//kill minions
        i--;
      }
    }
  }
  render() {
    for (let i = 0; i < this.minions.length; i++) {
      this.minions[i].render();
    }
  }
  sendMinions(minions,gridloc){
    for(let i=0;i<minions.length;i++){
      minions[i].goTo(gridloc);
    }
  }
}
