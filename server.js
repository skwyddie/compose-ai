// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIO(httpServer);

  // Master copy of the piano roll grid (in memory)
  let masterGrid = null;

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // On client connect, send the existing grid if we have one
    if (masterGrid) {
      socket.emit('grid-update', masterGrid);
    }

    // Listen for grid updates from the client
    socket.on('grid-update', (newGrid) => {
      masterGrid = newGrid; // store the update
      // Broadcast to all other connected clients
      socket.broadcast.emit('grid-update', newGrid);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Let Next.js handle all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`> compose-ai server listening on http://localhost:${port}`);
  });
});

