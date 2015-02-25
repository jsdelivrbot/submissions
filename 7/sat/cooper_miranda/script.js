var school_scores=[];
var i=0;
var data=rawscores["data"];
for(;i<data.length;i++){
    school_scores[i]=({"code":data[i][8],
                         "name":data[i][9],
                         "num":data[i][10],
                         "reading":data[i][11],
                         "math": data[i][12],
                         "writing": data[i][13]
                         });
}


var mathscores=[];
for (i=0;i<school_scores.length;i++){
    if (school_scores[i]['math']!='s'){
        mathscores.push(school_scores[i]['math']);
    }
    else{
        console.log('s');
    }
}

var meanmath=0;
for(i=0;i<mathscores.length;i++){
    meanmath+=parseInt(mathscores[i]);
    
}

meanmath= mathscores.length
console.log(meanmath);

above_math={}
for (i=0;i<school_scores.length;i++){
    if (school_scores[i]['math']> meanmath){
        above_math[school_scores[i]["name"]]=school_scores[i]["math"];
    }
}
var h1=document.getElementById("mathscores");

h1.innerHTML= "Mean Math Score: "+meanmath;


var schools_list=document.getElementById("schools");
for (var school in above_math){
    var li=document.createElement("li");
    li.innerHTML=school.toLowerCase()+"-"+above_math[school];
    schools_list.appendChild(li);
    
}