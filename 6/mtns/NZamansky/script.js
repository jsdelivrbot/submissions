var mtn = [20,30,33,40,50,40,20,70,50,110,45];

var count = 0;

_.each(mtn,function(x,i,l){ if(Math.abs(l[i+1]-x) >= 30){count = count+1;}});

console.log(count);
