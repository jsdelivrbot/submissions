//Alex Zilbersher & Jerry Dai Period 5
rawschools = rawdata.data;

//map function
var map = function(lisst, funcction) {
    var result = [];
    for (var i=0 ; i < lisst.length ; i++ ) {
	result.push(funcction(lisst[i]));
    };
    return result;
};

//throw out none numbers
var filter = function(lisst, funcction) {
    var result = [];
    for (var i=0 ; i < lisst.length ; i++ ) {
	if(funcction(lisst[i])) {
	    result.push(lisst[i]);
	}
    };
    return result;
};

//combine to one

var reduce = function(lisst, funcction, init) {
    var result = init;
    for (var i=0 ; i < lisst.length ; i++ ) {
	result += funcction(lisst[i]);
    };
    return result;
};

//get school list
school_scores = map(rawschools, function(item) {
    return {
	code: item[8],
	name: item[9],
	num: item[10],
	eng: item[11],
	math: item[12],
	writing: item[13],
    }
});

names = map(school_scores, function(x) {return x.name});
console.log(names);
math_scores = map(school_scores, function(x) {return x.math});
math_scores = map(math_scores, function(x) {return parseInt(x)});
math_scores = filter(math_scores, function(x) {return !isNaN(x)});
console.log(math_scores);
mathh = reduce(math_scores, function(a,b) {return a+b;}, 0);
console.log(mathh);
matt = mathh / math_scores ;
console.log(matt);


/*
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
*/
