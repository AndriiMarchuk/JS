(function () {
    var numbers = [];

    fillArrayWithRndNumbers(numbers, 10);

    bubbleSort(numbers);

    printArray(numbers);

    function bubbleSort(arr) {
        var swapcnt;
        for (i = 0; i < arr.length; i++) {
            swapcnt = 0;
            swapcnt = bubbleOnce(arr, swapcnt);
            if (swapcnt === 0) {
                console.log("Sorted in " + i + " iterations");
                break;
            }
        }
    }

    function bubbleOnce(arr, swapcnt) {
        for (j = 0; j < arr.length; j++) {
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
                swapcnt++;
            }
        }
        return swapcnt;
    }

    // Utils

    // should swap elements with given positions
    function swap(arr, pos1, pos2) {
        tmp = arr[pos1];
        arr[pos1] = arr[pos2];
        arr[pos2] = tmp;
    }


    // Utils

    // return count of elements el within array
    function getCountOfElements(arr, el) {
        cnt = 0;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] == el) {
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
        for (i = 0; i < arr.length; i++) {
            if (arr[i] == el) {
                return el;
            }
        }
        return -1;
    }

    function fillArrayWithRndNumbers(arr, count) {
        for (i = 0; i < count; i++) {
            numbers[i] = getRndNumber();
        }
    }

    function printArray(arr) {
        console.log(JSON.stringify(arr));
    }

    function getRndNumber() {
        return Math.floor(Math.random() * 100);
    }

})();