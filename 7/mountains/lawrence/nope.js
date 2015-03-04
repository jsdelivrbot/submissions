var diffnext = function(item, index, list) {
    return Math.abs(item - list[index+1]);
}

var a = [20,30,33,40,50,40,20,70,50,110,45];
var slopes = _.map(a,diffnext);
var difficult = _.filter(slopes,function(x){return x>=30;})
var diffcount = difficult.length;

console.log(a);
console.log(slopes);
console.log(difficult);
console.log(diffcount);
