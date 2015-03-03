var scores=[];
var data=json["data"];

for (var i = 0; i < data.length; i++){
    scores.push({"code":data[i][8],
		 "name":data[i][9],
		 "count":data[i][10],
		 "reading":data[i][11],
		 "math":data[i][12],
		 "writing":data[i][13]});
};

var mathList = [];
for (var i=0; i < scores.length;i++){
    var score = scores[i]['math'];
    if ( score != "s" ) {
	mathList.push(parseInt(score));
    }
};

var mathTotal = 0;
for ( var i = 0 ; i < mathList.length ; i++ ) {
    var score = mathList[i];
    mathTotal = mathTotal + score;
}


var mathAvg = mathTotal / mathList.length;

var schoolsHigherThanAverage = {};
for (var i = 0;i< scores.length; i++ ) {
    var score = parseInt(scores[i]['math']);
    if ( score > mathAvg && score != "s" ) {
	schoolsHigherThanAverage[scores[i]['name']] = score;
    }
}
