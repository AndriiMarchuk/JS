(function () {

    function Store(owner, address) {
        this.owner = owner;
        this.address = address;
        this.birds = [];
        this.transactions = [];
        this.clients = [];
    }
    Store.prototype.addBird = function (type, price, count) {
        this.birds.push(new Bird(type, price, count));
    };
    Store.prototype.addClient = function (name) {
        this.clients.push(new Client(name));
    };
    Store.prototype.addTransaction = function (birdType, birdPrice, birdCount, clientName) {
        var clientExist = false;
        for (var i in this.clients) {
            var client = store.clients[i];
            if (client.name === clientName) {
                clientExist = true;
            }
        }
        if (!clientExist) {
            store.addClient(clientName);
        }
        this.transactions.push(new Transaction(birdType, birdPrice, birdCount, clientName));
    };

    function Bird(type, price, count) {
        this.type = type;
        this.price = price;
        this.count = count;
    }

    function Client(name){
        this.name = name;
    }

    function Transaction(birdType, birdPrice, birdCount, clientName){
        this.birdType = birdType;
        this.birdPrice = birdPrice;
        this.birdCount = birdCount;
        this.clientName = clientName;
    }
    Transaction.prototype.getTotal = function () {
        return this.birdPrice * this.birdCount;
    };

    function sellBird(birdName, birdCountSold, clientName){
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                var newBirdCount = bird.count - birdCountSold;
                if (newBirdCount<0) {
                    console.log("Error. Can\'t sell " + birdCountSold + " " + bird.type + ". They are left only " + bird.count + " pieces\n");
                    return;
                }
                bird.count = newBirdCount;
                store.addTransaction(bird.type, bird.price, birdCountSold, clientName);
                console.log("Sold " + birdCountSold + " " + birdName + " to " + clientName + "\n");
            }
        }
    }

    function addNewBird(newBird){
        if(newBird.type === undefined || newBird.price === undefined){
            console.log("Error. Can\'t have undefined type or price for a bird.\n");
            return;
        }
        if(newBird.count === undefined){
            newBird.count = 0;
        }
        store.addBird(newBird.type, newBird.price, newBird.count);
        console.log("Added new Bird:" + JSON.stringify(newBird) + " to a store\n");
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

    function getAlltransactions(){
        var totalSoldPrice = 0;
        var transactionOutput = "Transactions: ";
        for (var i in store.transactions) {
            var transaction = store.transactions[i];
            transactionOutput += "\n  bird: " + transaction.birdType + ", price: " + transaction.birdPrice + ", count: " + transaction.birdCount
                + ", total: " + transaction.getTotal() + ", client: " + transaction.clientName;
            totalSoldPrice += transaction.getTotal();
        }
        transactionOutput += "\nTotal profit: " + totalSoldPrice + "\n";
        console.log(transactionOutput);
    }

    function getStoreBirds(){
        var storeState = "Store: \n";
        for (var i in store.birds) {
            var bird = store.birds[i];
            storeState += "  " + bird.type + "=> price: " + bird.price + ", left: "+ bird.count + "\n";
        }
        console.log(storeState);
    }

    function getSoldBird(birdName){
        var birdSoldCount = 0;
        var birdSoldProfit = 0;
        for (var i in store.transactions) {
            var transaction = store.transactions[i];
            if (birdName === transaction.birdType) {
                birdSoldCount += transaction.birdCount;
                birdSoldProfit += transaction.getTotal();
            }
        }
        console.log("Sold " + birdName + " count: " + birdSoldCount + ", profit: " + birdSoldProfit + "\n");
    }

    function getClientTransactions(clientName) {
        var clientTransactions = clientName + " transactions: \n";
        var transactionsCount = 0;
        for (var i in store.transactions) {
            var transaction = store.transactions[i];
            if (clientName === transaction.clientName) {
                transactionsCount++;
                clientTransactions += "  bird: " + transaction.birdType + ", price: " + transaction.birdPrice + ", count: " + transaction.birdCount
                    + ", total: " + transaction.getTotal() + "\n";
            }
        }
        if (transactionsCount === 0) {
            console.log("Sorry, but " + clientName + " has no transactions");
        } else {
            console.log(clientTransactions);
        }
    }

    function getBirdsLessThan(fewCount){
        var fewOutput = "Birds less then "+fewCount+" pieces:";
        for (var i in store.birds) {
            var bird = store.birds[i];
            fewOutput += "\n  " + bird.type + ":" + bird.count;
        }
        console.log(fewOutput + "\n");
    }

    function loadStore(initialShop) {
        var newStore = new Store(initialShop.owner, initialShop.address);
        for (var i in initialShop.birds) {
            var bird = initialShop.birds[i];
            newStore.addBird(bird.type, bird.price, bird.count);
        }
        return newStore;
    }



    var initialStore = JSON.parse(
        '{' +
        '"owner":"Mike", "address":"Radishcheva 10/14", ' +
        '"birds": [' +
        '{ "type":"Duck", "count":10, "price":15},' +
        '{ "type":"Eagle", "count":5, "price":50}' +
        ']' +
        '}');

    var store = loadStore(initialStore);

    getStoreBirds();
    var newBird = {type:"Chicken", count:12, price:7};
    addNewBird(newBird);
    addExistingBird("Duck", 5);
    getBirdsLessThan(20);
    sellBird("Eagle", 10, "Jack");
    sellBird("Eagle", 3, "Jack");
    getSoldBird("Eagle");
    changeBirdPrice("Chicken", 8);
    sellBird("Chicken", 5, "Olga");
    getAlltransactions();
    getStoreBirds();
    getClientTransactions("Olga");
    getClientTransactions("Victor");

})();