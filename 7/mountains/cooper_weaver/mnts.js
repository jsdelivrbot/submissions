var mountains = [20,40,70,60,10,70,80,150,100,90,70,30,60];
console.log(mountains)

var diffs = _.map(mountains, function(item,index){ return Math.abs(mountains[index+1]-item);});
console.log(diffs);

var big = _.filter(diffs, function(item){return item>=30;});
console.log(big);

var ans = big.length;
console.log(ans);
