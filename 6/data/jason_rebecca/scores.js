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

//2
var mathscores = [];
var total = 0;
var count = 0;
for (var i=0; i < schoolscores.length; i++){
    mathscores[i] = parseInt(schoolscores[i]["math"]);
    if(schoolscores[i]["math"] != "s"){
        total+= mathscores[i];
        count+= 1;
    }
} 
var avg = total/count;
var mathschools = [];
var j = 0;
for(var i=0; i < schoolscores.length; i++){
    if (parseInt(schoolscores[i]["math"]) >= avg){
        mathschools[j] = schoolscores[i];
        j+=1;
    }
}
