console.log(rawdata);
//[3, "2E5F7B14-F7E0-41E7-BC91-CD4FC649E0A8", 3, 1361417340, "696969", 1361417340, "696969", null, "01M450", "EAST SIDE COMMUNITY SCHOOL", "70", "377", "402", "370"] 

rawscoredata = rawdata.data;

var s = 0;
var schoolscores = [];
console.log(rawscoredata.length );
while( s < rawscoredata.length ){
    var school = rawdata["data"][s];
    var temp = {
	code: school[8],
	name: school[9],
	num: school[10],
	math: school[11],
	eng: school[12],
	writing: school[13],
    };
    schoolscores.push(temp);
    s++;
};
//console.log(schoolscores);

var i=0;
var meanmathscore = 0;
var numscores = 0;
while(i < rawscoredata.length){
    if(rawdata["data"][i][11] != "s"){
	meanmathscore += parseInt(rawdata["data"][i][11]);
	console.log(meanmathscore);
	numscores++;
    }
    i++;

}
meanmathscore = meanmathscore / numscores;
console.log(meanmathscore);
