


/// These are the global game variables. They are parsed into integers
/// and saved into local storage with default values to handle errors..
var playerDmg = parseInt(localStorage.getItem('playerDmg')) || 1;
var skill_points = parseInt(localStorage.getItem('skill_points')) || 0;
let enemy_level = parseInt(localStorage.getItem('enemy_level')) || 1;
let max_enemy_level = parseInt(localStorage.getItem('max_enemy_level')) || 1;
let enemy_level_increase = parseInt(localStorage.getItem('enemy_level_increase')) || 1;
let enemy_name = localStorage.getItem('enemy_name') || 'Demon Fly: ';
let islock_stage = parseInt(localStorage.getItem('islock_stage')) || 2;
let click_delay  = parseInt(localStorage.getItem('click_delay')) || 100;

//Game Settings
let scientificNotation = localStorage.getItem('scientificNotation') || false;

//Autoclickers
let auraIisOn = JSON.parse(localStorage.getItem('auraIisOn')) || false;
let auraActive = false;
let auraInterval;
let aura_damage = parseInt(localStorage.getItem('aura_damage')) || 0;
let aura_frequency = parseInt(localStorage.getItem('aura_frequency')) || 750;

///Boss Attack
let boss_damage = parseInt(localStorage.getItem('boss_attack')) || 20;
let boss_attack_time = parseInt(localStorage.getItem('boss_attack_time')) || 500;
let bossAttackInterval;

//Hp Restore
let hpRegenActive;
let hpRegenInterval;
let hp_regen = parseInt(localStorage.getItem('hp_regen')) || 100;
let regen_time = parseInt(localStorage.getItem('regen_time')) || 5000;



///Purchase
let buy_upgrade = parseInt(localStorage.getItem('buy_upgrade')) || 1;
let clickedButton = parseInt(localStorage.getItem('clickedButton')) || 0;

// Cost upgrade multipliers
let clickerCostMultiplier = parseInt(localStorage.getItem('clickerCostMultiplier')) || 5;
let staminaCostMultiplier = parseInt(localStorage.getItem('staminaCostMultiplier')) || 10;
let auraCostMultiplier = parseInt(localStorage.getItem('auraCostMultiplier')) || 10;
let hpRegenCostMultiplier = parseInt(localStorage.getItem('hpRegenCostMultiplier')) || 6;

//Gold Multiplier
let gold = parseInt(localStorage.getItem('gold')) || 0;
let goldMultiplier = parseInt(localStorage.getItem('goldMultiplier')) || 1;


/// Stat Variables
var strength_stat_multi = parseInt(localStorage.getItem('strength_stat_multi')) || 0;
let strength_stat_multi_added = parseInt(localStorage.getItem('strength_stat_multi_added')) || 0;
let stamina_stat_multi = parseInt(localStorage.getItem('stamina_stat_multi')) || 1;
let stamina_stat_multi_added = parseInt(localStorage.getItem('stamina_stat_multi_added')) || 0;
let intelligence_stat_multi = parseInt(localStorage.getItem('intelligence_stat_multi')) || 1;
let intelligence_stat_multi_added = parseInt(localStorage.getItem('intelligence_stat_multi_added')) || 0;

// Upgrades
/// This is an object literal in js.
/// It is a collection of objects that contain the information for each upgrade.
/// Each upgrade has a button_id, cost_id, cost, and a click_multiplier.
/// The button_id is the id of the button that the upgrade is on.
/// The cost_id is the id of the element that displays the cost of the upgrade.
/// The cost is the cost of the upgrade.

const Upgrades = {
  clicker_upgrade: {
    button_id: "clicker_upgrade",
    cost_id: "clicker_upgrade_cost",
    cost: 2,
    clicker_upgrade_purchased: parseInt(localStorage.getItem('clicker_upgrade_purchased')) || 0,
    click_multiplier: parseInt(localStorage.getItem('click_multiplier')) || 1,
  },
  hp_upgrade: {
    button_id: "hp_upgrade",
    cost_id: "hp_upgrade_cost",
    cost: 5,
    hp_upgrade_purchased: parseInt(localStorage.getItem('hp_upgrade_purchased')) || 0,
    hp_multiplier: parseInt(localStorage.getItem('hp_multiplier')) || 1,
  },
  aura_upgrade: {
    button_id: "aura_upgrade",
    cost_id: "aura_upgrade_cost",
    cost: 50,
    aura_upgrade_purchased: parseInt(localStorage.getItem('aura_upgrade_purchased')) || 0,
    aura_multiplier: parseInt(localStorage.getItem('aura_multiplier')) || 1,
  },
  regen_upgrade: {
    button_id: "regen_upgrade",
    cost_id: "regen_upgrade_cost",
    cost: 30,
    regen_upgrade_purchased: parseInt(localStorage.getItem('regen_upgrade_purchased')) || 0,
    regen_multiplier: parseInt(localStorage.getItem('regen_multiplier')) || 1,
  }
}

//Final Stats
/// These are the stats the affect the player's progression, basically the multipliers
// for the player's damage, etc.
let defeatedTitansClicker = parseInt(localStorage.getItem('defeatedTitans')) || 0;
let timeShardsMultiplierClicker = parseInt(localStorage.getItem('timeShardsMultiplier')) || 1;
let timeShardsTitanClicker = parseInt(localStorage.getItem('timeShardsTitan')) || 1;
let damageMultiplierClicker = parseInt(localStorage.getItem('damageMultiplier')) || 1;
let reincarnationLevelClicker = parseInt(localStorage.getItem('reincarnationLevel')) || 1;
let timeShardsClicker = parseInt(localStorage.getItem('timeShards')) || 0;
let finalPlayerDamage = damageMultiplierClicker * (playerDmg * 1 + strength_stat_multi);
let finalPurchaseMulti = reincarnationLevelClicker;

///Animation variables////

///
// Get the canvas element with id 'canvas1'
const canvas1 = document.getElementById('canvas1');

