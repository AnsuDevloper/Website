document.addEventListener("DOMContentLoaded", function() {
    const correctServerCode = "EDR4533BLS"; // Correct code to match
    const enterBtn = document.getElementById('enter-btn');
    const statusMessage = document.getElementById('status-message');
    const optionsSection = document.getElementById('options-section');
    const itemMessage = document.getElementById('item-message');
    const totalMessage = document.getElementById('total-message');
    const nextBtn = document.getElementById('next-btn');
    const contactAdminBtn = document.getElementById('contact-admin');
    const addManuallyBtn = document.getElementById('add-manually-btn');
    const scanBtn = document.getElementById('scan-btn');

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

        // Simulate connection process for 10 seconds
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
        }, 10000); // 10 seconds delay for simulation
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

    // "Next" button event for completing the payment
    nextBtn.addEventListener('click', function() {
        alert("Payment done. Thank you!");
        resetApp();
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
        document.getElementById('server-code').value = "";
    }
});
