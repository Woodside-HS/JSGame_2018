
// Contains generally useful functions and classes

class Numbers { // Static methods used to manipulate numbers in various ways
	
	static roundTo(number, digits) { // Rounds to x digits after 0. Negative numbers round to 10s (-1), 100s (-2), etc.
		let num;
		if(digits >= 0) {
			num = Math.round(number * Math.pow(10, digits)) / 100;
		} else {
			num = Math.round(number / Math.pow(10, -1 * digits)) * 100; // CURRENTLY BROKEN. do not use.
		}
		return num;
	}

	static map(value, start1, stop1, start2, stop2) { // Changes "value" within the range [start1, stop1] to its equivalent value within the range [start2, stop2]
		let diff = stop1-start1; // difference between start and stop
		let v = (value-start1)/diff; // v is the how far through that difference "value" is
		let diff2 = stop2-start2;
		return start2 + (v * diff2);
	}

}