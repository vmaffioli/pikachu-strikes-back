var diryP, dirxP, player, speedP, pospx, pospy;
var speedS;
var screenSzW, screenSzH;
var game;
var frames;
var countEnemy, painelcountEnemy, speedE, createTimeEnemy, damageEnemy;
var totalEnemies;
var ashLifePoints, ashLifeBar, ashEnergyBar;
var ie, x, y, z, idir;
var screenMsg, screenGame, screenGame__shadow;
var titlesMainParam, titlesGameoverParam;
var shockwaveTimer = 0;



function keyDw() {
    var key = event.keyCode;
    if (key == 38) { //up
        diryP = - 1;
    } else if (key == 40) {//down
        createShockWave();
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
        shot(pospx + 40, pospy + 40);

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
            var x = totalEnemies[i].offsetLeft;



            if (x < player.offsetLeft) {
                totalEnemies[i].style.transform = "scaleX(-1)";
            } else if (x > player.offsetLeft) {
                totalEnemies[i].style.transform = "scaleX(1)";
            }



            if (y > screenSzH / 3) {
                if (x < player.offsetLeft - 20) {
                    y += speedE;
                    x += speedE;
                    totalEnemies[i].style.left = x + "px";
                    totalEnemies[i].style.top = y + "px";
                } else if (x > player.offsetLeft + 20) {
                    y += speedE;
                    x -= speedE;
                    totalEnemies[i].style.left = x + "px";
                    totalEnemies[i].style.top = y + "px";
                } else {
                    y += speedE + 5;
                    totalEnemies[i].style.top = y + "px";
                }
            } else {
                y += speedE;
                totalEnemies[i].style.top = y + "px";
            }

            if (y > screenSzH) {
                //ashLifePoints -= damageEnemy;
                totalEnemies[i].remove();
                //totalEnemies[i].style.left = y + "px";

            } else {
                if (
                    ( // damage contact
                        (player.offsetTop <= (totalEnemies[i].offsetTop + 20)) && // cima tiro com baixo bomba
                        ((player.offsetTop + 80) >= (totalEnemies[i].offsetTop))   // baixo tiro com cima bomba
                    )
                    &&
                    (
                        (player.offsetLeft <= (totalEnemies[i].offsetLeft + 20)) && //esquerda tiro com direita bomba
                        ((player.offsetLeft + 20) >= (totalEnemies[i].offsetLeft)) //direita tiro com esquerda bomba
                    )
                ) {
                    createDamageView(2, player.offsetLeft - 140, player.offsetTop - 150);
                    totalEnemies[i].remove();
                    ashLifePoints -= 100;
                    document.getElementById("audio3").play();



                }
            }


        }
    }
}

function createShockWave() {

    var sw = document.createElement("pikachu");
    var image = document.createElement("img");
    var att1 = document.createAttribute("id");
    var att2 = document.createAttribute("style");
    var att3 = document.createAttribute("src");
    var att4 = document.createAttribute("style");
    var shockpy = player.offsetTop - 100;
    var shockpx = player.offsetLeft - 110;
    var pikachuVoices = Math.random() * 999;

    document.getElementById("audio5").play();

    if (pikachuVoices <= 333) {
        document.getElementById("audio0").play();
    } else if ((pikachuVoices >= 334) && (pikachuVoices <= 666)) {
        document.getElementById("audio1").play();
    } else if ((pikachuVoices >= 667) && (pikachuVoices <= 999)) {
        document.getElementById("audio2").play();
    };

    att1.value = "player-shockwave";
    att2.value = "top:" + shockpy + "px; left:" + shockpx
        + "px;";
    att3.value = "./assets/img/shockwave.gif?" + new Date();
    att4.value = "  height: 300px; width: 300px; border-radius = 50%;";

    sw.setAttributeNode(att1);
    sw.setAttributeNode(att2);
    image.setAttributeNode(att3);
    image.setAttributeNode(att4);
    sw.appendChild(image);
    document.body.appendChild(sw);
    setTimeout(function () { sw.remove(); }, 1200);


}

