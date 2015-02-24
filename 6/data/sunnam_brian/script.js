src_data = src_data.data;

// 1. Convert the raw data to an array of dictionaries as specified in class.
var school_scores = [];
for(var i=0; i<src_data.length; i++){
    var obj = src_data[i];
    var dict ={
	'code': obj[8],
	'name': obj[9],
	'num' : obj[10],
	'eng' : obj[11],
	'math': obj[12],
	'writing':obj[13]
    };
    school_scores.push(dict);
}

// 2. Make a new list from what you made in part one that is the list of all math scores
var math_scores = [];
for(var i=0; i<school_scores.length;i++){
    math_scores.push(school_scores[i].math);
}
console.log(math_scores);

// 3. Calculate the mean of the math scores
var mean = 0;
var valid = 0;
for(var i = 0; i < math_scores.length; i++) {
    var k = parseInt(math_scores[i]);
    if (! isNaN(k)) { // some scores are 's' instead of a number, so this excludes them
	mean += k;
	valid+= 1;
    }
}
mean /= valid;

//4. make a new dictionary by pulling out schools from the dictionary in part 1 all schools with math schores > than the average.

var best_schools = [];
for(var i=0; i<src_data.length; i++) {
    var obj = src_data[i];
    if (obj[12] > mean) {
	var dict ={
	    'code': obj[8],
	    'name': obj[9],
	    'num' : obj[10],
	    'eng' : obj[11],
	    'math': obj[12],
	    'writing':obj[13]
	};
	best_schools.push(dict);
    }
}
return best_schools;

Console.log()
