mtns = [23, 34, 62, 75, 23, 45, 41, 64, 20]

var Intervals = function (a) {
    
    var diff = _.map(a, function (item, index, a) { return Math.abs (a[index-1] - item) });
    
    var filtr = _.filter (diff, function (d) { return d >= 30; });

    return filtr.length;

};

console.log (Intervals (mtns));

