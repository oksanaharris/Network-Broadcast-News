const net = require('net');



//net.Server is an EventEmitter with the following events: 'close', 'error', 'listening'
//net.Socket is a duplex stream and is also an EventEmitter; it is returned by net.createConnection()
//new net.Socket creates a socket object



// Use the [**net**](https://nodejs.org/api/net.html) module to create a new server that listens on a specified address `0.0.0.0` and port `6969` and listens for and accepts socket connections.
// Manage which sockets are connected, and maintain your sockets so that it removes any sockets that disconnect from your server.
// Each connected socket is a **Duplex** stream, when it emits a 'data' event, broadcast the data to all sockets.



//X - create a new server
//X - set the server to listen to port '6969' and bind to host '0.0.0.0'
//X - set the server to listen for and accept socket conections - connect event listener

//watch which sockets are connected and remove any that disconnect

//X - a connected socket should be a duplex stream - it is by default

//X - a connected socket should be able to emit a 'data' event - by default
//X - when a connected socket emits a 'data' event, 'broadcast' (write to each) the data to all sockets



const server = net.createServer();

const clientConnectionArr = [];
console.log('starting client connection array', clientConnectionArr);

const userNames = [];
console.log('starting user name array', userNames);

server.listen(6969, '0.0.0.0', function () {
  console.log('server is listening to see if anything is trying to connect to 6969 port');
});

server.on('error', (err) => {
  throw err;
});

server.on('connection', function (clientConnection){
  console.log('new connection');

  clientConnectionArr.push(clientConnection);
  console.log('client connections now: ', clientConnectionArr.length);

  clientConnection.write('First, choose a user name:');

  clientConnection.on('data', (input) =>{
    const string = input.toString().slice(0,-1);
    if (!clientConnection.username){
      if (string === '[ADMIN]' || userNames.indexOf(string) > -1){
        clientConnection.write('Can\'t use that username.');
      } else {
        clientConnection.username = string;
        userNames.push(string);
      }
    } else {
      clientConnectionArr.forEach((connection) => {
      //so it doesn't write to itself
        if(connection != clientConnection){
          connection.write(clientConnection.username + ': ' + string);
          console.log(clientConnection.username + ': ' + string);
        }
      });
    }
  });

  clientConnection.on('close', (connection) => {
    clientConnectionArr.splice(clientConnectionArr.indexOf(connection), 1);
  });

});

process.stdin.on('data', (input) => {
  const string = input.toString().slice(0,-1);

  if (string.search('\\kick') > -1 ){
    console.log('seeing command kick');
    var username = string.substring(6);

    if(userNames.indexOf(username) > -1){
      clientConnectionArr.forEach((connection, index, array) => {
        if (connection.username === username){
          connection.write('You have been kicked out of the session.');
          console.log(connection.username, ' has been kicked out!');
          connection.destroy();
          array.splice(index, 1);
        }
      });
      userNames.splice(userNames.indexOf(username), 1);
      return;
    }

  } else {
    console.log('firing');
    clientConnectionArr.forEach((connection) => {
      console.log('what is happening here');
      connection.write('[ADMIN]:' + string);
    });
  }

});







