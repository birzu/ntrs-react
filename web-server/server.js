const path = require('path');
const dotenv = require('dotenv');
const app = require('./app');
// const { shutdown } = require('./utils/utils.server');

// development env config
dotenv.config({ path: path.join(__dirname, 'config.env') });

// CONSTANTS
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => console.log(`[${new Date().toISOString()}]: server started`));
// handle socket list to respond to graceful shutdown
const sockets = {};
let nextSocketId = 0;
server.on('connection', socket => {
  nextSocketId += 1;
  const socketId = nextSocketId;
  sockets[socketId] = socket;

  socket.once('close', () => delete sockets[socketId]);
});

const closeSockets = timer => {
  if (timer > 0) {
    console.log(`waiting ${timer}s before force closing all connections`);
    return setTimeout(closeSockets, 1000, timer - 1);
  }
  console.log('Closing all connections');
  Object.keys(sockets).forEach(socketId => sockets[socketId].destroy());
};

const shutdown = exitCode => {
  closeSockets(10);
  server.close(err => {
    if (err) {
      console.log(`[${new Date().toISOString()}]: [ERROR] ${err.name}, ${err.message}`);
      process.exitCode = 1;
    }
    process.exit(exitCode);
  });
};

process.on('uncaughtException', err => {
  console.log(
    `[${new Date().toISOString()}]: [uncaughtException] [ERROR] ${err.name}, ${err.message}`
  );
  shutdown(1);
});

// respond to unhandledRejection
process.on('unhandledRejection', err => {
  console.log(
    `[${new Date().toISOString()}]: [unhandledRejection] [ERROR] ${err.name}, ${err.message}`
  );
  shutdown(1);
});

// respond to SIGTERM and SIGINT
process.on('SIGTERM', () => {
  console.log(`[${new Date().toISOString()}]: SIGTERM recieved...Terminating process`);
  shutdown();
});

// TODO: write function to respond to SIGINT

module.exports = server;
