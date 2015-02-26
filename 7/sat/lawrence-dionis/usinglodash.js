//not working because lazy evaluation is lazy.
console.log("using lodash");
var list = _.map(raw.data,function(item){
		 return {
		     code:item[8],
		     name:item[9],
		     num:item[10],
		     eng:item[11],
		     math:item[12],
		     writing:item[13]
		 };
});
var mathscores = _.chain(list)
    .map(function(item){return item.math;})
    .map(function(x){return parseInt(x);})
    .filter(function(x){return !isNaN(x);});
var sum = _.chain(list)
    .map(function(item){return item.math;})
    .map(function(x){return parseInt(x);})
    .filter(function(x){return !isNaN(x);})
    .reduce(mathscores,function(a,b){return a+b;});
var avg = Math.floor(sum/_.size(mathscores));
var schools = _.filter(list,function(item){
    return parseInt(item.math)>avg;
});
console.log(avg);
console.log(schools);

