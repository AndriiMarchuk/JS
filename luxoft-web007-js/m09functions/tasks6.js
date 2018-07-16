(function () {

    var avg = function () {
        console.dir(arguments);
        var avgSum = 0;
        for (var arg in arguments) {
            avgSum += arguments[arg];
        }
        return avgSum / arguments.length;
    }

    console.log(avg(1, 2, 3, 4, 5));
    console.log(avg.apply(this, [1, 2, 3]));

})();
