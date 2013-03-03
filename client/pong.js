var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var canvasWidth = $("#canvas").width();
var canvasHeight = $("#canvas").height();

var xpos = 50;
var ypos = 50;

var directionX = 1;
var directionY = 1;

var paddleHeight = canvasHeight/4;
var paddleWidth = canvasWidth/90;
var paddleY = 0;
var paddleX = 100;
var paddleInc = 4;


var player2Height = paddleHeight;
var player2Width = paddleWidth;
var player2Y = 0;
var player2X = canvasWidth - paddleX + player2Width;

var interval, isPaddleUp, isPaddleDown, isPaddle2Up, isPaddle2Down;

function makeBall(){
    ctx.beginPath();
    ctx.arc(xpos, ypos, 5, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();

};


function makePaddle(){
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

}

function makePlayer2(){
     ctx.fillRect(player2X, player2Y, player2Width, player2Height);
}

function doit(){

    sumx =  xpos + directionX;
    sumy =  ypos + directionY;

    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    makeBall();
    makePaddle();
    makePlayer2();

    if(sumx > canvasWidth || sumx < 0 )
        directionX = -directionX;

    if(sumy > canvasHeight || sumy < 0)
        directionY = -directionY


    xpos += directionX;
    ypos += directionY;


    if(isPaddleUp && paddleY > 0) {
        paddleY -= paddleInc;
    }

    if(isPaddle2Up && player2Y > 0) {
        player2Y -= paddleInc;
    }

    if(isPaddleDown && paddleY + paddleHeight < canvasHeight){
        paddleY += paddleInc;
    }
   
    if(isPaddle2Down && player2Y + paddleHeight < canvasHeight){
        player2Y += paddleInc;
    }

    
    // paddle check
    if(xpos + paddleWidth >= paddleX && xpos <= paddleX  && ypos >= paddleY && ypos <= paddleY + paddleHeight)
        directionX = -directionX;


    // player 2 check
    if(xpos >= player2X - player2Width && xpos <= player2X && ypos >= player2Y && ypos <= player2Y + player2Height)
        directionX = -directionX;
}



function movePaddle(event){

    var the_paddle = (player.paddle.position === 'left') ? paddleY : player2Y;

    if(event.keyCode === 38 && the_paddle > 0){


        console.log('paddleMove up');
        console.log(player);
        player.paddle.isUp = true;
        player.paddle.isDown = false;
        socket.emit('paddleMove', player.paddle);

    }

    if(event.keyCode === 40 && the_paddle + paddleHeight < canvasHeight){

        console.log('paddleMove down');
        console.log(player);
        player.paddle.isUp = false;
        player.paddle.isDown = true;
        socket.emit('paddleMove', player.paddle);

    }

}


function stopPaddle(){
    
    player.paddle.isUp = false;
    player.paddle.isDown = false;

    socket.emit('paddleMove', player.paddle);
}


//interval = setInterval(doit, 15);


$('#stop').on('click', function(){

    clearInterval(interval);

});


window.addEventListener('keydown',movePaddle,false);
window.addEventListener('keyup',stopPaddle,false);