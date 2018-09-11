const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


 // socket.emit('newEmail', {
 //   from : 'vishnu@gmail.com',
 //   text: 'Hey how are you',
 //   createdAt : 23
 // });
 //
 // socket.emit('newMessage', {
 //   from: 'john',
 //   text: 'see you then',
 //   createdAt : 123
 // });

 // socket.on('createEmail', (newEmail) => {
 //   console.log('createEmail', newEmail);
 // });

// socket.emit('newMessage', {
//   from: 'Admin',
//   text: 'Welcome to chat app',
//   createdAt: new Date().getTime()
// });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));


 // socket.broadcast.emit('newMessage', {
 //   from: 'Admin',
 //   text: 'New user joined',
 //   createdAt: new Date().getTime()
 // });

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user join'));


 socket.on('createMessage', (message, callback) => {
   console.log('createMessage', message);
   io.emit('newMessage', generateMessage(message.from, message.text));
   callback();
    });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

   // {
   //   from: message.from,
   //   text: message.text,
   //   createddAt: new Date().getTime()

   // socket.broadcast.emit('newMessage', {
   //   from: message.from,
   //   text: message.text,
   //   createdAt: new Date().getTime()

  // });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
