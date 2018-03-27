//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;
    this.shopItems = [];
    this.canLandOn = false;

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

  renderStore(){
    for(let i in this.shopItems){
      this.shopItems[i].render();
    }
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
    this.shopItems[2] = new ShopItem("Cupcake",img2,"3.10",false);
    //3
    var img3 = document.createElement("img");
    img3.src = "shopIMGS/3pie.png";
    this.shopItems[3] = new ShopItem("Pie",img3,"2.10",false);
    //4
    var img4 = document.createElement("img");
    img4.src = "shopIMGS/4coffee.png";
    this.shopItems[4] = new ShopItem("Coffee",img4,"4.75",true);

    for(let i in this.shopItems){ //give each item a location
      let x = 245*(i%4)+45;
      let y = 325*Math.floor(i/4)+25;
      this.shopItems[i].location(x,y);
    }
  }

  checkClickButton(loc){
    for(let i in this.shopItems){
      var button = this.shopItems[i].button;
      var bX = button.loc.x;
      var bY = button.loc.y;
      var bS = button.size;
      if(bX<loc.x && loc.x<(bX+bS.x) && bY<loc.y && loc.y<(bY+bS.y)){
        //^^ if the location of the mouse is within the buttons area on the canvas
        button.click();
      }
    }
  }
}

class ShopItem{
  //each item needs its own section
  //each section should have:button to buy/sell, image, name, price

  constructor(name,image,price,buy){
    this.name = name; //string
    this.image = image; //image
    this.price = price; //number
    this.buy = buy; //boolean

    this.loc;

    let bSize = new Vector2D(60,40);
    this.button = new Button(bSize,this.buy);
  }

  render(){ //x and y are where on canvas the item's section should be drawn
    //shopitems are rendered in spacestation render function
    ctx.beginPath();
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.loc.x,this.loc.y,200,300); //background box, hardcoded as 200w x 300h
    ctx.fillStyle="black";
    ctx.font = "30px Courier";
    let xLoc = (10.5-this.name.length)*10+this.loc.x;
    ctx.fillText(this.name,xLoc,this.loc.y+50); //name of item being bought/sold
    ctx.drawImage(this.image,this.loc.x+25,this.loc.y+70,150,150); //image
    ctx.font = "20px Courier";
    ctx.fillText(this.price,this.loc.x+40,this.loc.y+260); //price
    this.button.render(); //button
  }

  location(x,y){
    this.loc = new Vector2D(x,y);
    this.button.location(x+100,y+235);
  }
}

class Button{ //size hardcoded as 60w x 40h
  constructor(size,buy){
    this.loc; //location of button is coords on canvas
    this.size = size; //is a vector (width,height)
    this.buy = buy;

    if(buy){
      this.text = "Buy";
    } else{
      this.text = "Sell";
    }
  }

  render(){
    ctx.fillStyle = "gray";
    ctx.fillRect(this.loc.x,this.loc.y,this.size.x,this.size.y);
    ctx.fillStyle="black";
    ctx.font = "20px Courier";
    if(this.buy){ //center text on button
      var x = this.loc.x+12;
    } else{
      var x = this.loc.x+7;
    }
    ctx.fillText(this.text,x,this.loc.y+25);
  }

  location(x,y){
    this.loc = new Vector2D(x,y);
  }

  click(){
    console.log("click");
  }
}