function shockwaveControl() {
    var wave = document.getElementById("player-shockwave");

    if (wave) {

        collisionShockwaveEnemy(wave);
        speedP = 0;


    } else {
        speedP = 20;
    }

}



function collisionShockwaveEnemy(wave) {
    var size = totalEnemies.length;

    for (var i = 0; i < size; i++) {
        if (totalEnemies[i]) {
            if (
                (
                    ((player.offsetTop - 100) <= (totalEnemies[i].offsetTop + 44)) && // cima shockwave com baixo enemy
                    ((player.offsetTop + 57) >= (totalEnemies[i].offsetTop))   // baixo shockwave com cima enemy
                )
                &&
                (
                    ((player.offsetLeft - 100) <= (totalEnemies[i].offsetLeft + 44)) && //esquerda shockwave com direita enemy
                    ((player.offsetLeft + 57) >= (totalEnemies[i].offsetLeft)) //direita shockwave com esquerda enemy
                )
            ) {
                createDamageView(1, totalEnemies[i].offsetLeft - 50, totalEnemies[i].offsetTop - 80);
                totalEnemies[i].remove();

            }
        }
    }

}


function shot(posx, posy) {

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
    att2.value = "top:" + posy + "px; left:" + posx + "px";

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
                    (shot.offsetTop <= (totalEnemies[i].offsetTop + 44)) && // cima tiro com baixo bomba
                    ((shot.offsetTop + 75) >= (totalEnemies[i].offsetTop))   // baixo tiro com cima bomba
                )
                &&
                (
                    (shot.offsetLeft <= (totalEnemies[i].offsetLeft + 57)) && //esquerda tiro com direita bomba
                    ((shot.offsetLeft + 19) >= (totalEnemies[i].offsetLeft)) //direita tiro com esquerda bomba
                )
            ) {
                createDamageView(1, totalEnemies[i].offsetLeft - 50, totalEnemies[i].offsetTop - 80);
                totalEnemies[i].remove();
                shot.remove();

            }
        }
    }

}

function createDamageView(t, x, y) { // 1 explosion      2 pikachu-damage

    var damage = document.createElement("div");
    var image = document.createElement("img");
    var random = Math.random();

    //div attr
    var att0 = document.createAttribute("id");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    // img attr 
    var att3 = document.createAttribute("src");


    if (t === 1) {
        att0.value = "explosion" + random;
        att1.value = "enemy-explosion";
        att2.value = "top:" + y + "px; left:" + x + "px;";
        att3.value = "./assets/img/explosion.gif?" + new Date();
        document.getElementById("audio5").play();
    } else if (t === 2) {
        att0.value = "hit" + random;
        att1.value = "pikachu-hit";
        att2.value = "top:" + y + "px; left:" + x + "px;";
        att3.value = "./assets/img/hitpikachublood.gif?" + new Date();
        document.getElementById("audio7").play();


    }

    damage.setAttributeNode(att0);
    damage.setAttributeNode(att1);
    damage.setAttributeNode(att2);
    image.setAttributeNode(att3);
    damage.appendChild(image);
    document.body.appendChild(damage);
    ie++;
    setTimeout(
        function () {
            document.getElementById(att0.value).remove();
        }
        , 1500);


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
        shockwaveControl();
        enemyControl();
        gameManager();


    }
    frames = requestAnimationFrame(gameLoop);

}

function createEnemyShooter() {
    if (game) {
        y = 0;
        x = Math.random() * screenSzW;
        var enemy = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");

        att1.value = "enemy";
        att2.value = "bottom:" + y + "px; left:" + player.offsetLeft + "px;";
        enemy.setAttributeNode(att1);
        enemy.setAttributeNode(att2);



        document.body.appendChild(enemy);
        countEnemy--;


    }
}

