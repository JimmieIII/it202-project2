/*Player Set-up*/
var thirdCanvas = document.getElementById("layer3");
var thirdCtx = thirdCanvas.getContext("2d");
var benefitCanvas = document.getElementById("layer5");
var benefitCtx = benefitCanvas.getContext("2d");
var playerImg = document.getElementById("player");
var benefitImg = document.getElementById("canteen");
var gameOver = false;
var player = {
    dir: 0,
    size: 25,
    x: 225,
    y: 425,
    speed: 5,
    score: 0,
    lives: 3,
    level: 1,
    width: 40,
    height: 40
};
/*Responsible for moving the player character*/
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        player.dir = -1;
    } else if(event.keyCode == 39) {
        player.dir = 1;
    }
});
document.addEventListener('keyup', function(event) {
    if(event.keyCode != 37 || event.keyCode != 39) {
        player.dir = 0;
    }
});
setTimeout(function move() {
    if(gameOver) {
        thirdCtx.clearRect(0, 0, thirdCanvas.width, thirdCanvas.height);
        return;
    }
    player.x += (player.dir * player.speed);
    thirdCtx.clearRect(0, 0, thirdCanvas.width, thirdCanvas.height);
    thirdCtx.beginPath();
    thirdCtx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    thirdCtx.stroke();
    if(player.x < (1 - player.size)) {
        player.x = thirdCanvas.width;
    } else if(player.x > thirdCanvas.width) {
        player.x = (1 - player.size);
    }
    window.requestAnimationFrame(move);
}, 1000);
/* Benefit Object*/

function benefit() {
    this.x = Math.floor(Math.random() * (benefitCanvas.width - 25)) + 25,
    this.y = -50,
    this.width = 25,
    this.height = 25
}
var objHealth = new benefit();
var nTimes = -1;
callDraw();

function drawBenefit() {
    benefitCtx.clearRect(0, 0, benefitCanvas.width, benefitCanvas.height);
    if(objHealth.y >= (benefitCanvas.height - 30)) {
        return;
    }
    if(player.x < objHealth.x + objHealth.width && player.x + player.width > objHealth.x && player.y < objHealth.y + objHealth.height && player.y + player.height > objHealth.y) {
        delete objHealth;
        player.lives++;
        return;
    }
    if(gameOver) {
        return;
    }
    objHealth.y += 1;
    benefitCtx.beginPath();
    benefitCtx.drawImage(benefitImg, objHealth.x, objHealth.y, objHealth.width, objHealth.height);
    benefitCtx.stroke();
    window.requestAnimationFrame(drawBenefit);
};

function callDraw() {
    objHealth = new benefit;
    drawBenefit();
    if(gameOver) {
        return;
    }
    nTimes++;
    setTimeout(callDraw, 15000 * nTimes);
}
/*Other script files*/
$.getScript("/it202-project2/script/background.js", function() {
    startBackground();
});
$.getScript("/it202-project2/script/enemy.js", function() {
    startEnemy();
});