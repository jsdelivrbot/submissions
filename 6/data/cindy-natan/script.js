console.log(rawscores);

scores = [];

for(i=0; i<rawscores.data.length; i++){
    scores[i] = {};
    scores[i].code = rawscores.data[i][8];
    scores[i].name = rawscores.data[i][9];
    scores[i].num = rawscores.data[i][10];
    scores[i].reading = rawscores.data[i][11];
    scores[i].math = rawscores.data[i][12];
    scores[i].writing = rawscores.data[i][13];
}

console.log(scores);

mathScores = [];

for(i=0; i<scores.length; i++){
    mathScores[i] = scores[i].math;
}

console.log(mathScores);

sumMathScore = 0;
numOfSchools = mathScores.length;

for(score in mathScores){
    s = parseInt(score);
    if(isNaN(s)){
	numOfSchools = numOfSchools - 1;
    }
    else{
	sumMathScore = sumMathScore + s;
    }
}

meanMathScore = sumMathScore / numOfSchools;

console.log(meanMathScore);

aboveAvgSchools = [];

for (i=0; i<scores.length; i++){
	schoolScore = parseInt(scores[i].math);
	if (!isNaN(schoolScore) && schoolScore > meanMathScore){
		aboveAvgSchools.push(scores[i]);
	}
}

console.log(aboveAvgSchools);
