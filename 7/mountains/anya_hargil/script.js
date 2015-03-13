mtn = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45];

console.log(mtn);

var dist = [];

_.each(mtn, function(item, i, list) { dist[i] = Math.abs(item-list[i+1]);});

dist = _.slice(dist, 0, dist.length-1);

console.log(dist);

var above30 = 0;

_.each(dist, function(item) { if(item > 30) {above30++;} });

console.log(above30);
