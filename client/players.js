function Player(opts){

	this.details = {
		'name': 'player1',
		'gravatar': 'will_get_url_later',
		'wins': 0,
		'losses': 0
	};


	this.paddle = {
		'position': 'left',
		'isUp': false,
		'isDown': false
	};

	// really just using .merge() for now
	// when instantiating, but could expand later
	this.utils = {

		'merge': function(baseObj, newObj){

			for(item in newObj){

				baseObj[item] = newObj[item];
			}

			return baseObj;
		}
	}

	this.utils.merge(this.details, opts);

	return this;
};


Player.prototype.getDetails = function(){

	return this.details;
}


Player.prototype.movePaddle = function(eventCode){

	if(eventCode === 38){ // 38 corresponds to up arrow

		this.paddle.isDown = false;
		this.paddle.isUp = true;

	} else if(eventCode === 40){ // 40 corresponds to down arrow

		this.paddle.isUp = false;
		this.paddle.isDown = true;
	}

	socket.emit("paddleMove", this.paddle);
};


Player.prototype.stopPaddle = function(){

    isPaddleDown = false;
    isPaddleUp = false;
}


Player.prototype.setPaddle = function(paddle){

	this.paddle = this.utils.merge(this.paddle, paddle);

	return this.paddle;
}