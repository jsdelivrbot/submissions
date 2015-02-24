schoolscores = schoolscores.data;
var temp = [];
for (var i = 0;i< schoolscores.length;i++){
    temp.push({
	'name':schoolscores[i][9],
	'code':schoolscores[i][8],
	'num':schoolscores[i][10],
	'eng':schoolscores[i][11],
	'math':schoolscores[i][12],
	'writing':schoolscores[i][13]
    });
}
schoolscores = temp;

var mathscores = [];
for (var i=0; i< schoolscores.length; i++){
    if (schoolscores[i].math != "s")
	mathscores.push(parseInt(schoolscores[i].math));
}

var mean = 0;
var sumscores = 0;
for (var i=0; i<mathscores.length; i++){
    sumscores = sumscores + mathscores[i];
}

mean = sumscores/mathscores.length;

var aboveAvg = [];
for (var i=0; i<schoolscores.length; i++){
    if (schoolscores[i].math != "s" && parseInt(schoolscores[i].math) > mean)
	aboveAvg.push(schoolscores[i].name);
}

console.log(aboveAvg)
