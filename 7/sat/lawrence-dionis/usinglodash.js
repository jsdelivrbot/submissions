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
var len;
var sum= _.chain(list)
    .pluck("math")
    .map(function(x){return parseInt(x);})
    .filter(function(x){return !isNaN(x);})
    .tap(function(x){len=_.size(x)})
    .reduce(function(a,b){return a+b;})
    .value();
var avg = Math.floor(sum/len);
var schools = _.filter(list,function(item){
    return parseInt(item.math)>avg;
});
console.log(avg);
console.log(schools);

