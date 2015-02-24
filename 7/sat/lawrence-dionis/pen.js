var list = [];
console.log(raw);
var data = raw.data;
var mathscores = [];
var above_schools =[];

var convert = function(e){
    return {
	code: e[8],
	name: e[9],
	num: e[10],
	english: e[11],
	math: e[12],
	writing: e[13]
    }
};
for(var i = 0; i<data.length;i++){
    list.push(convert(data[i]));
}
var extract = function(topic,extracto){
    for(var i =0; i < list.length; i++){
	if(topic == "math" || topic == "english" ||topic == "writing" || topic == num){
	    var temp = parseInt(list[i][topic]);
	    if(!isNaN(temp)){
		extracto.push(temp);
	    }
	}else if(topic == "name" || topic == "code"){
	    extracto.push(list[topic]);
	}
    }
};
var average = function(e){
    var sum = 0;
    for(var i =0; i<e.length;i++){
	sum += e[i];
    }
    if(e.length ==0){
	return 0;
    }
    return sum/e.length;
};
console.log(list);
extract("math",mathscores);
for(var i = 0; i<list.length;i++){
    avg=average(mathscores);
    if(list[i].math>avg){
	above_schools.push(list[i]);
    }
}
console.log(average(mathscores));
console.log(above_schools);
