const canvasTitan = document.getElementById('titanCanvas');
const ctxTitan = canvasTitan.getContext('2d');
const CANVAS_WIDTH_TITAN = canvasTitan.width = 600;
const CANVAS_HEIGHT_TITAN = canvasTitan.height = 600;
let gameframetitan = 0;
let framexTitan = 0;
let currentState = 'idle';
let titanLevel = parseInt(localStorage.getItem('titanLevel')) || 1;
let titanStart = parseInt(localStorage.getItem('titanStart')) || 5;

//Aura Variables
let auraIisOnTitan = JSON.parse(localStorage.getItem('auraIisOn')) || false;
let auraActiveTItan = false;
let auraIntervalTItan;
let aura_damageTitan = parseInt(localStorage.getItem('aura_damage')) || 0;
let aura_frequencyTitan = parseInt(localStorage.getItem('aura_frequency')) || 750;


//Prestige variables
let reincarnationLevel = parseInt(localStorage.getItem('reincarnationLevel')) || 1;
let damageMultiplier = parseInt(localStorage.getItem('damageMultiplier')) || 1;
let timeShards = parseInt(localStorage.getItem('timeShards')) || 0;
let defeatedTitans = parseInt(localStorage.getItem('defeatedTitans')) || 0;
let timeShardsMultiplier = parseInt(localStorage.getItem('timeShardsMultiplier')) || 1;
let timeShardsTitan = parseInt(localStorage.getItem('timeShardsTitan')) || 1;

//Reset Variables
let regenAmount = localStorage.getItem('hp_regen') || 10;
let auraDamage = localStorage.getItem('aura_damage') || 0;



/////////////////////////////////
//Player Attributes

let multipliers = {
    boss_attack_multi: 1,
    prestige_multi: 1,
    base_prestige_points: 10,
}

let strengthStatMulti = localStorage.getItem('strength_stat_multi') || 0;
let intelligenceStatMulti = localStorage.getItem('intelligence_stat_multi') || 0;
const finalDamage = damageMultiplierClicker * ((playerDmg + aura_damageTitan) * 1 + strengthStatMulti + intelligenceStatMulti);

//

// StatusBar Var ////////////////////



// Player Hp Animation Bar //
const PLAYER_HP_BAR_HEIGHT = 20;
const PLAYER_HP_BAR_X = 10;
const PLAYER_HP_BAR_Y = 10;
const PLAYER_HP_BAR_WIDTH = CANVAS_WIDTH_TITAN - 20;
const PLAYER_HP_TEXT_X = PLAYER_HP_BAR_X + 5;
const PLAYER_HP_TEXT_Y = PLAYER_HP_BAR_Y + 20;
let playerMaxHP = parseInt(localStorage.getItem('player_MAX_HP')) || 1000;
let playerHP = parseInt(localStorage.getItem('player_currentHP')) || playerMaxHP;

// Titan Hp Animation Bar //

const HP_BAR_HEIGHT = 30;
const HP_BAR_X = 15;
const HP_BAR_Y = 50;
const HP_BAR_WIDTH = CANVAS_WIDTH_TITAN - 30;
const HP_TEXT_X = HP_BAR_X + 5;
const HP_TEXT_Y = HP_BAR_Y + 25;
let TitanMaxHP = parseInt(localStorage.getItem('TitanMaxHP')) ||  100000;
let TitanCurrentHP = parseInt(localStorage.getItem('TitanCurrentHP')) || TitanMaxHP;
let titanAttack = parseInt(localStorage.getItem('titanAttack')) || 5000;

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
let isRegenerating = false;
let titantRegen;

////////////////////////////////////

//Necromancer Boss Var ////////////////////
const necromancer = new Image();
necromancer.src = '../images/Necromancer.png';

//Necromancer Boss Attack Animation//
let necromancerAttackFrameY = 2;
let necromancerFrameX = 0;
const necromancerAttackMaxFrames = 13;
const necromancerAttackHeight = 128;
const necromancerAttackWidth = 160;



///////////////////////////////////////

// Boss timer variables
let BOSS_TIMER_X = 15;
const BOSS_TIMER_Y = 100;
const BOSS_TIMER_WIDTH = CANVAS_WIDTH_TITAN - 30;
const BOSS_TIMER_HEIGHT = 5
let TIMER_DECREASE_RATE = 3 / 60; // Decrease 1 second per frame (assuming 60 FPS)
let MAX_BOSS_TIME = parseInt(localStorage.getItem('MAX_BOSS_TIME')) || 5;
let bossTimer = parseInt(localStorage.getItem('bossTimer')) || MAX_BOSS_TIME;
let bossAttackBegin = false;
let titanName = localStorage.getItem('titanName') || 'Hell Worm';

