var diryP, dirxP, player, pospx, pospy;
var speedS, speedE, speedP; 
var screenSzW, screenSzH;
var game;
var frames;
var countEnemy, painelcountEnemy, createTimeEnemy, damageEnemy, createEnemyInterval, totalEnemies;
var pikachuLifePoints, pikachuLifeBar, pikachuEnergyPoints, pikachuEnergyBar, pikachuEnergyRegen;
var ie, x, y, z, iii;
var screenMsg, screenGame, screenGame__shadow;
var titlesMainParam, titlesGameoverParam;
var shockwaveCooldown ;
var points;


function keyDw() {
    var key = event.keyCode;
    if (key == 38) { //up
        diryP = - 1;
    } else if (key == 40) {//down
        if (!(shockwaveCooldown) && (pikachuEnergyPoints >= 100)) {
            createShockWave();
        } else if ((pikachuEnergyPoints < 100) || (shockwaveCooldown)) {
            document.getElementById("audio9").play();
        }
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

    if ((key == 37) || (key == 39)) { //up
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

            var random = Math.floor(Math.random() * 8);
            if (random < 2) { random = 3 };



            if (x < player.offsetLeft) {
                totalEnemies[i].style.transform = "scaleX(-1)";
            } else if (x > player.offsetLeft) {
                totalEnemies[i].style.transform = "scaleX(1)";
            }

            if (y > screenSzH / random) {
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
                //pikachuLifePoints -= damageEnemy;
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
                    pikachuLifePoints -= 100;

                    document.getElementById("audio3").play();



                }
            }


        }
    }
}

function createShockWave() {

    var sw = document.createElement("pikachu");
    var image = document.createElement("img");
    var image2 = document.createElement("img");
    var att1 = document.createAttribute("id");
    var att2 = document.createAttribute("style");
    var att3 = document.createAttribute("src");
    var att5 = document.createAttribute("id");
    var att6 = document.createAttribute("style");
    var att7 = document.createAttribute("src");
    var att4 = document.createAttribute("style");
    var shockpy = player.offsetTop - 100;
    var shockpx = player.offsetLeft - 110;
    var pikachuVoices = Math.random() * 999;

    if (pikachuVoices <= 333) {
        document.getElementById("audio0").play();
    } else if ((pikachuVoices >= 334) && (pikachuVoices <= 666)) {
        document.getElementById("audio1").play();
    } else if ((pikachuVoices >= 667) && (pikachuVoices <= 999)) {
        document.getElementById("audio2").play();
    };

    document.getElementById("audio8").play();

    att1.value = "player-shockwave";
    att2.value = "top:" + shockpy + "px; left:" + shockpx
        + "px;";
    att3.value = "./assets/img/shockwave.gif?" + new Date();
    att4.value = "  height: 300px; width: 300px; border-radius: 50%;";
    att5.value = "player-shockwave__thunder";
    att6.value = "top:" + 0 + "px; left:" + (shockpx + 70)
        + "px; height: 100vh;";
    att7.value = "./assets/img/thunder.gif?" + new Date();

    sw.setAttributeNode(att1);
    sw.setAttributeNode(att2);
    image.setAttributeNode(att3);
    image.setAttributeNode(att4);
    image2.setAttributeNode(att5);
    image2.setAttributeNode(att6);
    image2.setAttributeNode(att7);
    sw.appendChild(image);
    document.body.appendChild(image2);
    document.body.appendChild(sw);

    setTimeout(function () { sw.remove(); }, 1200);
    setTimeout(function () { image2.remove(); }, 700);
    shockwaveCooldown = true;
    setTimeout(function () { shockwaveCooldown = false; }, 5000)
    pikachuEnergyPoints -= 100;

}

