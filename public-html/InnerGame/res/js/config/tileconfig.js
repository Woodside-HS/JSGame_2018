'use strict'

//haha what's an enum
const tile_types = {
  init: function () {
    tile_types.grass.image = Images.grass;
    tile_types.rock.image = Images.rocks2c;
    tile_types.water.image = Images.WATERTiles;
    tile_types.mask.image = Images.fog;
    for(let i=0;i<loot_types.animals.length;i++){
      let animal = loot_types.animals[i]
      animal.image = 'Planet'+(i+1);

      //create htmlElement
      let div = document.createElement("div");
      div.id=animal.name;
      div.classList.add('tile');
      let img = document.createElement("img");
      img.src=Images[animal.image].src;
      img.classList.add('imgTile');
      let span = document.createElement("span");
      span.style = "display:none;"
      span.id= animal.value;
      div.appendChild(img);
      div.appendChild(span);
      animal.htmlElement=div;
    }
    // ??


    console.log("b")
  },
  nulltype: {
    minimap_color: new Color("pink"), //Color object
    is_occupied: false,
    is_water: false,
  },
  grass: {
    minimap_color: new Color("#5ca33c"), //Color object
    is_occupied: false,
    is_water: false,
    // image_src: '../InnerGame/res/sprites/grass.png',
    // image: new Image()
  },
  rock: {
    minimap_color: new Color("#696e75"), //Color object
    is_occupied: true,
    is_water: false,
    // image_src: '../InnerGame/res/sprites/rocks2c.png',
    // image: new Image()
  },
  water: {
    minimap_color: new Color("#5ae1fc"), //Color object
    is_occupied: true,
    is_water: true,
    // image_src: '../InnerGame/res/sprites/WATERTiles.png',
    // image: new Image()
  },
  mask: {
    minimap_color: new Color("#202020"), //Color object
    is_occupied: false,
    is_water: false,
    // image_src: '../InnerGame/res/sprites/fog.png',
    // image: new Image(),
    size: 40
  }
};
const tile_config = {
  // animal_image: new Image(),
  // animal_image_src: '../InnerGame/res/sprites/rocks2c.png',
  gridline_stroke: 1,
  gridline_color: "#000000",
  tile_overlap: 1
};
