var largest = 0;
var name = "";
var schools = [];
for (i = 0; i < rawdata.data.length; i++){
    document.write("<tr>");
    document.write("<td>" + rawdata.data[i][9] + "</td>");
    document.write("<td>" + rawdata.data[i][10] + "</td>");
    document.write("<td>" + rawdata.data[i][11] + "</td>");
    document.write("<td>" + rawdata.data[i][12] + "</td>");
    document.write("<td>" + rawdata.data[i][13] + "</td>");

    document.write("</tr>");

    var tmp = { name: rawdata.data[i][9], 
		num: rawdata.data[i][10],
		reading: rawdata.data[i][11],
		math: rawdata.data[i][12],
		writing: rawdata.data[i][13] };
    schools.push(tmp);
 
    
};

for ( j = 0; j < schools.length; j++) {
    if (schools[j].math != "s" && largest < parseInt(schools[j].math )){
	largest = parseInt(schools[j].math);

    }
};
//  console.log(schools);

console.log(largest);


var mathlist = [];
for ( j = 0; j < schools.length; j++) {
    if (schools[j].math != "s"){
	mathlist.push(parseInt(schools[j].math));
    }
    else {
	mathlist.push(0);
    }
};

var sum = 0;
for ( j = 0; j < mathlist.length; j++) {
    var sum = sum + mathlist[j];
};
var avg = sum / mathlist.length;
console.log(mathlist);
console.log(avg);

var smartmathlist = [];
for ( j = 0; j < mathlist.length; j++) {
    if (mathlist[j] > avg){
	smartmathlist.push(mathlist[j]);
    }
};
console.log(smartmathlist);