// Check if the canvas element exists. 
// Since there are two javascript files connected in one of our html pages,
// this prevents the game from breaking down, as it will try to find the canvas 
// in the other javascript file and without a canvas, it will break.
if (canvas1) {
// Get the 2D rendering context for the canvas
const ctx = canvas1.getContext('2d');

// Set the canvas width to 600 pixels and store it in CANVAS_WIDTH
const CANVAS_WIDTH = canvas1.width = 600;

// Set the canvas height to 650 pixels and store it in CANVAS_HEIGHT
const CANVAS_HEIGHT = canvas1.height = 650;
// Sets player_width and height in a constant variable.
const player_width = 79;
const player_height = 70;
const deadPlayerWidth = 92; // 553 / 6 = 92.16666... (rounded down)
// Create Image objects for different player states
const playerImage = new Image();
const playerHurtImage = new Image();
const playerDeadImage = new Image();
const playerAttackImage = new Image();

// Set the source files for player state images
playerHurtImage.src = 'images/HURT.png';
playerDeadImage.src = 'images/DEATH.png';
playerAttackImage.src = 'images/New_ATTACK.png';

const hurt_width = 79;
const hurt_height = 69;
const deathFrameWidth = 77; // 553 / 6 = 92.16666... (rounded down)
const deathFrameHeight = 90;

// Set the game speed
let gameSpeed = 20;

// Initialize frame counters for different animations
let framex = 0;
let hurt_framex = 3;
let framey = 0;
let gameframe = 0;

// Define stagger frames for different animations
const staggerframes = 7;
const staggerframes_hurt = 12;
const staggerframes_dead = 4;
const staggerframes_attack = 5;

// Initialize player state flags
let isHurt = false;
let isDead = false;

// Retrieve attacking state from localStorage, default to false if not found
let isAttacking = localStorage.getItem('isAttacking') || false;


// HP bar variables
let MAX_HP = parseInt(localStorage.getItem('MAX_HP')) || 6;
let currentHP = parseInt(localStorage.getItem('currentHP')) || MAX_HP;
const HP_BAR_HEIGHT = 20;
const HP_BAR_X = 10;
const HP_BAR_Y = 5;
const HP_BAR_WIDTH = CANVAS_WIDTH - 20;
const HP_TEXT_X = HP_BAR_X + 5;
const HP_TEXT_Y = HP_BAR_Y + 15;


// Player HP bar variables
let player_MAX_HP = parseInt(localStorage.getItem('player_MAX_HP')) || 1000;
var player_currentHP = parseInt(localStorage.getItem('player_currentHP')) || player_MAX_HP;
const PLAYER_HP_BAR_HEIGHT = 25;
const PLAYER_HP_BAR_X = 10;
const PLAYER_HP_BAR_Y = 30;
const PLAYER_HP_BAR_WIDTH = CANVAS_WIDTH - 20;
const PLAYER_HP_TEXT_X = PLAYER_HP_BAR_X + 5;
const PLAYER_HP_TEXT_Y = PLAYER_HP_BAR_Y + 20;


// Player Level bar variables
let player_MAX_XP = parseInt(localStorage.getItem('player_MAX_XP')) || 1000;
let current_xp = parseInt(localStorage.getItem('current_xp')) || 0;
let player_level = parseInt(localStorage.getItem('player_level')) || 1;
let xp_multiply = parseInt(localStorage.getItem('xp_multiply')) || 0;
const PLAYER_XP_BAR_HEIGHT = 20;
const PLAYER_XP_BAR_X = 10;
const PLAYER_XP_BAR_Y = CANVAS_HEIGHT - 60;
const PLAYER_XP_BAR_WIDTH = CANVAS_WIDTH - 20;
const PLAYER_XP_TEXT_X = PLAYER_XP_BAR_X + 5;
const PLAYER_XP_TEXT_Y = PLAYER_XP_BAR_Y + 15;

// HP particle variables
const HP_PARTICLE_TEXT = "-" + finalPlayerDamage + "HP"; // Text displayed for HP particle
const HP_PARTICLE_SIZE = 20; // Size of the HP particle
const HP_PARTICLE_DURATION = 20; // Duration for which the HP particle is visible
const hpParticles = []; // Array to store multiple HP particles
let hpParticle = null; // Variable to hold a single HP particle

// Set the source for the player's idle animation
playerImage.src = 'images/IDLE.png';

// Create and set sources for background layer images
const backgroundLayer1 = new Image();
backgroundLayer1.src = "images/layer-1.png";

const backgroundLayer2 = new Image();
backgroundLayer2.src = "images/layer-2.png";

const backgroundLayer3 = new Image();
backgroundLayer3.src = "images/layer-3.png"

const backgroundLayer4 = new Image();
backgroundLayer4.src = "images/layer-4.png";


// Boss timer variables
const BOSS_TIMER_X = 10; // X-coordinate of the boss timer
const BOSS_TIMER_Y = 25; // Y-coordinate of the boss timer
const BOSS_TIMER_WIDTH = CANVAS_WIDTH - 20; // Width of the boss timer
const BOSS_TIMER_HEIGHT = 5 // Height of the boss timer
const TIMER_DECREASE_RATE = 1 / 60; // Decrease 1 second per frame (assuming 60 FPS)
let MAX_BOSS_TIME = parseInt(localStorage.getItem('MAX_BOSS_TIME')) || 15; // Maximum boss time, retrieved from localStorage or default to 15
let bossTimer = parseInt(localStorage.getItem('bossTimer')) || MAX_BOSS_TIME; // Current boss timer, retrieved from localStorage or set to MAX_BOSS_TIME

// Sound effect variables
const default_fx = document.getElementById("default_fx"); // Default sound effect
const slash_fx = document.getElementById("dagger_slash"); // Slash sound effect
const skill_point_fx = document.getElementById("skill_point"); // Skill point sound effect
let fx_play = false; // Flag to control sound effect playback

/// Modal Functions ///

let currentStep = 0; // Current step in the tutorial

// Tutorial modal elements
const helpButton = document.getElementById('help-button');
const tutorialModal = document.getElementById('tutorial-modal');
const tutorialContent = document.getElementById('tutorial-content');
const prevButton = document.getElementById('prev-tutorial');
const nextButton = document.getElementById('next-tutorial');
const closeButton = document.getElementById('close-tutorial');


//Reincarnation Modal Variables
const reincarnateButton = document.getElementById('playerReincarnation');
const modal = document.getElementById('reincarnateModal');
const confirmButton = document.getElementById('confirmReincarnate');
const cancelButton = document.getElementById('cancelReincarnate');


// Array of tutorial steps, each element is a string describing a game mechanic or feature
const tutorialSteps = [
  "Click on the monster to deal damage to enemies.",
  `Use gold to buy ugrades on the right hand side of the screen.<br>
   Gold can also be used to buy special weapon and armor in the market.<br>
   To access the market, press m or click the navbar.  `,
  `Buy upgrades using gold.<br>
   Training Fist will increase how much damage you deal to the monster per click.<br>
   Training Stamina will increase your max hp, allowing you to take more hits from monsters.<br>
   Training Regeneration will increase how much hp you will gain back and shorten the time required.<br>
   Training Aura will enable you to automatically attack monsters within a set amount of time.<br>
   Training Aura will increase aura damage and increase the frequency of damage done.`,
   `Skill points can be used to increase 3 stats: <br>
    Strength: Increases how much damage you get per upgrade when training Fist.<br>
    Stamina: Increases how much health you get per upgrade when training Stamina and
    increases how much hp regen you get per upgrade when training Regeneration.<br>
    Intelligence: Increases how much aura damage you get when training Aura and will decrease the
    interval between clicks.`,
  `To earn gold quickly, lock the stage by clicking on lock stage.<br>
   To lock a stage, you must first beat it.<br>
   Bosses give more gold and experience, so defeating lower level bosses
   is better than defeating higher leveled mobs.<br>
   Use skill points immediately as they increase how much you get from upgrades.<br>
   The more upgrades you buy at once, the bigger the increase, so save wisely.`,
   `A/leftArrowKey: Go back to previous stage.<br>
    D/RightArrowKey: Go to next stage (to move forward, stage must be beaten).<br>
    L: Lock and unlocks stage (stage must be beaten).<br>
    B: Open skill menu.<br>
    Spacebar: Damage enemy.<br>
    M: Opens menu.`,
  `Reincarnate and reset progress to gain multipliers.<br>
   To reincarnate, max stage must reach 100 and above.<br>
   Time Shards are required to reincarnate.<br>
   Defeat Titans to earn Time Shards.`
];

// Array of titles for each tutorial step
const tutorialTitles = [
  "Welcome to Idle Reincarnation!",
  "Gold",
  "Upgrading Stats",
  "Skill Points and Stats",
  "Tips and Tricks",
  "Hot Keys",
  "Reincarnation"
];



// Function to initiate the tutorial sequence
function showTutorial() {
  currentStep = 0; // Reset to the first step
  tutorialModal.style.display = 'block'; // Make the tutorial modal visible
  updateTutorialContent(); // Populate the modal with the first tutorial step
}

// Function to dynamically update the tutorial modal content
function updateTutorialContent() {
  const tutorialTitle = document.querySelector('.modal-content h2');
  tutorialTitle.textContent = tutorialTitles[currentStep]; // Set the title for the current step
  tutorialContent.innerHTML = tutorialSteps[currentStep]; // Set the main content for the current step
  prevButton.disabled = currentStep === 0; // Disable 'previous' button on the first step
  // Change 'next' button text to 'Finish' on the last step, otherwise keep it as 'Next'
  nextButton.textContent = currentStep === tutorialSteps.length - 1 ? "Finish" : "Next";
}

// Event listener for the help button to show the tutorial
helpButton.onclick = showTutorial;

// Event listener for the 'next' button in the tutorial
nextButton.onclick = () => {
  currentStep++; // Move to the next step
  if (currentStep < tutorialSteps.length) {
      updateTutorialContent(); // If there are more steps, update the content
  } else {
      tutorialModal.style.display = 'none'; // If it's the last step, hide the modal
  }
};

// Event listener for the 'close' button in the tutorial
closeButton.onclick = () => {
  tutorialModal.style.display = 'none'; // Hide the tutorial modal
};

// Check if the tutorial has been shown before
if (!localStorage.getItem('tutorialShown')) {
  showTutorial(); // If not, show the tutorial
  localStorage.setItem('tutorialShown', 'true'); // Mark the tutorial as shown
}

// Event listener for the 'previous' button in the tutorial
prevButton.onclick = () => {
  if (currentStep > 0) {
      currentStep--; // Move to the previous step if not on the first step
      updateTutorialContent(); // Update the content
  }
};

// Reincarnation Modal Functions

// Event listener to show the reincarnation modal
reincarnateButton.addEventListener('click', () => {
  modal.style.display = 'block'; // Make the reincarnation modal visible
});

// Event listener for confirming reincarnation
confirmButton.addEventListener('click', () => {
  reincarnation(); // Execute the reincarnation process
  modal.style.display = 'none'; // Hide the modal after confirming
});

// Event listener for canceling reincarnation
cancelButton.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide the modal if reincarnation is canceled
});




///Animation Functions//
/////////////////////////////////////////////////////////////////////////////////////////

// Function to open the side navigation menu
function openNav() {
  document.getElementById("mySidenav").style.width = "10rem"; // Expand the sidenav width
  document.getElementById("main_Page").style.marginLeft = "11.5rem"; // Adjust main page margin
  document.getElementById("main_Page").style.transition = "0.9s"; // Add smooth transition effect
}

// Function to close the side navigation menu
function closeNav() {
  document.getElementById("mySidenav").style.width = "0"; // Close the sidenav
  document.getElementById("main_Page").style.marginLeft = "1.5rem"; // Reset main page margin
}

// Function to open the skills menu
function openSkills() {
  document.getElementById("skill_p_menu").style.height = "calc(100% - 4rem)"; // Expand skills menu to full height minus 4rem
}

// Function to close the skills menu
function closeSkills() {
  document.getElementById("skill_p_menu").style.height = "0"; // Collap skills menu
}

// Layer class for parallax background effect
class Layer {
  constructor(image, speedModifier) {
      this.x = 0; // Initial x position
      this.y = 0; // Initial y position
      this.width = 650; // Layer width
      this.height = 900; // Layer height
      this.x2 = this.width; // Second image x position for seamless scrolling
      this.image = image; // Layer image
      this.speedModifier = speedModifier; // Speed modifier for parallax effect
      this.speed = gameSpeed * this.speedModifier; // Actual speed of the layer
  }

  update() {
      this.speed = gameSpeed * this.speedModifier; // Update speed based on game speed
      // Reset layer positions for infinite scrolling effect
      if (this.x <= -this.width) {
          this.x = this.width + this.x2 - this.speed;
      }
      if (this.x2 <= -this.width) {
          this.x2 = this.width + this.x - this.speed;
      }
      // Move layers to the left
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
  }

  draw() {
      // Draw two instances of the image for seamless scrolling
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

// Bar class for creating and managing health bars
class bar {
  constructor(height, width, x, y, text_y, text_x, max, current, color, color2){
      // Initialize bar properties
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
      // Update bar values for boss health
      this.bar_current = currentHP;
      this.bar_max = MAX_HP;
  }

  drawHPBar(){
      // Draw the background of the health bar
      ctx.fillStyle = this.bar_color;
      ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
      
      if (this.bar_current > 0){
          // Calculate and draw the current health portion of the bar
          const ratio = this.bar_current / this.bar_max;
          const width = this.bar_width * ratio;
          ctx.fillStyle = this.bar_color_2;
          ctx.fillRect(this.bar_x, this.bar_y, width, this.bar_height);
      } else {
          // If health is 0 or less, fill the entire bar with the background color
          ctx.fillStyle = this.bar_color;
          ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
      }
  }
}

// Create an instance of the health bar
const HP_BAR = new bar(HP_BAR_HEIGHT, HP_BAR_WIDTH, HP_BAR_X,
HP_BAR_Y, HP_TEXT_Y, HP_TEXT_X, MAX_HP, currentHP, 'darkred', 'green');

// Create instances of background layers for parallax effect
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);



// Function to draw and manage the boss timer
function drawBossTimer() {
  // Calculate remaining time and timer ratio
  let remainingTime = MAX_BOSS_TIME - bossTimer;
  let timerRatio = remainingTime / MAX_BOSS_TIME;

  // Only draw timer for boss levels (every 5th level)
  if (enemy_level % 5 == 0) {
      // Draw the timer background (black bar)
      ctx.fillStyle = 'black';
      ctx.fillRect(BOSS_TIMER_X, BOSS_TIMER_Y, BOSS_TIMER_WIDTH, BOSS_TIMER_HEIGHT);

      // Draw the timer bar (white, decreasing over time)
      ctx.fillStyle = 'white';
      ctx.fillRect(BOSS_TIMER_X, BOSS_TIMER_Y, BOSS_TIMER_WIDTH * timerRatio, BOSS_TIMER_HEIGHT);

      // Decrease the timer and update localStorage
      bossTimer += TIMER_DECREASE_RATE;
      localStorage.setItem('bossTimer', bossTimer);

      // Check if the boss timer has reached the maximum time
      if (bossTimer >= MAX_BOSS_TIME) {
          handleBossAttack(); // Trigger boss attack
          bossTimer = 0; // Reset timer
          enemy_level -= 1; // Decrease enemy level (player loses)

          // Recalculate and update game state
          MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
          currentHP = MAX_HP;
          gold -= 1 + Math.round((6 * (enemy_level / 10)));

          // Update localStorage with new values
          localStorage.setItem('enemy_level', enemy_level);
          localStorage.setItem('MAX_HP', MAX_HP);
          localStorage.setItem('currentHP', currentHP);
          localStorage.setItem('gold', gold);
          localStorage.setItem('bossTimer', bossTimer);
      }
  }
}

// Function to draw the player's HP bar
function drawPlayerHPBar(){
  // Draw HP bar background (dark red)
  ctx.fillStyle = 'darkred';
  ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, PLAYER_HP_BAR_WIDTH, PLAYER_HP_BAR_HEIGHT);

