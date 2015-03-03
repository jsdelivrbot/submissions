var mtn = [20,30,33,40,50,40,20,70,50,40,45]
//console.log(mtn);
//var intervals = _.map(mtn, function mtn(height,index) 
//		      {return mtn.slice(1, 2)}); 
var intervals = _.map(mtn, function(height,index){return mtn.slice(index,index+2)}); //err....difference pls not slice
console.log(intervals);
var diff = _.map(intervals, function(a){return Math.abs(a[1] - a[0])});
console.log(diff);
var highdiff = _.reduce(diff, function(a, b){if (b>=30){return a+1;} return a},0);
console.log(highdiff);
