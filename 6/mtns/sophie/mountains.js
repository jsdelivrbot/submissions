var mtns = [20,30,33,40,50,40,20,70,50,110,45,75];


var difs = _.map(mtns, function(item, index, list){ return Math.abs(item-list[index+1]); } );
difs = _.filter(difs, function(n){ return !isNaN(n); });

difs = _.filter(difs, function(n){ return n >= 30; });

console.log(difs);

var result = _.reduce(difs, function(sum,n){ return sum+1; },0);

console.log(result);