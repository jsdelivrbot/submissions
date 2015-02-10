var APP = {
    running : true
}

APP.setConsts = function(C) {
    for (var a in C) {
        if (C.hasOwnProperty(a) && !(a in APP)) {
            APP[a] = C[a];
        }
    }
}
