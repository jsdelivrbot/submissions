console.log(dataset);
schools = dataset.data;
console.log(schools);

var school_scores=[]
for(var i=0;i<schools.length;i++){
var t={code:schools[i][8],
       name:schools[i][9],
       num:schools[i][10],
       eng:schools[i][11],
       math:schools[i][12],
       writing:schools[i][13]
       };
    school_scores.push(t);
    };
console.log(school_scores);
var math_scores=[];
var highest=0;
for(var i=0;i<schools.length;i++){
    if (schools[i][12]!='s')
    math_scores.push(schools[i][12]);
    
    };

console.log(math_scores);
var mean =0;
for (var i=0;i<math_scores.length;i++){
    mean+= parseInt(math_scores[i]);
    }
mean= mean/(math_scores.length);
mean= mean-mean%1
console.log(mean);

var above_average=[];
for (var i=0;i<schools.length;i++){
    if (schools[i][12]>= mean && schools[i][12]!='s'){
	above_average.push(schools[i]);
	}
};
console.log(above_average);
