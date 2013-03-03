var io = require('socket.io').listen(4000);

/* import classes */
var Referee = require('./ref.js');

var ball_interval;
var pos = {x: 50, y: 50};


io.sockets.on('connection', function(socket){


	socket.on('addPlayer', function(player){

		console.log('I have been asked to add', player);

		if(Referee.players.player1 === null){

			Referee.addPlayer(1, player);

			socket.join('active_players');

			socket.emit('player1', player);
			socket.broadcast.emit('player1Ready', player);

		} else if(Referee.players.player2 === null){

			if(Referee.players.player1.paddle.position === 'left'){

				player.paddle.position = 'right';
			}

			Referee.addPlayer(2, player);

			socket.join('active_players');

			socket.emit('player2', player);
			socket.broadcast.emit('player2Ready', player);

		} else {

			socket.emit('playerSet', 'spectator');
			socket.broadcast.emit('playerSet', 'spectator')
		}

		if(Referee.players.player1 !== null && Referee.players.player2 !== null){

			socket.emit("playersReady", Referee.players);
			socket.broadcast.emit("playersReady", Referee.players);

	
			pos.x = 100;
			pos.y = 100;
	
			socket.emit('ball_position', pos);
			socket.broadcast.to('active_players').emit('ball_position', pos);
			
		}

	});

	
	socket.on('updateBall', function(data){
		
			pos.x = data.x;
			pos.y = data.y;

			socket.emit('ball_position', pos);
			socket.broadcast.to('active_players').emit('ball_position', pos);
	});


	socket.on('paddleMove', function(data){

		if(data.position === 'left'){

			socket.emit('paddle_1_position', data);
			socket.broadcast.to('active_players').emit('paddle_1_position', data);
		}

		if(data.position === 'right'){

			socket.emit('paddle_2_position', data);
			socket.broadcast.to('active_players').emit('paddle_2_position', data);
		}

	});

});