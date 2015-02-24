rawdata=rawscores.data;
var array = new Array();

for (var i = 0; i<rawdata.length; i++) {
	array.push({
	'name' : rawscores['data'][i][9],
	'reading' : rawscores['data'][i][11],
	'math' : rawscores['data'][i][12],
	'writing' : rawscores['data'][i][13],
	});
	console.log(array[i]);
};

var math = new Array();
for (var i = 0; i<array.length; i++) {
	math.push(array[i]['math']);
	console.log(math[i]);
};

var count = 0;
var total = 0;
for (var i=0; i<math.length; i++) {
	if (!isNaN(math[i])) {
		total = total + parseInt(math[i]);
		count++;
	};
};
console.log(total);
var mean = total/count;
console.log(mean);

var above = new Array();
for (var i=0; i<math.length; i++) {
	if (!isNaN(math[i])) {
		if (parseInt(math[i])>mean) {above.push(array[i]);};
	};
};
console.log(above);











