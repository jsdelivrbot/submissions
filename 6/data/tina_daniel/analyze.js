//console.log(rawscores["data"]);
var scores = [];
var mScores=[];
var mAvg=0;
var aboveAvg=[];
for (var i = 0; i<rawscores["data"].length;i++){
  var x=rawscores["data"][i];
  scores.push({"schoolcode":x[8],"school":x[9],"count":parseInt(x[10]),"reading":parseInt(x[11]),"math":parseInt(x[12]),"writing":parseInt(x[13])});
}
for (var i=0; i<scores.length;i++){
  if (scores[i]["math"])
    mScores.push(scores[i]["math"]);
}
for (var i=0;i<mScores.length;i++)
  mAvg+=mScores[i];
mAvg/=(1.0 * mScores.length);

for (var i=0; i<scores.length;i++){
  if (scores[i]["math"]>mAvg)
    aboveAvg.push(scores[i]["school"]);
}
