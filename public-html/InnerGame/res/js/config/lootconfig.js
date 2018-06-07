
const loot_types = {
  animals:[
    {
      name:'pwargnart',
      value: 50
    },
    {
      name:'nawgpart',
      value: 50
    },
    {
      name:'frank',
      value: 50
    },
    {
      name:'harold',
      value: 50
    },
    {
      name:'b̸̳͊̀̔̄̓̽̐̓̃̍̀̐̓̕͠u̸̧̞̪̳͉̗̭̖̪̓͐̀̃̉̌̾̎̐͋̃̾ŗ̶̛̗͕͚̩͓̣̼͇͔̝̰̮̼̓̎͒̾̄̓̌͗̇́͝͝o̸͌͛̇͊̿̓̌͘͜k̶̢̡̘̮͕̙̤̩͔̒̽̏̕,̴̖͚̭͔̖͕͓͔̀̒͐ ̵̨̪̠̹̳̿͗̅̂̀͋͗̈́̊͊̚͜͝͝ḓ̶̞̣̜͖̥̯͉̥͓͔̥̼̎͗͜ȅ̸̛͍͎̮̙̫̅̍̈́̋̑̑́͆̌̎͌s̶̡̧̙̝̳̬͉̟͚̖̫̯͎̉t̸̢̢̲͚̠̘͈͙̹̭̄̀͝͠ô̴̧̺̠͇͚̙͉͎̗͎̙̋̀́͆̈́̒̾r̴̡͕͔͉͎̘̫̪̤̼̽̿͊͊̀̈́̾̉̌͗͘̚͘͝͝y̴̡̢̛͍̺̳͉͗̃̒̏̕ę̷̨̡̛̱̙̮̞̘̘͕̤̱̄̋͋̾̐́̚ṛ̴̯̫̝̗̫̙̤͑͋́̎́̀̑͐̍͐̕͝ͅ ̷̣̲̣̠̣̗͕͎̞͙͆̅̽͗͛́ō̵̧̧̞͔̼͆̑͂͌̄̓̀̉̈̓͘͠͠f̴̧̛̩̖͖͓͍͍̠͓̯̬̅̓̃̓͋͐̃̽̋̑͠ ̴̡̪͈̝̮̠͔̞̙͔͎̽̎̌̽̉̉̾̍͝w̸̞̿͆͝ờ̴̠̼̪̠̓̋̈̆̐́̌͛̎̇͝͠ͅr̶̬̤͚͔͙̙̼̜̻̽͗́̎͌̊̈̓́͜͜͜͠l̷̬͕̹͎̂̀̈́̾̽͆́̊̈͊̔͘d̴̡̗̪̐͑͐͂s̵͚̗͍̈́̍̔̉̇̀̑̉́̕',
      value: 50
    }
  ],
  init: function(){
    for(let i=0;i<loot_types.animals.length;i++){
      let animal = loot_types.animals[i]
      animal.image = 'creature'+(i+1);

      //create htmlElement
      let div = document.createElement("div");
      div.id=animal.name;
      div.classList.add('invTile');
      let img = document.createElement("img");
      img.src=Images[animal.image].src;
      img.classList.add('imgTile');
      let span = document.createElement("span");
      span.style = "display:none;"
      span.id= animal.value;
      div.appendChild(img);
      let gap = document.createElement("p"); //so span will be found, for name
      gap.innerHTML = animal.name;
      div.appendChild(gap);
      div.appendChild(span);
      let info = document.createElement("p"); //another gap, for info
      div.appendChild(info);
      animal.htmlElement=div;
    }
  }
}
const loot_config = {
  animal_count:1

}
