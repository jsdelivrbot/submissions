/*
 * The mountain problem
 *
 * by Genji
 */

var data = [20,30,33,40,50,40,20,70,50,110,45];

var numDiffsOver = function(data, buffer) {
	var temp=0;
	_.reduce(data, function(prev, n, key) {
		if (key!=0) {
			if (Math.abs(n-prev) > buffer) {
				temp++;
			}
		}
		return n;	
	});	
	return temp;
};;

console.log(numDiffsOver(data, 30));
