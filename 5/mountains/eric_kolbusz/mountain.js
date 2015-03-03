var mtns = [20,30,33,40,50,40,20,70,50,110,45,73,100,20];
//answers should be 20-70, 50-110-45, 100-20

console.log(mtns);

var find_mtns = function(l) {
    return _.filter(l, function(n, i) {
	return Math.abs(n- l[i+1]) >= 30;
    });
};

console.log(find_mtns(mtns));
