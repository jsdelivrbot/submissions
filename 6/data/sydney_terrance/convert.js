var rawdata = rawscores["data"];
var sortdata = [rawdata.length];

for (var i = 0; i < rawdata.length; i++){
    var t = {code:rawdata[i][8],
	     name:rawdata[i][9],
	     num:rawdata[i][10],
	     eng:rawdata[i][11],
	     math:rawdata[i][12],
	     write:rawdata[i][13]};
    sortdata[i]=t;
};

console.log(sortdata);

var mathscores = [];
for (var i = 0; i < sortdata.length; i++){
    if (parseInt(sortdata[i]["math"])>=0){
	mathscores.push(parseInt(sortdata[i]["math"]));
    }
};

console.log(mathscores);

var total = 0;
for (var i = 0; i <mathscores.length; i++){
    total = total + mathscores[i];
};
var average = total / mathscores.length;

console.log(total);
console.log(average);

var goodmathschools = []
for (var i = 0; i < sortdata.length; i ++){
    if (parseInt(sortdata[i]["math"])>average){
	goodmathschools.push(sortdata[i]);
    }
};

console.log(goodmathschools);
