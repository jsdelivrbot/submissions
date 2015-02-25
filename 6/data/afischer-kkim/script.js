// ARRAY :
// schoolScores = [ {name: stuy
//                   code: MSKY238
//                   num
//                   eng:
//                   math:
//                   writing:
//                 }, and more...]


// In raw dat - index 9=name, 8=code, 10=num, 11,12,13=e,m,w

parsed = []
schoolData = rawData[0].data
mAvg = 0.00

for(var i=0; i<schoolData.length; i++){
    parsed.push(
	{
	    name: schoolData[i][9],
	    code: schoolData[i][8],
	    num: schoolData[i][10],
	    eng: schoolData[i][11],
	    math: schoolData[i][12],
	    writing: schoolData[i][13]
	}
    );
}

function mathAvg(){
    var count = 0

    for(var i=0; i<schoolData.length; i++){
	console.log(parsed[i].math);
	mAvg += parsed[i].math;
	count++;
    }
    mAvg /= count;
    return mAvg;
}

