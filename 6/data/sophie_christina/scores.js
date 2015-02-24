var getScores = function(){
    var school_scores=[];
    var d = raw_scores['data'];
    for (var i=0; i< d.length; i++){
	school_scores.push({
	    name: d[i][9],
	    code: d[i][8],
	    num: d[i][10],
	    eng: d[i][11],
	    math: d[i][12],
	    writing: d[i][13]})
    }
    return school_scores;
	
};



var s = getScores();
var mathscores = [];
var mathmean = 0;

for (var i = 0; i < s.length; i++){
    if (s[i].math != "s"){
	mathscores.push(Number(s[i].math));
	mathmean += Number(s[i].math);
    }
}
mathmean = mathmean / mathscores.length;

var goodmathschools = [];

for (var i = 0; i < s.length; i++){
    if (s[i].math > mathmean){
	goodmathschools.push(s[i]);
    }
}
