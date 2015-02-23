var school_scores = [];
data = l["data"]
for (var i=0;i<data.length;i++) {
    var x = {};
    x["name"] = data[i][9];
    x["code"] = data[i][8];
    x["num"] = data[i][10];
    x["eng"] = data[i][11];
    x["math"] = data[i][12];
    x["writing"] = data[i][13];
    school_scores[school_scores.length] = x;
}

console.log(school_scores);
console.log(l);