  // Draw current HP (dark green) if player is alive
  if (player_currentHP > 0) {
      const hpRatio = player_currentHP / player_MAX_HP;
      const hpBarWidth = PLAYER_HP_BAR_WIDTH * hpRatio;
      ctx.fillStyle = 'darkgreen';
      ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, hpBarWidth, PLAYER_HP_BAR_HEIGHT);
  }
}

// Function to draw the player's XP bar
function drawPlayerXpBar(){
  // Draw XP bar background (white)
  ctx.fillStyle = 'white';
  ctx.fillRect(PLAYER_XP_BAR_X, PLAYER_XP_BAR_Y, PLAYER_XP_BAR_WIDTH, PLAYER_XP_BAR_HEIGHT);

  // Draw current XP (blue) if not maxed out
  if (current_xp <= player_MAX_XP) {
      const XPRatio = current_xp / player_MAX_XP;
      const XPBarWidth = PLAYER_XP_BAR_WIDTH * XPRatio;
      ctx.fillStyle = 'blue';
      ctx.fillRect(PLAYER_XP_BAR_X, PLAYER_XP_BAR_Y, XPBarWidth, PLAYER_XP_BAR_HEIGHT);
  }
}

// Function to draw the enemy's HP text
function drawHPText() {
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`HP: ${formatNumber(currentHP)}/${formatNumber(MAX_HP)}`, HP_TEXT_X, HP_TEXT_Y);
}

// Function to draw the player's HP text
function drawPlayerHpText() {
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Player HP: ${formatNumber(player_currentHP)}/${formatNumber(player_MAX_HP)}`, PLAYER_HP_TEXT_X, PLAYER_HP_TEXT_Y);
}

// Function to draw the player's XP text
function drawPlayerXpText(){
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Player XP: ${formatNumber(current_xp)}/${formatNumber(player_MAX_XP)}`, PLAYER_XP_TEXT_X, PLAYER_XP_TEXT_Y);
}

// Function to draw and manage HP particles (visual feedback for damage)
function drawHPParticle() {
  for (let i = hpParticles.length - 1; i >= 0; i--) {
      const particle = hpParticles[i];
      // Set font and color for the particle
      ctx.font = `${HP_PARTICLE_SIZE}px Arial`;
      ctx.fillStyle = particle.color || 'white';
      // Draw the particle text
      ctx.fillText(particle.text, particle.x, particle.y);
      // Move the particle upwards
      particle.y -= 3;
      // Decrease the particle's duration
      particle.duration -= 0.12;

      // Remove the particle if its duration has expired
      if (particle.duration <= 0) {
          hpParticles.splice(i, 1);
      }
  }
}

// Function that animates the canva.
function animate1() {
  // Clear the entire canvas for redrawing
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Update and draw background layers for parallax effect
  layer1.update();
  layer1.draw();
  layer2.update();
  layer2.draw();
  layer3.update();
  layer3.draw();
  layer4.update();
  layer4.draw();

  // Update game state and UI elements
  check_upgrades();
  update_inventory();
  HP_BAR.drawHPBar();
  HP_BAR.updateBoss();
  drawPlayerHPBar();
  drawPlayerXpBar();
  drawBossTimer();
  drawHPParticle();

  // Draw appropriate player animation based on current state
  if (isDead) {
      drawDeadAnimation();
  } else if (isHurt) {
      drawHurtAnimation();
  } else if (isAttacking) {
      drawAttackAnimation();
  } else {
      drawIdleAnimation();
  }
  drawEnemyLevel();

  // Increment frame counter and request next animation frame
  gameframe++;
  requestAnimationFrame(animate1);
}

function drawDeadAnimation() {
  // Draw the dead animation frame
  ctx.drawImage(
      playerDeadImage,
      framex * deathFrameWidth,
      0,
      deathFrameWidth,
      deathFrameHeight,
      0,
      0,
      canvas1.width,
      canvas1.height
  );

  // Advance frames at specified intervals, reset when animation completes
  if (gameframe % staggerframes_dead === 0) {
      if (framex < 5) framex++;
      else {
          framex = 0;
          isDead = false;
      }
  }
}

function drawHurtAnimation() {
  // Update current HP in localStorage
  localStorage.setItem('currentHP', currentHP);

  // Draw the hurt animation frame
  ctx.drawImage(
      playerHurtImage,
      hurt_framex * hurt_width,
      0,
      hurt_width,
      hurt_height,
      0,
      0,
      canvas1.width,
      canvas1.height
  );

  // Advance frames at specified intervals, reset when animation completes
  if (gameframe % staggerframes_hurt === 0) {
      if (hurt_framex < 3) hurt_framex++;
      else {
          hurt_framex = 3;
          isHurt = false;
      }
  }
}

function drawAttackAnimation() {
  // Draw the attack animation frame
  ctx.drawImage(
      playerAttackImage,
      framex * player_width,
      0,
      player_width,
      player_height,
      0,
      0,
      canvas1.width,
      canvas1.height
  );

  // Handle attack animation for boss levels
  if (enemy_level % 5 === 0) {
      if (gameframe % staggerframes_attack === 0) {
          if (framex < 7) framex++;
          else {
              framex = 0;
              isAttacking = true;
              localStorage.setItem('isAttacking', isAttacking);
          }
      }
  } else {
      isAttacking = false;
      localStorage.setItem('isAttacking', isAttacking);
  }
}

function drawIdleAnimation() {
  // Draw the idle animation frame
  ctx.drawImage(
      playerImage,
      framex * player_width,
      framey * player_height,
      player_width,
      player_height,
      0,
      0,
      canvas1.width,
      canvas1.height
  );

  // Advance frames at specified intervals, loop animation
  if (gameframe % staggerframes === 0) {
      if (framex < 3) framex++;
      else framex = 0;
  }
}

function drawEnemyLevel() {
  ctx.font = '1.2rem Lugrasimo';

  // Different display for boss levels
  if (enemy_level % 5 === 0) {
      ctx.fillStyle = 'darkred';
      ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 30); // Draw red background
      ctx.fillStyle = 'white'; // Set text color to white
      ctx.fillText('Boss Demon Fly Level: ' + enemy_level, 1, CANVAS_HEIGHT - 5);
      ctx.fillText('Max Level: ' + max_enemy_level, CANVAS_WIDTH - 150, CANVAS_HEIGHT - 5);
  } else {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 30); // Draw white background
      ctx.fillStyle = 'green'; // Set text color to green
      ctx.fillText(enemy_name + enemy_level, 1, CANVAS_HEIGHT - 5);
      ctx.fillText('Max Level: ' + max_enemy_level, CANVAS_WIDTH - 150, CANVAS_HEIGHT - 5);
  }
}

function drawLoop() {
  // Continuously update and draw HP and XP text
  drawHPText();
  drawPlayerHpText();
  drawPlayerXpText();
  requestAnimationFrame(drawLoop);
}




let isClickDisabled = false; // Flag to track if clicking is disabled

// Function to handle click events on the canvas
function handle_click() {
  if (!isClickDisabled) { // Check if clicking is not currently disabled
    isClickDisabled = true; // Disable clicking to prevent rapid multiple clicks

    if (!isHurt) { // Check if the character is not already hurt
      if (isAttacking) { // Check if the player is attacking
        currentHP -= finalPlayerDamage; // Subtract the player's damage from the enemy's HP
        localStorage.setItem('currentHP', currentHP); // Save the updated HP to local storage

        if (currentHP <= 0) { // Check if the enemy's HP has dropped to 0 or below
          bossTimer = 0; // Reset the boss timer
          localStorage.setItem('bossTimer', bossTimer); // Save the boss timer reset
          isDead = true; // Mark the enemy as dead
          framex = 0; // Reset animation frame
          update_enemy(); // Update the enemy state
          update_inventory(); // Update the player's inventory
        }
      } else {
        isHurt = true; // Mark the player as hurt
        framex = 0; // Reset animation frame
        currentHP -= finalPlayerDamage; // Subtract the player's damage from the enemy's HP
        localStorage.setItem('currentHP', currentHP); // Save the updated HP to local storage

        if (currentHP <= 0) { // Check if the enemy's HP has dropped to 0 or below
          bossTimer = 0; // Reset the boss timer
          localStorage.setItem('bossTimer', bossTimer); // Save the boss timer reset
          isDead = true; // Mark the enemy as dead
          framex = 0; // Reset animation frame
          update_enemy(); // Update the enemy state
          update_inventory(); // Update the player's inventory
        }

        if (fx_play) { // Check if sound effects are enabled
          slash_fx.play(); // Play a slash sound effect
        }
      }

      // Create a new HP particle with updated text
      const HP_PARTICLE_TEXT = "-" + formatNumber(finalPlayerDamage) + " HP"; // Format the damage text
      hpParticles.push({ // Add a new particle to the particles array
        x: canvas1.width - 150, // X-coordinate for the particle's position
        y: canvas1.height - 190, // Y-coordinate for the particle's position
        duration: HP_PARTICLE_DURATION, // Duration for the particle to display
        text: HP_PARTICLE_TEXT, // Text content of the particle
      });

      // Log the damage details for debugging
      console.log('Final Damage: ' + damageMultiplierClicker * (playerDmg * 1 + strength_stat_multi));
      console.log('damageMultiplierClicker:', damageMultiplierClicker);
      console.log('playerDmg:', playerDmg);
      console.log('strength_stat_multi:', strength_stat_multi);
    }

    // Add a delay before re-enabling clicking to prevent rapid multiple clicks
    setTimeout(function() {
      isClickDisabled = false; // Re-enable clicking after the delay
    }, click_delay); // The delay duration in milliseconds
  }
}

// Functions to animate and draw game elements
animate1();
drawLoop();

// Get the canvas element by its ID
let canva_id = document.getElementById('canvas1');

// Add an event listener to the canvas to handle click events
canva_id.addEventListener('click', handle_click);

// Get the scientific notation checkbox element
const checkboxScientificNotation = document.getElementById('scientific-notation-checkbox');

// Load the saved state of the checkbox and set it accordingly
checkboxScientificNotation.checked = localStorage.getItem('scientificNotation') === 'true';
// Add an event listener to update local storage when the checkbox state changes
checkboxScientificNotation.addEventListener('change', () => {
  localStorage.setItem('scientificNotation', checkboxScientificNotation.checked);
});

// Function to run when the window is loaded
window.onload = function () {
  restore_BossAttack(); // Restore boss attack state
  default_purchased(); // Set up default purchases
  highlightSelectedButton(); // Highlight the currently selected button
};


// Initialize skillsOpen variable with a value from local storage or default to 1
let skillsOpen = parseInt(localStorage.getItem('skillsOpen')) || 1;
// Initialize openedNav variable to track navigation state, default to 1
let openedNav = 1;

// Add an event listener for keydown events and call handleKeyPress function
document.addEventListener('keydown', handleKeyPress);

