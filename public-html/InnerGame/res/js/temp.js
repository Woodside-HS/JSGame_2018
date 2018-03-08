document.onkeydown = function(e){
  let key = String.fromCharCode(e.keyCode);
  switch(key){
    case 'Q':
    game.minionManager.minions.push(new Minion(game,new Vector2D(mouselocx,mouselocy)));
    break;
    case '1':
    game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Tower(game,new Vector2D(mouseclocx,mouseclocy));
    break;
    case'2':
    game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Ranged(game,new Vector2D(mouseclocx,mouseclocy),TOWER_TYPES.REPEATER);
    break;
    case'3':
    game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Ranged(game,new Vector2D(mouseclocx,mouseclocy),TOWER_TYPES.SNIPER);
    break;
    case'4':
    game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Ranged(game,new Vector2D(mouseclocx,mouseclocy),TOWER_TYPES.SPITTER);
    break;
  }
  switch(key){
    case 'W':
    if(game.player.a.y!=-1)
      game.player.a.y=-1;
    break;
    case 'A':
    if(game.player.a.x!=-1)
      game.player.a.x=-1;
    break;
    case'S':
    if(game.player.a.y!=1)
      game.player.a.y=1;
    break;
    case'D':
    if(game.player.a.x!=1)
      game.player.a.x=1;
    break;
  }
}
document.onkeyup = function(e){
  let key = String.fromCharCode(e.keyCode);
  switch(key){
    case 'W':
    game.player.a.y=0;
    break;
    case 'A':
    game.player.a.x=0;
    break;
    case'S':
    game.player.a.y=0;
    break;
    case'D':
    game.player.a.x=0;
    break;
  }
}
