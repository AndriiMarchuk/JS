
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
                    document.write("Error. Can\'t sell " + birdCountSold + " " + bird.type + ". They are left only " + bird.count + " pieces<br>");
                    return;
                }
                bird.count = newBirdCount;
                store.addTransaction(bird.type, bird.price, birdCountSold, clientName);
                document.write("Sold " + birdCountSold + " " + birdName + " to " + clientName + "<br>");
            }
        }
    }

    function addNewBird(newBird){
        if(newBird.type === undefined || newBird.price === undefined){
            document.write("Error. Can\'t have undefined type or price for a bird.<br>");
            return;
        }
        if(newBird.count === undefined){
            newBird.count = 0;
        }
        store.addBird(newBird.type, newBird.price, newBird.count);
        document.write("Added new Bird:" + JSON.stringify(newBird) + " to a store<br>");
    }

    function addInputBird(){
        store.addBird(document.getElementById("newBirdType").value, document.getElementById("newBirdPrice").value, document.getElementById("newBirdCount").value);
        getStoreBirds();
    }



    function addExistingBird(birdName, birdCount){
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                bird.count += birdCount;
                document.write("Added " + birdCount + " " + birdName + ". Current count: " + bird.count + "<br>");
            }
        }
    }

    function changeBirdPrice(birdName, birdNewPrice){
        for (var i in store.birds) {
            var bird = store.birds[i];
            if (birdName === bird.type) {
                bird.price = birdNewPrice;
                document.write("Changed " + bird.type + " price to " + birdNewPrice + "<br>");
            }
        }
    }

    function getAlltransactions(){
        var totalSoldPrice = 0;
        var transactionOutput = "Transactions: ";
        for (var i in store.transactions) {
            var transaction = store.transactions[i];
            transactionOutput += "<br>  bird: " + transaction.birdType + ", price: " + transaction.birdPrice + ", count: " + transaction.birdCount
                + ", total: " + transaction.getTotal() + ", client: " + transaction.clientName;
            totalSoldPrice += transaction.getTotal();
        }
        transactionOutput += "<br>Total profit: " + totalSoldPrice + "<br>";
        document.write(transactionOutput);
    }

    function getStoreBirds(){
        var storeState = "Store: <br>";
        document.getElementById("birdsTable").innerHTML="<th>Bird</th><th>Price</th><th>Count</th>";
        for (var i in store.birds) {
            var bird = store.birds[i];
            storeState += "  " + bird.type + "=> price: " + bird.price + ", left: "+ bird.count + "<br>";
            document.getElementById("birdsTable").innerHTML += "<tr><td>"+bird.type+"</td>"+"<td>"+bird.price+"</td>"+"<td>"+bird.count+"</td></tr>";
        }
        // document.write(storeState);
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
        document.write("Sold " + birdName + " count: " + birdSoldCount + ", profit: " + birdSoldProfit + "<br>");
    }

    function getClientTransactions(clientName) {
        var clientTransactions = clientName + " transactions: <br>";
        var transactionsCount = 0;
        for (var i in store.transactions) {
            var transaction = store.transactions[i];
            if (clientName === transaction.clientName) {
                transactionsCount++;
                clientTransactions += "  bird: " + transaction.birdType + ", price: " + transaction.birdPrice + ", count: " + transaction.birdCount
                    + ", total: " + transaction.getTotal() + "<br>";
            }
        }
        if (transactionsCount === 0) {
            document.write("Sorry, but " + clientName + " has no transactions");
        } else {
            document.write(clientTransactions);
        }
    }

    function getBirdsLessThan(fewCount){
        var fewOutput = "Birds less then "+fewCount+" pieces:";
        for (var i in store.birds) {
            var bird = store.birds[i];
            fewOutput += "<br>  " + bird.type + ":" + bird.count;
        }
        document.write(fewOutput + "<br>");
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