// Function to handle different key press actions
function handleKeyPress(event) {
  switch(event.key) {
    case 'ArrowLeft':  // If the left arrow key is pressed
      previous_level(); // Call function to go to the previous level
      break;
    case 'ArrowRight': // If the right arrow key is pressed
      next_level();     // Call function to go to the next level
      break;
    case 'a':           // If the 'a' key is pressed
      previous_level(); // Call function to go to the previous level
      break;
    case 'd':           // If the 'd' key is pressed
      next_level();     // Call function to go to the next level
      break;
    case 'b':           // If the 'b' key is pressed
      // Toggle the skillsOpen state and update local storage
      if (skillsOpen === 1) {
        skillsOpen = 2; // Set skillsOpen to 2
        localStorage.setItem('skillsOpen', skillsOpen); // Save state to local storage
        openSkills();   // Call function to open skills
        closeNav();     // Call function to close navigation
      } else if (skillsOpen === 2) {
        skillsOpen = 1; // Set skillsOpen back to 1
        localStorage.setItem('skillsOpen', skillsOpen); // Save state to local storage
        closeSkills();  // Call function to close skills
        closeNav();     // Call function to close navigation
      }
      break;
    case 'm':           // If the 'm' key is pressed
      // Toggle the openedNav state and manage skills and nav accordingly
      if (openedNav === 1) {
        openedNav = 2;  // Set openedNav to 2
        openNav();      // Call function to open navigation
        closeSkills();  // Call function to close skills
      } else if (openedNav === 2) {
        openedNav = 1;  // Set openedNav back to 1
        closeNav();     // Call function to close navigation
        closeSkills();  // Call function to close skills
      }
      break;
    case ' ':           // If the spacebar is pressed
      // Delay execution of handle_click by 1 second
      setTimeout(() => {
        handle_click(); // Call function to handle a click event
      }, 1000);
      break;
    case 'l':           // If the 'l' key is pressed
      lock_stage();     // Call function to lock the current stage
      break;
    case '1':           // If the '1' key is pressed
      purchase_amount(1, 'button1'); // Call function to purchase 1 of an item
      break;
    case '2':           // If the '2' key is pressed
      purchase_amount(10, 'button10'); // Call function to purchase 10 of an item
      break;
    case '3':           // If the '3' key is pressed
      purchase_amount(100, 'button100'); // Call function to purchase 100 of an item
      break;
    case 'r':           // If the 'r' key is pressed
      reset();          // Call function to reset the game
      break;
    case 'z':           // If the 'z' key is pressed
      // Add a large amount of gold to the player's total
      gold += 1000000000000000000000000000000000000000000000000;
      break;
    case 'f':           // If the 'f' key is pressed
      // Toggle the auraIsOn state and reload the page
      if (auraIisOn) {
        auraIisOn = false; // Turn off aura
        location.reload(true); // Reload the page from the server
        localStorage.setItem('auraIisOn', auraIisOn); // Save state to local storage
      } else {
        auraIisOn = true; // Turn on aura
        localStorage.setItem('auraIisOn', auraIisOn); // Save state to local storage
      }
      break;
  }
}

// Functin to clear upgrade data by removing specific items from local storage
function clearUpgradeData() {
  const upgradeKeys = ['clicker_upgrade', 'hp_upgrade', 'aura_upgrade', 'regen_upgrade'];

  // Loop through each key and remove associated items from local storage
  upgradeKeys.forEach(key => {
    localStorage.removeItem(`${key}_purchased`);
    localStorage.removeItem(`${key.split('_')[0]}_multiplier`);
  });

  // Reset values in the Upgrades object
  for (let upgrade in Upgrades) {
    // Set the purchased count to 0 for each upgrade type
    Upgrades[upgrade][`${upgrade}_purchased`] = 0;
    Upgrades[upgrade][`${upgrade.split('_')[0]}_multiplier`] = 1;
  }
}

// Function to enable scientific notation checkbox
function enableScientificNotation() {
  document.getElementById('scientific-notation-checkbox').checked = true;
}

// Function to show gold gained animation on the screen
function showGoldGainedAnimation(goldGained) {
  // Create a new div element to display the gold gained
  const goldGainedElement = document.createElement('div');
  goldGainedElement.textContent = `+${goldGained} Gold`; // Set text content
  goldGainedElement.style.position = 'absolute'; // Position it absolutely
  goldGainedElement.style.left = (CANVAS_WIDTH + 100) + 'px'; // Set horizontal position
  goldGainedElement.style.top = (CANVAS_HEIGHT / 2) + 'px'; // Set vertical position
  goldGainedElement.style.fontSize = '24px'; // Set font size
  goldGainedElement.style.color = 'gold'; // Set text color
  goldGainedElement.style.opacity = 1; // Set initial opacity

  // Append the element to the body
  document.body.appendChild(goldGainedElement);

  // Animation variables
  let opacity = 1;
  let yOffset = 0;
  const animationInterval = setInterval(() => {
    opacity -= 0.05; // Decrease opacity over time
    yOffset -= 20; // Move the element upwards
    goldGainedElement.style.opacity = opacity; // Update opacity
    goldGainedElement.style.top = (CANVAS_HEIGHT / 2 + yOffset) + 'px'; // Update position

    // If opacity is zero, stop the animation and remove the element
    if (opacity <= 0) {
      clearInterval(animationInterval);
      document.body.removeChild(goldGainedElement);
    }
  }, 500); // Update every 500ms
}

// Function to update the enemy based on lock state
function update_enemy() {
  if (islock_stage === 2) {
    not_locked_stage(); // Call function to handle unlocked stage
  } else {
    locked_stage(); // Call function to handle locked stage
  }
  handleBossAttack(); // Call function to handle boss attacks
}

// Function for handling unlocked stage logic
function not_locked_stage() {
  enemy_level += enemy_level_increase; // Increase enemy level
  localStorage.setItem('enemy_level', enemy_level); // Save to local storage
  // If the enemy level is a multiple of 5
  if ((enemy_level) % 5 === 0) {
    isAttacking = true; // Set attacking state
    framex = 0; // Reset animation frame
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10))); // Calculate max HP
    localStorage.setItem('MAX_HP', MAX_HP); // Save max HP to local storage
    currentHP = MAX_HP; // Set current HP to max HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
    calculate_gold_gain(); // Call function to calculate gold gain
    gain_xp_unlocked(); // Call function to gain XP for unlocked stage
  } else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20))); // Calculate max HP
    localStorage.setItem('MAX_HP', MAX_HP); // Save max HP to local storage
    currentHP = MAX_HP; // Set current HP to max HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
    calculate_gold_gain(); // Call function to calculate gold gain
    gain_xp_unlocked(); // Call function to gain XP for unlocked stage
  }
}

// Function to update enemy HP
function update_hp() {
  // If the enemy level is a multiple of 5
  if (enemy_level % 5 === 0) {
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10))); // Calculate max HP
    localStorage.setItem('MAX_HP', MAX_HP); // Save max HP to local storage
    currentHP = MAX_HP; // Set current HP to max HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
  } else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20))); // Calculate max HP
    localStorage.setItem('MAX_HP', MAX_HP); // Save max HP to local storage
    currentHP = MAX_HP; // Set current HP to max HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
  }
}

// Function for handling locked stage logic
function locked_stage() {
  enemy_level += 0; // Do not increase enemy level when locked
  localStorage.setItem('enemy_level', enemy_level); // Save to local storage
  // If the enemy level is a multiple of 5
  if ((enemy_level) % 5 === 0) {
    isAttacking = true; // Set attacking state
    framex = 0; // Reset animation frame
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10))); // Calculate max HP
    localStorage.setItem('MAX_HP', MAX_HP); // Save max HP to local storage
    currentHP = MAX_HP; // Set current HP to max HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
    lock_stage_gold_gain(); // Call function to calculate gold gain for locked stage
    gain_xp_locked(); // Call function to gain XP for locked stage
  } else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20))); // Calculate max HP
    localStorage.setItem('MAX_HP', MAX_HP); // Save max HP to local storage
    currentHP = MAX_HP; // Set current HP to max HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
    lock_stage_gold_gain(); // Call function to calculate gold gain for locked stage
    gain_xp_locked(); // Call function to gain XP for locked stage
  }
}

// Function to calculate the gold gained based on the enemy level
function calculate_gold_gain() {
  // If the enemy level is one less than a multiple of 5
  if ((enemy_level - 1) % 5 === 0) {
    const goldGained = goldMultiplier * (10 + Math.round((12 * (enemy_level / 5)))); // Calculate gold gained
    gold += goldGained; // Add gold to total
    localStorage.setItem('gold', gold); // Save gold total to local storage
    showGoldGainedAnimation(goldGained); // Show gold gained animation
  } else {
    const goldGained = goldMultiplier * (1 + Math.round((6 * (enemy_level / 10)))); // Calculate gold gained
    gold += goldGained; // Add gold to total
    localStorage.setItem('gold', gold); // Save gold total to local storage
    showGoldGainedAnimation(goldGained); // Show gold gained animation
  }
}



// Function to reset the game state
function reset() {
  localStorage.clear(); // Clear all data stored in local storage
  location.reload(); // Reload the page to reset the game
}

