var elevations = [10, 20, 30, 40, 30, 20, 0, 50, 1000, 2000, 10]

var mountains = _.filter(elevations, function(value, index, collection) {
    return Math.abs(value - collection[index+1]) >= 50;
});

console.log("The " + mountains.length + " mountains are: " + mountains);
