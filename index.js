const app = require("express")();
const http = require("http").createServer(app);
const intialiseWhiteboard = require("./whiteboard/whiteboard");

intialiseWhiteboard(http);

app.get("/whiteboard", (req, res) => {
  console.log("getting page");
  res.sendFile(__dirname + `/whiteboard/index.html`);
});

http.listen(4000, () => {
  console.log("listening on 8080");
});
