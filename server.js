const express = require("express");
const app = express();

// Create Http Server
// ? Because WebSocket connection is an upgrade from an HTTP connection
// ? HTTP server first handles handshake and delegate everything to the Websocket
const server = require("http").createServer(app);
const WebSocket = require("ws");

// Create Web Socket Server
const wss = new WebSocket.Server({ server: server });

// "connection" Event when a client connects
wss.on("connection", function connection(ws) {
  // Executed once on a connection
  console.log("A new Client Connected!");
  //   ws.send("Server: Welcome to the Dark Forum");
  console.log("Welcome to the Dark Forest");

  // Executed on every message from client
  ws.on("message", function incoming(message) {
    console.log(`Roger that, ${message}`);

    // * Broadcasting to  all connected clients
    // Sending the message from one client to every client connected to the stream
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(3000, () => console.log("Listening on port: 3000"));
