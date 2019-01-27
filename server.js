const { createServer } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const app = express();
const dev = app.get("env") !== "production";
const PORT = process.env.port || 5000;

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

server.listen(PORT, err => {
    if (err) throw err;
    console.log("server started")
})
