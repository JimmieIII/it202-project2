function startEnemy() {
    if(gameOver) {
        return;
    }
    var secondCanvas = document.getElementById("layer2");
    var secondCtx = secondCanvas.getContext("2d");
    var enemyImg = document.getElementById("enemy");
    var numEnemy = Math.floor(player.level * 1.5);
    var enemyArray = new Array(numEnemy);
    for(var i = 0; i < numEnemy; i++) {
        enemyArray[i] = new Enemy;
    }
    animate();
    return;

    function Enemy() {
        this.dir = 1,
        this.radius = 8,
        this.speed = Math.floor(Math.random() * Math.ceil(player.level / 2)) + 1,
        this.y = -50,
        this.x = Math.floor(Math.random() * (secondCanvas.width - 40)) + 25,
        this.height = 40,
        this.width = 40
    }

    function animate() {
        if(gameOver) {
            secondCtx.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
            return;
        }
        for(var i = 0; i < numEnemy; i++) {
            enemyArray[i].y += enemyArray[i].speed;
            if(enemyArray[i].y >= (secondCanvas.height - enemyArray[i].radius - 30)) {
                enemyArray[i] = new Enemy;
            }
            if(player.x < enemyArray[i].x + enemyArray[i].width && player.x + player.width > enemyArray[i].x && player.y < enemyArray[i].y + enemyArray[i].height && player.y + player.height > enemyArray[i].y) {
                delete objHealth;
                player.lives--;
                enemyArray[i] = new Enemy;
            }
        }
        draw();
        numEnemy = Math.floor(player.level * 1.5);
        if(numEnemy > enemyArray.length) {
            for(i = enemyArray.length; i < numEnemy; i++) {
                enemyArray[i] = new Enemy;
            }
        }
        window.requestAnimationFrame(animate);
    }

    function draw() {
        secondCtx.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
        for(var i = 0; i < numEnemy; i++) {
            var enemy = enemyArray[i];
            secondCtx.beginPath();
            secondCtx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
            secondCtx.stroke();
        }
    }
}