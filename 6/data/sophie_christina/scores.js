var getScores= function(){
    var school_scores=[];
    var d = raw_scores['data'];
    for (var i=0; i< d.length; i++){
	school_scores.push({
	    name: d[i][9],
	    code: d[i][8],
	    num: d[i][10],
	    eng: d[i][11],
	    math:d[i][12],
	    writing: d[i][13]})
    }
    return school_scores;
	
};
