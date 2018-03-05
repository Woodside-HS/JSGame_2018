class Ranged extends Tower{
  constructor(game, location) {
    super(game, location);
    this.type = null;
    this.range = null;//square of distance
    this.cooldown = null;
    this.cooldowntimer = 0;
    this.maxhp = null;
    this.hp=this.maxhp;
    this.bulletspeed=null;
    this.bulletsize=null;
    this.projectiles=[];
    this.target = null;
    this.targetdistsqrd = this.range+1;
    this.bulletcolor= null;
  }
  update(){
    super.update();
    //decrement cooldown
    if(this.cooldowntimer>0) this.cooldowntimer--;

    //check target distance
    if(this.target){
      let diff=this.loc.duplicate();
      diff.subtract(this.target.loc);
      let distsqrd = Math.pow(diff.x,2)+Math.pow(diff.y,2) //square of distance
      if(distsqrd>this.range || this.target.hp<=0){
        // find new target
        this.target = null;
        for(let i=0; i<this.game.minionManager.minions.length;i++){
          let minion=this.game.minionManager.minions[i];
          let diff=this.loc.duplicate();
          diff.subtract(minion.loc);
          let distsqrd = Math.pow(diff.x,2)+Math.pow(diff.y,2) //square of distance
          if(distsqrd<this.range && (this.target==null||distsqrd<this.targetdistsqrd)){
            this.targetdistsqrd=distsqrd;
            this.target=minion;
          }
        }
      }
    } else {
      // find new target
      for(let i=0; i<this.game.minionManager.minions.length;i++){
        let minion=this.game.minionManager.minions[i];
        let diff=this.loc.duplicate();
        diff.subtract(minion.loc);
        let distsqrd = Math.pow(diff.x,2)+Math.pow(diff.y,2) //square of distance
        if(distsqrd<this.range && (this.target==null||distsqrd<this.targetdistsqrd)){
          this.targetdistsqrd=distsqrd;
          this.target=minion;
        }
      }
    }

    if (this.target && this.cooldowntimer==0){
      this.cooldowntimer=this.cooldown;
      let diff=this.target.loc.duplicate();
      diff.subtract(this.loc);
      let dist = Math.sqrt(Math.pow(diff.x,2)+Math.pow(diff.y,2));
      let dir=diff.duplicate();
      dir.multiply(1/dist);
      dir.multiply(this.bulletspeed);
      let projectile={
        target:this.target,
        loc:this.loc.duplicate(),
        v:dir,
        life:Math.floor(dist/this.bulletspeed)+1
      }
      projectile.loc.add(new Vector2D(CONFIG.TILE_SIZE/2,CONFIG.TILE_SIZE/2));
      this.projectiles.push(projectile);
    }

    //update projectiles
    for(let i=0;i<this.projectiles.length;i++){
      let bullet = this.projectiles[i];
      if(bullet.life==0){
        this.onHit(bullet.target);
        this.projectiles.splice(i,1);
        i--;
        continue;
      }
      bullet.life--;
      bullet.loc.add(bullet.v);
    }
  }
  onHit(target){
  }
  render(){
    super.render();
    //render projectiles
    for(let i=0;i<this.projectiles.length;i++){
      let bullet = this.projectiles[i];
      this.game.context.fillStyle = this.bulletcolor;
      this.game.context.beginPath();
      this.game.context.arc(bullet.loc.x,bullet.loc.y,this.bulletsize,0,2*Math.PI);
      this.game.context.fill();
    }
  }

}
