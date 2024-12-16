const express = require('express');
const path = require('path');
const scannerController = require('./controllers/scannerController'); // Controller for handling scanning logic

const app = express();
const PORT = 9900;

// Middleware to parse JSON and serve static files
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (e.g., CSS, JS)

// Routes
// Home route: Render the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// POST route to handle scanning logic
app.post('/scan', scannerController.scan); // Scanner logic defined in the controller

// Results route: Render the result.html page
app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'result.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
