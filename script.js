

const userAgent = navigator.userAgent.toLowerCase();

// Function to show/hide payment options based on the operating system
function togglePaymentOptions() {
  const paytm = document.getElementById('Paytm');
  const bhim = document.getElementById('Bhim');
  const paymentOptions = document.querySelector('.payment-methods');

  if (/iphone|ipad|ipod/.test(userAgent)) {
    // Hide Paytm and BHIM for iOS
    paytm.style.display = 'none';
    bhim.style.display = 'none';
  }

  if (!/android|iphone|ipad|ipod/.test(userAgent)) {
    // Display "No payment options available" for desktop
    paymentOptions.innerHTML = '<p>No payment options available because of desktop mode</p>';
  }
}

// Call the function on page load
window.addEventListener('load', togglePaymentOptions);

// Function to handle payment option clicks
function handlePaymentOptionClick(event) {
  // You can add your custom logic here based on the clicked option
  // For example, you can perform some action or navigation.
  // You can also leave this function empty if you don't need any specific action.
}

// Add a click event listener to all payment options
// const paymentOptions = document.querySelectorAll('.payment-option');
// paymentOptions.forEach((option) => {
//   option.addEventListener('click', handlePaymentOptionClick);
// });
const sendPaymentButton = document.getElementById('send-payment');
const phoneNumberInput = document.getElementById('phone-number');

// Function to send a POST request
async function sendPayment() {
  const amount = 599;
  const newPhoneNumber = phoneNumberInput.value; // Get the new phone number from the input field

  try {
    const response = await fetch('http://localhost:8080/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        phoneNumber: newPhoneNumber // Include the new phone number in the request body
      })
    });

    if (response.ok) {
      alert('Payment sent successfully!');
    } else {
      alert('Failed to send payment.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending payment.');
  }
}

// Add a click event listener to the "Send" button
sendPaymentButton.addEventListener('click', sendPayment);

// Function to send a GET request for UPI options
async function getUpiOption(upiName) {
  try {
    const response = await fetch(`http://localhost:8080/${upiName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert(`Successfully fetched UPI option: ${upiName}`);
    } else {
      alert(`Failed to fetch UPI option: ${upiName}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while fetching UPI option.');
  }
}

// Add a click event listener to each UPI button
const upiOptions = document.querySelectorAll('.payment-option');
upiOptions.forEach((option) => {
  option.addEventListener('click', (event) => {
    // Get the UPI name from the clicked button's ID
    const upiName = event.currentTarget.id.replace('-option', '');
    
    // Trigger the GET request for the selected UPI option
    getUpiOption(upiName);
  });
});
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors()); // Enable CORS for all routes

// Your server routes and middleware setup here

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

