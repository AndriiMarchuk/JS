(function () {

    var sum = function (arg1) {
        return function(arg2){
            return arg1 + arg2;
        };
    }

    console.log(sum(10)(20));

})();
