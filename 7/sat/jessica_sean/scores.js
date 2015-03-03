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

a = 0;
for (var i = 0; i < scores["math"].length; i++) {
    if (scores["math"][i] != "s")
	a = a + parseFloat(scores["math"][i]);
}
a = a/(scores["math"].length);
console.log (a);

math_scores = {"code": [], "name": [], "tests": [], "eng": [], "math": [], "writing": []};


for (var i = 0; i < scores["math"].length; i++) {
    if (parseFloat (scores["math"][i]) > a) {
	math_scores["code"].push(scores["code"][i]);
	math_scores["name"].push(scores["name"][i]);
	math_scores["tests"].push(scores["tests"][i]);
	math_scores["eng"].push(scores["eng"][i]);
	math_scores["math"].push(scores["math"][i]);
	math_scores["writing"].push(scores["writing"][i]);
    };
}
console.log (math_scores);

    //console.log(scores);
