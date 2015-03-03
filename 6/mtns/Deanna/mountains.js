
mtns = [20,30,33,40,50,40,20,70,50,10,45];
console.log(mtns);

var sv = _.map(mtns, function(item,index,mtns){
    return Math.abs(mtns[index+1] - item);
});
console.log(sv); //I cant figure out how to filter this 

var largeDiffs = _.filter(sv, function(item){
    return item >= 30;
});

console.log(largeDiffs);

var score = largeDiffs.length;

console.log(score);
