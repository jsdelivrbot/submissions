var mtns = [20,30,33,40,50,40,20,50,80,70,45,10,20];

var a = _.map(mtns, function(x,i,mtns){return Math.abs(x - mtns[i+1]);});
a = a.slice(0,a.length-1);

var steep = _.filter(a, function(x){return x>=30;});
