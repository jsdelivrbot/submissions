console.log(raw_scores);
var raw_scores_data = raw_scores.raw_scores_data;
console.log(raw_scores_data);
var school_scores = [];
for (var i = 0; i < raw_scores_data.length; i++){
	var t = {
		code: raw_scores_data[i][8];
		name: raw_scores_data[i][9];
		num: raw_scores_data[i][10];
		eng: raw_scores_data[i][11];
		math: raw_scores_data[i][12];
		writing: raw_scores_data[i][13];
	};
	school_scores.push(t);
};
console.log(school_scores);