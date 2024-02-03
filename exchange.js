class Order {
    constructor(user, quantity, price) {
        this.user = user;
        this.quantity = quantity;
        this.price = price;
    }
}

class AssetExchange {
    constructor() {
        this.buyOrders = [];
        this.sellOrders = [];
    }

    placeBuyOrder() {
        const user = document.getElementById('userInput').value;
        const quantity = parseInt(document.getElementById('quantityInput').value, 10);
        const price = parseFloat(document.getElementById('priceInput').value);
        console.log(user);
        if (user && !isNaN(quantity) && !isNaN(price)) {
            const buyOrder = new Order(user, quantity, price);
            this.buyOrders.push(buyOrder);
            this.matchOrders();
            this.updateMatchesList();
        } else {
            alert('Invalid input. Please fill all fields with valid values.');
        }
    }

    placeSellOrder() {
        const user = document.getElementById('userInput').value;
        const quantity = parseInt(document.getElementById('quantityInput').value, 10);
        const price = parseFloat(document.getElementById('priceInput').value);

        if (user && !isNaN(quantity) && !isNaN(price)) {
            const sellOrder = new Order(user, quantity, price);
            this.sellOrders.push(sellOrder);
            this.matchOrders();
            this.updateMatchesList();
        } else {
            alert('Invalid input. Please fill all fields with valid values.');
        }
    }

    matchOrders() {
        for (const buyOrder of this.buyOrders) {
            for (const sellOrder of this.sellOrders) {
                if (buyOrder.price >= sellOrder.price) {
                    const matchedQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);

                    console.log(`Matched order - Buy Order: ${buyOrder.user} Quantity: ${matchedQuantity} Price: ${buyOrder.price} with Sell Order: ${sellOrder.user}`);

                    buyOrder.quantity -= matchedQuantity;
                    sellOrder.quantity -= matchedQuantity;
                    if (buyOrder.quantity === 0) {
                        this.buyOrders.splice(this.buyOrders.indexOf(buyOrder), 1);
                    }

                    if (sellOrder.quantity === 0) {
                        this.sellOrders.splice(this.sellOrders.indexOf(sellOrder), 1);
                    }
                }
            }
        }
    }

    updateMatchesList() {
        const matchesList = document.getElementById('matchesList');
        matchesList.innerHTML = '';

        for (const buyOrder of this.buyOrders) {
            for (const sellOrder of this.sellOrders) {
                if (buyOrder.price >= sellOrder.price) {
                    const matchedQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);

                    const matchItem = document.createElement('li');
                    matchItem.classList.add('match-item');
                    matchItem.textContent = `Matched order - Buy Order: ${buyOrder.user} Quantity: ${matchedQuantity} Price: ${buyOrder.price} with Sell Order: ${sellOrder.user}`;
                    matchesList.appendChild(matchItem);
                }
            }
        }
    }
}

const exchange = new AssetExchange();

document.querySelector('button:nth-child(1)').addEventListener('click', () => exchange.placeBuyOrder());
document.querySelector('button:nth-child(2)').addEventListener('click', () => exchange.placeSellOrder());
