'use strict'

class MinionManager extends Updateable {
  constructor(game){
    super();
    this.minions=[];
  }
  init() {
  }
  update() {
    for (let i = 0; i < this.minions.length; i++) {
      this.minions[i].update();
      if(this.minions[i].hp<=0){
        this.minions.splice(i,1);
        i--;
      }
    }
  }
  render() {
    for (let i = 0; i < this.minions.length; i++) {
      this.minions[i].render();
    }
  }
}
