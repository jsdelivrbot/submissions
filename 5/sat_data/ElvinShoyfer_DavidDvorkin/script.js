console.log(rawdata);

rawschools = rawdata.data;
//console.log(rawschools);

school_scores = [];
eng_scores = [];
math_scores = [];
writing_scores =[];

//for (var i = 0; i < rawschools.length;i++){
//		var t = {code: rawschools[i][8],
//						 name: rawschools[i][9],
//						 num: rawschools[i][10],
//						 eng: rawschools[i][11],
//						 math: rawschools[i][12],
//						 writing: rawschools[i][13]
//						};
//		school_scores.push(t);
//};

//console.log(school_scores);

//English Average
for (var j = 0; j < rawschools.length; j++){
	var u = rawschools[j][11];
	eng_scores.push(u);
};
console.log("English Scores: " + eng_scores);

var totaleng = 0; //Scores added together
var numbereng = 0; //Number of scores counted
for (var a = 0; a < eng_scores.length; a++){
	if (eng_scores[a] != "s"){
		totaleng = totaleng + parseInt(eng_scores[a]);
		numbereng++;
	};
};
console.log(totaleng/numbereng);

//Math Average
for (var k = 0; k < rawschools.length; k++){
	var v = rawschools[k][12];
	math_scores.push(v);
};
console.log("Math Scores: " + math_scores);

var totalmath = 0; //Scores added together
var numbermath = 0; //Number of scores counted
for (var b = 0; b < math_scores.length; b++){
	if (math_scores[b] != "s"){
		totalmath = totalmath + parseInt(math_scores[b]);
		numbermath++;
	};
};
console.log(totalmath/numbermath);

//Writing Average
for (var l = 0; l < rawschools.length; l++){
	var w = rawschools[l][13];
	writing_scores.push(w);
};
console.log("Writing Scores: " + writing_scores);

var totalwriting = 0; //Scores added together
var numberwriting = 0; //Number of scores counted
for (var c = 0; c < writing_scores.length; c++){
	if (writing_scores[c] != "s"){
		totalwriting = totalwriting + parseInt(writing_scores[c]);
		numberwriting++;
	};
};
console.log(totalwriting/numberwriting);