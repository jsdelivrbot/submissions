var data = rawData.data;
var scores = [];

for (var i = 0; i < data.length; i++) {
    var school = data[i];
    scores.push({
        code: school[8],
        name: school[9],
        count: school[10],
        eng: school[11],
        math: school[12],
        writing: school[13]
    });
}
console.log(scores);

var mathScores = [];
for (var i = 0; i < scores.length; i++) {
    var score = parseInt(scores[i].math);
    if (!isNaN(score)) {
        mathScores.push(score);
    }
}
console.log(mathScores);

var sum = 0;
for (var i = 0; i < mathScores.length; i++) {
    sum += mathScores[i];
}
console.log(sum);

var avg = sum / mathScores.length;
console.log(avg);
