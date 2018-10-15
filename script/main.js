/* Background Set-up*/
var canvas = document.getElementById("layer1");
var ctx = canvas.getContext("2d");
var fourthCanvas = document.getElementById("layer4");
var fourthCtx = fourthCanvas.getContext("2d");
/*Enemy Set-up*/
var secondCanvas = document.getElementById("layer2");
var secondCtx = secondCanvas.getContext("2d");
/*Player Set-up*/
var thirdCanvas = document.getElementById("layer3");
var thirdCtx = thirdCanvas.getContext("2d");
var player = {
    dir: 0,
    size: 25,
    xpos: 225,
    ypos: 425,
    speed: 10,
    score: 0,
    lives: 3,
    level: 1
};
main();

function main() {
    var circle = {
        y: 0,
        x: 0,
        dir: 1,
        radius: 8,
        speed: 1
    };
    var background = new Image();
    var numEnemy = 500;
    var enemyCreation;
    var count = 0;
    var loop = 0;
    /* Page Setup*/
    background.src = "img/background.png";
    background.onload = function() {
        ctx.drawImage(background, 200, 500, background.width, background.height, 0, 0, background.width, background.height);
    }
    
    
    thirdCtx.fillStyle = "green";
    thirdCtx.fillRect(player.xpos, player.ypos, player.size, player.size);
    thirdCtx.stroke();
    
    setInterval(update,1000);
    setInterval(enemyMake(circle), 1000);
}
/*Score system*/
function update(){
    player.score += (player.level * 10);
    if(player.score % 100 == 0){
        player.level += 1;
    }
    fourthCtx.clearRect(0, 0, fourthCanvas.width, fourthCanvas.height);
    fourthCtx.font = "30px Trebuchet MS";
    fourthCtx.fillText("Lives: ", 10, 25);
    fourthCtx.fillText(player.lives, 100, 25);
    fourthCtx.fillText("Score: ", 10, 55);
    fourthCtx.fillText(player.score, 100, 55);
    fourthCtx.fillText("Level: ", 10, 85);
    fourthCtx.fillText(player.level, 100, 85);
    
    
}
/*Responsible for moving the player character*/
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        player.dir = -1;
    } else if(event.keyCode == 39) {
        player.dir = 1;
    }
    move();
    player.dir = 0;
});

function move() {
    player.xpos = player.xpos + (player.dir * player.speed);
    thirdCtx.clearRect(0, 0, thirdCanvas.width, thirdCanvas.height);
    thirdCtx.beginPath();
    thirdCtx.fillStyle = "green";
    thirdCtx.fillRect(player.xpos, player.ypos, player.size, player.size);
    thirdCtx.stroke();
    if(player.xpos < (1 - player.size)) {
        player.xpos = thirdCanvas.width;
    } else if(player.xpos > thirdCanvas.width) {
        player.xpos = (1 - player.size);
    }
    if(player.dir == 0) {
        return;
    }
    window.requestAnimationFrame(move);
}
/* Enemy creation and movement*/

function enemyMake(circle) {
    if(circle.y == 0) {
        secondCtx = secondCtx;
        secondCanvas = secondCanvas;
        circle.x = getRandPos();;
    }
    secondCtx.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
    secondCtx.beginPath();
    secondCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        secondCtx.fillStyle = "brown";
    secondCtx.fill()
    secondCtx.stroke();
    circle.y += circle.dir * circle.speed;
    if(circle.y >= (secondCanvas.height - circle.radius)) {
        secondCtx.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
        return;
    }
    window.requestAnimationFrame((function() {
        enemyMake(circle);
    }));
};

function getRandPos() {
    return Math.floor(Math.random() * secondCanvas.width);
}