// Function to update inventory and display elements
function update_inventory() {
  // Define upgrade options with relevant IDs, costs, and multipliers
  const Upgrades = {
    clicker_upgrade: {
      button_id: "clicker_upgrade",
      cost_id: "clicker_upgrade_cost",
      cost: 2,
      clicker_upgrade_purchased: parseInt(localStorage.getItem('clicker_upgrade_purchased')) || 0,
      click_multiplier: parseInt(localStorage.getItem('click_multiplier')) || 1,
    },
    hp_upgrade: {
      button_id: "hp_upgrade",
      cost_id: "hp_upgrade_cost",
      cost: 5,
      hp_upgrade_purchased: parseInt(localStorage.getItem('hp_upgrade_purchased')) || 0,
      hp_multiplier: parseInt(localStorage.getItem('hp_multiplier')) || 1,
    },
    aura_upgrade: {
      button_id: "aura_upgrade",
      cost_id: "aura_upgrade_cost",
      cost: 10,
      aura_upgrade_purchased: parseInt(localStorage.getItem('aura_upgrade_purchased')) || 0,
      aura_multiplier: parseInt(localStorage.getItem('aura_multiplier')) || 1,
    },
    regen_upgrade: {
      button_id: "regen_upgrade",
      cost_id: "regen_upgrade_cost",
      cost: 100,
      regen_upgrade_purchased: parseInt(localStorage.getItem('regen_upgrade_purchased')) || 0,
      regen_multiplier: parseInt(localStorage.getItem('regen_multiplier')) || 1,
    }
  }

  // Retrieve and update various elements related to player stats and upgrades
  const aura_status = document.getElementById('aura_damage');
  const playerHpStatus = document.getElementById('player_health');
  const skillpoints_status = document.getElementById('skill_point_status');
  const player_level_button = document.getElementById('player_level');
  const str_stat_button = document.getElementById('Strength');
  const stamina_stat_button = document.getElementById('Stamina');
  const intellingence_stat_button = document.getElementById('Intelligence');
  const player_regen_status = document.getElementById('player_regen');
  const amountTimeShards = document.getElementById('shards');
  let gold_status = document.getElementById('gold');
  let boss_dps = 2 * boss_damage; // Calculate boss DPS based on damage
  gold_status.innerHTML = "Gold: " + formatNumber(gold); // Display formatted gold amount
  let player_damage_status = document.getElementById('player_damage');
  let boss_damage_status = document.getElementById('boss_damage');
  player_damage_status.innerHTML = "Damage: " + formatNumber(finalPlayerDamage) + " "; // Display player damage
  boss_damage_status.innerHTML = "Boss DPS: " + boss_dps + " "; // Display boss damage per second
  player_level_button.innerHTML = 'Player Level: ' + formatNumber(player_level); // Update player level display
  str_stat_button.innerHTML = 'Strength: ' + strength_stat_multi_added; // Update strength stat display
  stamina_stat_button.innerHTML = 'Stamina: ' + stamina_stat_multi_added; // Update stamina stat display
  intellingence_stat_button.innerHTML = 'Intelligence: ' + intelligence_stat_multi_added; // Update intelligence stat display
  skillpoints_status.innerHTML = "Skill Points: " + skill_points; // Update skill points display
  aura_status.innerHTML = "Aura Damage: " + formatNumber(aura_damage * 2); // Update aura damage display
  playerHpStatus.innerHTML = "Max HP: " + formatNumber(player_MAX_HP); // Update maximum HP display
  player_regen_status.innerHTML = "Player Regen: " + formatNumber(hp_regen); // Update HP regeneration rate display
  amountTimeShards.innerHTML = "Time Shards: " + timeShardsClicker; // Update time shards display
  
  // Check and update the maximum enemy level reached
  if (enemy_level > max_enemy_level) {
    max_enemy_level = enemy_level;
    localStorage.setItem('max_enemy_level', max_enemy_level); // Store maximum enemy level in local storage
  }

  // Check if the stage is locked or unlocked and update the button accordingly
  if (islock_stage === 1) {
    let lock_button = document.getElementById('lock_stage');
    lock_button.style.backgroundColor = "darkred";
    lock_button.style.color = "white";
    lock_button.innerHTML = 'Unlock Stage';
  } else {
    let lock_button = document.getElementById('lock_stage');
    lock_button.style.backgroundColor = "green";
    lock_button.style.color = "white";
    lock_button.innerHTML = "Lock Stage";
  }

  // Display the "glory" element if max enemy level is above a certain threshold
  if (max_enemy_level < 100){
    document.getElementById('glory').style.display = "none"; // Hide if below threshold
  } else {
    document.getElementById('glory').style.display = "inline"; // Show if above threshold
  }

  // Start aura attack if aura upgrade has been purchased
  if (Upgrades['aura_upgrade'].aura_upgrade_purchased > 0) {
    startAuraAttack();
  }

  // Start HP regeneration if regen upgrade has been purchased
  if (Upgrades['regen_upgrade'].regen_upgrade_purchased > 0) {
    startHpRegeneration();
  }

  // Update aura status display based on whether it's on or off
  const auraStatus = document.getElementById('turnAura');
  if (auraIisOn === false) {
    auraStatus.innerHTML = "Off";
    auraStatus.style.background = "darkred";
    auraStatus.style.color = "white";
  } else if (auraIisOn === true) {
    auraStatus.innerHTML = "On";
    auraStatus.style.background = "green";
    auraStatus.style.color = "white";
  }

  // Enable or disable the aura toggle button based on whether the upgrade has been purchased
  if (Upgrades['aura_upgrade'].aura_upgrade_purchased < 1) {
    document.getElementById('turnAura').disabled = true;
  } else {
    document.getElementById('turnAura').disabled = false;
  }

  checkTimeShards(); // Call function to check and update time shards
}

// Function to format numbers with scientific notation or suffixes based on checkbox state
function formatNumber(num) {
  const checkbox = document.getElementById('scientific-notation-checkbox');
  if (!checkbox.checked) { // Check if scientific notation is not selected
    const suffixes = [
      "", " K", " Million", " Billion", " Trillion", " Quadrillion",
      " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion", " Decillion",
      " Undecillion", " Duodecillion", " Tredecillion", " Quattuordecillion", " Quindecillion",
      " Sexdecillion", " Septendecillion", " Octodecillion", " Novemdecillion", " Vigintillion",
      " Unvigintillion", " Duovigintillion", " Trevigintillion", " Quattuorvigintillion", " Quinvigintillion",
      " Sexvigintillion", " Septenvigintillion", " Octovigintillion", " Novemvigintillion", " Trigintillion",
      " Untrigintillion", " Duotrigintillion", " Googol"
    ];

    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3); // Determine suffix based on number magnitude
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2)); // Format number with two decimal places

    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || ""); // Return formatted number with suffix
  } else {
    if (num === 0 || isNaN(num)) {
      return "0";
    }

    const absNum = Math.abs(num);
    if (absNum < 1000) {
      return num.toFixed(2); // Return number as-is if less than 1000
    }

    const exponent = Math.floor(Math.log10(absNum));
    const mantissa = absNum / Math.pow(10, exponent);

    return mantissa.toFixed(2) + "e" + exponent; // Return number in scientific notation
  }
}

// Function to handle the purchase of various game upgrades
function purchase_upgrade(id) {
  const upgrade = Upgrades[id]; // Get the specific upgrade by ID

  if (id == "clicker_upgrade") {
    const baseCost = upgrade.cost;
    const requiredCost = baseCost + (1.5 * upgrade.clicker_upgrade_purchased); // Calculate cost with multiplier
    const new_requiredCost = check_cost(requiredCost, upgrade.clicker_upgrade_purchased, upgrade.cost, clickerCostMultiplier);
    buy_clicker_upgrade(new_requiredCost, 'clicker_upgrade'); // Call function to buy clicker upgrade
  } else if (id == "hp_upgrade") {
    const baseCost = upgrade.cost;
    const requiredCost = baseCost + (1.5 * upgrade.hp_upgrade_purchased);
    const new_requiredCost = check_cost(requiredCost, upgrade.hp_upgrade_purchased, upgrade.cost, staminaCostMultiplier);
    buy_hp_upgrade(new_requiredCost, 'hp_upgrade'); // Call function to buy HP upgrade
  } else if (id == "aura_upgrade") {
    const baseCost = upgrade.cost;
    const requiredCost = baseCost + (2 * upgrade.aura_upgrade_purchased);
    const new_requiredCost = check_cost(requiredCost, upgrade.aura_upgrade_purchased, baseCost, auraCostMultiplier);
    buy_aura_upgrade(new_requiredCost, 'aura_upgrade'); // Call function to buy aura upgrade
  } else if (id == "regen_upgrade") {
    const baseCost = upgrade.cost;
    const requiredCost = baseCost + (2 * upgrade.regen_upgrade_purchased);
    const new_requiredCost = check_cost(requiredCost, upgrade.regen_upgrade_purchased, baseCost, hpRegenCostMultiplier);
    buy_regen_upgrade(new_requiredCost, 'regen_upgrade'); // Call function to buy regen upgrade
  }

  if (fx_play) {
    default_fx.play(); // Play sound effect if enabled
  }

  // Update local storage with new values after purchase
  localStorage.setItem('gold', gold);
  localStorage.setItem('playerDmg', playerDmg);
  localStorage.setItem('player_MAX_HP', player_MAX_HP);
  localStorage.setItem('player_currentHP', player_currentHP);
  localStorage.setItem('aura_damage', aura_damage);
  update_inventory(); // Update display elements
}

// Function to handle the purchase of the regeneration upgrade
function buy_regen_upgrade(new_requiredCost, id) {
  const upgrade = Upgrades[id]; // Get the specific upgrade by ID
  baseCost = upgrade.cost;
  if (gold >= new_requiredCost) { // Check if player has enough gold
    upgrade.regen_upgrade_purchased += buy_upgrade; // Increment the number of purchased regen upgrades
    gold -= new_requiredCost; // Deduct cost from player's gold
    upgrade.regen_multiplier += 0.01 * buy_upgrade; // Increase regen multiplier
    const add_hp_regen = Math.round(stamina_stat_multi + (1 + stamina_stat_multi) * (buy_upgrade + buy_upgrade * (buy_upgrade * upgrade.regen_multiplier)));
    hp_regen += add_hp_regen * finalPurchaseMulti; // Calculate and add new regeneration amount
    if (regen_time <= 500) {
      regen_time = 500; // Set a minimum regen time limit
    } else {
      regen_time -= 0.1 * buy_upgrade; // Decrease regen time with each upgrade
    }

    // Update local storage with new values
    localStorage.setItem('regen_upgrade_purchased', upgrade.regen_upgrade_purchased);
    localStorage.setItem('regen_multiplier', upgrade.regen_multiplier);
    localStorage.setItem('regen_time', regen_time);
    localStorage.setItem('hp_regen', hp_regen);
  }
}

// Function to handle the purchase of the aura upgrade
function buy_aura_upgrade(new_requiredCost, id) {
  const upgrade = Upgrades[id]; // Get the specific upgrade by ID
  baseCost = upgrade.cost;
  if (gold >= new_requiredCost) { // Check if player has enough gold
    upgrade.aura_upgrade_purchased += buy_upgrade; // Increment the number of purchased aura upgrades
    gold -= new_requiredCost; // Deduct cost from player's gold
    upgrade.aura_multiplier += 0.01 * buy_upgrade; // Increase aura multiplier
    const add_aura = Math.round(intelligence_stat_multi + (1 + intelligence_stat_multi) * (buy_upgrade + buy_upgrade * upgrade.aura_multiplier));
    aura_damage += add_aura * finalPurchaseMulti; // Calculate and add new aura damage

    // Update local storage with new values
    localStorage.setItem('aura_upgrade_purchased', upgrade.aura_upgrade_purchased);
    localStorage.setItem('aura_multiplier', upgrade.aura_multiplier);
    localStorage.setItem('aura_damage', aura_damage);
  }
}



function buy_clicker_upgrade(new_requiredCost, id){
  const upgrade = Upgrades[id]; // Fetches the upgrade details from Upgrades array using id

  baseCost = upgrade.cost // Assign the base cost of the upgrade to a variable
  
  if (gold >= new_requiredCost) { // Check if player has enugh gold to buy the upgrade
    upgrade.clicker_upgrade_purchased += buy_upgrade; // Increase the count of purchased clicker upgrades
    gold -= new_requiredCost; // Deduct the gold by the cost of the upgrade
    upgrade.click_multiplier += 0.01 * buy_upgrade; // Increment the click multiplier by a small percentage based on the number of upgrades
    const add_playerDmg = Math.round((strength_stat_multi + (1 + strength_stat_multi) * (buy_upgrade + buy_upgrade * upgrade.click_multiplier))); // Calculates additional player damage based on strength and multipliers
    playerDmg += add_playerDmg * finalPurchaseMulti; // Adds the calculated player damage to total player damage
    finalPlayerDamage = damageMultiplierClicker * (playerDmg * 1 + strength_stat_multi); // Re-calculates final player damage with current multipliers
    
    // Save current state to local storage
    localStorage.setItem('click_multiplier', upgrade.click_multiplier)
    localStorage.setItem('clicker_upgrade_purchased', upgrade.clicker_upgrade_purchased);
    localStorage.setItem('playerDmg', playerDmg);
  }
  else{
    console.log("Not enough gold", new_requiredCost); // Log a message if player doesn't have enough gold
  }
}


