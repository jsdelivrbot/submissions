var range = [10, 20, 30, 33, 48, 92, 180, 181, 200]

var mountainer = function(l){
    var i = 1;
    var delta = _.map(l, function(n){
	if (i < l.length){
	    i+=1;
	}
	return l[i]-n;
    });
    delta.splice(l.length-1,1);
    var answer = _.reduce(delta, function(sum,n){
	if (n > 30){
	    return sum + 1;
	}
	else{
	    return sum;
	}
    });
}
		      
		     
