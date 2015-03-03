mtn = [20,130,50,40,60,30,80]
var countIntervals = function(mtn){
    var differ = _.map(mtn,function(x,i,mtn){
	return Math.abs(x-mtn[i-1])
    });
    var z = _.filter(differ, function (dif){
	return dif >= 30;
    });
    return z.length;
};

console.log(countIntervals(mtn));
