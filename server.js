const { createServer, Server } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const app = express();
const dev = app.get("env") !== "production";

const normalisePort = port => parseInt(port, 10);
const PORT = normalisePort(process.env.PORT || 5000);


// Socket.io
const http = Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  socket.on('send_scoreboard_update', function(update){
    socket.broadcast.emit('scoreboard_update', update);
  });
});

if (!dev) {
    app.disable("x-powered-by");
    app.use(compression());
    app.use(morgan("common"));

    app.use(express.static(path.resolve(__dirname, "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    })
}

if (dev) {
    app.use(morgan("dev"));
}

const server = createServer(app);

server.listen(PORT, "0.0.0.0", err => {
    if (err) throw err;
    console.log("server started")
})
