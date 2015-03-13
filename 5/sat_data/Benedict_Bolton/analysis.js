var matters = rawscores.data;

//console.log(rawscores);
//console.log(matters);


//setting this up like this because already knew the problem...unfair advantage
var data = [];
var mathScores = [];
var sum = 0;
var count = 0;

for (var i = 0; i < matters.length; i++){
    data.push( {
      code: matters[i][8],
      name: matters[i][9],
      num: matters[i][10],
      eng: matters[i][11],
      math: matters[i][12],
      writing: matters[i][13]
    });
    var math = parseInt(matters[i][12]);
    if ( !(isNaN(math)) ) {
      mathScores.push(math);
      sum += math;
    }
};

console.log(data);
console.log(sum);
console.log(mathScores);

var average = sum/mathScores.length;

console.log('average: ');
console.log(average);

var success = []

for (var c = 0; c < data.length; c++){
  if (data[c].math > average){
    success.push(data[c]);
  }
}

console.log(success);
