var mountainrange = [20,30,33,40,50,40,20,70,50,110,45];

var mtRangeDiffs = function(range,diff){
    return _.filter(range, function(y,x){
	return Math.abs(y-range[x+1]) >= diff;
    })
};
console.log(mountainrange);
console.log(mtRangeDiffs(mountainrange));