function buy_hp_upgrade(new_requiredCost, id){
  const upgrade = Upgrades[id]; // Fetches the upgrade object from Upgrades array using id

  if (gold >= new_requiredCost){ // Checks if player has sufficient gold to buy the upgrade
    upgrade.hp_upgrade_purchased += buy_upgrade; // Increments the number of hp upgrades purchased
    gold -= new_requiredCost; // Deducts the required cost from player's gold

    // Calculates additional HP based on stamina multipliers and the number of upgrades purchased
    const add_hp = Math.round(stamina_stat_multi + (1 + stamina_stat_multi) * (buy_upgrade + buy_upgrade * (buy_upgrade ** upgrade.hp_multiplier)));
    
    upgrade.hp_multiplier += 0.01 * buy_upgrade; // Increment the HP multiplier by a small percentage
    player_MAX_HP += add_hp * finalPurchaseMulti; // Adds the calculated HP to the player's max HP

    // Saves current state to local storage
    localStorage.setItem('hp_multiplier', upgrade.hp_multiplier);
    localStorage.setItem('hp_upgrade_purchased', upgrade.hp_upgrade_purchased);
    localStorage.setItem('player_MAX_HP', player_MAX_HP);
  }
}


function check_upgrades() {    
  for (const upgrade in Upgrades) { // Iterates through each upgrade in the Upgrades object
    if (upgrade == "clicker_upgrade") { // Checks if current upgrade is clicker upgrade
      let data = Upgrades[upgrade]; // Assigns upgrade data to a variable

      // Calculates the required cost for the clicker upgrade
      const requiredCost = data.cost + (1.5 * data.clicker_upgrade_purchased);
      const new_requiredCost = check_cost(requiredCost, data.clicker_upgrade_purchased, data.cost, clickerCostMultiplier);

      let button = document.getElementById(data.button_id); // Fetches the button element for the clicker upgrade
      
      // Calculate additional player damage using strength stat multipliers
      const add_playerDmg = finalPurchaseMulti * Math.round(strength_stat_multi + (1 + strength_stat_multi) * (buy_upgrade + buy_upgrade * data.click_multiplier));
      
      // Calls the upgrade_check function to verify the upgrade purchase availability
      upgrade_check(data.cost_id, new_requiredCost, button, data.clicker_upgrade_purchased, upgrade, 'clicker_upgrade', 
        add_playerDmg, 'Player Damage by', 'Increases Player Click Damage')
    }
    else if (upgrade == 'hp_upgrade'){ // Checks if current upgrade is hp upgrade
      let data = Upgrades[upgrade]; // Assigns upgrade data to a variable

      // Calculates the required cost for the hp upgrade
      const requiredCost = data.cost + (1.5 * data.hp_upgrade_purchased);
      const new_requiredCost = check_cost(requiredCost, data.hp_upgrade_purchased, data.cost, staminaCostMultiplier);
      
      let button = document.getElementById(data.button_id); // Fetches the button element for the hp upgrade
      
      // Calculate additional HP using stamina stat multipliers
      const add_hp = finalPurchaseMulti * Math.round(stamina_stat_multi + (1 + stamina_stat_multi) * (buy_upgrade + buy_upgrade * (buy_upgrade ** data.hp_multiplier)));
      
      // Calls the upgrade_check function to verify the upgrade purchase availability
      upgrade_check(data.cost_id, new_requiredCost, button, data.hp_upgrade_purchased, upgrade, 'hp_upgrade',
        add_hp, 'HP by', 'Increases Max Health')
    }
    else if (upgrade == 'aura_upgrade'){ // Checks if current upgrade is aura upgrade
      let data = Upgrades[upgrade]; // Assigns upgrade data to a variable

      // Calculates the required cost for the aura upgrade
      const requiredCost = data.cost + (1.5 * data.aura_upgrade_purchased);
      const new_requiredCost = check_cost(requiredCost, data.aura_upgrade_purchased, data.cost, auraCostMultiplier);
      
      let button = document.getElementById(data.button_id); // Fetches the button element for the aura upgrade
      
      // Calculate additional aura damage using intelligence stat multipliers
      const add_aura = finalPurchaseMulti * Math.round(intelligence_stat_multi + (1 + intelligence_stat_multi) * (buy_upgrade + buy_upgrade * data.aura_multiplier));
      
      // Calls the upgrade_check function to verify the upgrade purchase availability
      upgrade_check(data.cost_id, new_requiredCost, button, data.aura_upgrade_purchased, upgrade, 'aura_upgrade',
        add_aura, 'Aura by', 'Use your Aura to automatically damage enemies.')
    }
    else if (upgrade == 'regen_upgrade'){ // Checks if current upgrade is regeneration upgrade
      let data = Upgrades[upgrade]; // Assigns upgrade data to a variable

      // Calculates the required cost for the regen upgrade
      const requiredCost = data.cost + (1.5 * data.regen_upgrade_purchased);
      const new_requiredCost = check_cost(requiredCost, data.regen_upgrade_purchased, data.cost, hpRegenCostMultiplier);
      
      let button = document.getElementById(data.button_id); // Fetches the button element for the regen upgrade
      
      // Calculate additional HP regen using stamina stat multipliers
      const add_hp_regen = finalPurchaseMulti * Math.round(stamina_stat_multi + (1 + stamina_stat_multi) * (buy_upgrade + buy_upgrade * (buy_upgrade * data.regen_multiplier)));
      
      // Calls the upgrade_check function to verify the upgrade purchase availability
      upgrade_check(data.cost_id, new_requiredCost, button, data.regen_upgrade_purchased, upgrade, 'regen_upgrade',
        add_hp_regen, 'Regenation by', 'Automatically Regenerates Health Every ' + (regen_time/1000).toFixed(2) + ' seconds')
    }
  }
}


function upgrade_check(cost_id, requiredCost, button, amount_purchased, upgrade, name, increase_by, increase_by_name, upgrade_name) {
  const amountAble = buy_upgrade || 0; // Set the amountAble to buy_upgrade or default to 0 if it's undefined
  
  const costElement = document.getElementById(cost_id); // Fetch the cost element by its id
  
  if (upgrade === name && costElement) { // Checks if the current upgrade matches the given name and the cost element exists
    if (gold >= requiredCost) { // If player has enough gold to buy upgrade
      button.disabled = false; // Enables the button
      button.style.background = "green"; // Change button color to green
      button.style.color = "white"; // Sets button text color to white
      
      // Update the cost element with detailed information about the upgrade
      costElement.innerHTML = `Cost: ${formatNumber(requiredCost)} Gold <br> Trained: (${amount_purchased}) <br> Purchase Amount: ${amountAble}<br>
      Increase ${increase_by_name} : ${formatNumber(increase_by)} <br>-------------<br> ${upgrade_name}`;
    } else {
      button.style.background = "darkred"; // If not enough gold, button stays disabled with red background
      button.style.color = "white"; // Keeps the button text color to white
      button.disabled = true; // Disables the button
      
      // Update the cost element with the same information even if the upgrade can't be purchased
      costElement.innerHTML = `Cost: ${formatNumber(requiredCost)} Gold <br> Trained: (${amount_purchased}) <br> Purchase Amount: ${amountAble}<br>
      Increase ${increase_by_name} : ${formatNumber(increase_by)} <br>-------------<br> ${upgrade_name}`;
    }
  }
}


function check_cost(requiredCost, purchased, baseCost, cost_multi) {
  // Calculate new required cost using base cost, cost multiplier, and number of purchases
  const new_requiredCost = baseCost + (cost_multi * (purchased + buy_upgrade)) * buy_upgrade;
  return new_requiredCost; // Return the calculated new required cost
}


// Time Shard Functions //////////////////////////////////////////////////////////////

function checkTimeShards() {
  const baseTimeShardsRequirements = [ // Array holding time shard requirements for different levels
    { level: 1, shards: 1 },
    { level: 2, shards: 10 },
    { level: 3, shards: 100 },
    // ... other levels ...
  ];

  // Get the requirement for the current reincarnation level
  const currentRequirement = baseTimeShardsRequirements[reincarnationLevelClicker - 1] || baseTimeShardsRequirements[baseTimeShardsRequirements.length - 1];

  const reincarnationButton = document.getElementById('playerReincarnation'); // Gets the reincarnation button
  const reincarnationRequirement = document.getElementById('reincarnationRequirements'); // Gets the requirement element
  const timeShardMulti = document.getElementById('timeShardMulti'); // Element for displaying time shard multiplier
  const goldMulti = document.getElementById('goldMulti'); // Element for displaying gold multiplier
  const reincarnationLevelDisplay = document.getElementById('reincarnationLevel'); // Element for displaying reincarnation level
  const damageMulti = document.getElementById('damageMulti'); // Element for displaying damage multiplier

  if (currentRequirement && timeShardsClicker >= currentRequirement.shards) {
    reincarnationButton.style.backgroundColor = 'darkgreen'; // Button color changes to green if enough time shards
    reincarnationButton.style.color = 'wheat'; // Button text color changes to wheat
  } else {
    reincarnationButton.style.backgroundColor = 'darkred'; // Button color changes to red if not enough time shards
    reincarnationButton.style.color = 'white'; // Button text color changes to white
  }

  if (currentRequirement) {
    reincarnationRequirement.innerHTML = 'Requirements: ' + currentRequirement.shards + ' Time Shards'; // Display the shard requirement
  } else {
    reincarnationRequirement.innerHTML = 'Max level reached'; // Message when max level is reached
  }

  timeShardMulti.innerHTML = 'Time Shard Multiplier: ' + timeShardsMultiplierClicker; // Display the current time shard multiplier
  goldMulti.innerHTML = 'Gold Multiplier: ' + goldMultiplier; // Display the current gold multiplier
  reincarnationLevelDisplay.innerHTML = 'Reincarnation Level: ' + reincarnationLevelClicker; // Display the current reincarnation level
  damageMulti.innerHTML = 'Damage Multiplier: ' + damageMultiplierClicker; // Display the current damage multiplier
}


