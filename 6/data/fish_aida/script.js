raw_scores_data = raw_scores.data;
var school_scores = [];
for (var i = 0; i < raw_scores_data.length; i++){
	var t = {
		code: raw_scores_data[i][8],
		name: raw_scores_data[i][9],
		num: raw_scores_data[i][10],
		eng: raw_scores_data[i][11],
		math: raw_scores_data[i][12],
		writing: raw_scores_data[i][13]
	};
	school_scores.push(t);
};
var math_scores = [];
for (i = 0; i < school_scores.length; i++) {
	math_scores.push(parseInt(school_scores[i].math));
};
console.log(math_scores);