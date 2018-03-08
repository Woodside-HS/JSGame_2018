function Vector2D (x, y, r, theta){
  this.x = (x !== undefined) ? x : r * Math.cos(theta);
  this.y = (y !== undefined) ? y : r * Math.sin(theta);
}

/////////////////////// INSTANCE FUNCTIONS /////////////////

Vector2D.prototype.theta = function(){
  return Math.atan2(this.y, this.x);
}

Vector2D.prototype.magnitude = function(){
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector2D.prototype.add = function(vec2) {
  this.x += vec2.x;
  this.y += vec2.y;
  return this;
}

Vector2D.prototype.subtract = function(vec2) {
  this.x -= vec2.x;
  this.y -= vec2.y;
  return this;
}

Vector2D.prototype.scalarMult = function (k) {
  this.x *= k;
  this.y *= k;
  return this;
}

Vector2D.prototype.scalarDiv = function(k) {
  if (k !== 0){
    this.x /= k;
    this.y /= k;
  }
  return this;
}

Vector2D.prototype.normalize = function(){
  var mag = this.magnitude();
  this.scalarDiv(mag);
}

Vector2D.prototype.setMag = function(m){
  this.normalize();
  this.scalarMult(m);
  return this;
}

Vector2D.prototype.setDirection = function(theta){
  var m = this.magnitude();
  this.x = m * Math.cos(theta);
  this.y = m * Math.sin(theta);
}

Vector2D.prototype.limit = function(max){
  if(this.magnitude() > max){
    this.setMag(max);
  }
}


////////////////////////////// CLASS FUNCTIONS ////////////////////////

Vector2D.copy = function(vec1){
  return new Vector2D(vec1.x, vec1.y);
}

Vector2D.prototype.clone = function() {
	return Vector2D.copy(this);
}

Vector2D.distance = function(vec1, vec2) {
  var temp = Vector2D.subtract(vec1, vec2);
  return temp.magnitude();
}

Vector2D.prototype.distance = function(vec) {
	return Vector2D.distance(this, vec);
}

Vector2D.distanceSq = function(vec1, vec2){
  var temp = Vector2D.subtract(vec1, vec2);
  return temp.x * temp.x + temp.y * temp.y;
}

Vector2D.prototype.distanceSq = function(vec) {
	return Vector2D.distanceSq(this, vec);
}

Vector2D.vectorTo = function(vec1, vec2) { // From vec1 to vec2
	return new Vector2D(vec2.x - vec1.x, vec2.y - vec1.y);
}

Vector2D.prototype.vectorTo = function(vec) {
	return Vector2D.vectorTo(this, vec);
}

Vector2D.add = function(vec1, vec2){
  return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);
}

//subtract second vector from first
Vector2D.subtract = function(vec1, vec2){
  return new Vector2D(vec1.x - vec2.x, vec1.y - vec2.y);
}

Vector2D.dot = function(vec1, vec2){
  return vec1.x * vec2.x + vec1.y * vec2.y ;
}

Vector2D.angleBetween = function(vec1, vec2) {
  return vec1.theta() - vec2.theta();
}

Vector2D.scalarMult = function (vec1, k) {
  return new Vector2D(vec1.x * k, vec1.y * k);
}

Vector2D.scalarDiv = function(vec1, k) {
  if (k !== 0){
    return new Vector2D(vec1.x / k, vec1.y / k);
  }
}

Vector2D.normalize = function(vec1){
  var mag = vec1.magnitude();
  return Vector2D.scalarDiv(vec1, mag);
}

Vector2D.random = function(xMin, xMax, yMin, yMax){
  var x = Math.random() * (xMax - xMin) + xMin;
  var y = Math.random() * (yMax - yMin) + yMin;
  return new Vector2D(x, y);
}
