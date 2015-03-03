var mtn = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45];

var intervals = _.map(mtn,function(x,index){return Math.abs(mtn[index+1]-x)});
var bigintervals = _.filter(intervals,function(x){return x>=30;});

console.log(intervals);
console.log(bigintervals.length);
