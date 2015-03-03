var mtn = [20,30,33,40,50,40,20,70,50,110,45];
yo=_.filter(mtn,function(num,i){
	if (i!=mtn.length)
		return Math.abs(num-mtn[i+1]) >=30;
	return False
	});
console.log(yo.length);
