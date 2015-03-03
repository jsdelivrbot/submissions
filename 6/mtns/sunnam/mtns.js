mtns = [10, 20, 22, 40, 50, 40, 30, 70, 50, 110, 45];
var count=0;
var x = _.map(mtns, function(height){ return height });
var filtered = _.filter(x, function(item, index, list){
	if (list.length % 2 == 0) {
	    if (Math.abs(item - list[index+1]) >= 30){
		console.log(item, list[index+1])
		count+=1;
	    }
	}
	else {
	    if ((index != list.length-1) && (Math.abs(item - list[index+1]) >= 30))
		count+=1;
	}
    });

console.log(filtered);
console.log(count);
