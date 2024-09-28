// The correct server code
const correctServerCode = "EDR4533BLS";

// Function to simulate connecting
function validateCode() {
    const enteredCode = document.getElementById('server-code').value.trim();
    const statusMessage = document.getElementById('status-message');

    // Clear previous status message
    statusMessage.textContent = "";

    if (enteredCode === "") {
        statusMessage.textContent = "Please enter a server code.";
        statusMessage.style.color = "red";
        return;
    }

    // Show 'Connecting...' message
    statusMessage.textContent = "Connecting...";
    statusMessage.style.color = "blue";

    // Simulate a 10-second delay for connecting
    setTimeout(() => {
        if (enteredCode === correctServerCode) {
            statusMessage.textContent = "Connected!";
            statusMessage.style.color = "green";
        } else {
            statusMessage.textContent = "Server not found. Please try again.";
            statusMessage.style.color = "red";
        }
    }, 10000); // 10 seconds delay
}
