(function () {
    var initialStore = JSON.parse(
        '{' +
            '"owner":"Mike", "address":"Radishcheva 10/14", ' +
                '"birds": [' +
                    '{ "type":"Duck", "count":10, "price":15, "sold":1},' +
                    '{ "type":"Eagle", "count":5, "price":50, "sold":2}' +
                ']' +
        '}');

    var store = loadStore(initialStore);

    getCurrentStoreState();
    var newBird = {type:"Chicken", count:12, price:7};
    addNewBird(newBird);
    addExistingBird("Duck", 5);
    getBirdsLessThan(20);
    sellBird("Eagle", 10);
    sellBird("Eagle", 3);
    getSoldBird("Eagle");
    changeBirdPrice("Chicken", 8);
    sellBird("Chicken", 5);
    getCurrentStoreState();

    function sellBird(birdName, birdCountSold){
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                var newBirdCount = bird.count - birdCountSold;
                if (newBirdCount<0) {
                    console.log("Error. Can\'t sell " + birdCountSold + " " + bird.type + ". They are left only " + bird.count + " pieces\n");
                    return;
                }
                bird.count = newBirdCount;
                bird.sold += birdCountSold;
                console.log("Sold " + birdCountSold + " " + birdName + "\n");
            }
        }
    }

    function addNewBird(newBird){
        var newVerifiedBird = new Object();
        if(newBird.type === undefined || newBird.price === undefined){
            console.log("Error. Can\'t have undefined type or price for a bird.\n");
            return;
        }
        newVerifiedBird.type = newBird.type;
        newVerifiedBird.price = newBird.price;
        if(newBird.count === undefined){
            newBird.count = 0;
        }
        newVerifiedBird.count = newBird.count;
        if(newBird.sold === undefined){
            newBird.sold = 0;
        }
        newVerifiedBird.sold = newBird.sold;
        store.birds.push(newVerifiedBird);
        console.log("Added new Bird:" + JSON.stringify(newVerifiedBird) + " to a store\n");
    }

    function addExistingBird(birdName, birdCount){
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                bird.count += birdCount;
                console.log("Added " + birdCount + " " + birdName + ". Current count: " + bird.count + "\n");
            }
        }
    }

    function changeBirdPrice(birdName, birdNewPrice){
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                bird.price = birdNewPrice;
                console.log("Changed " + bird.type + " price to " + birdNewPrice + "\n");
            }
        }
    }

    function getCurrentStoreState(){
        var totalSoldPrice = 0;
        var soldOutput = "Store state: ";
        for (var i in store.birds) {
            var bird = store.birds[i];
            var soldPrice = bird.sold * bird.price;
            soldOutput += "\n  " + bird.type + ": " + bird.sold + " sold, " + bird.count + " left, profit: " + soldPrice;
            totalSoldPrice += soldPrice;
        }
        soldOutput += "\nTotal profit: " + totalSoldPrice + "\n";
        console.log(soldOutput);
    }

    function getSoldBird(birdName){
        var soldOutput = "Sold " + birdName + ": ";
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                soldOutput += bird.sold + " pieces, profit:" + bird.sold * bird.price;
            }
        }
        console.log(soldOutput + "\n");
    }

    function getBirdsLessThan(fewCount){
        var fewOutput = "Birds less then "+fewCount+" pieces:";
        for (var i in store.birds) {
            var bird = store.birds[i];
            fewOutput += "\n  " + bird.type + ":" + bird.count;
        }
        console.log(fewOutput + "\n");
    }

    function loadStore(initialStore) {
        var newStore = new Object();
        newStore.owner = initialStore.owner;
        newStore.address = initialStore.address;
        newStore.birds = [];
        for (var i in initialStore.birds) {
            var bird = initialStore.birds[i];
            newStore.birds.push(bird);
        }
        return newStore;
    }

})();