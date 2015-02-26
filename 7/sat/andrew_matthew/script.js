/* NO MAPPING  

//console.log(rawscores);

console.log(rawscores["data"]);

 rawdata=rawscores["data"];

school_scores=[];
for (var q=0; q<rawdata.length;q++){
    var tmp = {
	code:rawdata[q][8],
	name:rawdata[q][9],
	num:rawdata[q][10],
	eng:rawdata[q][11],
	math:rawdata[q][12],
	writing:rawdata[q][13]
    };
    school_scores.push(tmp);
};

console.log(school_scores);

math_scores=[];
for (var i=0;i<school_scores.length;i++){
    var tmp = parseInt(school_scores[i]["math"]);
    if (tmp>=0){
	math_scores.push(tmp);
    }
};

console.log(math_scores);

var sum = 0;
for (var i = 0;i<math_scores.length;i++){
    sum += math_scores[i];
};
console.log(sum);
var mean = sum/math_scores.length;

console.log(mean);

greater = [];
for (var i = 0;i<school_scores.length;i++){
    var tmp = parseInt(school_scores[i]["math"]);
    if (tmp > mean){
	greater.push(school_scores[i]["name"]);
	console.log(school_scores[i]["name"] + "'s math score: "+school_scores[i]["math"])
    }
};

console.log(greater);
*/
/*
WITH BUILTIN MAPPING FUNCTIONS


rawdata=rawscores["data"];
var school_scores= rawdata.map(function(item){ 
    return{    	
	code:item[8],
	name:item[9],
	num:item[10],
	eng:item[11],
	math:item[12],
	writing:item[13]
    };
});
console.log(school_scores);

var rawmath = school_scores.map(function(item){if (isNaN(parseInt(item.math)))
						      {return NaN;}
						      else{return parseInt(item.math);}});
mathscores = rawmath.filter(function(x){return !isNaN(x);});
console.log(mathscores);

var sum = mathscores.reduce(function(x,y){return x+y;});
console.log(sum);
var avg = Math.floor(sum/mathscores.length);
console.log(avg);

var greater= school_scores.filter(function(item){return parseInt(item.math)>avg;});
console.log(greater);

*/

/* DONE WITH LODASH.JS */

rawdata=rawscores["data"];

var school_scores = _.map(rawdata, function(item){    return{    	
	code:item[8],
	name:item[9],
	num:item[10],
	eng:item[11],
	math:item[12],
	writing:item[13]
    };
});
console.log(school_scores);
var rawmath = _.map(school_scores,function(item){return parseInt(item.math);});
mathscores = _.filter(rawmath, function(x){return !isNaN(x);});
console.log(mathscores);
var sum = _.reduce(mathscores,function(x,y){return x+y;},0);

console.log(sum);

var avg = Math.floor(sum/mathscores.length);
console.log(avg);
var greater= _.filter(school_scores, function(item){return parseInt(item.math)>avg;});
console.log(greater);
