document.addEventListener("DOMContentLoaded", function() {
    const correctServerCode = "EMP1982"; // Updated correct code
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
        "8905757843554": 2999.00,
        "6014854974144855": 1000,
        "HV7A3": 7822,
        "FFP2": 4000,
        "DEF13579": 50
    };

    let cart = [];
    let total = 0;
    const maxItems = 50;

    // Predefined credit cards for validation
    const validCards = [
        { number: "547891436341", expiry: "12/25", cvv: "142" },
        { number: "546789224534", expiry: "12/29", cvv: "672" }
    ];

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
                // Hide server connection section and show the item adding section
                document.getElementById('code-entry-section').style.display = "none";
                optionsSection.style.display = "block"; // Show options to Add Manually or Scan
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

    // "Next" button event to hide item entry and show payment details input
    nextBtn.addEventListener('click', function() {
        optionsSection.style.display = "none"; // Hide item adding section
        paymentSection.style.display = "block"; // Show payment section
    });

    // "Pay" button event for credit card validation
    payBtn.addEventListener('click', function() {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        const validCard = validCards.find(card => card.number === cardNumber && card.expiry === expiryDate && card.cvv === cvv);

        if (validCard) {
            paymentMessage.textContent = "Payment Successful!";
            paymentMessage.style.color = "green";

            setTimeout(() => {
                resetApp(); // Reset the app to the initial "Connect to Server" screen after successful payment
            }, 2000); // Delay for showing the success message
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
        document.getElementById('code-entry-section').style.display = "block"; // Show the connection screen again
    }
});
