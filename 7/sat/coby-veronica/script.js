var arr_dicts = [];
var data = raw_data.data

for (var i = 0; i < data.length; i++){
    var new_dict = {
	code : data[i][8],
	name : data[i][9],
	num : data[i][10],
	eng : data[i][11],
	math : data[i][12],
	writing : data[i][13],
    };
    arr_dicts.push(new_dict);
};

var math = [];
for (var i = 0; i < arr_dicts.length; i++){
    var cur_score = arr_dicts[i].math;
    if (cur_score != 's'){
	math.push();
    }
}

