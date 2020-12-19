const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { initialiseEmpire } = require("./empire/empire");
const { intialiseWhiteboard } = require("./whiteboard/whiteboard");

intialiseWhiteboard(io);
initialiseEmpire(io);

app.get("/whiteboard", (req, res) => {
  console.log("getting page");
  res.sendFile(__dirname + `/whiteboard/index.html`);
});

http.listen(8080, () => {
  console.log("listening on 8080");
});
