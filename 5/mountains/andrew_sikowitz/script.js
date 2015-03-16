var mtnrange = [20,30,33,40,50,40,20,70,50,110,45]; //Given

var sliced = _.slice(mtnrange, 0, mtnrange.length-1);

var bigmtnrange = _.filter(mtnrange, function(n, i, l) {
    return Math.abs(n - sliced[i]
