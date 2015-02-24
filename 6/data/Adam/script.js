//console.log(rawscores);

raw_school_data = rawscores.data;
console.log("Raw data:");
console.log(raw_school_data);

school_scores = [];
math_scores = [];
for (var i=0; i < raw_school_data.length;i++){
    var t = {code:raw_school_data[i][8],
	     name:raw_school_data[i][9],
	     num:raw_school_data[i][10],
	     eng:raw_school_data[i][11],
	     math:raw_school_data[i][12],
	     writing:raw_school_data[i][13],
	    };
    school_scores.push(t);
    if (raw_school_data[i][12] != "s")
    {
    	math_scores.push(raw_school_data[i][12]);
    }
};
console.log("School scores:");
console.log(school_scores);

sum = 0;

for (var i = 0; i < math_scores.length; i++)
{
	sum = sum + parseInt(math_scores[i])
}

mean = sum / math_scores.length;
console.log("Mean:");
console.log(mean);

var schools_above_avg = [];

for (var i=0; i<school_scores.length; i++) 
{
    if (school_scores[i]['math'] > mean)
    {
    	schools_above_avg.push(school_scores[i]);
    }
}
console.log("Above average:");
console.log(schools_above_avg);
