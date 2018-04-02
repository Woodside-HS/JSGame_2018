//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;

    this.shopItems = [];
    this.canLandOn = false;

    this.infoDiv = {
      item: null,

      render : function(){
        ctx.drawImage(this.item.image,800,300,100,100);
        // console.log(this.item);
      },
    };

    //images for backgrounds
    this.mainBack = document.createElement("img");
    this.mainBack.src = "shopIMGS/background.png";
    this.shopBack = document.createElement("img");
    this.shopBack.src = "shopIMGS/shopBackground.png";
    this.infoBack = document.createElement("img");
    this.infoBack.src = "shopIMGS/infoBackground.png";

    // this.loadShopItems();

    this.div = document.getElementById("stationWrapper");
    var button = document.createElement("button");
    this.div.appendChild(button);
    button.spacestation = this;
    button.class = "button";

    var node = document.createTextNode("Exit");
    button.appendChild(node);

    button.addEventListener("click",function(event){
      this.spacestation.div.style.display = "none";
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

  renderStore(){
    //draw background pngs
    ctx.drawImage(this.mainBack,0,0,1024,676); //main
    ctx.drawImage(this.shopBack,0,200,500,500); //shop
    ctx.drawImage(this.infoBack,600,200,500,500); //info

    //render each shop item
    for(let i in this.shopItems){
      this.shopItems[i].render();
    }

    //render infodiv
    // this.infoDiv.render();
  }

  loadShopItems(){
    //0
    var img0 = document.createElement("img");
    img0.src = "shopIMGS/0cookie.png";
    this.shopItems[0] = new ShopItem("Cookie",img0,"1.55",1,this);
    //1
    var img1 = document.createElement("img");
    img1.src = "shopIMGS/1brownie.png";
    this.shopItems[1] = new ShopItem("Brownie",img1,"2.35",1,this);
    //2
    var img2 = document.createElement("img");
    img2.src = "shopIMGS/2cupcake.png";
    this.shopItems[2] = new ShopItem("Cupcake",img2,"3.10",2,this);
    //3
    var img3 = document.createElement("img");
    img3.src = "shopIMGS/3pie.png";
    this.shopItems[3] = new ShopItem("Pie",img3,"2.10",2,this);
    //4
    var img4 = document.createElement("img");
    img4.src = "shopIMGS/4coffee.png";
    this.shopItems[4] = new ShopItem("Coffee",img4,"4.75",1,this);

    for(let i in this.shopItems){ //give each item a location
      let x = 120*(i%4)+40;
      let y = 150*Math.floor(i/4)+150;
      this.shopItems[i].location(x,y);
    }
  }

  // checkClickButton(loc){
  //   //when the mouse clicks the canvas, this func will check to see if it has clicked on a button
  //   for(let i in this.shopItems){
  //     var button = this.shopItems[i].infoButton;
  //     var bX = button.loc.x;
  //     var bY = button.loc.y;
  //     var bS = button.size;
  //     if(bX<loc.x && loc.x<(bX+bS.x) && bY<loc.y && loc.y<(bY+bS.y)){
  //       //^^ if the location of the mouse is within the buttons area on the canvas
  //       button.click();
  //     }
  //   }
  // }
}

class ShopItem{
  //each item needs its own section
  //each section should have:button to buy/sell, image, name, price

  constructor(name,image,price,type,station){
    this.name = name; //string
    this.image = image; //image
    this.price = price; //number
    this.type = type; //number, 0=tile/info, 1=buy, 2=sell
    this.station = station;

    this.shopItemSize = new Vector2D(100,130); //set constant for size of tiles

    this.loc;

    this.infoButton = new Button(this.shopItemSize,0,this.name,this);
    //^^ making the tile a button-->click and get info on that item

    let bSize = new Vector2D(60,40);
    this.moneyButton = new Button(bSize,this.type,this.name,this);
  }

  render(){ //x and y are where on canvas the item's section should be drawn
    //shopitems are rendered in spacestation render function
    ctx.beginPath();
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.loc.x,this.loc.y,this.shopItemSize.x,this.shopItemSize.y); //background box, hardcoded in constructor
    ctx.fillStyle="black";
    ctx.font = "20px Courier";
    // let xLoc = (8-this.name.length)*5+this.loc.x;
    let xLoc = 10+this.loc.x;
    ctx.fillText(this.name,xLoc,this.loc.y+25); //name of item being bought/sold
    ctx.drawImage(this.image,this.loc.x+10,this.loc.y+35,80,80); //image
    // ctx.font = "20px Courier";
    // ctx.fillText(this.price,this.loc.x+40,this.loc.y+260); //price
    // this.moneyButton.render(); //button
  }

  location(x,y){
    this.loc = new Vector2D(x,y);
    this.moneyButton.location(x+100,y+235);
    this.infoButton.location(x,y);
  }
}