//Class Constructor

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

    updatePlayer(){
      this.bar_current = playerHP;
      this.bar_max = playerMaxHP;
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
const playerHpBar = new bar(HP_BAR_HEIGHT, HP_BAR_WIDTH, HP_BAR_X, PLAYER_HP_BAR_Y, PLAYER_HP_TEXT_Y, PLAYER_HP_TEXT_X, playerMaxHP, playerHP, 'darkred', 'green');




// Animation FUnctions

function drawHPText() {
    ctxTitan.font = '1.9rem Roboto';
    ctxTitan.fillStyle = 'darkred'
    ctxTitan.fillText(`${formatNumber(TitanCurrentHP)}`, HP_TEXT_X, HP_TEXT_Y);
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

    // Check if the boss timer has reached the maximum time
    if (bossTimer >= MAX_BOSS_TIME) {
        if (bossAttackBegin === true) {
            BOSS_TIMER_X = 15;
            playerHP -= titanAttack;
            checkPlayerHp();
            document.getElementById('playerHP').innerHTML = 'Player Health: ' + formatNumber(playerHP);
        }
        bossTimer = 0;
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

function drawPlayerHpText() {
  ctxTitan.font = '1rem Arial';
  ctxTitan.fillStyle = 'white';
  ctxTitan.fillText(`Player HP: ${formatNumber(playerHP)}/${formatNumber(playerMaxHP)}`, PLAYER_HP_TEXT_X, PLAYER_HP_TEXT_Y);
}


function animationTitan() {
    ctxTitan.clearRect(0, 0, CANVAS_WIDTH_TITAN, CANVAS_HEIGHT_TITAN);

    currentState = getValidState();

    switch (currentState) {
        case 'idle':
            wormIdleAnimation.drawTitan();
            BOSS_TIMER_X = -1000;
            bossAttackBegin = false;
            if (!isRegenerating) {
                isRegenerating = true;
                titantRegen = setInterval(function(){
                    if (TitanCurrentHP < TitanMaxHP){
                        TitanCurrentHP += (TitanMaxHP * 0.2);
                        TitanCurrentHP = Math.min(TitanCurrentHP, TitanMaxHP);
                    }
                }, 10000);
            }
            break;
        case 'attack':
            wormAttackAnimation.drawTitan();
            bossAttackBegin = true
            BOSS_TIMER_X = 15;
            MAX_BOSS_TIME = 2;
            TIMER_DECREASE_RATE = 2.8 / 60;
            isRegenerating = false;
            clearInterval(titantRegen);
            break;
        case 'necromancerAttack':
            necromancerAttackAnimation.drawTitan();
            bossAttackBegin = true;
            MAX_BOSS_TIME = 2;
            TIMER_DECREASE_RATE = 3 / 60;
            isRegenerating = false;
            clearInterval(titantRegen);
            break;
    }

    Worm_HP_BAR.drawHPBar();
    Worm_HP_BAR.updateBoss();
    playerHpBar.drawHPBar();
    playerHpBar.updatePlayer();
    drawBossTimer();
    drawHPText();
    drawPlayerHpText();
    drawHPParticle();

    gameframetitan++;
    requestAnimationFrame(animationTitan);
}


function drawLoop() {
    drawHPText();
    requestAnimationFrame(drawLoop);
}





//Utilities//

function openNav() {
  document.getElementById("mySidenav").style.width = "10rem";
  document.getElementById("main_Page").style.marginleft == "11.5rem";
  document.getElementById("main_Page").style.transition = "0.9s";

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main_Page").style.margin-left == "1.5rem";
}



function getValidState() {
  if (playerHP <= 0){
    return 'idle';
  }
  if (titanLevel == 1) {
      if (TitanCurrentHP <= (TitanMaxHP * 0.5)) {
          return 'attack'}
      else{
          return 'idle';
      }
  } 
  else if (titanLevel == 2) {
      return 'necromancerAttack';
  }
}

function drawHPParticle() {
    for (let i = hpParticles.length - 1; i >= 0; i--) {
      const particle = hpParticles[i];
      ctxTitan.font = `${HP_PARTICLE_SIZE}px Arial`;
      ctxTitan.fillStyle = particle.color || 'white';
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
    timeShards += 1;
    if (TitanCurrentHP <= 0){
        
        titanLevel += 1
        defeatedTitans += 1;
        TitanMaxHP = 10 * Math.pow(10,(defeatedTitans + 4))
        titanAttack = 1 * Math.pow(10,(defeatedTitans + 3))
        TitanCurrentHP = TitanMaxHP;
        const addTimeShards = timeShardsTitan * timeShardsMultiplier * (1 * Math.pow(1.5,(defeatedTitans + 1)))
        timeShards += addTimeShards;
    }
        if (titanLevel > 2){
          titanLevel = 1;
    }

    const HP_PARTICLE_TEXT = "-" + formatNumber(finalDamage) + " HP";
    hpParticles.push({
      x: canvasTitan.width - 100,
      y: canvasTitan.height - 190,
      duration: HP_PARTICLE_DURATION,
      text: HP_PARTICLE_TEXT, // Add the text property
    })
});

animationTitan();


function save(){
    localStorage.setItem('TitanMaxHP', TitanMaxHP);
    localStorage.setItem('TitanCurrentHP', TitanCurrentHP);
    localStorage.setItem('titanLevel', titanLevel);
    localStorage.setItem('bossTimer', bossTimer);
    localStorage.setItem('multipliers', JSON.stringify(multipliers));
    localStorage.setItem('prestige_multi', multipliers.prestige_multi);
    localStorage.setItem('boss_attack_multi', multipliers.boss_attack_multi);
    localStorage.setItem('base_prestige_points', multipliers.base_prestige_points);
    localStorage.setItem('player_currentHP', playerHP);
    localStorage.setItem('player_MAX_HP', playerMaxHP);
    localStorage.setItem('timeShards', timeShards);
    localStorage.setItem('defeatedTitans', defeatedTitans);
    localStorage.setItem('timeShardsMultiplier', timeShardsMultiplier);
    localStorage.setItem('timeShardsTitan', timeShardsTitan);
    localStorage.setItem('damageMultiplier', damageMultiplier);
    localStorage.setItem('goldMultiplier', goldMultiplier);
    localStorage.setItem('reincarnationLevel', reincarnationLevel);

    document.getElementById('wormHP').innerHTML = 'Titan Health: ' + formatNumber(TitanCurrentHP);
    document.getElementById('bossDamage').innerHTML = 'Boss Damage: ' + formatNumber(titanAttack);
    document.getElementById('titanLevel').innerHTML = 'Titan Reincarnations: ' + formatNumber(defeatedTitans);
    document.getElementById('timeShards').innerHTML = 'Time Shards: ' + formatNumber(timeShards);
}


function checkPlayerHp(){
  if (playerHP <= 0){
    setTimeout(function(){b
      alert("You have died");
      defeatedTitans = 0;
      titanLevel = 1;
      TitanMaxHP = 10 * Math.pow(10,(defeatedTitans + 4))
      titanAttack = 1 * Math.pow(10,(defeatedTitans + 3))
      timeShardsTitan = 0;
      TitanCurrentHP = TitanMaxHP;
    }, 100)
    
  }
}


function reset(){
    localStorage.clear();
    location.reload();
}


/**
 * Formats a number into a readable string representation.
 * Supports both standard notation with suffixes and scientific notation.
 * @param {number} num - The number to format.
 * @returns {string} The formatted number as a string.
 */
function formatNumber(num) {
  // Check if scientific notation is enabled via a checkbox in the UI
  const checkbox = document.getElementById('scientific-notation-checkbox');

  if (!checkbox.checked) {
    // Standard notation (with suffixes)
    // This array contains suffixes for every 3 orders of magnitude up to 10^99 (Googol)
    const suffixes = [
      "", " K", " Million", " Billion", " Trillion", " Quadrillion",
      " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion", " Decillion",
      " Undecillion", " Duodecillion", " Tredecillion", " Quattuordecillion", " Quindecillion",
      " Sexdecillion", " Septendecillion", " Octodecillion", " Novemdecillion", " Vigintillion",
      " Unvigintillion", " Duovigintillion", " Trevigintillion", " Quattuorvigintillion", " Quinvigintillion",
      " Sexvigintillion", " Septenvigintillion", " Octovigintillion", " Novemvigintillion", " Trigintillion",
      " Untrigintillion", " Duotrigintillion", " Googol"
    ];

    // Calculate the index for the appropriate suffix
    // We use log base 10 and divide by 3 because each suffix represents 3 orders of magnitude
    // Math.floor ensures we round down to the nearest suffix
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);

    // Scale down the number by dividing it by 1000^suffixIndex
    // This brings the number into the range 1-999.99
    // toFixed(2) rounds to 2 decimal places, parseFloat removes trailing zeros
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));

    // Return the formatted number with its suffix, or "0" for invalid inputs
    // The || "" at the end ensures we don't append "undefined" for numbers larger than our suffix list
    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
  }
  else {
    // Scientific notation
    if (num === 0 || isNaN(num)) {
      return "0"; // Return "0" for zero or invalid inputs
    }

    const absNum = Math.abs(num);
    if (absNum < 1000) {
      // For small numbers, just return with 2 decimal places
      return num.toFixed(2);
    }

    // Calculate the exponent (power of 10)
    // This represents how many places the decimal point should move
    const exponent = Math.floor(Math.log10(absNum));

    // Calculate the mantissa
    // The mantissa is the part of the number before the 'e' in scientific notation
    // It's always a number between 1 and 9.99 in normalized scientific notation
    // For example, in 3.14e2, 3.14 is the mantissa
    const mantissa = absNum / Math.pow(10, exponent);

    // Return in scientific notation format: mantissa e exponent
    // The mantissa is rounded to 2 decimal places for readability
    return mantissa.toFixed(2) + "e" + exponent;
  }
}

const checkboxScientificNotation = document.getElementById('scientific-notation-checkbox');

// Load saved state and set up change listener
checkboxScientificNotation.checked = localStorage.getItem('scientificNotation') === 'true';
checkboxScientificNotation.addEventListener('change', () => {
    localStorage.setItem('scientificNotation', checkboxScientificNotation.checked);
});

document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
  switch(event.key) {
    case 'r':
      reset();
      break
  }

}
setInterval(save, 1000);





