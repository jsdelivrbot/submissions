var data = rawdata["data"];
var school_scores = [];
var math_scores = [];
var mean;
var new_school_scores = [];

for(var i = 0; i < data.length; i++){
    var math = data[i][12];
    var sum = 0;
    var count = 0;

    school_scores[i] = {
	"code":data[i][8],
	"name":data[i][9],
	"count":data[i][10],
	"reading":data[i][11],
	"math":data[i][12],
	"writing":data[i][13],
    };

    math_scores[i] = math;
    if (!isNaN(parseInt(math))){
	sum+= math;
	count++;
    }
}

mean = sum/count;

for (i = 0; i < school_scores.length; i++)
    if (school_scores[i]["math"] > mean)
	new_school_scores.push(school_scores[i]);


/*
for(var i = 0; i < data.length; i++){
    var sum = 0;
    var count = 0;
    var curr = parseInt(math_scores[i]);
    if(!isNaN(curr)){ 
	sum += math_scores[i];
	count++;
    }
}
*/

document.write("Average math score: " + mean);
console.log(school_scores);
console.log(math_scores);
console.log(new_school_scores);
