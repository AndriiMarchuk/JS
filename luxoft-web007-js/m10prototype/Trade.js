function Stock(company, price, count) {
    this.company = company;
    this.price = price;
    this.count = count;
}
Stock.prototype.totalPrice = function () {
    return this.price * this.count;
}
Stock.prototype.toString = function () {
    return "Stock => company: " + this.company + "; count: " + this.count + "; totalPrice: " + Stock.prototype.totalPrice.call(this);
}

var stock = new Stock("Luxoft", 50, 8);
console.log(stock.toString());

function ForwardStock(company, price, forwardPrice, count) {
    Stock.call(this, company, price, count);
    this.forwardPrice = forwardPrice;
}
ForwardStock.prototype.toString = function () {
    return Stock.prototype.toString.call(this) + "; forwardPrice: " + this.forwardPrice;
}
var fwdStock = new ForwardStock("Luxoft", 50, 60, 8);
console.log(fwdStock.toString());
