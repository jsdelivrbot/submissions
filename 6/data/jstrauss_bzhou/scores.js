school_scores = [];

//console.log(rawscores['data']);


for (var i=0; i<rawscores['data'].length; i++) {
    var school = rawscores['data'][i];
    school_scores.push( {
	'name': school[9],
	'code': school[8],
	'num_testers': school[10],
	'eng': school[11],
	'math': school[12],
	'writing': school[13]
    });
};
