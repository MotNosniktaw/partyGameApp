const context = {
  players: [],
  names: [],
  phase: "",
};

function initialiseEmpire(io) {
  io.on("empire-connect", (socket) => {
    socket.on("empire-player-joined", (data) => {
      io.emit("game-update");
    });
  });
}

function startGame() {
  // create game in join phase - with socket
  // join game
  // return code and gameId
}

function joinGame() {
  // take game code
  // check if game is in join phase
  // update player list
}

function startSubmitPhase() {}

function startGuessPhase() {}

function guessName() {
  // get guessee and minions
  // make them minions of guesser
}

function updateClients() {}

module.exports = {
  initialiseEmpire,
};
