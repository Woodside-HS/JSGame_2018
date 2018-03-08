
var JSVector = function(x, y){
     this.x = x || 0; //(0 if no parameter is passed)
     this.y = y || 0; //(0 if no parameter is passed)
}
//  this changes an existing vector
//  by adding components
JSVector.prototype.add = function(vec){
  this.x += vec.x || 0;
  this.y += vec.y || 0;
}
//this creates a new vector by adding components
JSVector.addGetNew = function(v1, v2){
  var x = v1.x + v2.x;
  var y = v1.y + v2.y;
  var newVec = new JSVector(x, y);
  return newVec;
}

JSVector.prototype.sub = function(vec){
  this.x -= vec.x || 0;
  this.y -= vec.y || 0;
}
//this creates a new vector by adding components
JSVector.subGetNew = function(v1, v2){
   var x = v1.x - v2.x;
  var y = v1.y - v2.y;
  var newVec = new JSVector(x, y);
  return newVec;
}

JSVector.prototype.getDirection = function() {
  // atan2 takes values above PI or -PI radians??
	return Math.atan2(this.y, this.x);
};


// return the magnitude of the vector
JSVector.prototype.getMagnitude = function() {
	// Use the distance formula
  //  Assume one pont has coords (0, 0)
  var x2  = this.x * this.x;
  var y2  = this.y * this.y;
  return Math.sqrt(x2 + y2);
};


// set the direction of the vector in radians
// input  = desired andgle
JSVector.prototype.setDirection = function(newAngle) {
	var magnitude = this.getMagnitude();
  if(newAngle){
    this.x = Math.cos(newAngle) * magnitude;// keep magnitude
    this.y = Math.sin(newAngle) * magnitude;// keep magnitude
  }else{
    this.x = 0;
    this.y = 0;
  }
};

// set the magnitude of the vector
JSVector.prototype.setMagnitude = function(magnitude) {
  var angle = this.getDirection();
	this.x = Math.cos(angle) * magnitude;// keep direction
	this.y = Math.sin(angle) * magnitude;
};

// set the magnitude of the vector
JSVector.prototype.normalize = function() {
  var angle = this.getDirection();
	this.x = Math.cos(angle);// keep direction
	this.y = Math.sin(angle);
};

JSVector.prototype.mult = function(m) {
	this.x *= m;// keep direction
	this.y *= m;
};
