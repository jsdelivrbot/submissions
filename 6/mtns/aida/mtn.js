var mtns = [];
for (var i = 0; i < 30; i++) {
	mtns[i] = Math.floor(Math.random() * 100);
};
var count = 0;
_.forEach(mtns, function(element, index, array){
	if (Math.abs(element - array[index+1]) >= 30) {
		count++;
	};
});
console.log(count);