//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;

    this.canLandOn = false;

    this.stationImage = Images['Station'];
    //create html div for whole space station
    this.div = document.createElement("div");
    this.div.id = "spacestation";
    document.getElementById("wrapper").appendChild(this.div);
    //create an attribute of the space station class to add html in this file
    this.div.innerHTML = SpaceStation.html;

    //"disable" some items in shop that can't be bought until other item are bought
    document.getElementById("Fruit Cake").className = "disabledTile";
    document.getElementById("Yokerling Bokum").className = "disabledTile";
    document.getElementById("The Holy Grail").className = "disabledTile";
    document.getElementById("788’481’515’’6765-132154--16").className = "disabledTile";
    document.getElementById("[Gurgling Noises]").className = "disabledTile";
    document.getElementById("Canadian Mooseherder").className = "disabledTile";

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
        var div1 = document.createElement("div");
        var node1 = document.createTextNode(""+item.id);
        var div2 = document.createElement("div");
        var node2 = document.createTextNode(""+item.children[3].innerHTML) ;
        div2.appendChild(node2);
        div2.id = "infoP";
        div1.appendChild(node1);
        div1.id = "infoName";
        infoDiv.appendChild(div1);
        var button = document.createElement("button");
        button.id = "infoButton";
        button.item = item;
        if(!page){ //if in inventory, sell items
          button.innerHTML = "Sell";
          button.onclick = function(){
            resources.sellItem(this.item);
          };
        } else{ //if in shop, buy items
          button.innerHTML = "Buy";
          button.onclick = function(){
            let price = this.item.children[2].id;
            if(resources.money>=price){
              var object = {cat:this.item.id,price:price};
              //var object = {cat:this.item.parentElement.id, id:this.item.id, price:price};
              resources.buy(object);
            }
          };
          if(item.className == "oldTile"){
            button.disabled = true;
          }
        }
        infoDiv.appendChild(button);
        var price = document.createTextNode(" | $"+ item.children[2].id);
        price.id = "infoPrice";
        div1.appendChild(price);
        div1.appendChild(div2);
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
          if(this.className != "disabledTile"){ //if not "disabled"
            SpaceStation.infoDiv.render(this,true);
            //^^^^render info of this item in the info div
          }
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
    for(let i=0;i<itemCats.length;i++){ //traverse categories in items
      itemCats[i].style.display = "none";
    }
    for(let i=0;i<buttons.length;i++){
      buttons[i].addEventListener("click",function(event){
          for(let i=0;i<itemCats.length;i++){ //traverse categories in items
            itemCats[i].style.display = "none";
          }
          document.getElementById(""+this.id+"Div").style.display = "block";
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
    var dx = this.loc.x-60;
    var dy = this.loc.y-60;
    var dw = 120;
    var dh = 120;
    ctx.drawImage(this.stationImage, dx, dy, dw, dh);
  }

}

SpaceStation.html = '\
  <div id="moneyDiv"><p id="amount">$100</p></div>\
  <h1 style="font-size:40px;">Space Station</h1>\
  <img id="exitButton" src="shopIMGS/exit.png">\
  <div id="menu">\
    <div id="shopButton" class="menuButton">Go To Shop</div>\
    <div id="inventoryButton" class="menuButton">Go To Inventory</div>\
  </div>\
  <div id="shop" style="display:none">\
    <div class="backButton">Back</div>\
    <div id="radioButtons">\
      <div class="radio" id="health">Health</div>\
      <div class="radio" id="shields">Shields</div>\
      <div class="radio" id="weapons">Weapons</div>\
      <div class="radio" id="engines">Engines</div>\
      <div class="radio" id="misc">Misc</div>\
    </div>\
    <div class="items" id="shopItems">\
      <div id="healthDiv" class="catDiv">\
        <div id="Max HP Increase" class="tile">\
          <img class="imgTile" src="shopIMGS/old/health.png">\
          <p>Max HP Increase</p>\
          <span style="display:none;" id="2.35"></span>\
          <p style="display:none;"></p>\
        </div>\
      </div>\
      <div id="shieldsDiv" class="catDiv">\
        <div id="Gandalf" class="tile">\
          <img class="imgTile" src="shopIMGS/gandalf.png">\
          <p>Gandalf</p>\
          <span style="display:none;" id="4.30"></span>\
          <p style="display:none;">“YOU SHALL NOT PASS!!!!” When this wizard was stolen\
           from Dimension 11984, the kidnappers brought a strange ring with them too. \
           They are nowhere to be found.</p>\
        </div>\
        <div id="Fruit Cake" class="tile">\
          <img class="imgTile" src="shopIMGS/fruit_cake.png">\
          <p>Fruit Cake</p>\
          <span style="display:none;" id="4.30"></span>\
          <p style="display:none;">For eons, humans used to run away from eating \
          fruitcake. The same is true for most other alien species.</p>\
        </div>\
        <div id="Yokerling Bokum" class="tile">\
          <img class="imgTile" src="shopIMGS/costco1.png">\
          <p>Yokerling Bokum</p>\
          <span style="display:none;" id="4.30"></span>\
          <p style="display:none;">This nearly-impenetrable wall was first developed by a \
          Yokerling warehouse store chain to keep out those without membership cards. It worked.</p>\
        </div>\
      </div>\
      <div id="weaponsDiv" class="catDiv">\
        <div id="Cannon" class="tile">\
          <img class="imgTile" src="shopIMGS/cannon.png">\
          <p>Cannon</p>\
          <span style="display:none;" id="2.40"></span>\
          <p style="display:none;"></p>\
        </div>\
        <div id="Missiles" class="tile">\
          <img class="imgTile" src="shopIMGS/missiles.png">\
          <p>Missiles</p>\
          <span style="display:none;" id="2.40"></span>\
          <p style="display:none;"></p>\
        </div>\
        <div id="Biffle Ball" class="tile">\
          <img class="imgTile" src="shopIMGS/datrepoji2k_1.png">\
          <p>Biffle Ball</p>\
          <span style="display:none;" id="3.50"></span>\
          <p style="display:none;">On the asteroid chain of Biffle-22, \
          the gigantic inhabitants play a variation of lacrosse with a material \
          as hard as titanium, which is now used vto manufacture bullets across the galaxy.</p>\
        </div>\
        <div id="The Holy Grail" class="tile">\
          <img class="imgTile" src="shopIMGS/garminian_2.png">\
          <p>The Holy Grail</p>\
          <span style="display:none;" id="3.50"></span>\
          <p style="display:none;">Once the Holy Grail was found in Petra, Jordan, people decided \
          to use its heavenly qualities to manufacture excellent bullets.</p>\
        </div>\
        <div id="788’481’515’’6765-132154--16" class="tile">\
          <img class="imgTile" src="shopIMGS/gaze_3.png">\
          <p>788’481’515’’6765-132154--16</p>\
          <span style="display:none;" id="3.50"></span>\
          <p style="display:none;">82210028’4 02534[033]/68/ 98-4=064 96842`064~1 60634051/*0541 \
          050+5840+941-*4156 +9484*654 564.</p>\
        </div>\
      </div>\
      <div id="enginesDiv" class="catDiv">\
        <div id="1958 Ferrari GT-3432" class="tile">\
          <img class="imgTile" src="shopIMGS/engine1.png">\
          <p>1958 Ferrari GT-3432</p>\
          <span style="display:none;" id="2.55"></span>\
          <p style="display:none;">The fastest automobile ever created lends itself well to \
          spaceflight, but the uncontrollable nature of the clutch makes it a very unreliable. </p>\
        </div>\
        <div id="[Gurgling Noises]" class="tile">\
          <img class="imgTile" src="shopIMGS/engine2.png">\
          <p>[Gurgling Noises]</p>\
          <span style="display:none;" id="1.45"></span>\
          <p style="display:none;">AAAEREHRPSEEEEE MYARFFFF GHEO”PORIE. YYWOPQWEBBEOPE, LLLLAORPORSUFEEQ \
          BYISPAAIDSE. (Tip: Just take the engine and run)</p>\
        </div>\
        <div id="Canadian Mooseherder" class="tile">\
          <img class="imgTile" src="shopIMGS/engine3.png">\
          <p>Canadian Mooseherder</p>\
          <span style="display:none;" id="1.45"></span>\
          <p style="display:none;">After the Great Frozzen, the Canadians were most prepared for the \
          giant herds of moose which would take over the world. The prototype engine could cross a \
          province in a second, which was crucial to winning the War of Moose Reclamation. </p>\
        </div>\
      </div>\
      <div id="miscDiv" class="catDiv">\
        <div id="Minions" class="tile">\
          <img class="imgTile" src="shopIMGS/minion.png">\
          <p>Minions</p>\
          <span style="display:none;" id="2.60"></span>\
          <p style="display:none;"></p>\
        </div>\
        <div id="Game Room" class="tile">\
          <img class="imgTile" src="shopIMGS/green_room.png">\
          <p>Game Room</p>\
          <span style="display:none;" id="2.60"></span>\
          <p style="display:none;">You can’t see it, but there’ll be a pool table and flat-screen TV on the ship.</p>\
        </div>\
        <div id="Vision Enhancer" class="tile">\
          <img class="imgTile" src="shopIMGS/scannerpsd.png">\
          <p>Vision Enhancer</p>\
          <span style="display:none;" id="2.60"></span>\
          <p style="display:none;">Extend the range of your vision on all foggy planets.</p>\
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
