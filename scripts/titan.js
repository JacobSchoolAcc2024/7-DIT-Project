const canvasTitan = document.getElementById('titanCanvas');
const ctxTitan = canvasTitan.getContext('2d');
const CANVAS_WIDTH_TITAN = canvasTitan.width = 600;
const CANVAS_HEIGHT_TITAN = canvasTitan.height = 600;
let gameframetitan = 0;
let framexTitan = 0;
let currentState = 'idle';
const stateChangeInterval = 300; // Change state every 300 frames

/////////////////////////////////
//Player Attributes

let multipliers = {
    boss_attack_multi: 1,
    prestige_multi: 1,
    base_prestige_points: 10,
}

const finalDamage = playerDmg * multipliers.boss_attack_multi;

//

// StatusBar Var ////////////////////

// Player Hp Animation Bar //

const HP_BAR_HEIGHT = 30;
const HP_BAR_X = 15;
const HP_BAR_Y = 50;
const HP_BAR_WIDTH = CANVAS_WIDTH_TITAN - 30;
const HP_TEXT_X = HP_BAR_X + 5;
const HP_TEXT_Y = HP_BAR_Y + 20;
let TitanMaxHP = parseInt(localStorage.getItem('TitanMaxHP')) || 1 * Math.pow(10,1);
let TitanCurrentHP = parseInt(localStorage.getItem('TitanCurrentHP')) || TitanMaxHP;

// HP particle variables
const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
const HP_PARTICLE_SIZE = 20;
const HP_PARTICLE_DURATION = 10;
const hpParticles = [];
let hpParticle = null;

// Worm Boss Var ////////////////////
const wormIdle = new Image();
const wormAttack = new Image();
const wormDead = new Image();
const wormHit = new Image();
wormIdle.src = '../images/WormIdle.png';
wormAttack.src = '../images/WormAttack.png';
wormDead.src = '../images/WormDead.png';
wormHit.src = '../images/WormHit.png';


/// Worm Attack Animation ////////////////////////////
const wormAttackWidth = 90;
const wormAttackHeight = 90;
const maxWormAttackFrames = 15;
let wormAttackFrameY = 0;

/////////////// Worm Idle Animation ////////////////////////////
let wormIdleFrameY = 0;
let maxWormIdleFrames = 9;
const wormIdleHeight = 90;
const wormIdleWidth = 90;


//Worm Boss Attributes//
let wormAttributes = {
    attack: 1 * Math.pow(10, 3),
};
////////////////////////////////////

//Necromancer Boss Var ////////////////////
const necromancer = new Image();
necromancer.src = '../images/Necromancer.png';

//Necromancer Boss Attack Animation//
let necromancerAttackFrameY = 3;
let necromancerFrameX = 0;
const necromancerAttackMaxFrames = 13;
const necromancerAttackHeight = 128;
const necromancerAttackWidth = 160;



///////////////////////////////////////

// Boss timer variables
const BOSS_TIMER_X = 15;
const BOSS_TIMER_Y = 100;
const BOSS_TIMER_WIDTH = CANVAS_WIDTH_TITAN - 30;
const BOSS_TIMER_HEIGHT = 5
const TIMER_DECREASE_RATE = 1 / 60; // Decrease 1 second per frame (assuming 60 FPS)
let MAX_BOSS_TIME = parseInt(localStorage.getItem('MAX_BOSS_TIME')) || 15;
let bossTimer = parseInt(localStorage.getItem('bossTimer')) || MAX_BOSS_TIME;
let titanName = localStorage.getItem('titanName') || 'Hell Worm';


class AnimateTitan {
    constructor(height, width, maxFrames, framey, animationImage, name, staggerFrames,xAxis,yAxis) {
        this.titanHeight = height;
        this.titanWidth = width;
        this.maxFrames = maxFrames;
        this.titanImage = animationImage;
        this.titanName = name;
        this.staggerFrames = staggerFrames;
        this.titanFrameY = framey;
        this.x = xAxis;
        this.y = yAxis;
    }

    drawTitan() {
        ctxTitan.drawImage(
            this.titanImage,
            framexTitan * this.titanWidth,
            this.titanFrameY * this.titanHeight,
            this.titanWidth,
            this.titanHeight,
            this.x,
            this.y,
            this.titanWidth * (canvasTitan.width / this.titanWidth),
            this.titanHeight * (canvasTitan.height / this.titanHeight),
        );
        if (gameframetitan % this.staggerFrames === 0) {
            if (framexTitan < (this.maxFrames - 1)){
                framexTitan++;
            } else {
                framexTitan = 0; // Reset to first frame when animation completes
            }
        }
    }
}

class bar {
    constructor(height, width, x, y, text_y, text_x, max, current, color, color2){
      this.bar_height = height;
      this.bar_width = width;
      this.bar_x = x;
      this.bar_y = y;
      this.bar_text_y = text_y;
      this.bar_text_x = text_x;
      this.bar_max = max;
      this.bar_current = current;
      this.bar_color = color;
      this.bar_color_2 = color2
    }
  
    updateBoss(){
      this.bar_current = TitanCurrentHP;
      this.bar_max = TitanMaxHP;
    }
    drawHPBar(){
      ctxTitan.fillStyle = this.bar_color;
      ctxTitan.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
      if (this.bar_current > 0){
        const ratio = this.bar_current / this.bar_max;
        const width = this.bar_width * ratio;
        ctxTitan.fillStyle = this.bar_color_2;
        ctxTitan.fillRect(this.bar_x, this.bar_y, width, this.bar_height);
      }else{
        ctxTitan.fillStyle = this.bar_color;
        ctxTitan.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
      }
    }
  }
  
