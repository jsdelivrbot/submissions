var school_scores = [];
src_data = src_data.data;
for(var i=0; i<src_data.length; i++){
    var obj = src_data[i];
    //console.log(obj);
    var dict ={
	'code': obj[8],
	'name': obj[9],
	'num' : obj[10],
	'eng' : obj[11],
	'math': obj[12],
	'writing':obj[13]
    };
    school_scores.push(dict);
    
    
};

console.log(school_scores);
