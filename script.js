var diryP, dirxP, player, speedP, pospx, pospy;
var speedS;
var screenSzW, screenSzH;
var game;
var frames;
var countEnemy, painelcountEnemy, speedE, createTimeEnemy, damageEnemy;
var totalEnemies;
var ashLifePoints, ashLifeBar;
var ie, x, y, z;
var screenMsg, screenGame, screenGame__shadow;


function keyDw() {
    var key = event.keyCode;
    if (key == 38) { //up
        diryP = - 1;
    } else if (key == 40) {//down
        diryP = 1;
    }

    if (key == 37) {//left
        dirxP = - 1;
        player.style.transform = "scaleX(-1)";
    } else if (key == 39) {//right
        dirxP = 1;
        player.style.transform = "scaleX(1)";
    }

    if (key == 32) {//spacebar / shot
        //shot
        shot(pospx + 75, pospy);

    }

}

function keyUp() {
    var key = event.keyCode;
    if ((key == 38) || (key == 40)) { //up
        diryP = 0;
    }
    else if ((key == 37) || (key == 39)) {//left
        dirxP = 0;
    }

}

function createEnemy() {
    if (game) {
        y = 0;
        x = Math.random() * screenSzW;
        var enemy = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");

        att1.value = "enemy";
        att2.value = "top:" + y + "px; left:" + screenDelimiterX(x) + "px;";
        enemy.setAttributeNode(att1);
        enemy.setAttributeNode(att2);

        x = Math.random() * 999;
        if (x >= 450) {
            enemy.style.transform = "scaleX(-1)";
        }

        document.body.appendChild(enemy);
        countEnemy--;


    }
}

function enemyControl() {
    totalEnemies = document.getElementsByClassName("enemy");
    var size = totalEnemies.length;

    for (var i = 0; i < size; i++) {
        if (totalEnemies[i]) {
            var y = totalEnemies[i].offsetTop;
            y += speedE;
            totalEnemies[i].style.top = y + "px";

            if (y > screenSzH) {
                ashLifePoints -= damageEnemy;
                totalEnemies[i].remove();
                //totalEnemies[i].style.left = y + "px";

                document.getElementById("audio3").play();


            }

        }
    }

}

function shot(x, y) {

    var s = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    var pikachuVoices = Math.random() * 999;

    if (pikachuVoices <= 333) {
        document.getElementById("audio0").play();
    } else if ((pikachuVoices >= 334) && (pikachuVoices <= 666)) {
        document.getElementById("audio1").play();
    } else if ((pikachuVoices >= 667) && (pikachuVoices <= 999)) {
        document.getElementById("audio2").play();
    };

    att1.value = "player-shot";
    att2.value = "top:" + y + "px; left:" + x + "px";

    s.setAttributeNode(att1);
    s.setAttributeNode(att2);

    document.body.appendChild(s);

}

function shotControl() {
    var shots = document.getElementsByClassName("player-shot");
    var size = shots.length;

    for (var i = 0; i < size; i++) {
        if (shots[i]) {
            var posShot = shots[i].offsetTop;
            posShot -= speedS;
            shots[i].style.top = posShot + "px";
            collisionShotEnemy(shots[i]);

            if (posShot < 0) {
                //shots[i].remove();
                document.body.removeChild(shots[i]);

            }
        }
    }
}

function collisionShotEnemy(shot) {
    var size = totalEnemies.length;

    for (var i = 0; i < size; i++) {
        if (totalEnemies[i]) {
            if (
                (
                    (shot.offsetTop <= (totalEnemies[i].offsetTop + 50)) && // cima tiro com baixo bomba
                    ((shot.offsetTop + 50) >= (totalEnemies[i].offsetTop))   // baixo tiro com cima bomba
                )
                &&
                (
                    (shot.offsetLeft <= (totalEnemies[i].offsetLeft + 80)) && //esquerda tiro com direita bomba
                    ((shot.offsetLeft + 20) >= (totalEnemies[i].offsetLeft)) //direita tiro com esquerda bomba
                )
            ) {
                createDamageView(1, totalEnemies[i].offsetLeft - 50, totalEnemies[i].offsetTop - 80);
                totalEnemies[i].remove();
                shot.remove();

            }
        }
    }

}

