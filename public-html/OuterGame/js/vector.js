
class Vector {
    constructor(x, y) {
	  this.x = x || 0;
      this.y = y || 0;
	}

	toString() {
		return "(" + this.x + ", " + this.y + ")";
	}

	equals(other, ignoreLength = false) {
		if(ignoreLength) {
			return this.normalize() == other.normalize();
		}
		return this.x == other.x && this.y == other.y;
	}

    add(other) { // addGetNew
      let vector = this.clone();
      vector.x += other.x;
      vector.y += other.y;
      return vector;
    }

    subtract(other) { // subGetNew
      return this.add(new Vector(other.x * -1, other.y * -1));
    }

    mult(other) { // Multiply by either a number or a Vector
      let vector = this.clone();
      if(other instanceof Vector) {
        vector.x *= other.x;
        vector.y *= other.y;
      } else {
        vector.x *= other;
        vector.y *= other;
      }
      return vector;
    }

    divide(other) { // div
      let vector = this.clone();
      if(other instanceof Vector) {
        vector.x /= other.x;
        vector.y /= other.y;
      } else {
        vector.x /= other;
        vector.y /= other;
      }
      return vector;
    }

	static vectDirection(x,y) {
		return Math.atan2(y,x);
	}

    direction() { // get direction
      return Vector.vectDirection(this.x, this.y);
    }

    length() { // getMagnitude
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    vectorTo(other) {
      return new Vector(other.x-this.x, other.y-this.y);
    }

    distance(other) {
      return Math.sqrt(Math.pow(other.x-this.x, 2) + Math.pow(other.y-this.y, 2));
    }

	rootlessDistance(other) {
      return Math.pow(other.x-this.x, 2) + Math.pow(other.y-this.y, 2); // NOT accurate but useful for fast stuff, use carefully
	}

	midpoint(other) {
		let midX = (this.x + other.x) / 2;
		let midY = (this.y + other.y) / 2;
		return new Vector(midX, midY);
	}

	static center(vectorArr) {
		let vect = new Vector();
		for(let i in vectorArr) {
			vect = vect.add(vectorArr[i]);
		}
		vect = vect.divide(vectorArr.length);
		return vect;
	}

	nearestPointOnLine(point1, point2) {
		var A = this.subtract(point1);
		var u = point2.subtract(point1).normalize();
        
		return point1.add(u.mult(A.dot(u)));
    }

	dot(other) {
        return (this.x * other.x) + (this.y * other.y);
    }

    normalize() {
      return this.setLength(1);
    }

	limit(num) {
		if(this.length() > num) {
			return this.clone().setLength(num);
		}
		return this.clone();
	}

	static setAngle(radians) {
		let orbitX = Math.cos(radians);
		let orbitY = Math.sin(radians);
		return new Vector(orbitX, orbitY);
	}

	getAngle(degrees = false) {
		let rads = Math.atan(this.y/this.x);
		if(degrees) {
			return rads * 180 / Math.PI;
		}
		return rads;
	}

	compareAngle(other, degrees = false) {
		return this.getAngle(degrees) - other.getAngle(degrees);
	}

    setLength(num) {
      let len = this.length();
      if(len > 0) {
        return new Vector((this.x * num) / len, (this.y * num) / len);
      }
      return new Vector(0,0);
    }

    clone() { // Make a copy of the Vector. I think this is a lot better than 'get'
      return new Vector(this.x, this.y);
    }
};

class RandomVector extends Vector {
	constructor() {
		super(Math.random() * 2 - 1, Math.random() * 2 - 1);
	}
}