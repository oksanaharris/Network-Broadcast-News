const net = require('net');



//net.Server is an EventEmitter with the following events: 'close', 'error', 'listening'
//net.Socket is a duplex stream and is also an EventEmitter; it is returned by net.createConnection()
//new net.Socket creates a socket object



// Use the [**net**](https://nodejs.org/api/net.html) module to create a new server that listens on a specified address `0.0.0.0` and port `6969` and listens for and accepts socket connections.
// Manage which sockets are connected, and maintain your sockets so that it removes any sockets that disconnect from your server.
// Each connected socket is a **Duplex** stream, when it emits a 'data' event, broadcast the data to all sockets.



//create a new server
//set the server to listen on address '0.0.0.0' and port '6969'
//set the server to listen for and accept socket conections

//watch which sockets are connected and remove any that disconnect

//a connected socket should be a duplex stream

//a connected socket should be able to emit a 'data' event
//when a connected socket emits a 'data' event, broadcast the data to all sockets



// console.log(net);
// console.log(net.Server);

// var newSocket = new net.Socket();

// console.log(newSocket);

// const server = new net.Server();


const server = net.createServer();

server.on('error', (err) => {
  throw err;
});

server.on('connection', function (socket){
  console.log('new connection');

  socket.on('data', (input) => {
    console.log(input.toString());
  });
});

server.listen(6969, '0.0.0.0', function () {
  console.log('server is listening to 6969 port');
});
