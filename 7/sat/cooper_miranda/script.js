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