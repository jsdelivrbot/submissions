//built in to each funtion, there are two other variables.  Index for the second and list for the third.  List returns original list 
/*var data = raw_data.data;
var scores = [];
for(var i = 0; i < data.length; i++){
	scores.push({
		'school':data[i][9],
		'reading':data[i][11],
		'math':data[i][12],
		'writing':data[i][13]
	})
}
//console.log(scores.math)
var x = _.filter(_.map(scores, function(x){return x.math;}), function(x) {return !isNaN(x);})
//console.log(x)
var y = _.chain(scores).pluck('math').filter(function(x){return !isNaN(x);}).value()
console.log(y)
*/
var range=[20,30,70,32,56,37,18,57,95,31,578,986,211];

var x = _.filter(range, function(item, index){return Math.abs(item-range[index+1]) > 50;})

console.log(x.length)
//Checking my answer 
var ret = 0; 
for (var i =0; i < range.length-1; i++){
	if(Math.abs(range[i]-range[i+1]) > 50){
		ret++
	}
}
console.log(ret)


