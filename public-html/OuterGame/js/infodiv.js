class InfoDiv{
  constructor(){
    this.health;
    this.money;
    this.infoDiv = document.getElementById("infoDiv");
  }

  clearSubDiv(num){ //num is which subdiv in the infodiv to clear
    var div = this.infoDiv.children[num];
    for(let i = 1; i<div.children.length;i++){
      div.children[i].remove();
    }
  }

  updateHealth(state){ //state is outer/inner, if in spacestation, just use outer
    if(state=="outer"){
      this.health = System().ship.stats.health() / System().ship.stats.maxHp;
    } else{

    }
  }
}
