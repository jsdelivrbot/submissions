schoolscores = schoolscores.data;
var temp = []
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