function reincarnation(){
  const baseTimeShardsRequirements = [ // Base time shard requirements for each reincarnation level
    { level: 1, shards: 1 },
    { level: 2, shards: 10 },
    { level: 3, shards: 100 },
    { level: 4, shards: 1000 },
  ];
  
  // Get the requirement for the current reincarnation level
  const currentRequirement = baseTimeShardsRequirements[reincarnationLevelClicker - 1];
  
  // Calculate the amount of multiplier to be added based on current reincarnation level
  const multiplierAdd = 2 * Math.pow(2, reincarnationLevelClicker + 1);
  
  if (currentRequirement && timeShardsClicker >= currentRequirement.shards){ // Check if player has enogh time shards to reincarnate
    timeShardsClicker -= currentRequirement.shards; // Deduct the required time shards
    reincarnationLevelClicker++; // Increment the reincarnation level
    
    // Update multipliers based on time shard multiplier and current reincarnation level
    goldMultiplier += multiplierAdd * timeShardsMultiplierClicker;
    damageMultiplierClicker += multiplierAdd * timeShardsMultiplierClicker;
    timeShardsMultiplierClicker += multiplierAdd / 3;
    
    clearUpgradeData(); // Clears the upgrade data to reset player stats
    playerDmg = 0; // Resets player damage to 0
    player_MAX_HP = 1000; // Resets max player HP to default value
    player_currentHP = player_MAX_HP; // Sets current player HP to max HP
    hp_regen = 100; // Resets HP regeneration rate
    aura_damage = 0; // Resets aura damage
    aura_frequency = 750; // Resets aura attack frequency
    gold = 0; // Resets player's gold to 0
    
    // Save the updated stats and multipliers in local storage
    localStorage.setItem('playerDmg',playerDmg);
    localStorage.setItem('player_currentHP',player_currentHP);
    localStorage.setItem('player_MAX_HP',player_MAX_HP);
    localStorage.setItem('hp_regen',hp_regen);
    localStorage.setItem('aura_damage',aura_damage);
    localStorage.setItem('timeShardsClicker',timeShardsClicker);
    localStorage.setItem('goldMultiplier',goldMultiplier);
    localStorage.setItem('timeShardsMultiplierClicker',timeShardsMultiplierClicker);
    localStorage.setItem('reincarnationLevel',reincarnationLevelClicker);
    localStorage.setItem('damageMultiplierClicker',damageMultiplierClicker);
    localStorage.setItem('gold',gold);
    localStorage.setItem('aura_frequency',aura_frequency);
    localStorage.setItem('timeShards',timeShardsClicker);
  }
  else{
    alert('You do not have enough time shards to reincarnate'); // Show alert if not enough shards
    modal.style.display = 'none'; // Close the modal window
  }
}




/// Auto Clicker//

function startAuraAttack() {
  const auto_attacks = {
      aura_upgrade: {
          button_id: "aura_upgrade", // ID for the aura upgrade button
          cost_id: "aura_upgrade_cost", // ID for the cost display of aura upgrade
          cost: 10, // Cost for aura upgrade
          aura_upgrade_purchased: parseInt(localStorage.getItem('aura_upgrade_purchased')) || 0, // Number of aura upgrades purchased, default to 0 if not found
          aura_multiplier: parseInt(localStorage.getItem('aura_multiplier')) || 1, // Aura multiplier, default to 1 if not found
      }
  };

  if (!auraActive && auto_attacks['aura_upgrade'].aura_upgrade_purchased > 0 && auraIisOn === true) { // Check if aura is not active, aura upgrades are purchased, and aura is turned on
      auraActive = true; // Set aura as active
      auraInterval = setInterval(function() { // Start an interval for aura attack
          currentHP -= aura_damage; // Decrease current HP by aura damage
          if (!isHurt) { // If not already hurt
              if (isAttacking) { // If player is attacking
                  currentHP -= aura_damage; // Apply aura damage
                  localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
                  if (currentHP <= 0) { // If HP is 0 or less
                      bossTimer = 0; // Reset boss timer
                      localStorage.setItem('bossTimer', bossTimer); // Save boss timer to local storage
                      isDead = true; // Set player as dead
                      framex = 0; // Reset animation frame
                      update_enemy(); // Update enemy state
                      update_inventory(); // Update inventory
                  }
              } else { // If not attacking
                  isHurt = true; // Set player as hurt
                  framex = 0; // Reset animation frame
                  currentHP -= aura_damage; // Apply aura damage
                  localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
                  if (currentHP <= 0) { // If HP is 0 or less
                      bossTimer = 0; // Reset boss timer
                      localStorage.setItem('bossTimer', bossTimer); // Save boss timer to local storage
                      isDead = true; // Set player as dead
                      framex = 0; // Reset animation frame
                      update_enemy(); // Update enemy state
                      update_inventory(); // Update inventory
                  }
                  if (fx_play) { // If sound effects should be played
                      slash_fx.play(); // Play slash effect sound
                  }
              }
              
              // Create a new HP particle with updated text
              const HP_PARTICLE_TEXT = "-" + formatNumber(aura_damage * 2) + " HP"; // Text for the HP particle
              hpParticles.push({ // Add new HP particle to the array
                  x: canvas1.width - 150, // X position of the particle
                  y: canvas1.height - 190, // Y position of the particle
                  duration: HP_PARTICLE_DURATION, // Duration of the particle effect
                  text: HP_PARTICLE_TEXT, // Add the text property
                  color: 'black', // Set the color to black
              });
          }
      }, aura_frequency); // Set the interval frequency
  }
}



function startHpRegeneration(){
  const hpRegen = {
    regen_upgrade: {
      button_id: "regen_upgrade", // ID for the HP regeneration upgrade button
      cost_id: "regen_upgrade_cost", // ID for the cost display of HP regeneration upgrade
      cost: 100, // Cost for HP regeneration upgrade
      regen_upgrade_purchased: parseInt(localStorage.getItem('regen_upgrade_purchased')) || 0, // Number of regen upgrades purchased, default to 0 if not found
      regen_multiplier: parseInt(localStorage.getItem('regen_multiplier')) || 1, // Regen multiplier, default to 1 if not found
    }
  }
  
  if (!hpRegenActive && hpRegen['regen_upgrade'].regen_upgrade_purchased > 0) { // Check if HP regeneration is not active and regen upgrades are purchased
      hpRegenActive = true; // Set HP regeneration as active
      hpRegenInterval = setInterval(function() { // Start an interval for HP regeneration
          player_currentHP += hp_regen; // Increase player's current HP by regen amount
          if (player_currentHP > player_MAX_HP) { // If current HP exceeds max HP
              player_currentHP = player_MAX_HP; // Set current HP to max HP
          }
          localStorage.setItem('player_currentHP', player_currentHP); // Save current HP to local storage
      }, regen_time); // Set the interval time
  }
}




/// Stage and Locks

function previous_level() {
  if (islock_stage === 2) { // Check if the lock stage is 2
    enemy_level -= 1; // Decrease the enemy level by 1
  } else {
    enemy_level += 0; // No change in enemy level (redundant operation)
  }
  localStorage.setItem('enemy_level', enemy_level); // Save updated enemy level to local storage
  
  if (enemy_level < 1) { // If enemy level is less than 1
    enemy_level += enemy_level_increase; // Increase enemy level by a pet amount
  }
  
  bossTimer = 0; // Reset the boss timer
  localStorage.setItem('bossTimer', bossTimer); // Save boss timer to local storage
  
  if ((enemy_level) % 5 === 0) { // Check if enemy level is a multple of 5
    isAttacking = true; // Set attacking state to true
    start_bossAttack(); // Start the boss atack
    localStorage.setItem('enemy_level', enemy_level); // Save updated enemy level to local storage
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10))); // Calculate maximum HP based on enemy level
    localStorage.setItem('MAX_HP', MAX_HP); // Save maximum HP to local storage
    currentHP = MAX_HP; // Set current HP to maximum HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
  } else {
    stop_bossAttack(); // Stop the boss attack if level is not a multiple of 5
    localStorage.setItem('enemy_level', enemy_level); // Save enemy level to local storage
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20))); // Calculate maximum HP for non-boss levels
    localStorage.setItem('MAX_HP', MAX_HP); // Save maximum HP to local storage
    currentHP = MAX_HP; // Set current HP to maximum HP
    localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
  }
  
  if (fx_play) { // Check if sound effects should play
    default_fx.play(); // Play the default sound effect
  }
}


function next_level() {
  if (islock_stage === 2) { // Check if the lock stage is 2
    enemy_level += enemy_level_increase; // Increase enemy level by a preset amount
  } else {
    enemy_level += 0; // No change in enemy level (redundant operation)
  }
  localStorage.setItem('enemy_level', enemy_level); // Save updated enemy level to local storage

  if (enemy_level > max_enemy_level) { // If enemy level exceeds the maximum allowed level
    enemy_level -= 1; // Decrease enemy level by 1 to stay within limits
  } else {
    bossTimer = 0; // Reset the boss timer
    localStorage.setItem('bossTimer', bossTimer); // Save boss timer to local storage

    if ((enemy_level) % 5 === 0) { // Check if enemy level is a multiple of 5
      isAttacking = true; // Set attacking state to true
      start_bossAttack(); // Start the boss attack
      localStorage.setItem('enemy_level', enemy_level); // Save updated enemy level to local storage
      MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10))); // Calculate maximum HP for boss levels
      localStorage.setItem('MAX_HP', MAX_HP); // Save maximum HP to local storage
      currentHP = MAX_HP; // Set current HP to maximum HP
      localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
    } else {
      stop_bossAttack(); // Stop the boss attack if level is not a multiple of 5
      localStorage.setItem('enemy_level', enemy_level); // Save enemy level to local storage
      MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20))); // Calculate maximum HP for non-boss levels
      localStorage.setItem('MAX_HP', MAX_HP); // Save maximum HP to local storage
      currentHP = MAX_HP; // Set current HP to maximum HP
      localStorage.setItem('currentHP', currentHP); // Save current HP to local storage
    }
  }
  if (fx_play) { // Check if sound effects should play
    default_fx.play(); // Play the default sound effect
  }
}


function lock_stage() {
  handleBossAttack(); // Call function to handle boss attacks

  if (enemy_level < max_enemy_level) { // Check if enemy level is below the maximum allowed level
    if (islock_stage === 2) { // Check if the current lock stage is 2
      islock_stage = 1; // Change lock stage to 1
      localStorage.setItem('islock_stage', islock_stage); // Save the updated lock stage to local storage
      enemy_level_increase = 0; // Set the enemy level increase to 0
      localStorage.setItem('enemy_level_increase', enemy_level_increase); // Save the updated level increase to local storage
    } else if (islock_stage === 1) { // Check if the current lock stage is 1
      islock_stage = 2; // Change lock stage to 2
      localStorage.setItem('islock_stage', islock_stage); // Save the updated lock stage to local storage
      enemy_level_increase = 1; // Set the enemy level increase to 1
      localStorage.setItem('enemy_level_increase', enemy_level_increase); // Save the updated level increase to local storage
    }
  }
}

function auraOn() {
  const auraStatus = document.getElementById('turnAura'); // Get the element that displays aura status

  if (auraIisOn === false) { // Check if the aura is currently off
    auraIisOn = true; // Turn the aura on
    auraStatus.innerHTML = "On"; // Update the display text to "On"
    auraStatus.style.background = "green"; // Set the background color to green
    auraStatus.style.color = "white"; // Set the text color to white
  } else if (auraIisOn === true) { // Check if the aura is currently on
    auraIisOn = false; // Turn the aura off
    auraStatus.innerHTML = "Off"; // Update the display text to "Off"
    auraStatus.style.background = "darkred"; // Set the background color to dark red
    auraStatus.style.color = "white"; // Set the text color to white
    location.reload(true); // Reload the page to apply changes
  }

  localStorage.setItem('auraIisOn', JSON.stringify(auraIisOn)); // Save the aura status to local storage
}


