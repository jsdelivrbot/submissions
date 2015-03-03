var mounts =[20,30,33,40,60,20,70,30,40,80];
var count = 0;
_.forEach(mounts,function(val,index,a){if (Math.abs(val-a[index+1])>=30){count++;}});


console.log(count);