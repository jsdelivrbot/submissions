//1. Convert the raw data to an array of dictionaries as specified in class
var raw_school_scores = rawdata.data;
console.log(raw_school_scores); 

var school_scores = [];
for (var i = 0; i < raw_school_scores.length; i++){
    school_scores.push({
	'name':raw_school_scores[i][9],
	'code':raw_school_scores[i][8],
	'num':raw_school_scores[i][10],
	'eng':raw_school_scores[i][11],
	'math':raw_school_scores[i][12],
	'writing':raw_school_scores[i][13]
    });
}
console.log("School scores" + school_scores); 
//document.getElementById('first').innerHTML = school_scores.toString();

//2. Make a new list from what you made in part one that is the list of all math scores
var mathscores = [];
for (var i=0; i< school_scores.length; i++){
    if (school_scores[i].math != "s")
	mathscores.push(parseInt(school_scores[i].math))
}
console.log("Math scores" + mathscores); 
//document.getElementById('second').innerHTML = mathscores.toString();

//3. Calculate the mean of the math scores
var mean = 0;
var sum = 0;
for (var i=0; i<mathscores.length; i++){
    sum = sum + mathscores[i];
}
mean = sum/mathscores.length;
console.log("Mean:" + mean); 
//document.getElementById('third').innerHTML = "Mean: " + mean.toString();

//4. Make a new dictionary by pulling out schools from the dictionary in part 1 all schools with math schores > than the average.
var smartschools = [];
for (var i = 0; i < school_scores.length; i++) {
    if (school_scores[i].math!= 's' && parseInt(school_scores[i].math) > mean) {
	smartschools.push({
	    'name':school_scores[i].name,
	    'code':school_scores[i].code,
	    'num':school_scores[i].num,
	    'eng':school_scores[i].eng,
	    'math':school_scores[i].math,
	    'writing':school_scores[i].writing
	});
    }
}
console.log("Dictionary of above avg math SATs: " + smartschools); 
//document.getElementById('fourth').innerHTML = smartschools.toString();

