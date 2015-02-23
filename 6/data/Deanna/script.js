src_data = src_data.data

var scoresArray = [];
// into array
for (var i=0; i<src_data.length; i++){
    var obj = src_data[i];
    var dict ={
	'code': obj[8],
	'name': obj[9],
	'numb': obj[10],
	'eng': obj[11],
	'math': obj[12],
	'writ': obj[13]
    };
    scoresArray.push(dict);
}

// math scores list
var math = [];
for (var i=0; i<scoresArray.length; i++){
    math.push(scoresArray[i].math);
}

// english scores list (just for practice and practical use)
var english = [];
for (var i=0; i<scoresArray.length; i++){
    english.push(scoresArray[i].eng);
}

// writing scores list
var writing = [];
for (var i=0; i<scoresArray.length; i++){
    writing.push(scoresArray[i].writ);
}

var mean = 0;
var addValue = 0;
var amount = 0;
for (var i=0; i<math.length; i++){
    var number = parseInt(math[i]);
    if (number.isnumeric()){ //hopefully
	addValue = addValue+number;
	amount+= 1;
    }
}
mean = addValue/amount;
