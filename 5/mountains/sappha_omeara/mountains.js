var mtns = [10,20,35,25,60,70,15];

var i = 0
var diffs = _.map(mtns, function(item, index){
    return Math.abs(mtns[index] - mtns[index+1]);
    }
);

var bigger30 = _.filter(diffs, function(n){
    return n >= 30;
    }
);

//console.log(mtns);
//console.log(diffs);
//console.log(bigger30);
console.log(bigger30.length);
