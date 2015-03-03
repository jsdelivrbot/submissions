var mtns = [20,30,33,40,50,40,20,70,50,10,45];
console.log(mtns);

// traditional for loop approach
var intervals = [];
for (var i=1; i < mtns.length; i++) {
	intervals.push(Math.abs(mtns[i-1]-mtns[i]));
}
//console.log(intervals);
var numtall = 0; // number of intervals >= 30
for (var j=0; j < intervals.length; j++) {
	if (intervals[j] >= 30) {
		numtall++;
	}
}
//console.log(numtall);

//lodash approach
var intervals = _.map(mtns,function(item,index,list){return Math.abs(item-list[index+1]);});
var tall = _.filter(intervals,function(x){return x>=30;});
//console.log(intervals);
//console.log(tall);
//console.log(tall.length);

//chaining approach
var numtall = _.chain(mtns).
			map(function(item,index,list){return Math.abs(item-list[index+1]);}).
			filter(function(x){return x>=30;}).
			value().length;
console.log(numtall);