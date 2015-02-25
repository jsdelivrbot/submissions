var data = json["data"];
var a = [];
for (var i=0; i<data.length; i++) {
    var d = {
	code: data[i][8],
	name: data[i][9],
	num: data[i][10],
	reading: data[i][11],
	math: data[i][12],
	writing: data[i][13]
    };
    //console.log(d);
    a.push(d);
}
    
var total = 0;
var avg = 0;

for (var i=0; i<a.length; i++){
    var m = a[i]['math'];
    if (m != "s")
	total += parseInt(a[i]['math']);
}

console.log("total: "+total);
avg = (total * 1.0)/(a.length);
console.log("avg: "+avg);

var betterThanMathAvg = [];
for (var i=0; i<a.length; i++){
    var m = a[i]['math'];
    console.log(m);
    if (m != "s" && parseInt(m) > avg){
	betterThanMathAvg.push(a[i]['name']);
    }
}

console.log(betterThanMathAvg);
