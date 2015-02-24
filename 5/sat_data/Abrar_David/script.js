var init = function() {
    var b = document.getElementById("b");
    //console.log(b);
    //console.log(rawdata['data']);
    b.setAttribute("innerHTML", rawdata);
    m = rawdata['meta'];
    d = rawdata['data'];
    //console.log(m);
    //console.log(d);
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
    var mathList = [];
    for ( var i = 0 ; i < schoolScores.length ; i++ ) {
	var score = schoolScores[i]['math'];
	if ( score != "s" ) {
	    mathList.push(parseInt(score));
	}
    };
    console.log(mathList);
    var mathTotal = 0;
    for ( var i = 0 ; i < mathList.length ; i++ ) {
	var score = mathList[i];
	mathTotal = mathTotal + score;
    }
    var mathAvg = mathTotal / mathList.length;
    console.log(mathTotal);
    console.log(mathAvg);
    var schoolsHigherThanAverage = {};
    for ( var i = 0 ; i < schoolScores.length ; i++ ) {
	var score = parseInt(schoolScores[i]['math']);
	if ( score > mathAvg && score != "s" ) {
	    schoolsHigherThanAverage[schoolScores[i]['name']] = score;
	}
    }
    console.log(schoolsHigherThanAverage);
    var bInner = "<h1>Average Math Score:</h1>" + mathAvg + "<br><h1>Schools Higher Than Average:</h1><br>"
    for ( var key in schoolsHigherThanAverage ) {
	bInner = bInner + key + ": " + schoolsHigherThanAverage[key] + "<br><br>";
	console.log(key);
    }
    //b.setAttribute("innerHTML", bInner);
    b.innerHTML = bInner;
    console.log(bInner);
};
