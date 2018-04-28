//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;

    this.canLandOn = false;

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

    //add click listener to each button
    var items = this.div.children[2]; //div is space station, getting items div
    for(let i=0;i<items.children.length;i++){
      for(let j=0; j<items.children[i].children.length;j++){
        items.children[i].children[j].spacestation = this;
        //^^^use this property in eventlistener for access to infodiv object literal
        items.children[i].children[j].addEventListener("click",function(event){
          SpaceStation.infoDiv.render(this);
          //^^^^render info of this item in the info div
        });
      }
    }

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

}

SpaceStation.html = '\
  <h1 style="font-size:40px;">Space Station</h1>\
  <img id="exitButton" src="shopIMGS/exit.png">\
  <div id="items">\
    <h3>Items</h3>\
    <div id="boostsDiv" class="catDiv">\
      <div id="Cookie" class="tile">\
        <img class="imgTile" src="shopIMGS/cookie.png">\
        <span style="display:none;" id="2.35"></span>\
      </div>\
      <div id="Brownie" class="tile">\
        <img class="imgTile" src="shopIMGS/brownie.png">\
        <span style="display:none;" id="2.55"></span>\
      </div>\
      <div id="Cupcake" class="tile">\
        <img class="imgTile" src="shopIMGS/cupcake.png">\
        <span style="display:none;" id="1.45"></span>\
      </div>\
    </div>\
    <div id="repairsDiv" class="catDiv">\
      <div id="Cake" class="tile">\
        <img class="imgTile" src="shopIMGS/cake.png">\
        <span style="display:none;" id="4.30"></span>\
      </div>\
      <div id="Pie" class="tile">\
        <img class="imgTile" src="shopIMGS/pie.png">\
        <span style="display:none;" id="3.60"></span>\
      </div>\
    </div>\
    <div id="weaponsDiv" class="catDiv">\
      <div id="Tea" class="tile">\
        <img class="imgTile" src="shopIMGS/tea.png">\
        <span style="display:none;" id="2.40"></span>\
      </div>\
      <div id="Coffee" class="tile">\
        <img class="imgTile" src="shopIMGS/coffee.png">\
        <span style="display:none;" id="3.50"></span>\
      </div>\
    </div>\
    <div id="creditsDiv" class="catDiv">\
      <div id="Donut" class="tile">\
        <img class="imgTile" src="shopIMGS/donut.png">\
        <span style="display:none;" id="2.60"></span>\
      </div>\
      <div id="Macaron" class="tile">\
        <img class="imgTile" src="shopIMGS/macaron.png">\
        <span style="display:none;" id="4.75"></span>\
      </div>\
    </div>\
  </div>\
  <div id="radioButtons">\
    <input class="radio" type="radio" name="category" id="allCat" checked="checked" onchange="SpaceStation.changeCategory()">All\
    <input class="radio" type="radio" name="category" id="boosts" onchange="SpaceStation.changeCategory()">Boosts\
    <input class="radio" type="radio" name="category" id="repairs" onchange="SpaceStation.changeCategory()">Repairs<br>\
    <input class="radio" type="radio" name="category" id="weapons" onchange="SpaceStation.changeCategory()">Weapons\
    <input class="radio" type="radio" name="category" id="credits" onchange="SpaceStation.changeCategory()">Credits\
  </div>\
  <div id="info">\
    <h3>Info</h3>\
  </div>\
  <div id="collection">\
    <div class="collCats" id="boostsColl">\
      <p>Boosts</p>\
    </div>\
    <div class="collCats" id="repairsColl">\
      <p>Repairs</p>\
    </div>\
    <div class="collCats" id="weaponsColl">\
      <p>Weapons</p>\
    </div>\
  </div>\
  <div id="creditsColl">\
    <p>Credits</p>\
  </div>\
';

SpaceStation.changeCategory = function(){
  var array = [document.getElementById("boosts"),document.getElementById("repairs"),document.getElementById("weapons"),document.getElementById("credits"),document.getElementById("allCat")]
  for(let i in array){
    if(array[i].checked){
      if(i==array.length-1){
        for(let i=0;i<array.length-1;i++){
          document.getElementById(""+array[i].id + "Div").style.display = "block";
        }
      } else{
        document.getElementById(""+array[i].id + "Div").style.display = "block";
      }
    } else{
      if(i!=array.length-1){
        document.getElementById(""+array[i].id + "Div").style.display = "none";
      }
    }
  }
}

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
    if(item.parentElement.id=="creditsDiv"){
      button.innerHTML = "Sell";
    } else{
      button.innerHTML = "Buy";
    }
    button.id = "infoButton";
    button.item = item;
    button.onclick = function(){
      let price = this.item.children[1].id;
      if(resources.money>=price){
        var object = {
          div : this.item
        };
        resources.buy(object,price);
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
