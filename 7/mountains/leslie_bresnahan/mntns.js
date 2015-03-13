var l = [20,40,70,60,10,70,80,150,100,90,70,30,60];

var diffs = _.map(l, function(item,index){ return Math.abs(l[index+1]-item);});
console.log(diffs);
var pos = _.filter(diffs, function(item){return item>=30;});
console.log(pos);

var cnt = pos.length;
console.log(cnt);

//or


var p = _.chain(l)
    .map(function(item,index){ return Math.abs(l[index+1]-item);})
    .filter(function(item){return item>=30;})
    .value();


console.log( p.length);
