const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const scannerController = require('./controllers/scannerController'); // Controller for handling scanning logic

const app = express();
const server = http.createServer(app); // Create a server for both HTTP and Socket.IO
const io = socketIo(server); // Attach Socket.IO to the server
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

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a random number to the client every 2 seconds
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100); // Generate a random number
    socket.emit('number', randomNumber); // Send the number to the client
  }, 2000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