function gameManager() {
    ashLifeBar.style.width = ashLifePoints + "px";

    if (countEnemy <= 0) {
        //game = false;
        clearInterval(createTimeEnemy);

        //screenGame__shadow.style.opacity = "0.2";
        //screenMsg.style.display = "block";
        //screenGame.style.display = "none";
        screenGame__shadow.style.opacity = "0.3";



    } else if (ashLifePoints <= 0) {
        game = false;
        clearInterval(createTimeEnemy);
        screenGame__shadow.style.opacity = "0.8";
        z = document.createAttribute("id");
        z.value = "btn_play";
        screenMsg.setAttributeNode(z);
        screenMsg.style.backgroundImage = "";
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

        titleControl("gameover");


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
        element.document.getElementById("title-container").style.display = "block";
        titleControl("main");

    } else {
        screenMsg.style.backgroundImage = "url('assets/img/front.gif')";
        z = document.createAttribute("id");
        z.value = "special-border";
        screenMsg.setAttributeNode(z);
        document.getElementById("btn-return").style.display = "none";
        document.getElementById("btn-again").style.display = "none";
        document.getElementById("btn-play").style.display = "block";
        titleControl("main");

    }
}

function restart() {

    clearInterval(createTimeEnemy);
    cancelAnimationFrame(frames);
    totalEnemies = document.getElementsByClassName("enemy");
    var size = totalEnemies.length;

    for (var i = 0; i <= size; i++) {
        if (totalEnemies[i]) {
            totalEnemies[i].remove();
        }
    }

    screenMsg.style.display = "none";


    ashLifePoints = 300;
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    player.style.bottom = pospy + "px";
    player.style.left = pospx + "px";
    countEnemy = 100;
    speedE = 3;
    screenSzH = window.innerHeight;
    screenSzW = window.innerWidth;
    game = true;
    createTimeEnemy = setInterval(createEnemy, 1500);
    screenGame.style.display = "block";
    screenGame__shadow.style.opacity = "0";
    document.getElementById("btn-return").style.display = "none";
    document.getElementById("btn-ingame-quit").style.display = "block";




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
        "assets/audio/battle.mp3", //6
        "assets/audio/physicalhit.mp3" //7

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
    ashEnergyBar = document.getElementById("ash-energybar");
    ashEnergyBar.style.width = ashLifePoints + "px";


    // explosions and sounds
    ie = isound = 0;

    // views
    game = false;
    screenGame__shadow.style.opacity = "0.8";

    titlesMainParam = [
        ["main-title__top", "Pikachu", "#f6bd20", "-20%", "0", "100px"],
        ["main-title__middle", "Strikes", "#c52018", "-5%", "0", "120px"],
        ["main-title__bottom", "Back!!!", "#c52018", "20%", "-8%", "120px"]];
    titlesGameoverParam = [
        ["main-title__top", "GAME OVER!!!", "#c52018", "-20%", "18%", "100px"],
        ["main-title__middle", "Your Score:", "#f6bd20", "15%", "18%", "90px"],
        ["main-title__bottom", "12385", "#f6bd20", "35%", "18%", "90px"]];

    titleControl("main");


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


function titleControl(type) {
    if (type === "main") {
        for (var i = 0; i <= 2; i++) {
            document.getElementById(titlesMainParam[i][0]).innerHTML = titlesMainParam[i][1];
            document.getElementById(titlesMainParam[i][0]).style.color = titlesMainParam[i][2];
            document.getElementById(titlesMainParam[i][0]).style.top = titlesMainParam[i][3];
            document.getElementById(titlesMainParam[i][0]).style.right = titlesMainParam[i][4];
            document.getElementById(titlesMainParam[i][0]).style.fontSize = titlesMainParam[i][5];

        };

    } else if (type === "gameover") {
        for (var i = 0; i <= 2; i++) {
            document.getElementById(titlesGameoverParam[i][0]).innerHTML = titlesGameoverParam[i][1];
            document.getElementById(titlesGameoverParam[i][0]).style.color = titlesGameoverParam[i][2];
            document.getElementById(titlesGameoverParam[i][0]).style.top = titlesGameoverParam[i][3];
            document.getElementById(titlesGameoverParam[i][0]).style.right = titlesGameoverParam[i][4];
            document.getElementById(titlesGameoverParam[i][0]).style.fontSize = titlesGameoverParam[i][5];
        };
    }

}


window.addEventListener("load", init);
document.addEventListener("keydown", keyDw);
document.addEventListener("keyup", keyUp);

