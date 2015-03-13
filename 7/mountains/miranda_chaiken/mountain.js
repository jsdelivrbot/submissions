var mtn = [20,30, 33, 40, 50, 40,20,70,50,10,45];
var i=0;
var differnces=_.map(mtn,function(item, index){
                     return Math.abs(mtn[index] -mtn[index +1]);
    }
);

var grt30 = _.filter(differnces, function(x){ return x >= 30;});


console.log(grt30);
console.log(grt30.length)