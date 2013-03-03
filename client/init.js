// global object to store individual players
// ie - one player per client
var player;

// start up socket.io server
var socket = io.connect('http://sol.local:4000');

/* Events from Server
****************************************************/

// 
socket.on('player1', function(data) {

    player = new Player(data.details);
    $('.player.one').text(player.details.name);
});


socket.on('player1Ready', function(data) {

    $('.player.one').text(data.details.name);
});


// updated paddle position from server, and updates
// pong game on both clients
socket.on('paddle_1_position', function(data){

    isPaddleUp = data.isUp;
    isPaddleDown = data.isDown;
});

// Update Player2's 
socket.on('player2', function(data) {

    player = new Player(data.details);
    player.paddle.position = 'right';
    $('.player.two').text(player.details.name);
});

// fire when player 2 is added
socket.on('player2Ready', function(data) {

    $('.player.two').text(data.details.name);
});

// used to update player 2's paddle.
socket.on('paddle_2_position', function(data){

    isPaddle2Up = data.isUp;
    isPaddle2Down = data.isDown;
});


socket.on('playersReady', function(data) {

   // placeholder to execute when both players sign in
});

// get updated ball position from server, and then
// redraw the pong field
socket.on('ball_position', function(data) {

    xpos = data.x;
    ypos = data.y;

    doit();

    // Since player 1's client is what is syncing up the ball,
    // we check if the current user is also "player 1", and if so
    //  give the server the current ball position for updating
    if(player.details.name === $('.player.one').text() ){
        socket.emit('updateBall', {x: xpos, y: ypos});
    }
});


/* Allow User to add name and update 'player' global
***************************************************************************/

$('#addName').on('click', function(event) {
    event.preventDefault();
    
    player = new Player({
        'name': $('#name').val()
    });

    socket.emit('addPlayer', player);
});