const market_canva = document.getElementById("market_canvas");
const ctx = market_canva.getContext('2d');
const CANVAS_HEIGHT = market_canva.height = 300;
const CANVAS_WIDTH = market_canva.width = 300;

const epicsword = new Image();
epicsword.src = 'epic_sword.png';
const dirtyIceCream = new Image();
dirtyIceCream.src ='dirtyIceCream.png';
const spriteWidth = 256;
const spriteHeight = 256;
let framex = 0;
let framey = 0;
let gameframe = 0;
const staggerframes = 5; 
let x = 0;// Change this value to adjust the animation speed


function drawSwordAnimation() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(epicsword,framex*spriteWidth-30,framey*spriteHeight-10,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    if (gameframe % staggerframes === 0) {
        if (framex < 12) framex++;
        else {
            framex = 0;
            }
    }
    gameframe++;
    requestAnimationFrame(drawSwordAnimation);

}

function drawDirtyIceCreamAnimation() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(dirtyIceCream,framex*spriteWidth-30,framey*spriteHeight-30,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);


}

