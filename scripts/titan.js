const canvasTitan = document.getElementById('titanCanvas');
// Get the canvas element with id 'titanCanvas' and store it in a variable
const ctxTitan = canvasTitan.getContext('2d');
// Get the 2D drawing context from the canvas for drawing
const CANVAS_WIDTH_TITAN = canvasTitan.width = 600;
// Set the canvas width to 600 pixels and store the value in a variable
const CANVAS_HEIGHT_TITAN = canvasTitan.height = 600;
// Set the canvas height to 600 pixels and store the value in a variable
let gameframetitan = 0;
// Variable to keep track of the current frame number in the game
let framexTitan = 0;
// Variable to keep track of the current frame for animations
let currentState = 'idle';
// Variable to store the current state of the game or titan
let titanLevel = parseInt(localStorage.getItem('titanLevel')) || 1;
// Get the titan's level from localStorage, defaulting to 1 if not found

//Aura Variables
let auraIisOnTitan = JSON.parse(localStorage.getItem('auraIisOn')) || false;
// Get the aura state from localStorage (true/false), defaulting to false if not found
let auraActiveTItan = false;
// Variable to track if the aura is currently active
let auraIntervalTItan;
// Variable to store the interval ID for aura effects
let aura_damageTitan = parseInt(localStorage.getItem('aura_damage')) || 0;
// Get the aura damage from localStorage, defaulting to 0 if not found
let aura_frequencyTitan = parseInt(localStorage.getItem('aura_frequency')) || 750;
// Get the aura frequency from localStorage, defaulting to 750 if not found

//Prestige variables
let reincarnationLevel = parseInt(localStorage.getItem('reincarnationLevel')) || 1;
// Get the reincarnation level from localStorage, defaulting to 1 if not found
let damageMultiplier = parseInt(localStorage.getItem('damageMultiplier')) || 1;
// Get the damage multiplier from localStorage, defaulting to 1 if not found
let timeShards = parseInt(localStorage.getItem('timeShards')) || 0;
// Get the number of time shards from localStorage, defaulting to 0 if not found
let defeatedTitans = parseInt(localStorage.getItem('defeatedTitans')) || 0;
// Get the number of defeated titans from localStorage, defaulting to 0 if not found
let timeShardsMultiplier = parseInt(localStorage.getItem('timeShardsMultiplier')) || 1;
// Get the time shards multiplier from localStorage, defaulting to 1 if not found
let timeShardsTitan = parseInt(localStorage.getItem('timeShardsTitan')) || 1;
// Get the time shards for titans from localStorage, defaulting to 1 if not found

//Reset Variables
let regenAmount = localStorage.getItem('hp_regen') || 10;
// Get the HP regeneration amount from localStorage, defaulting to 10 if not found
let auraDamage = localStorage.getItem('aura_damage') || 0;
// Get the aura damage from localStorage, defaulting to 0 if not found

/////////////////////////////////
//Player Attributes

let multipliers = {
    boss_attack_multi: 1,
    prestige_multi: 1,
    base_prestige_points: 10,
}
// Object to store different multipliers for boss attack, prestige, etc.

let strengthStatMulti = localStorage.getItem('strength_stat_multi') || 0;
// Get the strength stat multiplier from localStorage, defaulting to 0 if not found
let intelligenceStatMulti = localStorage.getItem('intelligence_stat_multi') || 0;
// Get the intelligence stat multiplier from localStorage, defaulting to 0 if not found
const finalDamage = damageMultiplierClicker * ((playerDmg + aura_damageTitan) * 1 + strengthStatMulti + intelligenceStatMulti);
// Calculate the final damage based on various factors, including player damage and aura damage

//

// StatusBar Var ////////////////////



// Player Hp Animation Bar //
const PLAYER_HP_BAR_HEIGHT = 20;
// Height of the player HP bar
const PLAYER_HP_BAR_X = 10;
// X position of the player HP bar
const PLAYER_HP_BAR_Y = 10;
// Y position of the player HP bar
const PLAYER_HP_BAR_WIDTH = CANVAS_WIDTH_TITAN - 20;
// Width of the player HP bar, slightly smaller than canvas width
const PLAYER_HP_TEXT_X = PLAYER_HP_BAR_X + 5;
// X position for the player HP text
const PLAYER_HP_TEXT_Y = PLAYER_HP_BAR_Y + 20;
// Y position for the player HP text
let playerMaxHP = parseInt(localStorage.getItem('player_MAX_HP')) || 1000;
// Get the player's max HP from localStorage, defaulting to 1000 if not found
let playerHP = parseInt(localStorage.getItem('player_currentHP')) || playerMaxHP;
// Get the player's current HP from localStorage, defaulting to max HP if not found

// Titan Hp Animation Bar //

