//need to remember to not code in master next time

const net = require('net');

const server = net.createServer();

const clientConnectionArr = [];

const userNames = [];

server.listen(6969, '0.0.0.0', function () {
  console.log('Server is ready and listening for connections to port 6969.');
});

server.on('error', (err) => {
  throw err;
});

server.on('connection', function (clientConnection){

  clientConnectionArr.push(clientConnection);

  if (clientConnectionArr.length === 1){
    console.log('Someone just joined. And then there  was: ', clientConnectionArr.length);
  } else if (clientConnectionArr.length > 1){
    console.log('Someone just joined. And then there were: ', clientConnectionArr.length);
  }

  clientConnection.write('Pick a user name:');

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
        if(connection != clientConnection){
          connection.write(clientConnection.username + ': ' + string);
        }
      });
      console.log(clientConnection.username + ': ' + string);
    }
  });

  clientConnection.on('close', (connection) => {
    var index = clientConnectionArr.indexOf(connection);
    if (index !== -1){
      clientConnectionArr.splice(index, 1);
    }
  });
});

process.stdin.on('data', (input) => {
  const string = input.toString().slice(0,-1);

  if (string === '\\get user info'){
    clientConnectionArr.forEach((connection, index, array) => {
      console.log('User ' + index + ': ' + connection.username + ' ' + connection.remotePort);
    });
  } else if (string.indexOf('\\kick') === 0 ){
    var identifier = string.substring(6);

      clientConnectionArr.forEach((connection, index, array) => {
        if (connection.username === identifier || connection.remotePort === parseInt(identifier)){
          connection.write('You have been kicked out of the session.');
          console.log(connection.username, ' has been kicked out!');

          connection.end();

          clientConnectionArr.splice(index, 1);
        }
      });

      if (userNames.indexOf(identifier) > -1) {userNames.splice(userNames.indexOf(identifier), 1);}

  } else {
    clientConnectionArr.forEach((connection) => {
      connection.write('[ADMIN]:' + string);
    });
  }

});







