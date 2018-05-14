
const loot_types = {
  animals:[
    {
      name:'pwargnart',
      value: 12
    },
    {
      name:'nawgpart',
      value: 10
    }
  ],
  init: function(){
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
  }
}
const loot_config = {
  animal_count:20

}
