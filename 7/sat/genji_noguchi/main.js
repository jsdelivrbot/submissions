var data = rawdata["data"],
	scores=[],
	mathScores=[],
	mathMean=0,
	betterMathScores=[];

var process = function(data) {
	// Find math mean
	var total = 0;
	var temp;
	for (i in data) {
		temp = parseInt(data[i][12]);
		if (!isNaN(temp)) {
			mathScores.push(temp);
			total += temp;
		}
	}
	console.log(total);
	console.log(mathScores.length);
	mathMean = total/(mathScores.length);

	for (i in data) {
		scores.push({
			schoolCode	: data[i][8],
			schoolName	: data[i][9],
			count		: data[i][10],
			eng			: data[i][11],
			math		: data[i][12],
			writing		: data[i][13]
		});
		if (!isNaN(data[i][12])) {
			if (data[i][12] > mathMean) {
				betterMathScores.push(data[i][9]);
			}
		}
	}	
}(data);

