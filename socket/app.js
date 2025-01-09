const express = require('express');
const path = require('path');
const http = require('http'); // Required for creating a server for both HTTP and Socket.IO
const socketIo = require('socket.io');
const scannerController = require('./Controller/controller'); // Corrected path for the scannerController

const app = express();
const server = http.createServer(app); // Create a server instance for Express and Socket.IO
const io = socketIo(server); // Attach Socket.IO to the server
const PORT = 8299;

// Middleware to parse JSON and serve static files
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, 'static'))); // Serve static files (e.g., CSS, JS)

// Routes
// Home route: Render the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'View/templates/index.html')); // Adjusted path for index.html
});

// POST route to handle scanning logic
app.post('/scan', scannerController.scan); // Scanner logic defined in the controller

// Results route: Render the scanResults.html page
app
