raw_data=raw_data.data
var final_data=[];

for(var i = 0; i <raw_data.length;i++){
	//console.log("hello")
	final_data.push({
	'code':raw_data[i][8],
	'name':raw_data[i][9],
	'math':raw_data[i][12],
	'eng':raw_data[i][11],
	'writing':raw_data[i][13],
	'count':raw_data[i][10],
	})
}

var math_scores = Array(final_data.length);
for(var i = 0; i < final_data.length; i++) {
	math_scores[i] = final_data[i]['math'];
}
var x = 0; 
for(var i = 0; i < math_scores.length; i++){
	var x = parseInt(math_scores[i]); 
	if(!NaN(x)){
		x=x+math_scores[i]
	}
	math_scores.pop(i)
}
/*var x=0; 
for(var i = 0; i <math_scores.length; i++){
	if(math_scores[i]!='s'){
		x=x+parseInt(math_scores[i])
	}
}*/
//console.log(x)
//x=Math.floor(x/math_scores.length)
console.log(x)

var math_schools=[];
for(var i = 0; i < final_data.length;i++){
	if(final_data[i]['math']>x){
		math_schools.push(final_data[i])
	}
}
//console.log(math_schools)

