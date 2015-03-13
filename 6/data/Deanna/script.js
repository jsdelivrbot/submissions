src_data = rawscores.data
console.log("Raw data:");
console.log(src_data);

var scoresArray = [];
// into array
for (var i=0; i<src_data.length; i++){
    var obj = src_data[i];
    var dict ={
	'code': obj[8],
	'name': obj[9],
	'numb': obj[10],
	'eng': obj[11],
	'math': obj[12],
	'writ': obj[13]
    };
    scoresArray.push(dict);
}

// math scores list
var math = [];
for (var i=0; i<scoresArray.length; i++){
    math.push(scoresArray[i].math);
}

// english scores list (just for practice and practical use)
var english = [];
for (var i=0; i<scoresArray.length; i++){
    english.push(scoresArray[i].eng);
}

// writing scores list
var writing = [];
for (var i=0; i<scoresArray.length; i++){
    writing.push(scoresArray[i].writ);
}

// Gets the mean value of the math scores
var mean = 0;
var addValue = 0;
var amount = 0;
for (var i=0; i<math.length; i++){
    var number = parseInt(math[i]);
    if (number.isnumeric()){ //hopefully
	addValue = addValue+number;
	amount+= 1;
    }
}
mean = addValue/amount;

// Makes new dictionary of schools from scoresArray with math scores above mean
// I am writing this into an array cause im not sure what else to do

var newMath = [];
for (var i=0; i<scoresArray.length; i++){
    school = scoresArray[i];
    mathScore = school.math;
    if (mathScore.isnumeric()){
	if (mathScore>mean){
	    newMath.push(school);
	}
    }
}
