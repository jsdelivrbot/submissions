var mtns = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45];
var count = 0;

_.map(mtns, function(item, index, mtns){
	if (index<mtns.length) {
		if (Math.abs(item - mtns[index + 1]) > 30) {
			count++;
		};
	};
});

console.log(count);

