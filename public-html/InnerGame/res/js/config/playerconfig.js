const player_config = {
  size: 40, //px
  max_speed: 7, //px/frame
  minimap_color: "#FF0000",
  movement_loss: 0.9, //amount of friction on movement, px/f^2
  color: 'rgba(200,75,150,1)', //Any color string
  dash_speed:.2, //fraction of dash distance per frame
  dash_time:5, //dash time, in frames
  max_hp: 100,//measured in pts
  max_energy: 50,
  image_src: 'res/sprites/tractor.png', //filepath
  image: new Image() //comes back later, don't touch it unless you have mastered black magic
};
