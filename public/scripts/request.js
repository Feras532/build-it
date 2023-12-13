document.getElementById('partRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Disable the submit button and other form fields
    const submitButton = document.querySelector('#partRequestForm button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    document.getElementById('name').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('partDetails').disabled = true;

 const requestData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    partDetails: document.getElementById('partDetails').value
};

    fetch('/auth/request-part', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Request sent:', data);
        showNotification('Your request has been sent successfully!');
        submitButton.textContent = 'Request Sent'; // Update button text on success
    })
    .catch(error => {
        console.error('Error sending request:', error);
        showNotification('Error sending request. Please try again.');
        submitButton.textContent = 'Error Occurred'; // Update button text on failure
    });
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageParagraph = document.getElementById('notification-message');
    messageParagraph.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function closeNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}