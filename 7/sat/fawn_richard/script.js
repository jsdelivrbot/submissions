var d = rawdata["data"];
var data = [];
var math_scores = [];
var math_total = 0;

var upload = function(func){
    data = [];
    math_scores = [];
    math_total = 0;
    for (var i = 0; i < d.length; i++) {
	temp = {
	    code: d[i][8],
	    name: d[i][9],
	    num: d[i][10],
	    eng: d[i][11],
	    math: d[i][12],
	    writing: d[i][13]
	};
	if (func == null || func()){
	    data.push(temp);
	    
	    if (temp.math != "s") {
		math_total += parseInt(temp.math);
		math_scores.push(parseInt(temp.math));
	    }
	}
    }
}

upload();

console.log(math_scores);

var mean = math_total * 1.0 / data.length;
console.log(mean);
var above_mean = [];


upload(function(){
    return this.temp.math > mean;
});
console.log(data);
