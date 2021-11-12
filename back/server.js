const express = require('express');
const app = express();
const port = 8000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// Necessary to write in JSON file
const fs = require('fs');
const fileName = "./student.json"

app.get('/', (req, res) => {
  res.send('test');
});

io.on('connection', (socket) => {
  let file = require(fileName);
  socket.emit('fileChange', file)
  socket.on('addVote', (value) => {
    file = require(fileName);
    if(file[value] == undefined) {
      file[value] = 1;
    } else {
      file[value] += 1;
    }
    console.log(file)
    fs.writeFile(fileName, JSON.stringify(file), (err) => {
      socket.emit('fileChange', file)
      if (err) throw err;
      console.log('Data written to file');
    });
  })
});

server.listen(port, () => {
  console.log('listening on ' + port);
});