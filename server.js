const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/client.html'));
});

// Generate OTP
let otpData = {};
app.post('/generate-otp', (req, res) => {
    const { userId, sharedText } = req.body;
    const otp = Math.floor(Math.random() * 900000) + 100000; // Generate 6-digit OTP between 0 and 9
    otpData = { otp: otp.toString(), sharedText };

    res.json({ otpId: otp.toString() });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
    const { otpId, otp } = req.body;

    if (otp === otpData.otp) {
        res.json({ isValid: true, receivedText: otpData.sharedText });
    } else {
        res.json({ isValid: false });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});