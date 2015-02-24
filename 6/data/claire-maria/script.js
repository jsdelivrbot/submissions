//1. Convert the raw data to an array of dictionaries as specified in class
var raw_school_scores = rawdata.data;
console.log(school_scores); 

var school_scores = [];
for (var i = 0; i < raw_school_scores.length; i++){
    school_scores.push({
	'name':schoolscores[i][9],
	'code':schoolscores[i][8],
	'num':schoolscores[i][10],
	'eng':schoolscores[i][11],
	'math':schoolscores[i][12],
	'writing':schoolscores[i][13]
    });

//2. Make a new list from what you made in part one that is the list of all math scores
var mathscores = [];

for (var i=0; i< school_scores.length; i++){
    if (schoolscores[i].math != "s")
	mathscores.push(parseInt(schoolscores[i].math));
}

//3. Calculate the mean of the math scores
var mean = 0;
var sum = 0;
for (var i=0; i<mathscores.length; i++){
    sum = sum + mathscores[i];
}
mean = sumscores/mathscores.length;

//4. Make a new dictionary by pulling out schools from the dictionary in part 1 all schools with math schores > than the average.

