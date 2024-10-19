document.getElementById('share-btn').addEventListener('click', function() {
    const sharedText = document.getElementById('shared-text').value;
    fetch('/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123', sharedText: sharedText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('otp-display').innerText = data.otpId;
    })
    .catch(error => console.error(error));
});

document.getElementById('verify-otp-btn').addEventListener('click', function() {
    const otpInput = document.getElementById('otp-input').value;
    const otpId = document.getElementById('otp-display').innerText;
    fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otpId, otp: otpInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.isValid) {
            alert('OTP is valid!');
            // Display received text
            document.getElementById('received-text').innerText =  data.receivedText;
        } else {
            alert('Invalid OTP');
        }
    })
    .catch(error => console.error(error));
});

// Copy received text to clipboard
document.getElementById('copy-text-btn').addEventListener('click', function() {
    const receivedText = document.getElementById('received-text').innerText;
    navigator.clipboard.writeText(receivedText).then(() => {
        alert('Received text copied to clipboard');
    });
});