import Math

var mtn = [ 20, 30, 33, 40, 50, 40, 20, 70, 50, 110, 45 ];

var interval = function( a, b ) {
    return Math.abs( b - a );
};

var intervals = [];

intervals = _.map( mtn, interval );