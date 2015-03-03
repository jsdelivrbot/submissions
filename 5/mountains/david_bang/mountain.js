var mountain = [10, 20, 40, 70, 105, 115, 110, 100, 90, 65, 35, 15];

var deltaElevation = function(mountains) {
    DE = _.filter(mountains, function ( elevation ,index, mountains) {
	if (Math.abs (mountains[index + 1] - elevation) >= 30){
	    return elevation;
	}}).length
    return DE;
    };

console.log (deltaElevation (mountain));
