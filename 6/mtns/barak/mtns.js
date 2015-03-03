var mtns = [20,30,33,40,50,40,20,70,50,110,45];

var intervals = 0;
//_.forEach(collection, function(element, index, array))
_.forEach(mtns,function(e,i,a){if (Math.abs(e-a[i+1])>=30){intervals++;}});
console.log(mtns);
console.log(intervals);
