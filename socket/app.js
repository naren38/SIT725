const express = require('express');
const path = require('path');
const http = require('http'); // Required for creating a server for both HTTP and Socket.IO
const socketIo = require('socket.io');
const scannerController = require('./Controller/controller'); // Import the controller

const app = express();
const server = http.createServer(app); // Create a server instance for Express and Socket.IO
const io = socketIo(server); // Attach Socket.IO to the server
const PORT = 8754;

// Middleware to parse JSON and serve static files
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, 'static'))); // Serve static files (e.g., CSS, JS)

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'View/templates/index.html')); // Path for index.html
});

app.post('/scan', scannerController.scan); // Route for handling the scan logic

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'View/templates/scanResults.html')); // Path for scanResults.html
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit a random number to the client every 2 seconds
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
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