function createDamageView(type, x, y) { // 1 explosion      2 ash-damage
    if (document.getElementById("damage" + (ie - 1))) {
        document.getElementById("damage" + (ie - 1)).remove();
    }
    var explosion = document.createElement("div");
    var image = document.createElement("img");

    //div attr
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    // img attr 
    var att3 = document.createAttribute("src");

    if (type == 1) {
        att1.value = "enemy-explosion";
        att2.value = "top:" + y + "px; left:" + x + "px;";
        att3.value = "./assets/img/explosion2.gif?" + new Date();
    } else {
        att1.value = "ash-damage";
        att2.value = "top:" + (screenSzH - 100) + "px;left:" + (x - 100) + "px;";
        att3.value = "./assets/img/Effect.gif?" + new Date();
    }

    explosion.setAttributeNode(att1);
    explosion.setAttributeNode(att2);
    image.setAttributeNode(att3);
    explosion.appendChild(image);
    document.body.appendChild(explosion);
    document.getElementById("audio5").play();
    ie++;

}

function playerControl() {
    pospy = 500;
    pospx += dirxP * speedP;

    player.style.top = "77vh";
    player.style.left = screenDelimiterX(pospx) + "px";

}

function screenDelimiterX(x) {
    y = window.innerWidth;
    if (x >= y - 115) {
        x = y - 116;
    } else if (pospx <= 0) {
        x = 1;
    }
    return x
}

function gameLoop() {
    if (game) {
        // control functions
        playerControl();
        shotControl();
        enemyControl();
        gameManager();


    }
    frames = requestAnimationFrame(gameLoop);

}

function gameManager() {
    ashLifeBar.style.width = ashLifePoints + "px";

    if (countEnemy <= 0) {
        game = false;
        clearInterval(createTimeEnemy);
        screenMsg.style.backgroundImage = "url('assets/img/pikachuwelldone.gif')";
        screenMsg.style.display = "block";
        screenGame.style.display = "none";
        screenGame__shadow.style.opacity = "0.8";



    } else if (ashLifePoints <= 0) {
        game = false;
        clearInterval(createTimeEnemy);
        screenGame__shadow.style.opacity = "0.8";
        z = document.createAttribute("id");
        z.value = "btn_play";
        screenMsg.setAttributeNode(z);
        screenMsg.style.backgroundImage = "url('assets/img/gameover.png')";
        document.getElementById("btn-again").innerHTML = "Play Again?";
        document.getElementById("btn-again").addEventListener("click", restart);
        screenGame.style.display = "none";
        screenMsg.style.display = "block";
        document.getElementById("btn-play").style.display = "none";
        document.getElementById("btn-ingame-quit").style.display = "none";
        document.getElementById("btn-again").style.display = "block";
        document.getElementById("btn-return").innerHTML = "Back to Home";
        document.getElementById("btn-return").addEventListener("click", toMenu);
        document.getElementById("btn-return").style.display = "block";

        screenGame.style.display = "none";
        screenMsg.style.display = "block";
        document.getElementById(z.value).style.display = "block";


    }
}

function toMenu() {

    if (game) {
        game = false;
        clearInterval(createTimeEnemy);
        document.getElementById("btn-ingame-quit").style.display = "none";
        document.getElementById("screen-game__shadow").style.opacity = "0.8";
        screenGame.style.display = "none";
        screenMsg.style.display = "block";
        document.getElementById("btn-ingame-quit").style.display = "none";
        document.getElementById("btn-return").style.display = "none";
        document.getElementById("btn-return").style.display = "none";
        var titlelistParam = ["main-title__pikachu", "main-title__strikes", "main-title__back"];
        z = 0;
        titlelistParam.forEach(element => {
            element.document.getElementById(titlelistParam[z]).style.display = "block";
            z++;
        });




    } else {

    screenMsg.style.backgroundImage = "url('assets/img/front.gif')";
    z = document.createAttribute("id");
    z.value = "special-border";
    screenMsg.setAttributeNode(z);
 
    document.getElementById("btn-return").style.display = "none";
    document.getElementById("btn-replay").style.display = "none";
    document.getElementById("btn-play").style.display = "block";

    }
}

