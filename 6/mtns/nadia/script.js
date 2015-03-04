var mtn = [ 20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45 ];

var intervals = _.map( mtn, function( item, index ) {
                                return Math.abs( mtn[index] - mtn[index + 1] );
                            });

console.log( intervals );

var thirties = _.filter( intervals, function(x){
                                    return x >= 30;
                                } );

console.log( thirties );
console.log( thirties.length );