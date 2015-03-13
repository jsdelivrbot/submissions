var mtns = [20,30,33,40,50,40,20,70,50,110,45];

var heights = _.map(mtns, function(val, index){
    return Math.abs(val - mtns[index + 1])});
var comp = _.filter(heights, function(val){
    return val >=30});

console.log(comp);
console.log(comp.length);
