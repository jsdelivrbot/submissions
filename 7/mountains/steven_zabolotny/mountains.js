var elevations = [20, 30, 33, 40, 50, 40, 20, 70, 50, 10, 45];
var deltas = _.map(elevations, function(n, i) {
    if (i + 1 < elevations.length) {
	return Math.abs(elevations[i + 1] - elevations[i])
    }
});
var steep = _.filter(deltas, function(n) {
    return n >= 30;
});
var count = steep.length;
console.log(count);
