var list = [];
console.log(raw);
var data = raw.data;
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
console.log(list);
