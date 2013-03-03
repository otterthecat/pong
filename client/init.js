var player;

var socket = io.connect('http://127.0.0.1:4000');

socket.on('player1', function(data) {

    player = new Player(data.details);
    $('.player.one').text(player.details.name);
});


socket.on('player2', function(data) {

    player = new Player(data.details);
    player.paddle.position = 'right';
    $('.player.two').text(player.details.name);
});


socket.on('player1Ready', function(data) {

    console.log('Player 1 is ready to rumble');

    $('.player.one').text(data.details.name);
});

socket.on('player2Ready', function(data) {

    console.log('Player 2 is hungry for victory');
    $('.player.two').text(data.details.name);
});

socket.on('playersReady', function(data) {

    console.log('Oh, it\'s ON!', data);
});


socket.on('ball_position', function(data) {

    xpos = data.x;
    ypos = data.y;
    
   // interval = setInterval(doit, 15);

    doit();

    if(player.details.name === $('.player.one').text() ){
        socket.emit('updateBall', {x: xpos, y: ypos});
    }
});

socket.on('paddle_1_position', function(data){


    console.log("paddle 1 position ::" + data.isUp + " :: " + data.isDown);
    isPaddleUp = data.isUp;
    isPaddleDown = data.isDown;
});

socket.on('paddle_2_position', function(data){


    console.log("paddle 2 position ::" + data.isUp + " :: " + data.isDown);
    isPaddle2Up = data.isUp;
    isPaddle2Down = data.isDown;
});


$('#addName').on('click', function(event) {
    event.preventDefault();
    
    player = new Player({
        'name': $('#name').val()
    });

    socket.emit('addPlayer', player);
});