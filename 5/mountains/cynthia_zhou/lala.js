var get = function(min, list){
    return _.filter(
	_.map(list, 
	      function(item,index,list) { return Math.abs(list[index+1] - item); }
	     ),
	function(x) { return x > min; }
    ).length;
};
var l = [20,30,33,40,50,40,20,70,50,110,45];
console.log(get(30,l));
