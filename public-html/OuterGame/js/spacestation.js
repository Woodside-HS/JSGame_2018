//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;

    this.shopItems = []; //this stores all the items being solid, info used for buttons and info
    this.loadShopItems(); //need to fix the function first since changed to html

    this.canLandOn = false;

    this.infoDiv = { //prob dont need??? <<<<<<<<<<
      item: null,
      render : function(){
        // console.log(this.item);
      },
    };

    //create html div for whole space station
    this.div = document.createElement("div");
    this.div.id = "spacestation";
    document.getElementById("wrapper").appendChild(this.div);
    //create an attribute of the space station class to add html in this file
    this.div.innerHTML = SpaceStation.html;

    //event listener for clicking on button
    document.getElementById("exitButton").addEventListener("click",function(event){
      this.parentElement.style.display = "none";
      gameState = "outer";
    });

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
    //0
    var img0 = document.createElement("img");
    img0.src = "shopIMGS/0cookie.png";
    this.shopItems[0] = new ShopItem("Cookie",img0,"1.55",true);
    //1
    var img1 = document.createElement("img");
    img1.src = "shopIMGS/1brownie.png";
    this.shopItems[1] = new ShopItem("Brownie",img1,"2.35",true);
    //2
    var img2 = document.createElement("img");
    img2.src = "shopIMGS/2cupcake.png";
    this.shopItems[2] = new ShopItem("Cupcake",img2,"3.10",true);
    //3
    var img3 = document.createElement("img");
    img3.src = "shopIMGS/3pie.png";
    this.shopItems[3] = new ShopItem("Pie",img3,"2.10",true);
    //4
    var img4 = document.createElement("img");
    img4.src = "shopIMGS/4coffee.png";
    this.shopItems[4] = new ShopItem("Coffee",img4,"4.75",true);

    //draw button tiles for each shop item and show info on right
    for(let i in this.shopItems){
      let x = 120*(i%3) +30;
      let y = 150*Math.floor(i/3) +50;
      let button = document.createElement("div");
      button.station = this;
      button.className = "tile";
      button.style.top = ""+y+"px";
      button.style.left = ""+x+"px";
      let img = document.createElement("img");
      img.className = "img";
      img.src = this.shopItems[i].image.src;
      button.appendChild(img);
      this.div.children[1].appendChild(button);

      button.addEventListener("click",function(event){
        console.log(this.station.shopItems[i].name);
      });
    }
  }
}

SpaceStation.html = '\
  <h1 style="position:absolute; top:10px; left:30px;">Space Station</h1>\
  <img src="shopIMGS/background.png" style="width:100%; height:100%;">\
  <img id="exitButton" src="shopIMGS/exit.png">\
  <div id="items">\
    <img class="img" src="shopIMGS/shopBackground.png">\
    <div class="tile">\
    </div>\
  </div>\
  <div id="info">\
    <img class="img" src="shopIMGS/infoBackground.png">\
  </div>\
';

class ShopItem{
  //each item needs its own section
  //each section should have:button to buy/sell, image, name, price

  constructor(name,image,price,type){
    this.name = name; //string
    this.image = image; //image
    this.price = price; //number
    this.type = type; //boolean, true-buy, false-sell
  }

}
