console.log(rawData);

rawschools = rawData.data;
console.log(rawschools);

scores = [];
for (var i = 0;i<rawschools.length;i++){
    var t={code: rawschools[i][8],
	   name: rawschools[i][9],
	   num: rawschools[i][10],
	   eng: rawschools[i][11],
	   math: rawschools[i][12],
	   writing: rawschools[i][13],
	  };
    scores.push(t);
};

console.log(scores);

math_scores = [];
average=0;
for (var i=0;i<scores.length;i++){
    if(scores[i].math!="s"){
	math_scores.push(parseInt(scores[i].math));
	average+=parseInt(scores[i].math);
    }
};

average=average/math_scores.length;

console.log(average);

console.log(math_scores);

above_average = [];

for (var i = 0; i< rawschools.length; i++){
    if (parseInt(rawschools[i][12]) > average){
	var t = rawschools[i];
	above_average.push(t);
    }
}

console.log(above_average);
