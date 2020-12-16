var diryP, dirxP, player, speedP, pospx, pospy;
var speedS;
var screenSzW, screenSzH;
var game;
var frames;
var countEnemy, painelcountEnemy, speedE, createTimeE;
var totalEnemies;
var ashLifePoints;
var ie, isound;


function keyDw() {
    var key=event.keyCode;
    if (key==38) { //up
        diryP =- 1;
    }else if(key==40){//down
        diryP = 1;
    }

    if(key==37){//left
        dirxP =- 1;
        player.style.transform = "scaleX(-1)";
    }else if(key==39){//right
        dirxP = 1;
        player.style.transform = "scaleX(1)";
    }
    
    if(key == 32){//spacebar / shot
        //shot
        shot(pospx + 75 , pospy);
    
    }

}

function keyUp() {
    var key=event.keyCode;
    if ((key==38) || (key==40)) { //up
        diryP = 0;
    }
    else if((key==37) || (key==39)){//left
        dirxP = 0;
    }

}

function createEnemy() {
    if (game) {
        var y = 0;
        var x = Math.random()*screenSzW;
        var enemy = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");
        var z = Math.random()*999;


        att1.value = "enemy";
        att2.value = "top:" + y + "px; left:" + x + "px;";
        enemy.setAttributeNode(att1);
        enemy.setAttributeNode(att2);


        if (z >= 499) {
            enemy.style.transform = "scaleX(-1)";
        }
        

        document.body.appendChild(enemy);
        countEnemy--;

    }
}

function enemyControl() {
    totalEnemies = document.getElementsByClassName("enemy");
    var size = totalEnemies.length;

    for(var i = 0;i < size; i++){
        if (totalEnemies[i]){
            var pi = totalEnemies[i].offsetTop;
            pi += speedE;
            totalEnemies[i].style.top = pi + "px";

            if (pi > screenSzH) {
                ashLifePoints -= 15;
                totalEnemies[i].remove();

            }


        }
    }

}

function shot(x, y) {

    var s = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    var pikachuVoices = Math.random()*999;

    if (pikachuVoices <= 333) {
        document.getElementById("voices-pikachu-01").play();

    } else if ((pikachuVoices >= 334) && (pikachuVoices <= 666)) {
        document.getElementById("voices-pikachu-02").play();

    } else if ((pikachuVoices >= 667) && (pikachuVoices <= 999)) {
        document.getElementById("voices-pikachu-03").play();

    }
   
    att1.value = "shotP";
    att2.value = "top:" + y + "px; left:" + x + "px";
   
    s.setAttributeNode(att1);
    s.setAttributeNode(att2);



    document.body.appendChild(s);
    
}

function shotControl () {

    var shots = document.getElementsByClassName("shotP");
    var size = shots.length;


    for (var i = 0; i < size; i++) {
        if(shots[i]) {
            var posShot = shots[i].offsetTop;
            posShot -= speedS;
            shots[i].style.top = posShot + "px";

            collisionShotEnemy(shots[i]);

            if (posShot < 0){
                //shots[i].remove();
                document.body.removeChild(shots[i]);


            }
        }

    }



}

function collisionShotEnemy(shot) {
    var size = totalEnemies.length;

    for (var i = 0; i < size; i++) {
        if(totalEnemies[i]) {
            if(
                (
                    (shot.offsetTop <= (totalEnemies[i].offsetTop + 50)) && // cima tiro com baixo bomba
                    ((shot.offsetTop+50) >= (totalEnemies[i].offsetTop))   // baixo tiro com cima bomba
                )
                &&
                (
                    (shot.offsetLeft <= (totalEnemies[i].offsetLeft + 80)) && //esquerda tiro com direita bomba
                    ((shot.offsetLeft+20) >= (totalEnemies[i].offsetLeft)) //direita tiro com esquerda bomba
                )
            ){
                createDamageView(1, totalEnemies[i].offsetLeft-50, totalEnemies[i].offsetTop-80);
                totalEnemies[i].remove();
                shot.remove();

            }
        }
    }


}

function createDamageView(type, x, y) { // 1 explosion      2 ashDamage
    if (document.getElementById("damage" + (ie - 1))) {
        document.getElementById("damage" + (ie - 1)).remove();
    }
    var explosion = document.createElement("div");
    var image = document.createElement("img");
    var sound = document.createElement("audio");

    //div attr
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    var att3 = document.createAttribute("id");

    // img attr 
    var att4 = document.createAttribute("src");


    //audio attr 
    var att5 = document.createAttribute("src");
    var att6 = document.createAttribute("id");

    att3.value="damage" + ie;

    if (type == 1){
        att1.value="explosionEnemy";
        att2.value="top:" + y + "px; left:" + x + "px;";
        att4.value= "./assets/img/explosion2.gif?"+new Date();
    } else {
        att1.value="ashDamage";
        att2.value="top:" + (screenSzH-100) + "px;left:" + (x-100) + "px;";
        att4.value= "./assets/img/Effect.gif?"+new Date();
    }

    att5.value = "./assets/audio/electricshock.mp3?"+new Date();
    att6.value = "sound" + isound;
   
    explosion.setAttributeNode(att1);
    explosion.setAttributeNode(att2);
    explosion.setAttributeNode(att3);
    image.setAttributeNode(att4);
    sound.setAttributeNode(att5);
    sound.setAttributeNode(att6);
    explosion.appendChild(image);
    explosion.appendChild(sound);
    document.body.appendChild(explosion);
    document.getElementById("sound" + isound).play();

    
   
    

    ie++;
    isound++;



}




function playerControl() {  
   pospy = 500;
   pospx += dirxP * speedP;
   player.style.top = pospy + "px";
   player.style.left = pospx + "px";


}

function gameLoop() {
    if(game){
        // control functions
        playerControl();
        shotControl();
        enemyControl();


    }
    frames = requestAnimationFrame(gameLoop);

}

function init() {
    game = true;

    //ini screen
    screenSzH = window.innerHeight;
    screenSzW = window.innerWidth;

    // ini player
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    speedP = 10;
    speedS = 10;
    player = document.getElementById("pikachu");
    player.style.top = pospy + "px";
    player.style.left = pospx + "px";

    // ini enemy
    clearInterval(createTimeE);
    countEnemy = 150;
    speedE = 2;
    createTimeE = setInterval(createEnemy, 1700);

    // ash
    ashLifePoints = 300;

    // explosions and sounds
    ie=isound=0;



    gameLoop();



}


window.addEventListener("load",init);
document.addEventListener("keydown", keyDw);
document.addEventListener("keyup", keyUp);


