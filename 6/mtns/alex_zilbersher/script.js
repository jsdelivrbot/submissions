var m = [40,23,65,25,86,23,67,34,23,76,34];

var c = _.chain(m)
.map(function(item,index,m){return Math.abs(m[index+1]-item);})
.filter(function(item){return item >=30;})
.value();

console.log(c);
console.log(c.length);
