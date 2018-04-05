//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;

    this.canLandOn = false;

    this.infoDiv = { //for changing the item shown in info div
      info : document.getElementById("info"),
      render : function(item){ //item=shop item div
        this.removeChildren();
        var img = item.children[0];
        img.class = "infoImg";
        var node = document.createTextNode(""+item.id);
        node.class = "infoName";
        info.appendChild(node);
        info.appendChild(img);
      },
      removeChildren : function(){
        for(let i=2;i<info.children.length;i++){
          info.removeChild(info.children[i]);
        }
      },
    };

    //create html div for whole space station
    this.div = document.createElement("div");
    this.div.id = "spacestation";
    document.getElementById("wrapper").appendChild(this.div);
    //create an attribute of the space station class to add html in this file
    this.div.innerHTML = SpaceStation.html;

    //event listener for clicking on button to exit station back to outer game
    document.getElementById("exitButton").addEventListener("click",function(event){
      this.parentElement.style.display = "none";
      gameState = "outer";
    });

    this.loadShopItems();

  }

  renderInSpace(){
    ctx.beginPath();
    ctx.moveTo(this.loc.x,this.loc.y-15);
    ctx.lineTo(this.loc.x+20,this.loc.y+15);
    ctx.lineTo(this.loc.x-20,this.loc.y+15);
    ctx.lineTo(this.loc.x,this.loc.y-15);
    ctx.fillStyle = "blue";
    ctx.fill();
  }

  loadShopItems(){
    //draw button tiles for each shop item and add click listener to each button
    var items = this.div.children[3]; //div is space station, getting items div
    for(let i=2;i<items.children.length;i++){
      let x = 120*((i-2)%3) +30;
      let y = 150*Math.floor((i-2)/3) +100;
      let button = items.children[i]; //div for a shop item
      button.spacestation = this;
      button.style.top = "" + y + "px";
      button.style.left = "" + x + "px";

      button.addEventListener("click",function(event){
        this.spacestation.infoDiv.render(this);
        //render info of this item in the info div
      });
    }
  }
}

SpaceStation.html = '\
  <h1 style="position:absolute; top:10px; left:30px;">Space Station</h1>\
  <img src="shopIMGS/background.png" style="width:100%; height:100%;">\
  <img id="exitButton" src="shopIMGS/exit.png">\
  <div id="items">\
    <h2 style="position:absolute; left:100px;">Items</h2>\
    <img class="back" src="shopIMGS/shopBackground.png">\
    <div id="Cookie" class="tile">\
      <img class="img" src="shopIMGS/0cookie.png">\
    </div>\
    <div id="Brownie" class="tile">\
      <img class="img" src="shopIMGS/1brownie.png">\
    </div>\
    <div id="Cupcake" class="tile">\
      <img class="img" src="shopIMGS/2cupcake.png">\
    </div>\
    <div id="Coffee" class="tile">\
      <img class="img" src="shopIMGS/4coffee.png">\
    </div>\
    <div id="Pie" class="tile">\
      <img class="img" src="shopIMGS/3pie.png">\
    </div>\
  </div>\
  <div id="info">\
    <h2 style="position:absolute; left:100px;">Info</h2>\
    <img class="back" src="shopIMGS/infoBackground.png">\
  </div>\
';
