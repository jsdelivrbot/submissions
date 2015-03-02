var mtn = [20,30,33,40,50,40,20,70,50,110,45];//how many intervals >= 30

console.log(mtn);

var ranges = _.map(mtn,function(value,index){
    if (index+1 < mtn.length){
	return Math.abs(value-mtn[index+1]);
    }
});

console.log(ranges);

var greater = _.filter(ranges,function(value){
    return value >= 30;
}

var number = greater.length;

console.log(number);
