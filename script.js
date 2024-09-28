document.addEventListener("DOMContentLoaded", function() {
    const correctServerCode = "EMP1982"; // Correct code to match
    const enterBtn = document.getElementById('enter-btn');
    const statusMessage = document.getElementById('status-message');
    const optionsSection = document.getElementById('options-section');
    const itemMessage = document.getElementById('item-message');
    const totalMessage = document.getElementById('total-message');
    const nextBtn = document.getElementById('next-btn');
    const contactAdminBtn = document.getElementById('contact-admin');
    const addManuallyBtn = document.getElementById('add-manually-btn');
    const scanBtn = document.getElementById('scan-btn');
    const paymentSection = document.getElementById('payment-section');
    const payBtn = document.getElementById('pay-btn');
    const paymentMessage = document.getElementById('payment-message');

    // Predefined random item codes with their prices
    const items = {
        "ABC12345": 50,
        "XYZ98765": 50,
        "LMN54321": 50,
        "PQR67890": 50,
        "DEF13579": 50
    };

    let cart = [];
    let total = 0;
    const maxItems = 50;

    // Predefined credit card for validation
    const validCard = {
        number: "4111111111111111",
        expiry: "12/25",
        cvv: "123"
    };

    // Event listener for "Enter" button click
    enterBtn.addEventListener('click', function() {
        const enteredCode = document.getElementById('server-code').value.trim();
        
        if (enteredCode === "") {
            statusMessage.textContent = "Please enter a server code.";
            statusMessage.style.color = "red";
            return;
        }

        // Show connecting message
        statusMessage.textContent = "Connecting...";
        statusMessage.style.color = "blue";

        // Simulate connection process for 3 seconds
        setTimeout(() => {
            if (enteredCode === correctServerCode) {
                statusMessage.textContent = "Connected!";
                statusMessage.style.color = "green";
                // Show the options to Add Manually or Scan
                optionsSection.style.display = "block";
            } else {
                statusMessage.textContent = "Server not found. Please try again.";
                statusMessage.style.color = "red";
            }
        }, 3000); // 3 seconds delay for simulation
    });

    // "Contact Admin" button event
    contactAdminBtn.addEventListener('click', function() {
        alert("Contact the Admin by 'My mobile number'");
    });

    // Add manually event
    addManuallyBtn.addEventListener('click', function() {
        const manualCode = prompt("Enter Item Code:");
        if (manualCode && items[manualCode]) {
            addItemToCart(manualCode, items[manualCode]);
        } else {
            alert("Item not found!");
        }
    });

    // Scan event (simulated for now)
    scanBtn.addEventListener('click', function() {
        const scannedCode = prompt("Simulate Barcode Scanning: Enter Item Code:");
        if (scannedCode && items[scannedCode]) {
            addItemToCart(scannedCode, items[scannedCode]);
        } else {
            alert("Item not found!");
        }
    });

    // Add item to the cart and update message
    function addItemToCart(code, price) {
        if (cart.length < maxItems) {
            cart.push({ code, price });
            total += price;
            itemMessage.textContent = `Added ${code} - $${price}. Total items: ${cart.length}.`;
            totalMessage.textContent = `Total Price: $${total}`;

            if (cart.length > 0) {
                nextBtn.style.display = "inline-block"; // Show "Next" button when items are added
            }
        } else {
            alert("You cannot add more than 50 items.");
        }
    }

    // "Next" button event to show payment details input
    nextBtn.addEventListener('click', function() {
        optionsSection.style.display = "none";
        paymentSection.style.display = "block";
    });

    // "Pay" button event for credit card validation
    payBtn.addEventListener('click', function() {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (cardNumber === validCard.number && expiryDate === validCard.expiry && cvv === validCard.cvv) {
            paymentMessage.textContent = "Payment Successful!";
            paymentMessage.style.color = "green";
        } else {
            paymentMessage.textContent = "Payment Declined!";
            paymentMessage.style.color = "red";
        }
    });

    // Reset the app to the initial "Connect to Server" screen
    function resetApp() {
        cart = [];
        total = 0;
        statusMessage.textContent = "";
        itemMessage.textContent = "";
        totalMessage.textContent = "";
        optionsSection.style.display = "none";
        nextBtn.style.display = "none";
        paymentSection.style.display = "none";
        paymentMessage.textContent = "";
        document.getElementById('server-code').value = "";
    }
});
