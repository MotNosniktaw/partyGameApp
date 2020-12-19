const NodeCache = require("node-cache");
const { uuid } = require("uuidv4");
const jpeg = require("jpeg-js");
const cache = new NodeCache();

function intialiseWhiteboard(io) {
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
    socket.on("save", ({ data }) => {
      var width = data.length;
      var height = data[0].length;

      console.log({ data });

      var frameData = Buffer.alloc(width * height * 4);
      console.log(frameData, typeof frameData);

      var counter = 0;

      data.forEach((row) => {
        row.forEach((cell) => {
          var rgbData = [];
          let rgb = [255, 255, 255];
          if (cell !== "") {
            rgb = cell
              .replace("rgb(", "")
              .replace(")", "")
              .replace(" ", "")
              .split(",");
            console.log({ cell });
          }
          frameData[counter++] = Number(rgb[0]).toString(16);
          frameData[counter++] = Number(rgb[1]).toString(16);
          frameData[counter++] = Number(rgb[2]).toString(16);
          frameData[counter++] = Number(255).toString(16);
        });
      });

      console.log({ frameData });
      var imageData = jpeg.encode({ data: frameData, width, height });

      console.log({ imageData });
    });
    socket.on("disconnect", (thing) => {
      console.log("user disconnected");
    });
  });
}

module.exports = { intialiseWhiteboard };
