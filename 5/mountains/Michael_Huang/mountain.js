var mtn= ['10','40','75','80','111','90','121','20']

var countRange = function(ranges){
    return  _.filter(ranges,function(value,index,range){if ((Math.abs(range[index+1]-value)) >= 30){return value;}}).length
    }
		    


console.log(countRange(mtn));