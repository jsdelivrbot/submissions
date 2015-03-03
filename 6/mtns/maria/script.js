var mtn = [20,30,33,40,50,40,20,70,50,110,45];

console.log(mtn);

var distances =  _.map(mtn, function(item, i, list){ return Math.abs(list[i+1]-item)});
distances = _.filter(function(item){ return item >= 30; });

console.log(distances);

var total = distances.length;

console.log(total);
