//Alex Zilbersher & Jerry Dai Period 5
rawschools = rawdata.data;

//(from Mr.Z) convert raw data into a more compact dictionary
school_scores = [];
for (var i = 0; i < rawschools.length;i++){
    var t = {code: rawschools[i][8],
	     name: rawschools[i][9],
	     num: rawschools[i][10],
	     eng: rawschools[i][11],
	     math: rawschools[i][12],
	     writing: rawschools[i][13]
	    };
    school_scores.push(t);
};
console.log(school_scores);

//get a list of only the math scores
math_scores = [];
total_math = 0 ;
for (var i = 0; i < school_scores.length; i++){
    var t = school_scores[i].math ;
    if( t != "s" ){
	math_scores.push(parseInt(t)) ;
	total_math += parseInt(t) ;
    }
}
console.log(math_scores);

//find the average math score
average_math = total_math / math_scores.length
console.log(average_math);

//get a list of only the math scores above the average
above_math_scores = [];
for (var i = 0; i < math_scores.length; i++){
    var t = math_scores[i] ;
    if(t > average_math){
	above_math_scores.push(t);
    }
}
console.log(above_math_scores);
