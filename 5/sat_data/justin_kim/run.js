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
    mathScores.push(scores[i].math);
}

console.log(mathScores);

var sum;
var count;
for (var i = 0; i < mathScores.length; i++) {

    if (mathScores[i] != 's') {
        sum += parseInt(mathScores[i]);
        count++;
    }
}

console.log(sum);
console.log(count);

console.log(sum / count);
