var init = function() {
    var b = document.getElementById("b");
    console.log(b);
    console.log(rawdata['data']);
    b.setAttribute("innerHTML", rawdata);
    m = rawdata['meta'];
    d = rawdata['data'];
    console.log(m);
    console.log(d);
    schoolScores = [];
    for ( var i = 0 ; i < d.length ; i++ ) {
	var t = {
	    code: d[i][8],
	    name: d[i][9],
	    num: d[i][10],
	    eng: d[i][11],
	    math: d[i][12],
	    writing: d[i][13],
	};
	schoolScores.push(t);
    };
    //console.log(i);
    //};
    highestMath = 0;
    for ( var i = 0 ; i < schoolScores.length ; i++ ) {
	score = schoolScores[i]['math'];
	if ( score > highestMath && score != "s") {
	    highestMath = score;
	};
    };
    console.log(highestMath);
};