const HP_BAR_HEIGHT = 30;
// Height of the titan HP bar
const HP_BAR_X = 15;
// X position of the titan HP bar
const HP_BAR_Y = 50;
// Y position of the titan HP bar
const HP_BAR_WIDTH = CANVAS_WIDTH_TITAN - 30;
// Width of the titan HP bar, slightly smaller than canvas width
const HP_TEXT_X = HP_BAR_X + 5;
// X position for the titan HP text
const HP_TEXT_Y = HP_BAR_Y + 25;
// Y position for the titan HP text
let TitanMaxHP = parseInt(localStorage.getItem('TitanMaxHP')) ||  100000;
// Get the titan's max HP from localStorage, defaulting to 100000 if not found
let TitanCurrentHP = parseInt(localStorage.getItem('TitanCurrentHP')) || TitanMaxHP;
// Get the titan's current HP from localStorage, defaulting to max HP if not found
let titanAttack = parseInt(localStorage.getItem('titanAttack')) || 5000;
// Get the titan's attack value from localStorage, defaulting to 5000 if not found

// HP particle variables
const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
// Text to display for HP particles
const HP_PARTICLE_SIZE = 20;
// Size of the HP particle text
const HP_PARTICLE_DURATION = 10;
// Duration for how long HP particles are displayed
const hpParticles = [];
// Array to store HP particle objects
let hpParticle = null;
// Placeholder for a single HP particle object

// Worm Boss Var ////////////////////
const wormIdle = new Image();
// Create a new image object for the worm idle animation
const wormAttack = new Image();
// Create a new image object for the worm attack animation
const wormDead = new Image();
// Create a new image object for the worm dead animation
const wormHit = new Image();
// Create a new image object for the worm hit animation
wormIdle.src = '../images/WormIdle.png';
// Set the source of the worm idle image
wormAttack.src = '../images/WormAttack.png';
// Set the source of the worm attack image
wormDead.src = '../images/WormDead.png';
// Set the source of the worm dead image
wormHit.src = '../images/WormHit.png';
// Set the source of the worm hit image

/// Worm Attack Animation ////////////////////////////
const wormAttackWidth = 90;
// Width of the worm attack animation frames
const wormAttackHeight = 90;
// Height of the worm attack animation frames
const maxWormAttackFrames = 15;
// Maximum number of frames in the worm attack animation
let wormAttackFrameY = 0;
// Y position of the current frame in the worm attack animation

/////////////// Worm Idle Animation ////////////////////////////
let wormIdleFrameY = 0;
// Y position of the current frame in the worm idle animation
let maxWormIdleFrames = 9;
// Maximum number of frames in the worm idle animation
const wormIdleHeight = 90;
// Height of the worm idle animation frames
const wormIdleWidth = 90;
// Width of the worm idle animation frames

//Worm Boss Attributes//
let wormAttributes = {
    attack: 1 * Math.pow(10, 3),
// Attributes for the worm boss, including attack power
};
let isRegenerating = false;
// Flag to indicate if the worm is currently regenerating
let titantRegen;
// Placeholder for titan regeneration value

////////////////////////////////////

//Necromancer Boss Var ////////////////////
const necromancer = new Image();
// Create a new image object for the necromancer boss
necromancer.src = '../images/Necromancer.png';
// Set the source of the necromancer image

//Necromancer Boss Attack Animation//
let necromancerAttackFrameY = 2;
// Y position of the current frame in the necromancer attack animation
let necromancerFrameX = 0;
// X position of the current frame in the necromancer attack animation
const necromancerAttackMaxFrames = 13;
// Maximum number of frames in the necromancer attack animation
const necromancerAttackHeight = 128;
// Height of the necromancer attack animation frames
const necromancerAttackWidth = 160;
// Width of the necromancer attack animation frames

///////////////////////////////////////

// Boss timer variables
let BOSS_TIMER_X = 15;
// X position of the boss timer on the canvas
const BOSS_TIMER_Y = 100;
// Y position of the boss timer on the canvas
const BOSS_TIMER_WIDTH = CANVAS_WIDTH_TITAN - 30;
// Width of the boss timer bar, slightly smaller than canvas width
const BOSS_TIMER_HEIGHT = 5
// Height of the boss timer bar
let TIMER_DECREASE_RATE = 3 / 60; // Decrease 1 second per frame (assuming 60 FPS)
// Rate at which the boss timer decreases, aiming for 1 second per frame
let MAX_BOSS_TIME = parseInt(localStorage.getItem('MAX_BOSS_TIME')) || 5;
// Get the maximum boss time from localStorage, defaulting to 5 seconds if not found
let bossTimer = parseInt(localStorage.getItem('bossTimer')) || MAX_BOSS_TIME;
// Get the current boss timer value from localStorage, defaulting to max boss time if not found
let bossAttackBegin = false;
// Flag to indicate if the boss attack has begun
let titanName = localStorage.getItem('titanName') || 'Hell Worm';
// Get the titan's name from localStorage, defaulting to 'Hell Worm' if not found

