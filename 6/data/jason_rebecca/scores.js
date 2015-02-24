console.log(scores);

var schoolscores = [];

for(var i=0; i < scores.data.length; i++){
    var dict = {};
    dict["name"] = scores.data[i][9];
    dict["code"] = scores.data[i][8];
    dict["num"] = scores.data[i][10];
    dict["eng"] = scores.data[i][11];
    dict["math"] = scores.data[i][12];
    dict["writing"] = scores.data[i][13];
    
    console.log(dict);
    schoolscores[i] = dict; 
}
