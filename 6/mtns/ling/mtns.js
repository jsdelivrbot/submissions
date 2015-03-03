var mtns = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45];
var count = 0;

_.forEach(mtns, function(item, index, list){
    if (Math.abs(item - list[index+1]) > 30){
	count++;
    }
});

console.log(count);
