const canvasTitan = document.getElementById('titanCanvas');
const ctxTitan = canvasTitan.getContext('2d');
const CANVAS_WIDTH_TITAN = canvasTitan.width = 600;
const CANVAS_HEIGHT_TITAN = canvasTitan.height = 600;
let gameframetitan = 0;
let framexTitan = 0;

/////////////////////////////////
//Player Attributes
import * as clicker from './clicker.js'

const finalDamage = clicker.playerDmg * (1 + clicker.strength_stat_multi)


// Worm Boss Var ////////////////////
const wormAttack = new Image();
const wormDead = new Image();
const wormHit = new Image();
wormAttack.src = '/images/WormAttack.png';
wormDead.src = '/images/WormDead.png';
wormHit.src = '/images/WormHit.png';

//Worm Boss Attributes//
let wormAttributes = {
    attack: 1 * Math.pow(10, 3),
    health: 1 * Math.pow(10, 6),
};

///////////////////////////////////////

class AnimateTitan {
    constructor(height, width, maxFrames, animationImage, name, staggerFrames) {
        this.titanHeight = height;
        this.titanWidth = width;
        this.maxFrames = maxFrames;
        this.titanImage = animationImage;
        this.titanName = name;
        this.staggerFrames = staggerFrames;
    }

    drawTitan() {
        ctxTitan.drawImage(
            this.titanImage,
            framexTitan * this.titanWidth,
            0,
            this.titanWidth,
            this.titanHeight,
            10,
            200,
            canvasTitan.width,
            canvasTitan.height
        );
        if (gameframetitan % this.staggerFrames === 0) {
            framexTitan = (framexTitan + 1) % this.maxFrames;
        }
    }
}




const worm = new AnimateTitan(90, 90, 15, wormAttack, 'worm', 5);

function animationTitan() {
    ctxTitan.clearRect(0, 0, CANVAS_WIDTH_TITAN, CANVAS_HEIGHT_TITAN);
    worm.drawTitan();
    gameframetitan++;
    requestAnimationFrame(animationTitan);
}

// Start the animation
animationTitan();

canvasTitan.addEventListener('click', () => {
    document.getElementById('wormHP').innerHTML = wormAttributes.health;
    wormAttributes.health -= finalDamage;
    console.log(finalDamage)
});