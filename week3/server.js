// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(morgan('dev')); // Logs HTTP requests
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(cors()); // Handles Cross-Origin Resource Sharing

// Define a port
const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Web Vulnerability Scanner API!' });
});

// Example API endpoint
app.post('/scan', async (req, res) => {
    const { targetUrl } = req.body;

    if (!targetUrl) {
        return res.status(400).send({ error: 'Target URL is required.' });
    }

    try {
        // Simulate a scan operation
        const result = await simulateScan(targetUrl);
        res.send({ targetUrl, result });
    } catch (error) {
        console.error('Error during scan:', error.message);
        res.status(500).send({ error: 'An error occurred while scanning the URL.' });
    }
});

// Simulate a scan function (replace this with your real implementation)
async function simulateScan(url) {
    return {
        status: 'success',
        vulnerabilities: [
            { type: 'XSS', description: 'Cross-Site Scripting vulnerability detected.' },
            { type: 'SQLi', description: 'SQL Injection vulnerability detected.' }
        ]
    };
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