function restart() {

    totalEnemies = document.getElementsByClassName("enemy");
    var size = totalEnemies.length;

    for (var i = 0; i < size; i++) {
        if (totalEnemies[i]) {
            totalEnemies[i].remove();
        }
    }

    screenMsg.style.display = "none";
    clearInterval(createTimeEnemy);
    cancelAnimationFrame(frames);

    ashLifePoints = 300;
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    player.style.left = pospy + "px";
    player.style.left = pospx + "px";
    countEnemy = 150;
    game = true;
    createTimeEnemy = setInterval(createEnemy, 1700);
    screenGame.style.display = "block";
    screenGame__shadow.style.opacity = "0";
    document.getElementById("btn-return").style.display = "none";
    document.getElementById("btn-ingame-quit").style.display = "block";
    document.getElementById("title-container").style.display = "none";




    gameLoop();

}

function init() {
    game = false;

    //ini sounds
    var audio = document.createElement("div");
    var moduleBuilder, att1, att2, att3;
    const tasks = [
        "assets/audio/pikachu1.mp3", //0
        "assets/audio/pikachu2.mp3", //1
        "assets/audio/pikachu3.mp3", //2
        "assets/audio/spearow.mp3", //3
        "assets/audio/fearow.mp3", //4
        "assets/audio/electricshock.mp3", //5
        "assets/audio/battle.mp3" //6

    ];

    for (var i = 0; i < tasks.length; i++) {
        moduleBuilder = document.createElement("audio");

        att1 = document.createAttribute("class");
        att2 = document.createAttribute("id");
        att3 = document.createAttribute("src");

        att1.value = "video-player";
        att2.value = "audio" + i;
        att3.value = tasks[i];

        moduleBuilder.setAttributeNode(att1);
        moduleBuilder.setAttributeNode(att2);
        moduleBuilder.setAttributeNode(att3);

        audio.appendChild(moduleBuilder);

    };
    document.body.appendChild(audio);

    //ini screen
    screenSzH = window.innerHeight;
    screenSzW = window.innerWidth;
    screenGame = document.getElementById("screen-game");
    screenMsg = document.getElementById("screen-msg");
    screenGame__shadow = document.getElementById("screen-game__shadow");


    // ini player
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    speedP = 20;
    speedS = 10;
    player = document.getElementById("pikachu");
    player.style.top = pospy + "px";
    player.style.left = pospx + "px";

    // ini enemy
    countEnemy = 150;
    speedE = 2;
    damageEnemy = 50;

    // ash
    ashLifePoints = 300;
    ashLifeBar = document.getElementById("ash-lifebar");
    ashLifeBar.style.width = ashLifePoints + "px";

    // explosions and sounds
    ie = isound = 0;

    // views
    game = false;
    screenGame__shadow.style.opacity = "0.8";
    z = document.createAttribute("id");
    z.value = "special-border";
    screenMsg.setAttributeNode(z);
    screenMsg.style.backgroundImage = "url('assets/img/front.gif')";
    document.getElementById("btn-play").innerHTML = "Play!";
    document.getElementById("btn-play").addEventListener("click", restart);
    document.getElementById("btn-ingame-quit").addEventListener("click", toMenu);
    screenGame.style.display = "none";
    screenMsg.style.display = "block";
    document.getElementById("btn-play").style.display = "block";
    screenGame.style.display = "none";
    screenMsg.style.display = "block";
    document.getElementById(z.value).style.display = "block";



}

function mouseOverBtn(type) {
    if (type == 1) {
        screenMsg.style.backgroundImage = "url('./assets/img/gameover-try-confirm.png')";

    }

}





window.addEventListener("load", init);
document.addEventListener("keydown", keyDw);
document.addEventListener("keyup", keyUp);


