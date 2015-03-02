var mountain = [20, 30, 30, 40, 50, 40, 20, 70, 50, 110, 45];

var intervals = _.map(mountain, function(value, index, collection) {return Math.abs(collection[index + 1] - collection[index]);});
var intervals = _.filter(intervals, function(value, index, collection) {if (value > 30) {return value;}});

console.log(intervals.length);
