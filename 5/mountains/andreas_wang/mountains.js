var range = [20,30,33,40,50,40,20,70,50,110,45];

var numMtns = function(cutoff, range) {
    return _.reduce(range, function(a, b, c) {
	    if (c > 0 && c < range.length &&
		b >= range[c-1] + cutoff && b >= range[c+1] + cutoff) {
		a++;
	    }
	    return a;
	}, 0);
};

console.log(numMtns(10, range));