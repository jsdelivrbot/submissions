var mtn = [20,30,33,40,50,40,20,70,50,110,15]
var difference = []

var calculate = function(){
    for (var i = 0;i<mtn.length-1;i++){
	difference.push(Math.abs(mtn[i]-mtn[i+1]));
    }
    var total = 0;
    for (var i = 0;i<difference.length;i++){
	if (difference[i]>=30){
	    total ++;
	}
    }
    console.log(total);
    return total;
}

var calculate2 = function(){
    
}
