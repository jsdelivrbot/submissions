mtns = [20, 30, 10, 50, 90, 70, 20, 40, 50, 110, 45]

var countMtnRange = function(mtnrange){
    diffs = _.map(mtnrange, function(item, index, range){ return Math.abs(range[index+1]-item );})
            .filter(function(x){return !isNaN(x) && x >= 30;});
    return diffs.length;
};

console.log(countMtnRange(mtns));
