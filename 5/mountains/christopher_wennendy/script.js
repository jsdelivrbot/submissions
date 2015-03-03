var numbers = [10 , 40 , 70 , 60 , 20 , 150 , 60 , 10 , 30]

var number = function(array){
    return _.filter(array , 
		     function(x,y,z){
			 if (Math.abs(z[y+1] - x) => 30){
			     return x; } } ).length
}

console.log(number(numbers));
