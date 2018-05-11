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

    SpaceStation.infoDiv = { //for changing the item shown in info div
      shopInfo : document.getElementById("shopInfo"),
      invInfo : document.getElementById("invInfo"),
      render : function(item,page){ //item=shop item div, page=shop (t)/inventory (f)
        var infoDiv;
        if(page){
          infoDiv = SpaceStation.infoDiv.shopInfo;
        } else{
          infoDiv = SpaceStation.infoDiv.invInfo;
        }
        this.removeChildren(infoDiv);
        var img = document.createElement("img");
        img.src = item.children[0].src;
        img.id = "infoImg";
        infoDiv.appendChild(img);
        var div = document.createElement("div");
        var node = document.createTextNode(""+item.id);
        div.appendChild(node);
        div.id = "infoName";
        infoDiv.appendChild(div);
        var button = document.createElement("button");
        button.id = "infoButton";
        button.item = item;
        if(!page){ //if in inventory, sell items
          button.innerHTML = "Sell";
          button.onclick = function(){
            let price = this.item.children[1].id;
            let infoName = ""+this.item.id;
            var object = {value:price, name:infoName};
            resources.sellItem(object.name);
          };
        } else{ //if in shop, buy items
          button.innerHTML = "Buy";
          button.onclick = function(){
            let price = this.item.children[1].id;
            if(resources.money>=price){
              var object = {cat:this.item.parentElement.id,price:price};
              resources.buy(object);
            }
          };
        }
        infoDiv.appendChild(button);
        var price = document.createTextNode("   "+ item.children[1].id);
        price.id = "infoPrice";
        div.appendChild(price);
      },
      removeChildren : function(infoDiv){ //infoDiv sends in the right div to clear out
        if(infoDiv.children.length>1){
          document.getElementById("infoImg").remove();
          document.getElementById("infoName").remove();
          document.getElementById("infoButton").remove();
        }
      },
    };


    //event listener for clicking on button to exit station back to outer game
    document.getElementById("exitButton").addEventListener("click",function(event){
      this.parentElement.style.display = "none";
      gameState = "outer";
    });


    //add click listener for inventory and shop buttons
    var menu = document.getElementById("menu");
      //shop
    menu.children[0].addEventListener("click",function(event){
      menu.style.display = "none";
      document.getElementById("shop").style.display = "block";
    });
    //add click listener to each button in shop
    var items = document.getElementById("shopItems"); //div is space station, getting items div
    for(let i=0;i<items.children.length;i++){ //items children = different categories
      for(let j=0; j<items.children[i].children.length;j++){ //in each category, there are items
        items.children[i].children[j].addEventListener("click",function(event){
          SpaceStation.infoDiv.render(this,true);
          //^^^^render info of this item in the info div
        });
      }
    }

      //inventory
    menu.children[1].addEventListener("click",function(event){
      menu.style.display = "none";
      document.getElementById("inventory").style.display = "block";
    });

    //add click listener for back buttons
    var backs = document.getElementsByClassName("backButton");
    for(let i=0;i<2;i++){
      backs[i].addEventListener("click",function(event){
        menu.style.display = "block";
        document.getElementById("shop").style.display = "none";
        document.getElementById("inventory").style.display = "none";
      });
    }

    //add click listener for the "radio buttons" ->actually divs
    var buttons = document.getElementById("radioButtons").children;
    var itemCats = document.getElementById("shopItems").children;
    for(let i=0;i<buttons.length;i++){
      buttons[i].addEventListener("click",function(event){
        if(this.id=="allCat"){ //this button shows all the items
          for(let i=0;i<itemCats.length;i++){ //traverse categories in items
            itemCats[i].style.display = "block";
          }
        } else{
          for(let i=0;i<itemCats.length;i++){ //traverse categories in items
            itemCats[i].style.display = "none";
          }
          document.getElementById(""+this.id+"Div").style.display = "block";
        }
        //make the button a different color than the others
        var buttons = document.getElementById("radioButtons");
        for(let i=0;i<buttons.children.length;i++){
          buttons.children[i].style.backgroundColor = "#4CAF50";
        }
        this.style.backgroundColor = "darkgreen";
      });
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
  <div id="menu">\
    <div id="shopButton" class="menuButton">Go To Shop</div>\
    <div id="inventoryButton" class="menuButton">Go To Inventory</div>\
  </div>\
  <div id="shop" style="display:none">\
    <div class="backButton">Back</div>\
    <div id="radioButtons">\
      <div class="radio" id="allCat">All</div>\
      <div class="radio" id="health">Health</div>\
      <div class="radio" id="shields">Shields</div>\
      <div class="radio" id="weapons">Weapons</div>\
      <div class="radio" id="engines">Engines</div>\
      <div class="radio" id="misc">Misc</div>\
    </div>\
    <div class="items" id="shopItems">\
      <div id="healthDiv" class="catDiv">\
        <div id="Health Boost" class="tile">\
          <img class="imgTile" src="shopIMGS/health.png">\
          <span style="display:none;" id="2.35"></span>\
        </div>\
      </div>\
      <div id="shieldsDiv" class="catDiv">\
        <div id="Shield Boost" class="tile">\
          <img class="imgTile" src="shopIMGS/shield.png">\
          <span style="display:none;" id="4.30"></span>\
        </div>\
      </div>\
      <div id="weaponsDiv" class="catDiv">\
        <div id="Turret" class="tile">\
          <img class="imgTile" src="shopIMGS/turret.png">\
          <span style="display:none;" id="2.40"></span>\
        </div>\
        <div id="Laser Gun" class="tile">\
          <img class="imgTile" src="shopIMGS/lasergun.png">\
          <span style="display:none;" id="3.50"></span>\
        </div>\
      </div>\
      <div id="enginesDiv" class="catDiv">\
        <div id="Ship Engine" class="tile">\
          <img class="imgTile" src="shopIMGS/engine1.png">\
          <span style="display:none;" id="2.55"></span>\
        </div>\
        <div id="Rover Engine" class="tile">\
          <img class="imgTile" src="shopIMGS/engine2.png">\
          <span style="display:none;" id="1.45"></span>\
        </div>\
      </div>\
      <div id="miscDiv" class="catDiv">\
        <div id="Fog Remover" class="tile">\
          <img class="imgTile" src="shopIMGS/fog.png">\
          <span style="display:none;" id="3.60"></span>\
        </div>\
        <div id="Minions" class="tile">\
          <img class="imgTile" src="shopIMGS/minion.png">\
          <span style="display:none;" id="2.60"></span>\
        </div>\
      </div>\
    </div>\
    <div class="info" id="shopInfo">\
      <h3>Info</h3>\
    </div>\
  </div>\
  <div id="inventory" style="display:none">\
    <div class="backButton">Back</div>\
    <div class="items" id="invItems">\
    </div>\
    <div class="info" id="invInfo">\
      <h3>Info</h3>\
    </div>\
  </div>\
';
