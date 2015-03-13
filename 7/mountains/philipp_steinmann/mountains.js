var mtns = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45];
var aint_no_mountain_high_enough = 30;

var all_but_last = mtns.slice(0, mtns.length - 1);
var having_greater_interval = _.filter(all_but_last, function(height, index) {
    var next_height = mtns[index + 1];
    return Math.abs(height - next_height) >= aint_no_mountain_high_enough;
} );
var number_greater = having_greater_interval.length;
