console.log("using javascript");
var data = raw.data;

var list = data.map(function(item){
		 return {
		     code:item[8],
		     name:item[9],
		     num:item[10],
		     eng:item[11],
		     math:item[12],
		     writing:item[13]
		 };
});

var mathscores = list.map(function(item){return item.math;}).map(function(x){return parseInt(x);}).filter(function(x){return !isNaN(x);});
var sum = mathscores.reduce(function(a,b){return a+b;},0);
var avg = Math.floor(sum/mathscores.length);
var schools = list.filter(function(item){
    return parseInt(item.math)>avg;
});
console.log(avg);
console.log(schools);
