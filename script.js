let scannedItems = [];
const maxItems = 50;
let totalPrice = 0;

// Default server code
const defaultServerCode = "EDR4533BLS";

// Simulated item code prices (you'll load this from the repository instead)
const itemPrices = {
    "EFTY53771": 100,
    "ABC12345": 200,
    "XYZ98765": 150,
};

// Function to simulate connecting to the server
function connect() {
    const enteredCode = document.getElementById('serverCode').value;
    const connectStatus = document.getElementById('connectStatus');

    connectStatus.innerHTML = "Connecting...";
    setTimeout(() => {
        if (enteredCode === defaultServerCode) {
            connectStatus.innerHTML = "Connected!";
            document.getElementById('itemSection').style.display = 'block';
        } else {
            connectStatus.innerHTML = "Server Not Found!";
        }
    }, 3000); // Simulate 3 seconds for connecting
}

// Function to check the item code from the repository
function checkItem() {
    const itemCode = document.getElementById('itemCode').value;
    addItemToCart(itemCode);
}

// Function to start barcode scanning
function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#itemSection'), // Where to show the live camera feed
        },
        decoder: {
            readers: ["code_128_reader"] // Common barcode types
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected((data) => {
        const barcode = data.codeResult.code;
        addItemToCart(barcode);
        Quagga.stop();
    });
}

// Function to add item to cart and update the list
function addItemToCart(itemCode) {
    if (scannedItems.length >= maxItems) {
        alert('You can only add up to 50 items.');
        return;
    }

    const itemPrice = itemPrices[itemCode];
    if (itemPrice) {
        scannedItems.push({ code: itemCode, price: itemPrice });
        totalPrice += itemPrice;
        updateItemList();
        document.getElementById('totalSection').style.display = 'block';
    } else {
        alert('Item not found!');
    }
}

// Function to update the item list and total price
function updateItemList() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = "";
    scannedItems.forEach((item, index) => {
        itemList.innerHTML += `<p>Item ${index + 1}: ${item.code} - ${item.price}$</p>`;
    });

    document.getElementById('totalPrice').innerHTML = `Total: ${totalPrice}$`;
}

// Function to proceed to payment
function showPayment() {
    document.getElementById('paymentSection').style.display = 'block';
}

// Function to simulate the payment process
function makePayment() {
    const creditPhone = document.getElementById('creditPhone').value;
    const cardNumber = document.getElementById('cardNumber').value;

    if (creditPhone && cardNumber) {
        document.getElementById('paymentStatus').innerHTML = "Payment Successful!";
    } else {
        document.getElementById('paymentStatus').innerHTML = "Invalid Payment Details!";
    }
}
