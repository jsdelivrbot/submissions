var mtnRange = [20,30,33,40,50,40,20,70,50,110,45]//Look for difference of 30.

var differences = function(mtns){
    solution = _.filter(mtns,function(height,current,change)
		{if (((change[current+1]-height)) >= 30|| (((change[current+1]-height))) <= -30)
			{return height;}}).length
	return solution
    }
		    


console.log(differences(mtnRange));