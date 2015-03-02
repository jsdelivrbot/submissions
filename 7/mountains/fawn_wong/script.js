var mtn = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45]

var intervals = _.chain(mtn)
    .map(function(x, y){ return Math.abs(x - mtn[y + 1]); })
    .filter(function(x){ return x >= 30; })
    .value();

console.log(intervals.length);
