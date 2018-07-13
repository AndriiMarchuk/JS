(function ()
{
    var numbers = [];

    fillArrayWithRndNumbers(numbers, 1000);

    printArray(numbers);

    // test(numbers.count);
    console.log(findElement(numbers, 3));

    // returns:
    //
    //     el if exists
    //    -1 if not
    function findElement(arr, el)
    {
        for (i in arr) {
            if (arr[i] === el){
                return el;
            }
        }
        return -1;
    }

    function fillArrayWithRndNumbers(arr, count)
    {
        for (i = 0; i < count; i++) {
            numbers[i] = getRndNumber();
        }
    }

    // Utils

    function printArray(arr)
    {
        console.log(JSON.stringify(arr));
    }

    function getRndNumber()
    {
        return Math.floor(Math.random() * 100);
    }

})();