const wormAttackAnimation = new AnimateTitan(wormAttackHeight, wormAttackWidth, maxWormAttackFrames, wormAttackFrameY, wormAttack, 'wormAttack', 3, 10, 150);
const wormIdleAnimation = new AnimateTitan(wormIdleHeight, wormIdleWidth, maxWormIdleFrames, wormIdleFrameY, wormIdle, 'wormIdle', 4, 10,150);
const necromancerAttackAnimation = new AnimateTitan(necromancerAttackHeight,necromancerAttackWidth,necromancerAttackMaxFrames,necromancerAttackFrameY,necromancer,'necromancerAttack', 3,10,0)

const Worm_HP_BAR = new bar(HP_BAR_HEIGHT, HP_BAR_WIDTH, HP_BAR_X, 
HP_BAR_Y, HP_TEXT_Y, HP_TEXT_X,TitanMaxHP, TitanCurrentHP, 'black', 'white');


function drawHPText() {
    ctxTitan.font = '1rem Arial';
    ctxTitan.fillStyle = 'black'
    ctxTitan.fillText(`HP: ${TitanCurrentHP.toFixed(2)}/${TitanMaxHP.toFixed(2)}`, HP_TEXT_X, HP_TEXT_Y);
  }


function drawBossTimer() {
    let remainingTime = MAX_BOSS_TIME - bossTimer;
    let timerRatio = remainingTime / MAX_BOSS_TIME;
    // Draw the timer background
    ctxTitan.fillStyle = 'black';
    ctxTitan.fillRect(BOSS_TIMER_X, BOSS_TIMER_Y, BOSS_TIMER_WIDTH, BOSS_TIMER_HEIGHT);

    // Draw the timer bar
    ctxTitan.fillStyle = 'white';
    ctxTitan.fillRect(BOSS_TIMER_X, BOSS_TIMER_Y, BOSS_TIMER_WIDTH * timerRatio, BOSS_TIMER_HEIGHT);
    bossTimer += TIMER_DECREASE_RATE;
    localStorage.setItem('bossTimer', bossTimer);
    // Check if the boss timer has reached the maximum time
    if (bossTimer >= MAX_BOSS_TIME) {
    bossTimer = 0;
    localStorage.setItem('bossTimer', bossTimer);
    }

}

function drawEnemyLevel() {
    ctxTitan.font = '2rem Lugrasimo';
  
    ctxTitan.fillStyle = 'black';
    ctxTitan.fillRect(0, CANVAS_HEIGHT_TITAN - 30, CANVAS_WIDTH_TITAN, 30); // Draw red background
    ctxTitan.fillStyle = 'white'; // Set text color to white
    ctxTitan.fillText(titanName + ' Titan', CANVAS_WIDTH_TITAN - 440, CANVAS_HEIGHT_TITAN - 560);
    // ctxTitan.fillText('Titan', CANVAS_WIDTH_TITAN - 150, CANVAS_HEIGHT_TITAN - 100);
  
    
}

function getValidState() {
    if (TitanCurrentHP <= (TitanMaxHP * 0.25)) {
        return 'necromancerAttack';
    } else if (TitanCurrentHP <= (TitanMaxHP * 0.5)) {
        return 'attack';
    } else {
        return 'idle';
    }
}


function animationTitan() {
    ctxTitan.clearRect(0, 0, CANVAS_WIDTH_TITAN, CANVAS_HEIGHT_TITAN);

    currentState = getValidState();

    switch (currentState) {
        case 'idle':
            wormIdleAnimation.drawTitan();
            break;
        case 'attack':
            wormAttackAnimation.drawTitan();
            break;
        case 'necromancerAttack':
            necromancerAttackAnimation.drawTitan();
            break;
    }

    Worm_HP_BAR.drawHPBar();
    Worm_HP_BAR.updateBoss();
    drawHPText();

    gameframetitan++;
    requestAnimationFrame(animationTitan);
}


function drawLoop() {
    drawHPText();
    requestAnimationFrame(drawLoop);
}

function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
      , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
  }

function drawHPParticle() {
    for (let i = hpParticles.length - 1; i >= 0; i--) {
      const particle = hpParticles[i];
      ctxTitan.font = `${HP_PARTICLE_SIZE}px Arial`;
      ctxTitan.fillStyle = 'white';
      ctxTitan.fillText(particle.text, particle.x, particle.y);
      particle.y -= 3;
      particle.duration -= 0.12;
  
      if (particle.duration <= 0) {
        hpParticles.splice(i, 1); // Remove the particle from the array
      }
    }
  }



// Update the click event listener
canvasTitan.addEventListener('click', () => {
    TitanCurrentHP -= finalDamage;
    document.getElementById('wormHP').innerHTML = TitanCurrentHP;


    const HP_PARTICLE_TEXT = "-" + formatNumber(finalDamage) + " HP";
    hpParticles.push({
      x: canvasTitan.width - 100,
      y: canvasTitan.height - 190,
      duration: HP_PARTICLE_DURATION,
      text: HP_PARTICLE_TEXT, // Add the text property
    })
});

animationTitan();






function reset(){
    localStorage.clear();
    location.reload();
}
