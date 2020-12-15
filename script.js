var diryP, dirxP, player, speedP, pospx, pospy;
var speedS;
var screenSzW, screenSzH;
var game;
var frames;
var countBombs, painelCountBombs, speedB, createTimeB;
var totalBombs;
var ashLifePoints;

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

function createBomb() {
    if (game) {
        var y = 0;
        var x = Math.random()*screenSzW;
        var bomb = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");

        att1.value = "bomb";
        att2.value = "top:" + y + "px; left:" + x + "px;";
        bomb.setAttributeNode(att1);
        bomb.setAttributeNode(att2);

        document.body.appendChild(bomb);
        countBombs--;

    }
}

function bombControl() {
    totalBombs = document.getElementsByClassName("bomb");
    var size = totalBombs.length;

    for(var i = 0;i < size; i++){
        if (totalBombs[i]){
            var pi = totalBombs[i].offsetTop;
            pi += speedB;
            totalBombs[i].style.top = pi + "px";

            if (pi > screenSzH) {
                ashLifePoints -= 15;
                totalBombs[i].remove();

            }


        }
    }

}

function shot(x, y) {
    var s = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");

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
            if (posShot < 0){
                //shots[i].remove();
                document.body.removeChild(shots[i]);

            }
        }

    }

}

function playerControl() {  
   pospy += diryP * speedP;
   pospx += dirxP * speedP;
   player.style.top = pospy + "px";
   player.style.left = pospx + "px";

}

function gameLoop() {
    if(game){
        // control functions
        playerControl();
        shotControl();
        bombControl();

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
    speedP = 5;
    speedS = 5;
    player = document.getElementById("pikachu");
    player.style.top = pospy + "px";
    player.style.left = pospx + "px";

    // ini bomb
    clearInterval(createTimeB);
    countBombs = 150;
    speedB = 3;
    createTimeB = setInterval(createBomb, 1700);

    // ash
    ashLifePoints = 300;


    gameLoop();



}

window.addEventListener("load",init);
document.addEventListener("keydown", keyDw);
document.addEventListener("keyup", keyUp);


