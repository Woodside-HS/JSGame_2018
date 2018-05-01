class StoryPanel{
  constructor(loc, creature, colour){
    this.loc = loc;

    //create html div for whole space station
    this.div = document.createElement("div");
    this.div.id = "storypanel";
    document.getElementById("wrapper").appendChild(this.div);
    //create an attribute of the space station class to add html in this file
    this.div.innerHTML = StoryPanel.html;

    //event listener for clicking on button to exit station back to outer game
    document.getElementById("exitButton").addEventListener("click",function(event){
      this.parentElement.style.display = "none";
      gameState = "inner";
    });

  }

  renderInSpace(){
    ctx.beginPath();
    ctx.moveTo(this.loc.x,this.loc.y-15);
    ctx.lineTo(this.loc.x+20,this.loc.y+15);
    ctx.lineTo(this.loc.x-20,this.loc.y+15);
    ctx.lineTo(this.loc.x,this.loc.y-15);
    ctx.fillStyle = colour;
    ctx.fill();
  }

}

StoryPanel.html = '\
  <h1 style="font-size:40px;">Welcome to NAME</h1>\
  <img id="exitButton" src="shopIMGS/exit.png">\
  <div id="items">\
    <h3>Items</h3>\
    <div id="catAdiv" class="catDiv">\
      <div id="Cookie" class="tile">\
        <img class="monsterTile" src="shopIMGS/cookie.png">\
        <span style="display:none;" id="2.35"></span>\
      </div>\
    </div>\
  </div>\
  <div id="info">\
    <h3>Info</h3>\
  </div>\
';

SpaceStation.infoDiv = { //for changing the item shown in info div
  info : document.getElementById("info"),
  render : function(item){ //item=shop item div
    this.removeChildren();
    var img = document.createElement("img");
    img.src = item.children[0].src;
    img.id = "infoImg";
    info.appendChild(img);
    var div = document.createElement("div");
    var node = document.createTextNode(""+item.id);
    div.appendChild(node);
    div.id = "infoName";
    info.appendChild(div);
    var button = document.createElement("button");
    button.innerHTML = "Buy";
    button.id = "infoButton";
    button.item = item;
    button.onclick = function(){
      // console.log(this.item.id + " buy " + this.item.children[1].id);
      let price = this.item.children[1].id
      if(resources.money>=price){
        resources.buy(this.item,"exampleCat",price);
        console.log(resources["exampleCat"]);
      }
    };
    info.appendChild(button);
    var price = document.createTextNode("   "+ item.children[1].id);
    price.id = "infoPrice";
    div.appendChild(price);
  },
  removeChildren : function(){
    if(info.children.length>2){
      document.getElementById("infoImg").remove();
      document.getElementById("infoName").remove();
      document.getElementById("infoButton").remove();
    }
  },
};
