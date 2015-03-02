var mtnRange = [20,30,33,40,50,40,20,70,50,110,45]

var countMtnDiffs = function(mountains, threshold){
    return _.filter(mountains, function(n, i, list){
	return Math.abs(n - list[i + 1]) <= threshold;
    });
};

console.log(countMtnDiffs(mtnRange, 30));
