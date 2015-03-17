var mtnrange = [20,30,33,40,50,40,20,70,50,110,45]; //Given

var sliced = _.slice(mtnrange, 1);

var c = 30;

var bigmtnrange = _.filter(sliced, function(n, i, l) {
    return Math.abs(n - mtnrange[i]) > c;
});

console.log(bigmtnrange);
console.log(bigmtnrange.length);
document.getElementById("h1").innerHTML += bigmtnrange.length;

/*s = _.reduce(bigmtnrange, function(x,y) {
    return x+"<li>"+y+"</li>";
}, "<ul>");
s += "</ul>"*/
