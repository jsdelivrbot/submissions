var mtnrange = [ 20, 30, 33, 40, 50, 20, 70, 50, 110, 45 ];
var hardRange = _.filter(mtnrange, function(n, i, l) {
    return Math.abs(n - l[i+1]) >= 30
})
//console.log(mtnrange);
console.log(hardRange.length);
document.getElementById("b").innerHTML = "list: " + mtnrange + "<br>hards: " + hardRange.length;
