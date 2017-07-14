
// Create a new **net.Socket** and connect to your running socket server.

// Once connected, pipe your terminal's standard input stream to write to your connected socket.

// Whenever the connected socket (client) emits a 'data' event, then data is being broadcasted from the server, pipe that data out to your terminal's standard output stream.

const net = require('net');

var serverConnection = net.createConnection(6969, '0.0.0.0', connectListener);

function connectListener(){
  console.log('I happen when a connection is established to the specified server');

  process.stdin.on('data', (input) => {
    serverConnection.write(input.toString());
  });

  serverConnection.on('data', (input) => {
    console.log(input.toString());
  });
}



