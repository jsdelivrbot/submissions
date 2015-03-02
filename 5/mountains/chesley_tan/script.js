mountainRange = [20, 30, 33, 40, 50, 40, 23, 40, 11, 30, 34, 50, 100, 40, 30, 15, 64, 128, 100, 95, 76]

var countHard = function(mtnRange) {
    return _.reduceRight(mtnRange, function(a, b, c) {
        if (c > 0 && Math.abs(b - mtnRange[c-1]) > 30) {
            return a + 1;
        }
        return a;
    }, 0);
}
