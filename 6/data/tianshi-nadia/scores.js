data = l["data"]

var school_scores = [];

for (var i=0;i<data.length;i++) {
    var x = {};
    
    x["name"] = data[i][9];
    x["code"] = data[i][8];
    x["num"] = data[i][10];
    x["eng"] = data[i][11];
    x["math"] = data[i][12];
    x["writing"] = data[i][13];
    
    school_scores.push(x);
}

//console.log(school_scores);


var math_scores = [];

for (i = 0;i<school_scores.length;i++){
    var x = school_scores[i]["math"];
    if (parseInt(x)) {
        math_scores.push(x);
    }
}

//console.log(math_scores);


var sum = 0;

for (i=0;i<math_scores.length;i++){
    sum = sum + parseInt(math_scores[i]);
}

var math_mean = sum / math_scores.length;

//console.log(math_mean);


var math_schools = [];

for (i = 0; i < school_scores.length; i ++ ) {
    var x = school_scores[i];
    if (x["math"] > math_mean) {
        math_schools.push(x);
    }
}

//console.log (math_schools);