function shockwaveControl() {
    var wave = document.getElementById("player-shockwave");

    if (wave) {
        collisionShockwaveEnemy(wave);
        speedP = 0;
        setTimeout(function () { speedP = 8; }, 1200)
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
                    ((player.offsetLeft + 100) >= (totalEnemies[i].offsetLeft)) //direita shockwave com esquerda enemy
                )
                ||
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
                    (shot.offsetTop <= (totalEnemies[i].offsetTop + 44)) && // cima tiro com baixo enemy
                    ((shot.offsetTop + 75) >= (totalEnemies[i].offsetTop))   // baixo tiro com cima enemy
                )
                &&
                (
                    (shot.offsetLeft <= (totalEnemies[i].offsetLeft + 100)) && //esquerda tiro com direita enemy
                    ((shot.offsetLeft + 10) >= (totalEnemies[i].offsetLeft)) //direita tiro com esquerda enemy
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
        att3.value = "./assets/img/explosion.gif?" + iii;
        document.getElementById("audio5").play();
        iii++;
        points += 100;

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


function gameManager() {
    //life&energy bar control
    pikachuLifeBar.style.width = pikachuLifePoints + "px";

    if (pikachuEnergyPoints > 300) {
        pikachuEnergyPoints = 300;
    }
    pikachuEnergyBar.style.width = pikachuEnergyPoints + "px";

    if (game) {
        document.getElementById("instructions").style.display = "none";
    }     

    // respawn enemies rules
    if ((countEnemy == 190) || (countEnemy == 170) || (countEnemy == 120) || (countEnemy == 60)) {
        speedE++
        countEnemy--;

        clearInterval(createTimeEnemy);
        createEnemyInterval = createEnemyInterval - 300;
        createTimeEnemy = setInterval(createEnemy, createEnemyInterval);
    }

    var bossExists = document.getElementById("boss");
    if (countEnemy > 10000) { //call boss
        clearInterval(createTimeEnemy);
        if (!(bossExists)) {
            createBoss();
        }
    }

    // win&lose rules
    if (countEnemy < 0) {
        document.getElementById("audio6").pause();

        game = false;
        player.style.display = "block";

        clearInterval(createTimeEnemy);
        screenGame__shadow.style.opacity = "0.2";
        screenMsg.style.display = "block";
        screenGame.style.display = "none";
        screenGame__shadow.style.opacity = "0.3";
        var ps = points.toString();

        titlesGameoverParam = [
            ["main-title__top", "YOU WINS!!!", "#c52018", "-20%", "18%", "100px"],
            ["main-title__middle", "Your Score:", "#f6bd20", "15%", "18%", "90px"],
            ["main-title__bottom", ps + " points.", "#f6bd20", "35%", "18%", "90px"]];

        titleControl("gameover");

    } else if (pikachuLifePoints <= 0) {
        document.getElementById("audio6").pause();
        player.style.display = "block";
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
        var ps = points.toString();
        titlesGameoverParam = [
            ["main-title__top", "GAME OVER!!!", "#c52018", "-20%", "18%", "100px"],
            ["main-title__middle", "Your Score:", "#f6bd20", "15%", "18%", "90px"],
            ["main-title__bottom", ps + " points.", "#f6bd20", "35%", "18%", "90px"]]; 
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
    var boss = document.getElementById("boss");

    for (var i = 0; i <= size; i++) {
        if (totalEnemies[i]) {
            totalEnemies[i].remove();
        }
    }

    screenMsg.style.display = "none";
    pikachuLifePoints = 300;
    pikachuEnergyPoints = 300;
    pikachuEnergyRegen = setInterval(function () { pikachuEnergyPoints += 10 }, 2000);
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    player.style.bottom = pospy + "px";
    player.style.left = pospx + "px";
    countEnemy = 200;
    iii = 0;
    points = 0;
    speedE = 3;
    screenSzH = window.innerHeight;
    screenSzW = window.innerWidth;
    createEnemyInterval = 1500;
    document.getElementById("instructions").style.display = "block";
    document.getElementById("audio6").play();
    document.getElementById("audio6").volume = 0.1;
    setTimeout(
        function () {
            player.style.display = "block";
            createTimeEnemy = setInterval(createEnemy, createEnemyInterval);
            screenGame.style.display = "block";
            screenGame__shadow.style.opacity = "0";
            document.getElementById("btn-return").style.display = "none";
            document.getElementById("btn-ingame-quit").style.display = "block";
        
            game = true;
        }
        , 5000);

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
        "assets/audio/physicalhit.mp3", //7
        "assets/audio/thundercrack.mp3", //8
        "assets/audio/noenergy.mp3" //9

    ];

    for (var i = 0; i < tasks.length; i++) {
        moduleBuilder = document.createElement("audio");
        att1 = document.createAttribute("class");
        att2 = document.createAttribute("id");
        att3 = document.createAttribute("src");
        att4 = document.createAttribute("true");
        att1.value = "audio-player";
        att2.value = "audio" + i;
        att3.value = tasks[i];
        att4.value = "true"
        moduleBuilder.setAttributeNode(att1);
        moduleBuilder.setAttributeNode(att2);
        moduleBuilder.setAttributeNode(att3);
        moduleBuilder.setAttributeNode(att4);
        audio.appendChild(moduleBuilder);

    };
    document.body.appendChild(audio);

    //ini screen
    screenSzH = window.innerHeight;
    screenSzW = window.innerWidth;
    screenGame = document.getElementById("screen-game");
    screenMsg = document.getElementById("screen-msg");
    screenGame__shadow = document.getElementById("screen-game__shadow");
    document.getElementById("instructions").style.display = "none";

    // ini player
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    speedP = 8;
    speedS = 20;
    player = document.getElementById("pikachu");
    player.style.top = pospy + "px";
    player.style.left = pospx + "px";

    // ini enemy
    countEnemy = 200;
    speedE = 2;
    damageEnemy = 50;
    iii = 0;

    // ash
    pikachuLifePoints = 300;
    pikachuEnergyPoints = 300;
    pikachuLifeBar = document.getElementById("pikachu-lifebar");
    pikachuLifeBar.style.width = pikachuLifePoints + "px";
    pikachuEnergyBar = document.getElementById("pikachu-energybar");
    pikachuEnergyBar.style.width = pikachuEnergyPoints + "px";

    // explosions and sounds
    ie = isound = 0;

    // views
    game = false;
    screenGame__shadow.style.opacity = "0.8";

    titlesMainParam = [
        ["main-title__top", "Pikachu", "#f6bd20", "-20%", "1vw", "100px"],
        ["main-title__middle", "Strikes", "#c52018", "-5%", "1vw", "120px"],
        ["main-title__bottom", "Back!!!", "#c52018", "20%", "-8vw", "120px"]];

    titlesGameoverParam = [
        ["main-title__top", "GAME OVER!!!", "#c52018", "-20%", "18%", "100px"],
        ["main-title__middle", "Your Score:", "#f6bd20", "15%", "18%", "90px"],
        ["main-title__bottom", "", "#f6bd20", "35%", "18%", "90px"]];

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

