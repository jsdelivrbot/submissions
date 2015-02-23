console.log(rawscores);

var data = rawscores["data"];

console.log(data);

var school_scores = [];

for ( var i = 0; i < data.length; i++ ) {
    var temp = {
        code: data[i][8],
        name: data[i][9],
        num: data[i][10],
        eng: data[i][11],
        math: data[i][12],
        writing: data[i][13]
    };
    school_scores.push(temp);
}

console.log(school_scores);

