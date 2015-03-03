var nums = [808, 75, 80, 23, 55, 105, 102];//should have 4 intervals above 30

var intervals = _.map(nums, function(value, index){
    if (index+1 < nums.length){
	return Math.abs(value-nums[index+1]);
	}
    else {
	return 0;
    }
});

console.log(intervals);

var above30 = _.filter(intervals, function(n){
    return n>30;
});

console.log(above30);

console.log(above30.length);//returns 4, as expected
