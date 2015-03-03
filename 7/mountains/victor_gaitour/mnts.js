var mtn=[20,30,33,40,50,40,20,70,50,110,45];
var differences =[]

var calculate = function(){
    for(var i= 0; i<mtn.length-1; i++){
	differences.push(Math.abs(mtn[i+1]-mtn[i]));
    }
    var totalover30=0;
    for (var i=0; i<differences.length; i++){
	if (differences[i]>=30){
	    totalover30++;
	}
    }
    console.log(totalover30);
    return totalover30;
}

var calculatenoloop = function(mountains){
    var count=0;
    _.reduce(mountains,function(prev, n, key){
	if (key!=0){
	    if (Math.abs(n-prev) > 30){
		count++;
	    }
	}
	return n;
    });
    return count;
};

console.log(calculatenoloop(mtn));
    
