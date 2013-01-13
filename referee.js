var Referee = function(){

	this.players = {
		'player1': null,
		'player2': null
	}


	this.game = {
		'score1': 0,
		'score2': 0,
		'pointLimit': 3,
		'timeLimit': 180
	}


	this.utils = {

		'merge': function(baseObj, newObj){

			for(item in newObj){

				baseObj[item] = newObj[item];
			}

			return baseObj;
		}
	}

	return this;
}


Referee.prototype.setGame = function(gameObj){


	this.game = this.utils.merge(this.game, gameObj);

	return this;
}


Referee.prototype.addPlayer = function(num, playerObj){

	this.players['player'+num] = playerObj;
};


Referee.prototype.setPlayers = function(playerObj){


	this.players = this.utils.merge(this.players, playerObj);

	return this;
}


Referee.prototype.startGame = function(){


}


Referee.prototype.pauseGame = function(){


}


Referee.prototype.awardPoint = function(player){


}


Referee.prototype.endGame = function(){


}

exports.Referee = Referee;