//Class Constructor

// Class for handling titan animations
class AnimateTitan {
  // Constructor for initializing a new titan animation
  constructor(height, width, maxFrames, framey, animationImage, name, staggerFrames, xAxis, yAxis) {
      this.titanHeight = height;         // Height of each frame in the animation
      this.titanWidth = width;           // Width of each frame in the animation
      this.maxFrames = maxFrames;        // Total number of frames in the animation
      this.titanImage = animationImage;  // Image object containing all frames of the animation
      this.titanName = name;             // Name of the titan (used for identification)
      this.staggerFrames = staggerFrames; // Number of frames to wait before advancing to the next frame
      this.titanFrameY = framey;         // Y position of the frame in the animation image
      this.x = xAxis;                    // X position on the canvas where the titan will be drawn
      this.y = yAxis;                    // Y position on the canvas where the titan will be drawn
  }

  // Method to draw the titan animation on the canvas
  drawTitan() {
      ctxTitan.drawImage(
          this.titanImage,
          framexTitan * this.titanWidth, // X position of the current frame in the image
          this.titanFrameY * this.titanHeight, // Y position of the current frame in the image
          this.titanWidth,   // Width of the current frame
          this.titanHeight,  // Height of the current frame
          this.x,            // X position on the canvas
          this.y,            // Y position on the canvas
          this.titanWidth * (canvasTitan.width / this.titanWidth), // Scaled width of the titan
          this.titanHeight * (canvasTitan.height / this.titanHeight), // Scaled height of the titan
      );
      if (gameframetitan % this.staggerFrames === 0) { // Check if it's time to advance the animation frame
          if (framexTitan < (this.maxFrames - 1)) { // If not at the last frame
              framexTitan++; // Move to the next frame
          } else {
              framexTitan = 0; // Reset to the first frame when animation completes
          }
      }
  }
}

// Class for handling HP bars (both player and titan)
class bar {
  // Constructor for initializing a new HP bar
  constructor(height, width, x, y, text_y, text_x, max, current, color, color2){
    this.bar_height = height;         // Height of the HP bar
    this.bar_width = width;           // Width of the HP bar
    this.bar_x = x;                   // X position of the HP bar on the canvas
    this.bar_y = y;                   // Y position of the HP bar on the canvas
    this.bar_text_y = text_y;         // Y position of the text on the HP bar
    this.bar_text_x = text_x;         // X position of the text on the HP bar
    this.bar_max = max;               // Maximum value for the HP bar (e.g., max HP)
    this.bar_current = current;       // Current value of the HP bar (e.g., current HP)
    this.bar_color = color;           // Color of the HP bar background
    this.bar_color_2 = color2;        // Color of the HP bar foreground (filled portion)
  }

  // Method to update the HP bar for the boss (titan)
  updateBoss(){
    this.bar_current = TitanCurrentHP; // Set current HP to the titan's current HP
    this.bar_max = TitanMaxHP;         // Set max HP to the titan's max HP
  }

  // Method to update the HP bar for the player
  updatePlayer(){
    this.bar_current = playerHP;       // Set current HP to the player's current HP
    this.bar_max = playerMaxHP;        // Set max HP to the player's max HP
  }

  // Method to draw the HP bar on the canvas
  drawHPBar(){
    ctxTitan.fillStyle = this.bar_color; // Set the color for the HP bar background
    ctxTitan.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height); // Draw the background of the HP bar
    if (this.bar_current > 0) { // Check if there is any HP left to display
      const ratio = this.bar_current / this.bar_max; // Calculate the ratio of current HP to max HP
      const width = this.bar_width * ratio; // Calculate the width of the filled portion based on the ratio
      ctxTitan.fillStyle = this.bar_color_2; // Set the color for the filled portion of the HP bar
      ctxTitan.fillRect(this.bar_x, this.bar_y, width, this.bar_height); // Draw the filled portion of the HP bar
    } else {
      ctxTitan.fillStyle = this.bar_color; // If no HP left, display the bar in its background color
      ctxTitan.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height); // Draw the empty HP bar
    }
  }
}

  
const wormAttackAnimation = new AnimateTitan(wormAttackHeight, wormAttackWidth, maxWormAttackFrames, wormAttackFrameY, wormAttack, 'wormAttack', 3, 10, 150);
// Create an AnimateTitan instance for the worm attack animation
const wormIdleAnimation = new AnimateTitan(wormIdleHeight, wormIdleWidth, maxWormIdleFrames, wormIdleFrameY, wormIdle, 'wormIdle', 4, 10,150);
// Create an AnimateTitan instance for the worm idle animation
const necromancerAttackAnimation = new AnimateTitan(necromancerAttackHeight, necromancerAttackWidth, necromancerAttackMaxFrames, necromancerAttackFrameY, necromancer, 'necromancerAttack', 3, 10, 0)
// Create an AnimateTitan instance for the necromancer attack animation

