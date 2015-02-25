raw_scores_data = raw_scores.data;

//part 1
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
console.log(school_scores);

//part 2
var math_scores = [];
for (i = 0; i < school_scores.length; i++) {
	math_scores.push(parseInt(school_scores[i].math));
};
console.log(math_scores);

//part 3
var summation = 0;
var true_length = 0;
for (i = 0; i < math_scores.length; i++) {
    if (!isNaN(math_scores[i])){
	summation+=math_scores[i];
	true_length+=1;
    };
};
//console.log("summation: "+summation);
var math_mean = summation/true_length;
console.log("mean: "+math_mean);

//part 4
var mathy_school_scores = [];
for (i = 0; i < school_scores.length; i++) {
    if (school_scores[i].math!="s" && school_scores[i].math>math_mean){
	var t = {
		code: school_scores[i].code,
		eng: school_scores[i].eng,
		math: school_scores[i].math,
		name: school_scores[i].name,
		num: school_scores[i].num,
		writing: school_scores[i].writing,
	};
	mathy_school_scores.push(t);
    };
};
console.log(mathy_school_scores);
