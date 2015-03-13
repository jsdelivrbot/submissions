var mtn = [20,30,33,40,50,40,20,70,50,110,45];


var L = _.chain(mtn)
    .map(function(item,index, mtn){
        return Math.abs(mtn[index+1] - item);
    })
    //Altitude differences
    .filter(function(item){
        return item >= 30;
    })
    .value();

console.log("Number of steap drops: ")
console.log(L.length);
