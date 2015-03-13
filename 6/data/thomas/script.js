scores = schoolscores.data;

var temp = [];

for ( var i = 0; i < scores.length; i++ ){
    temp.push({
	'name':scores[i][9],
	'code':scores[i][8],
	'num':scores[i][10],
	'eng':scores[i][11],
	'math':scores[i][12],
	'writing':scores[i][13]
    });
}
scores = temp;

var mathScores = [];

for ( var i = 0; i < scores.length; i++ ){
    if (scores[i].math != "s")
	mathScores.push(parseInt(scores[i].math));
}

var mean = 0;
var sum = 0;
for ( var i = 0; i < mathScores.length; i++){
    sum = sum + mathScores[i];
}

mean = sum/mathScores.length;

var topScores = [];
for ( var i = 0; i < scores.length; i++){
    if (scores[i].math != "s" && parseInt(scores[i].math) > mean)
	topScores.push(scores[i].name);
}

console.log(topScores)
