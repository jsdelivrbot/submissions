var mtns = [10,23,30,50,40,15,60,55,90,66];
var count = 0;

var altchange = _.map(mtns, function(item, index){
    return Math.abs(mtns[index+1]-item);
});
console.log(altchange);


_.each(altchange, function(item){
    if( item >= 30){
	count++;
}});

console.log(count);
