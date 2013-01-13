var players = {
	'player1': null,
	'player2': null
};

var game = {
	'score1': 0,
	'score2': 0,
	'pointLimit': 3,
	'timeLimit': 180
};


function addPlayer(num, playerObj){

	players['player'+num] = playerObj;
};



exports.players = players;
exports.game = game;
exports.addPlayer = addPlayer;