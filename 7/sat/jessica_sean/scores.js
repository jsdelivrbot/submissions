scores = {"code": [], "name": [], "tests": [], "eng": [], "math": [], "writing": []};

for (var i = 0; i < scoresRaw.length; i++) {
	school = scoresRaw[i];
	scores["code"].push(school[8]);
	scores["name"].push(school[9]);
	scores["tests"].push(school[10]);
	scores["eng"].push(school[11]);
	scores["math"].push(school[12]);
	scores["writing"].push(school[13]);
}

console.log(scores);