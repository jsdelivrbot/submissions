mtn = [20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45];

console.log(mtn);

dist = [];

_.each(mtn, function(item, i, list) { dist[i] = Math.abs(item-list[i+1]); });

_.filter(dist, function(x){ return !isNaN(x); });

console.log(dist);
