console.log(scores);
var school_scores = [];
var math_scores = [];

for (var i = 0; i < scores.data.length;i++) {
    //console.log("");
    var school = {
	code:scores.data[i][8],
	name:scores.data[i][9],
	num:scores.data[i][10],
	eng:scores.data[i][11],
	math:scores.data[i][12],
	writing:scores.data[i][13]
    };

    school_scores.push(school);
    math_scores.push(scores.data[i][12]);
}

var total = 0;
var nums = 0;
var avg;
for (item in math_scores){
  total += parseInt(item);
  if (parseInt(item) > 200)
    nums+=1;
}
avg = total / nums;

var betterMath = [];
for (var i = 0; i < school_scores.length; i++){
    var math = school_scores[i]["math"];
    console.log(math);
    if (parseInt(math) > avg)
	       betterMath.push(school_scores[i]["name"]);
}

//console.log(school_scores);
console.log(betterMath);