function bossAttack() {
  isAttacking = true; // Set the attacking flag to true

  // Calculate the boss's damage based on the current enemy level
  boss_damage = Math.round(6 + enemy_level * (15 * (enemy_level / 20)));
  localStorage.setItem('boss_damage', boss_damage); // Save the boss damage to local storage

  player_currentHP -= boss_damage; // Decrease the player's current HP by the boss's damage
  localStorage.setItem('player_currentHP', player_currentHP); // Save the updated player HP to local storage

  check_player_hp(); // Check if the player is still alive
  update_inventory(); // Update the player's inventory (if needed)
}

function start_bossAttack() {
  clearInterval(bossAttackInterval); // Clear any existing boss attack intervals
  // Start a new interval for boss attacks
  bossAttackInterval = setInterval(bossAttack, boss_attack_time);
  localStorage.setItem('bossAttackInterval', bossAttackInterval); // Save the interval ID to local storage
}

function stop_bossAttack() {
  clearInterval(bossAttackInterval); // Clear the boss attack interval
  localStorage.removeItem('bossAttackInterval'); // Remove the interval ID from local storage
}

function restore_BossAttack() {
  clearInterval(bossAttackInterval); // Clear any existing boss attack intervals
  // Start a new interval for boss attacks
  bossAttackInterval = setInterval(() => bossAttack(), boss_attack_time);
  localStorage.setItem('bossAttackInterval', bossAttackInterval); // Save the interval ID to local storage

  // Stop the boss attack if the enemy level is not a multiple of 5
  if (enemy_level % 5 !== 0) {
    stop_bossAttack();
  }
}

function check_player_hp() {
  if (player_currentHP <= 0) { // Check if the player's HP is 0 or less
    setTimeout(alert('You have died!'), 1000); // Display a death alert after 1 second
    stop_bossAttack(); // Stop the boss attack
    player_currentHP = 0; // Set the player's HP to 0
    enemy_level -= 2; // Decrease the enemy level by 2

    // Further decrease enemy level if the lock stage is 2
    if (islock_stage === 2) {
      enemy_level -= 2;
    }

    localStorage.setItem('enemy_level', enemy_level); // Save the updated enemy level to local storage
    localStorage.setItem('player_currentHP', player_currentHP); // Save the updated player HP to local storage
    update_hp(); // Update the player's HP display
    handleBossAttack(); // Handle boss attack logic (e.g., restart attack if necessary)
  }
}


function handleBossAttack() {
  if (enemy_level % 5 === 0) {
    start_bossAttack(); // Starts the boss attack if enemy level is a multiple of 5
  } else {
    stop_bossAttack(); // Stops the boss attack otherwise
  }
}

function resetPlayerHP(){
  player_currentHP = player_MAX_HP; // Resets player's HP to max HP
  localStorage.setItem('player_currentHP', player_currentHP); // Save the reset HP to local storage
}

function purchase_amount(number, id){
  const button = document.getElementById(id); // Get the button element by id
  button.style.backgroundColor = 'white'; // Sets the button background color
  button.style.color = 'black'; // Sets the button text color
  
  if (number === 1){
    button.innerHTML = '1x'; // Update button text for 1x purchase
    buy_upgrade = 1; // Set purchase amount to 1
  } else if (number === 10){
    button.innerHTML = '10x'; // Update button text for 10x purchase
    buy_upgrade = 10; // Set purchase amount to 10
  } else if (number === 100){
    button.innerHTML = '100x'; // Update button text for 100x purchase
    buy_upgrade = 100; // Set purchase amount to 100
  }

  localStorage.setItem('buy_upgrade', buy_upgrade); // Save the purchase amount to local storage
  localStorage.setItem('selectedButtonId', id); // Save the selected button id to local storage

  clickedButton += 1; // Increment the click count
  localStorage.setItem('clickedButton', clickedButton); // Save the updated click count to local storage
  
  if (fx_play) {
    default_fx.play(); // Play sound effect if enabled
  }
  
  check_purchase(id); // Check and update button styles and states
}

function check_purchase(id) {
  // Get all buttons with the class 'purchase-button'
  const buttons = document.querySelectorAll('.purchase-button');
  
  // Reset the styles of all buttons
  buttons.forEach(button => {
    button.style.backgroundColor = '';
    button.style.color = '';
  });
  
  // Set the styles for the clicked button
  const clickedButton = document.getElementById(id);
  clickedButton.style.backgroundColor = 'green'; // Highlight the clicked button
  clickedButton.style.color = 'white'; // Change text color for selected button
  
  highlightSelectedButton(); // Call to highlight the selected button (function needs to be defined)
}

function gain_xp_locked(){
  let xp_add;
  let level_add;
  
  if (enemy_level % 5 === 0) {
    xp_add = 100 + 2 * (((200 * enemy_level)/100) * 1.5); // Calculate XP for boss
    console.log('Boss XP GAINED: ', xp_add);
  } else {
    xp_add = 100 + (((100 * enemy_level)/100) * 1.5); // Calculate XP for mob
    console.log('Mob XP GAINED: ', xp_add);
  }
  
  if (player_currentHP >= 1) {
    current_xp += xp_add; // Add XP to current XP
  }
  
  if (current_xp >= player_MAX_XP) {
    xp_multiply += 1; // Increase XP multiplier
    player_MAX_XP = 1000 + 2 * (1000 * xp_multiply + 100 * xp_multiply); // Update max XP
    level_add = Math.floor(player_MAX_XP / current_xp); // Calculate level addition
    player_level += level_add; // Increase player level
    skill_points += level_add * 2; // Add skill points
    current_xp = 0; // Reset current XP
    
    localStorage.setItem('skill_points', skill_points); // Save skill points to local storage
  }
  
  localStorage.setItem('player_level', player_level); // Save player level to local storage
  localStorage.setItem('current_xp', current_xp); // Save current XP to local storage
  localStorage.setItem('player_MAX_XP', player_MAX_XP); // Save max XP to local storage
  localStorage.setItem('xp_multiply', xp_multiply); // Save XP multiplier to local storage
}

function gain_xp_unlocked(){
  let xp_add;
  let level_add;
  
  if ((enemy_level - 1) % 5 === 0) {
    xp_add = 100 + 2 * (((200 * enemy_level)/100) * 1.5); // Calculate XP for boss
    console.log('Boss XP GAINED: ', xp_add);
  } else {
    xp_add = 100 + (((100 * enemy_level)/100) * 1.5); // Calculate XP for mob
    console.log('Mob XP GAINED: ', xp_add);
  }
  
  if (player_currentHP >= 1) {
    current_xp += xp_add; // Add XP to current XP
  }
  
  if (current_xp >= player_MAX_XP) {
    xp_multiply += 1; // Increase XP multiplier
    player_MAX_XP = 1000 + 2 * (1000 * xp_multiply + 100 * xp_multiply); // Update max XP
    level_add = Math.floor(player_MAX_XP / current_xp); // Calculate level addition
    player_level += level_add; // Increase player level
    skill_points += level_add * 2; // Add skill points
    current_xp = 0; // Reset current XP
    
    localStorage.setItem('skill_points', skill_points); // Save skill points to local storage
    localStorage.setItem('player_level', player_level); // Save player level to local storage
  }
  
  localStorage.setItem('current_xp', current_xp); // Save current XP to local storage
  localStorage.setItem('player_MAX_XP', player_MAX_XP); // Save max XP to local storage
  localStorage.setItem('xp_multiply', xp_multiply); // Save XP multiplier to local storage
}


// Function to add points to a specific stat
function add_stat(stat){
  if (stat === 'Strength'){
    if (skill_points >= 1) {
      skill_points -= 1; // Deduct 1 skill point
      strength_stat_multi += 0.5; // Increase strength multiplier
      strength_stat_multi_added += 1; // Track the number of additions
      localStorage.setItem('strength_stat_multi', strength_stat_multi); // Save to local storage
      localStorage.setItem('strength_stat_multi_added', strength_stat_multi_added); // Save to local storage
      localStorage.setItem('skill_points', skill_points); // Save updated skill points
    }
  }
  else if (stat === 'Stamina'){
    if (skill_points >= 1) {
      skill_points -= 1; // Deduct 1 skill point
      stamina_stat_multi += 0.5; // Increase stamina multiplier
      stamina_stat_multi_added += 1; // Track the number of additions
      localStorage.setItem('stamina_stat_multi', stamina_stat_multi); // Save to local storage
      localStorage.setItem('stamina_stat_multi_added', stamina_stat_multi_added); // Save to local storage
      localStorage.setItem('skill_points', skill_points); // Save updated skill points
    }
  }
  else if (stat === 'Intelligence'){
    if (skill_points >= 1) {
      skill_points -= 1; // Deduct 1 skill point
      intelligence_stat_multi += 0.5; // Increase intelligence multiplier
      intelligence_stat_multi_added += 1; // Track the number of additions
      localStorage.setItem('intelligence_stat_multi', intelligence_stat_multi); // Save to local storage
      localStorage.setItem('intelligence_stat_multi_added', intelligence_stat_multi_added); // Save to local storage
      localStorage.setItem('skill_points', skill_points); // Save updated skill points
    }
  }
  if (fx_play) {
    skill_point_fx.play(); // Play sound effect if enabled
  }
}

// Function to highlight the selected button
function highlightSelectedButton() {
  const selectedButtonId = localStorage.getItem('selectedButtonId'); // Retrieve selected button ID
  if (selectedButtonId) {
    const selectedButton = document.getElementById(selectedButtonId);
    if (selectedButton) {
      selectedButton.style.backgroundColor = 'darkgrey'; // Highlight selected button
      selectedButton.style.color = 'white'; // Change text color
    }
  }
}

// Function to set default styling for unclicked buttons
function default_purchased(){
  if (clickedButton === 0) {
    document.getElementById('button1').style.backgroundColor = 'darkgrey'; // Set default styling
    document.getElementById('button1').style.color = 'white'; // Change text color
  }
}

// Music and sound control
const backGroundMusicTwo = document.getElementById('BGM-2'); // Background music element
const playPauseTwo = document.getElementById('play_audio_2'); // Play/Pause button for background music
const playPauseFx = document.getElementById('play_fx'); // Play/Pause button for sound effects
let isPlayingTwo = false; // Track if music is playing

// Function to toggle background music
function togglePlayPauseTwo() {
  if (isPlayingTwo) {
    backGroundMusicTwo.pause(); // Pause music
    playPauseTwo.textContent = 'Play BGM'; // Update button text
  } else {
    backGroundMusicTwo.play(); // Play music
    playPauseTwo.textContent = 'Pause BGM'; // Update button text
  }
  isPlayingTwo = !isPlayingTwo; // Toggle state
}

// Function to toggle sound effects
function PlayFx(){
  if (fx_play) {
    playPauseFx.textContent = 'Play Sound'; // Update button text
  } else {
    playPauseFx.textContent = 'Pause Sound'; // Update button text
  }
  fx_play = !fx_play; // Toggle state
}

} else {
  console.log('Canvas1 not found on this page'); // Log error if canvas is not found
}




