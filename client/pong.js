var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var canvasWidth = $("#canvas").width();
var canvasHeight = $("#canvas").height();

var xpos = 50;
var ypos = 50;

var directionX = 5;
var directionY = 5;

var paddleHeight = canvasHeight/4;
var paddleWidth = canvasWidth/90;
var paddleY = 0;
var paddleX = 100;
var paddleInc = 4;


var player2Height = paddleHeight;
var player2Width = paddleWidth;
var player2Y = 50;
var player2X = canvasWidth - paddleX + player2Width;

var interval, isPaddleUp, isPaddleDown;

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


    if(isPaddleUp && paddleY > 0)
        paddleY -= paddleInc


    if(isPaddleDown && paddleY + paddleHeight < canvasHeight)
        paddleY += paddleInc
    
    if(player2Y + directionY + player2Height/2 >= canvasHeight){

    } else {
    
        player2Y += directionY;
    }

    
    // paddle check
    if(xpos + paddleWidth >= paddleX && xpos <= paddleX  && ypos >= paddleY && ypos <= paddleY + paddleHeight)
        directionX = -directionX;


    // player 2 check
    if(xpos >= player2X - player2Width && xpos <= player2X && ypos >= player2Y && ypos <= player2Y + player2Height)
        directionX = -directionX;
}



function movePaddle(event){

    if(event.keyCode === 38 && paddleY > 0){
        isPaddleUp = true;
        isPaddleDown = false;

    }

    if(event.keyCode === 40 && paddleY + paddleHeight < canvasHeight){
        isPaddleDown = true
        isPaddleUp = false;

    }

}


function stopPaddle(){
    isPaddleDown = false;
    isPaddleUp = false;
}


//interval = setInterval(doit, 15);


$('#stop').on('click', function(){

    clearInterval(interval);

});


window.addEventListener('keydown',movePaddle,false);
window.addEventListener('keyup',stopPaddle,false);