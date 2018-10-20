/* Background Set-up*/
var canvas = document.getElementById("layer1");
var ctx = canvas.getContext("2d");
var fourthCanvas = document.getElementById("layer4");
var fourthCtx = fourthCanvas.getContext("2d");
var badCtx = fourthCanvas.getContext("2d");

function startBackground() {
    /* Page Setup*/
    var background = new Image();
    background.src = "/it202-project2/img/background.png";
    background.onload = function() {
        ctx.drawImage(background, 200, 500, background.width, background.height, 0, 0, background.width, background.height);
    }
}
/*Score system*/
setInterval(function() {
    if(player.lives > 0) {
        player.score += player.level;
        if((player.score % 500) == 0) {
            player.level += 1;
        };
        fourthCtx.clearRect(0, 0, fourthCanvas.width, fourthCanvas.height);
        fourthCtx.font = "30px Trebuchet MS";
        fourthCtx.fillText("Lives: ", 10, 25);
        fourthCtx.fillText(player.lives, 100, 25);
        fourthCtx.fillText("Score: ", 10, 55);
        fourthCtx.fillText(player.score, 100, 55);
        fourthCtx.fillText("Level: ", 10, 85);
        fourthCtx.fillText(player.level, 100, 85);
    } else {
        fourthCtx.clearRect(0, 0, fourthCanvas.width, fourthCanvas.height);
        fourthCtx.font = "30px Trebuchet MS";
        fourthCtx.fillText("Lives: ", 10, 25);
        fourthCtx.fillText(player.lives, 100, 25);
        fourthCtx.fillText("Score: ", 10, 55);
        fourthCtx.fillText(player.score, 100, 55);
        fourthCtx.fillText("Level: ", 10, 85);
        fourthCtx.fillText(player.level, 100, 85);
        player.lives = 0;
        gameOver = true;
        fourthCtx.font = "90px Trebuchet MS";
        fourthCtx.fillText("GAME OVER", 0, fourthCanvas.height / 2);
    }
}, 50)