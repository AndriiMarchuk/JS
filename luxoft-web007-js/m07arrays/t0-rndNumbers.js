(function () {
    var numbers = [];

    fillArrayWithRndNumbers(numbers, 1000);

    printArray(numbers);

    function fillArrayWithRndNumbers(arr, count) {
        for (i = 0; i < count; i++) {
            numbers[i] = getRndNumber();
        }
    }

    // Utils

    function printArray(arr) {
        console.log(JSON.stringify(arr));
    }

    function getRndNumber() {
        return Math.floor(Math.random() * 100);
    }

})();