var mountain=[20,32,33,40,50,40,20,70,50,10,75];
var temp=_.map(mountain,function(x,i,t){
    if(i==t.length){
	return x;
    }else{
	return Math.abs(x-t[i+1]);
    }
});
var elevationdif = _.filter(temp,function(x){
    return !isNaN(x);
});
var filtered=_.filter(elevationdif,function(x){
    return x>=30;
});
var num=_.size(filtered);
console.log(mountain);
console.log(elevationdif);
console.log(num);


