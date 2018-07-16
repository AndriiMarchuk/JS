
// https://youtu.be/71AtaJpJHw0
//
// !!!should be executed in self distributing block to see the closure in google tools

(function () {


    var addWithParam = function (outer)
    {
        var inner = 23;
        return outer + inner;
    };

    console.log("addWithParam: " + addWithParam(23));

// ------------------------------------

    var outer = 45;

    var addNoParam = function ()
    {
        var inner = 23;
        return outer + inner;
    };

    console.log("addNoParam: " + addNoParam());

// ------------------------------------

    var addWithFn = function (outer)
    {
        var add = function (inner)
        {
            return outer + inner;
        };

        return add;
    };

    var add25 = addWithFn(25);
    var add46 = addWithFn(46);

    console.log("add25: " + addWithFn(25) (5));
    console.log("add46: " + add46(4));

})();
