//console.log(rawData);

var usefulData = rawData.data;

console.log(usefulData);

var school_scores = [];

for (int i=0; i<usefulData.length; i++) {
    var tmp_data = {
	name : usefulData[i][9],
	code : usefulData[i][8],
	num : usefulData[i][10],
	eng : usefulData[i][11],
	math : usefulData[i][12],
	writing : usefulData[i][13],
    };
    school_scores.push(tmp_data);
};
