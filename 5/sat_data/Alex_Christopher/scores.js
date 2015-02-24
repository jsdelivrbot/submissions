var scores = [];
var data = json["data"];

for (var i = 0; i < data.length; i++){
    scores.push({"code":data[i][8],"name":data[i][9],"count":data[i][10],"reading":data[i][11],"math":data[i][12],"writing":data[i][13]});
};

var mathScores = [];
for (i = 0; i < scores.length; i++){
    mathScores.push(scores[i]["math"]);
};

var avg = 0,
    counter = 1,
    sum = 0;
for (i = 0; i < mathScores.length; i++){
    if (mathScores[i] != "s"){
        sum += parseInt(mathScores[i]);
        counter += 1;
    };
};
avg = sum / counter;

var mathSchools = [];
for (i = 0; i < scores.length; i++){
    if (scores[i]["math"] != "s" && parseInt(scores[i]["math"]) > avg){
        mathSchools.push(scores[i]["name"]);
    };
};
