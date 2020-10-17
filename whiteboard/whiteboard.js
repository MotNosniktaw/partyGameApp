const socket = require("socket.io");
const NodeCache = require("node-cache");
const { uuid } = require("uuidv4");
const cache = new NodeCache();

function intialiseWhiteboard(server) {
  const io = socket(server);
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("paint", (data) => {
      io.emit("paint", data);
    });
    socket.on("done", ({ data, target, sub }) => {
      const key = uuid();
      cache.set(key, data);
      io.emit("done", { key, target, sub });
    });
    socket.on("load", ({ key, sub }) => {
      const data = cache.get(key);
      io.emit("load", { data, key, sub });
    });
    socket.on("disconnect", (thing) => {
      console.log("user disconnected");
    });
  });
}

module.exports = intialiseWhiteboard;
