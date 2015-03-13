var array = [1,512,24,25,24,63,47,83,36,23,10,2,51,61,99]

var mountains = function(threshold){
	return _.filter(array, function(n, index){
    	return Math.abs(n - array[index+1]) > threshold;
	});																																																																																																																																																																																																																																																																																																																																																																																																															
};

console.log(mountains(400).length);
document.write("{" + array + "}");
document.write("<h1>Amount of Mountains: ", mountains(400).length, "<h1>");