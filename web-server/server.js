const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
// const { shutdown } = require('./utils/utils.server');

// development env config
dotenv.config({ path: path.join(__dirname, 'config.env') });

// CONSTANTS
const PORT = process.env.PORT || 4000;
const DB = process.env.MONGO_HOST.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD
);

// DATABASE CONNNECTION (DB--> TEMP)
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() =>
    console.log(`[${new Date().toISOString()}]: Database connection successful`)
  );
// do not catch error(this will shutdown the server gracefully and restart afterwards) because server needs to restart if the db connection timesout or fails;

const server = app.listen(PORT, () =>
  console.log(`[${new Date().toISOString()}]: server started`)
);
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
      console.log(
        `[${new Date().toISOString()}]: [ERROR] ${err.name}, ${err.message}`
      );
      process.exitCode = exitCode || 1;
    }
    process.exit();
  });
};

process.on('uncaughtException', err => {
  console.log(
    `[${new Date().toISOString()}]: [uncaughtException] [ERROR] ${err.name}, ${
      err.message
    }`
  );
  shutdown(1);
});

// respond to unhandledRejection
process.on('unhandledRejection', err => {
  console.log(
    `[${new Date().toISOString()}]: [unhandledRejection] [ERROR] ${err.name}, ${
      err.message
    }`
  );
  shutdown(1);
});

// respond to SIGTERM and SIGINT
process.on('SIGTERM', () => {
  console.log(
    `[${new Date().toISOString()}]: SIGTERM recieved...Terminating process`
  );
  shutdown();
});

// respond to CTRL-C in in terminal
process.on('SIGINT', () => {
  console.log(
    `[${new Date().toISOString()}]: SIGINT recieved...Terminating process`
  );
  shutdown();
});

module.exports = server;
