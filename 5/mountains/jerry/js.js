var mtnrange = [20,30,33,40,50,40,20,70,50,110,45];
var counter = 0;
var elevation = 30;
var mtn = 0;

var count_mtns = _.filter(mtnrange, function(item){
    if ( (item - mtn >= elevation) || (mtn - item >= elevation) ){
	counter+= 1;
	mtn = item;
	return item;
    }
    mtn = item;
});
    
