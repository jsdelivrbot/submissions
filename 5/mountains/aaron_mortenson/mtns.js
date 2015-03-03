var last = 0

var mtnrange = [20,30,33,40,50,40,20,70,50,110,45]


var peaks = _.filter(mtnrange,function(n) {
    var ret = n - last >= 30
    last = n
    return ret
});

