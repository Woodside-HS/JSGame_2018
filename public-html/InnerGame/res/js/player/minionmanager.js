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
      if(i>minion_config.limit){//check for overpopulation
        this.minions.splice(i, 1);//kill overpopulators
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
    let path=new Path(new FastVector(0,0),gridloc);
    path.dijkstra();
    for(let i=0;i<minions.length;i++){
      minions[i].path=path;
    }
  }
  spawnMinion(){
    let minion=new Minion(game,game.player.loc)
    minion.v.m=minion_config.initial_speed;
    minion.v.th=Math.random()*2*Math.PI
    minion.v.upComps();
    this.minions.push(minion);
  }
}
