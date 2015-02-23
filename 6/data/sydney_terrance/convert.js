var rawdata = rawscores["data"];
var sortdata = [];

for (var i = 0; i < rawdata.length; i++){
    var t = {code:rawdata[i][8],
	     name:rawdata[i][9],
	     num:rawdata[i][10],
	     eng:rawdata[i][11],
	     math:rawdata[i][12],
	     write:rawdata[i][13]};
    sortdata.push(t);
};

console.log(sortdata);

