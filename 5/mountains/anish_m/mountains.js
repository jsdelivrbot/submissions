var range = [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987]

var mountainer = function(l){
    var delta = _.map(l, function(n,i){
	if (i < l.length){
	    i+=1;
	}
	return l[i]-n;
    });
    delta.splice(l.length-1,1);
    var answer = _.reduce(delta, function(sum,n){
	if (Math.abs(n) >= 30){
	    return sum + 1;
	}
	else{
	    return sum;
	}
    }, 0);
    return answer;
}
console.log("Mountain range of: "+range);	      
console.log(mountainer(range));	     