const Worm_HP_BAR = new bar(HP_BAR_HEIGHT, HP_BAR_WIDTH, HP_BAR_X, HP_BAR_Y, HP_TEXT_Y, HP_TEXT_X, TitanMaxHP, TitanCurrentHP, 'black', 'white');
// Create a bar instance for the titan HP bar
const playerHpBar = new bar(HP_BAR_HEIGHT, HP_BAR_WIDTH, HP_BAR_X, PLAYER_HP_BAR_Y, PLAYER_HP_TEXT_Y, PLAYER_HP_TEXT_X, playerMaxHP, playerHP, 'darkred', 'green');
// Create a bar instance for the player HP bar



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

// Main function for animating the titan and updating the canvas
function animationTitan() {
  // Clear the entire canvas before drawing the next frame
  ctxTitan.clearRect(0, 0, CANVAS_WIDTH_TITAN, CANVAS_HEIGHT_TITAN);

  // Determine the current state of the titan (idle, attack, etc.)
  currentState = getValidState();

  // Handle different titan states
  switch (currentState) {
      case 'idle':
          // Draw the idle animation for the worm
          wormIdleAnimation.drawTitan();
          
          // Hide the boss timer and reset attack status
          BOSS_TIMER_X = -1000;
          bossAttackBegin = false;
          
          // Start or continue the titan's regeneration if not already regenerating
          if (!isRegenerating) {
              isRegenerating = true;
              // Set up a timer to regenerate titan HP every 10 seconds
              titantRegen = setInterval(function(){
                  if (TitanCurrentHP < TitanMaxHP) {
                      // Regenerate 20% of max HP each interval
                      TitanCurrentHP += (TitanMaxHP * 0.2);
                      // Ensure HP does not exceed max HP
                      TitanCurrentHP = Math.min(TitanCurrentHP, TitanMaxHP);
                  }
              }, 10000); // 10000 milliseconds = 10 seconds
          }
          break;
      
      case 'attack':
          // Draw the attack animation for the worm
          wormAttackAnimation.drawTitan();
          
          // Set boss timer to visible and adjust parameters for attack
          bossAttackBegin = true;
          BOSS_TIMER_X = 15; // Position of the boss timer
          MAX_BOSS_TIME = 2; // Set the maximum time for the boss attack
          TIMER_DECREASE_RATE = 2.8 / 60; // Timer decrease rate (assum 60 FPS)
          
          // Stop regeneration while the titan is attacking
          isRegenerating = false;
          clearInterval(titantRegen); // Clear the regeneration interval
          break;
      
      case 'necromancerAttack':
          // Draw the necromancer's attack animation
          necromancerAttackAnimation.drawTitan();
          
          // Set boss timer to visible and adjust parameters for attack
          bossAttackBegin = true;
          MAX_BOSS_TIME = 2; // Set the maximum time for the boss attack
          TIMER_DECREASE_RATE = 3 / 60; // Timer decrease rate (60 FPS)
          
          // Stop regeneration while the necromancer is attacking
          isRegenerating = false;
          clearInterval(titantRegen); // Clear the regeneration interval
          break;
  }

  // Update and draw the HP bars for the titan and the player
  Worm_HP_BAR.drawHPBar();
  Worm_HP_BAR.updateBoss(); // Update the HP bar to reflect the titan's current HP
  playerHpBar.drawHPBar();
  playerHpBar.updatePlayer(); // Update the HP bar to reflect the player's current HP
  
  // Draw additional elements on the canvas
  drawBossTimer();        // Draw the boss timer
  drawHPText();           // Draw text showing HP values
  drawPlayerHpText();    // Draw text showing player HP
  drawHPParticle();       // Draw HP particle effects

  // Increment the frame count for animation updates
  gameframetitan++;
  
  // Request the next frame to continue the animation loop
  requestAnimationFrame(animationTitan);
}

// Function to handle drawing of static elements (e.g., HP text)
function drawLoop() {
  // Draw text showing HP values
  drawHPText();
  
  // Request the next frame to continue the drawing loop
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


// Validates and returns animation state of titan.
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


// Saves game state ie variables into local storage and updates game visibility.
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
 * Formats a number into a string representation.
 * Supports both standard notation with suffixes and scientific notation.
 * param {number} num - The number to format.
 * returns {string} The formatted number as a string.
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

// Event listener when user press keydown.
document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
  switch(event.key) {
    case 'r': //When user presses letter r, then reset the game.
      reset();
      break
  }

}
// Saves game state every second.
setInterval(save, 1000);





