function vector2d (x, y, r, theta){
  this.x = (x !== undefined) ? x : r * Math.cos(theta);
  this.y = (y !== undefined) ? y : r * Math.sin(theta);
}

/////////////////////// INSTANCE FUNCTIONS /////////////////

vector2d.prototype.theta = function(){
  return Math.atan2(this.y, this.x);
}

vector2d.prototype.magnitude = function(){
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

vector2d.prototype.add = function(vec2) {
  this.x += vec2.x;
  this.y += vec2.y;
}

vector2d.prototype.subtract = function(vec2) {
  this.x -= vec2.x;
  this.y -= vec2.y;
}

vector2d.prototype.scalarMult = function (k) {
  this.x *= k;
  this.y *= k;
}

vector2d.prototype.scalarDiv = function(k) {
  if (k !== 0){
    this.x /= k;
    this.y /= k;
  }
}

vector2d.prototype.normalize = function(){
  var mag = this.magnitude();
  this.scalarDiv(mag);
}

vector2d.prototype.setMag = function(m){
  this.normalize();
  this.scalarMult(m);
}

vector2d.prototype.setDirection = function(theta){
  var m = this.magnitude();
  this.x = m * Math.cos(theta);
  this.y = m * Math.sin(theta);
}

vector2d.prototype.limit = function(max){
  if(this.magnitude() > max){
    this.setMag(max);
  }
}


////////////////////////////// CLASS FUNCTIONS ////////////////////////

vector2d.copy = function(vec1){
  return new vector2d(vec1.x, vec1.y);
}

vector2d.distance = function(vec1, vec2) {
  var temp = vector2d.subtract(vec1, vec2);
  return temp.magnitude();
}

vector2d.distanceSq = function(vec1, vec2){
  var temp = vector2d.subtract(vec1, vec2);
  return temp.x * temp.x + temp.y * temp.y;
}

vector2d.add = function(vec1, vec2){
  return new vector2d(vec1.x + vec2.x, vec1.y + vec2.y);
}

//subtract second vector from first
vector2d.subtract = function(vec1, vec2){
  return new vector2d(vec1.x - vec2.x, vec1.y - vec2.y);
}

vector2d.dot = function(vec1, vec2){
  return vec1.x * vec2.x + vec1.y * vec2.y ;
}

vector2d.angleBetween = function(vec1, vec2) {
  return vec1.theta() - vec2.theta();
}

vector2d.scalarMult = function (vec1, k) {
  return new vector2d(vec1.x * k, vec1.y * k);
}

vector2d.scalarDiv = function(vec1, k) {
  if (k !== 0){
    return new vector2d(vec1.x / k, vec1.y / k);
  }
}

vector2d.normalize = function(vec1){
  var mag = vec1.magnitude();
  return vector2d.scalarDiv(vec1, mag);
}

vector2d.random = function(xMin, xMax, yMin, yMax){
  var x = Math.random() * (xMax - xMin) + xMin;
  var y = Math.random() * (yMax - yMin) + yMin;
  return new vector2d(x, y);
}
