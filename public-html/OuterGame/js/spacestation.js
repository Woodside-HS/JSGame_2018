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
            resources.sellItem(this.item);
          };
          let qty = 0;
          for(let i=0;i<resources.inventory.length;i++){
            if(resources.inventory[i].name==item.id){
              qty +=1;
            }
          }
          var quantity = document.createTextNode(" | Qty: "+qty);
          div.appendChild(quantity);
        } else{ //if in shop, buy items
          button.innerHTML = "Buy";
          button.onclick = function(){
            let price = this.item.children[1].id;
            if(resources.money>=price){
              var object = {cat:this.item.parentElement.id, id:this.item.id, price:price};
              resources.buy(object);
            }
          };
        }
        infoDiv.appendChild(button);
        var price = document.createTextNode(" | $"+ item.children[1].id);
        price.id = "infoPrice";
        div.appendChild(price);
      },
      removeChildren : function(infoDiv){ //infoDiv sends in the right div to clear out
        while(infoDiv.children.length>1){  //changed to while condition for bug/issue 131
          document.getElementById("infoImg").remove();
          document.getElementById("infoName").remove();
          document.getElementById("infoButton").remove();
        }
      }
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
      //inventory
    menu.children[1].addEventListener("click",function(event){
      menu.style.display = "none";
      document.getElementById("inventory").style.display = "block";
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

    //add click listener for back buttons
    var backs = document.getElementsByClassName("backButton");
    for(let i=0;i<2;i++){
      backs[i].addEventListener("click",function(event){
        menu.style.display = "block";
        document.getElementById("shop").style.display = "none";
        document.getElementById("inventory").style.display = "none";
        //vv issue 131, clear out info div when leaving display
        SpaceStation.infoDiv.removeChildren(document.getElementsByClassName("info")[0]);
        SpaceStation.infoDiv.removeChildren(document.getElementsByClassName("info")[1]);
      });
    }

    //add click listener for the "radio buttons" ->actually divs
    var buttons = document.getElementById("radioButtons").children;
    var itemCats = document.getElementById("shopItems").children;
    for(let i=0;i<buttons.length;i++){
      buttons[i].addEventListener("click",function(event){
        if(this.id=="allCat"){ //this button shows all the items, the Allcat is your god, your savior, your only hope. Kneel before him
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
          <img class="imgTile" src="shopIMGS/old/health.png">\
          <span style="display:none;" id="2.35"></span>\
        </div>\
      </div>\
      <div id="shieldsDiv" class="catDiv">\
        <div id="Shield Boost" class="tile">\
          <img class="imgTile" src="shopIMGS/old/shield.png">\
          <span style="display:none;" id="4.30"></span>\
        </div>\
        <div id="Fruit Cake" class="tile">\
          <img class="imgTile" src="shopIMGS/fruit_cake.png">\
          <span style="display:none;" id="4.30"></span>\
        </div>\
        <div id="Gandalf" class="tile">\
          <img class="imgTile" src="shopIMGS/gandalf.png">\
          <span style="display:none;" id="4.30"></span>\
        </div>\
      </div>\
      <div id="weaponsDiv" class="catDiv">\
        <div id="Cannon" class="tile">\
          <img class="imgTile" src="shopIMGS/cannon.png">\
          <span style="display:none;" id="2.40"></span>\
        </div>\
        <div id="Missiles" class="tile">\
          <img class="imgTile" src="shopIMGS/missiles.png">\
          <span style="display:none;" id="2.40"></span>\
        </div>\
        <div id="datrepoji2k_1" class="tile">\
          <img class="imgTile" src="shopIMGS/datrepoji2k_1.png">\
          <span style="display:none;" id="3.50"></span>\
        </div>\
        <div id="garminian_2" class="tile">\
          <img class="imgTile" src="shopIMGS/garminian_2.png">\
          <span style="display:none;" id="3.50"></span>\
        </div>\
        <div id="gaze_3" class="tile">\
          <img class="imgTile" src="shopIMGS/gaze_3.png">\
          <span style="display:none;" id="3.50"></span>\
        </div>\
      </div>\
      <div id="enginesDiv" class="catDiv">\
        <div id="Engine One" class="tile">\
          <img class="imgTile" src="shopIMGS/engine_lvl1.jpg">\
          <span style="display:none;" id="2.55"></span>\
        </div>\
        <div id="Engine Two" class="tile">\
          <img class="imgTile" src="shopIMGS/engine_lvl2.jpg">\
          <span style="display:none;" id="1.45"></span>\
        </div>\
        <div id="Engine Three" class="tile">\
          <img class="imgTile" src="shopIMGS/engine_lvl3.jpg">\
          <span style="display:none;" id="1.45"></span>\
        </div>\
      </div>\
      <div id="miscDiv" class="catDiv">\
        <div id="Fog Remover" class="tile">\
          <img class="imgTile" src="shopIMGS/old/fog.png">\
          <span style="display:none;" id="3.60"></span>\
        </div>\
        <div id="Minions" class="tile">\
          <img class="imgTile" src="shopIMGS/minion.png">\
          <span style="display:none;" id="2.60"></span>\
        </div>\
        <div id="Green Room" class="tile">\
          <img class="imgTile" src="shopIMGS/green_room.png">\
          <span style="display:none;" id="2.60"></span>\
        </div>\
        <div id="Scanner" class="tile">\
          <img class="imgTile" src="shopIMGS/scannerpsd.png">\
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
