var diryP, dirxP, player, speedP, pospx, pospy;
var screenSzW, screenSzH;
var game;
var frames;

function keyDw(){
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
    
    if(key == 32){//spacebar / shoot
        //shot
    
    }

}

function keyUp(){
    var key=event.keyCode;
    if ((key==38) || (key==40)) { //up
        diryP = 0;
    }
    else if((key==37) || (key==39)){//left
        dirxP = 0;
    }

}

function playerControl(){  
   pospy += diryP * speedP;
   pospx += dirxP * speedP;
   player.style.top = pospy + "px";
   player.style.left = pospx + "px";

}

function gameLoop(){
    if(game){
        // control functions
        playerControl()

    }
    frames = requestAnimationFrame(gameLoop);

}

function init(){
    game = true;

    //ini screen
    screenSzH = window.innerHeight;
    screenSzW = window.innerWidth;

    // ini player
    dirxP = diryP = 0;
    pospy = screenSzH / 2;
    pospx = screenSzW / 2;
    speedP = 5;
    player = document.getElementById("pikachu");
    player.style.top = pospy + "px";
    player.style.left = pospx + "px";

    gameLoop();



}

window.addEventListener("load",init);
document.addEventListener("keydown", keyDw);
document.addEventListener("keyup", keyUp);


