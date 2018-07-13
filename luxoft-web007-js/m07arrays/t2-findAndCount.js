(function () {
    var numbers = [];

    fillArrayWithRndNumbers(numbers, 1000);

    printArray(numbers);

    console.log(getCountOfElements(numbers, 3));

    // return count of elements el within array
    function getCountOfElements(arr, el) {
        var cnt = 0;
        for (var i in arr) {
            if (arr[i] === el) {
                cnt++;
            }
        }
        return cnt;
    }

    // returns:
    //
    //     el if exists
    //    -1 if not
    function findElement(arr, el) {
        function findElement(arr, el) {
            for (elm in arr) {
                if (elm === el) {
                    return el;
                }
            }
            return -1;
        }
    }

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
        return Math.floor(Math.random() * 10);
    }

})();