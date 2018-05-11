/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express');
const app = express();

const http = require('http')
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const sockets = [];


io.on('connection', (socket) => {
  sockets.push(socket.id);
  socket.on('play', (data) => {
    let randomIndex = Math.floor(Math.random() * sockets.length);
    io.to(sockets[randomIndex]).emit('play', data);
  })

  socket.on('disconnect', () => {
    console.log("Disconnected: " + socket.id);
    sockets.splice(sockets.indexOf(socket.id), 1);
  })
})

app.use(express.static(__dirname + '/public'));

server.listen(2222, () => {
  console.log("Server Started on port 2222");
})