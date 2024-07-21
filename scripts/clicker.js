
function openNav() {
  document.getElementById("mySidenav").style.width = "10rem";
  document.getElementById("main_Page").style.marginLeft = "11.5rem";
  document.getElementById("main_Page").style.transition = "0.9s";

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main_Page").style.marginLeft = "1.5rem";
}


function openSkills() {
  document.getElementById("skill_p_menu").style.height = "calc(100% - 4rem)";
}

function closeSkills() {
  document.getElementById("skill_p_menu").style.height = "0";
  
}





var playerDmg = parseInt(localStorage.getItem('playerDmg')) || 1;
var gold = parseInt(localStorage.getItem('gold')) || 0;
let enemy_level = parseInt(localStorage.getItem('enemy_level')) || 1;
let max_enemy_level = parseInt(localStorage.getItem('max_enemy_level')) || 1;
let enemy_level_increase = parseInt(localStorage.getItem('enemy_level_increase')) || 1;
let islock_stage = parseInt(localStorage.getItem('islock_stage')) || 2;
let click_delay  = parseInt(localStorage.getItem('click_delay')) || 100;


///Boss Attack
let boss_damage = parseInt(localStorage.getItem('boss_attack')) || 20;
let boss_attack_time = parseInt(localStorage.getItem('boss_attack_time')) || 500;
let bossAttackInterval;

//Hp Restore
let hp_regen = parseInt(localStorage.getItem('hp_regen')) || 25;
let regen_time = parseInt(localStorage.getItem('regen_time')) || 1500;
let hpRegenInterval;
let regen_multiplier = parseInt(localStorage.getItem('regen_multiplier')) || 1;


///Purchase
let buy_upgrade = parseInt(localStorage.getItem('buy_upgrade')) || 1;
clickedButton = parseInt(localStorage.getItem('clickedButton')) || 0;



///Game Var////
/////////////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 650;
const player_width = 79;
const player_height = 70;
const deadPlayerWidth = 92; // 553 / 6 = 92.16666... (rounded down)
const playerImage = new Image();
const playerHurtImage = new Image();
const playerDeadImage = new Image();
const playerAttackImage = new Image();
playerHurtImage.src = 'images/HURT.png';
playerDeadImage.src = 'images/DEATH.png';
playerAttackImage.src = 'images/New_ATTACK.png';
const hurt_width = 79;
const hurt_height = 69;
const deathFrameWidth = 77; // 553 / 6 = 92.16666... (rounded down)
const deathFrameHeight = 90;
let gameSpeed = 20;

let framex = 0;
let hurt_framex = 3;
let framey = 0;
let gameframe = 0;
const staggerframes = 7;
const staggerframes_hurt = 12;
const staggerframes_dead = 4;
const staggerframes_attack = 5;
let isHurt = false;
let isDead = false;
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
let player_MAX_HP = parseInt(localStorage.getItem('player_MAX_HP')) || 100;
let player_currentHP = parseInt(localStorage.getItem('player_currentHP')) || player_MAX_HP;
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
var skill_points = parseInt(localStorage.getItem('skill_points')) || 0;
const PLAYER_XP_BAR_HEIGHT = 20;
const PLAYER_XP_BAR_X = 10;
const PLAYER_XP_BAR_Y = CANVAS_HEIGHT - 60;
const PLAYER_XP_BAR_WIDTH = CANVAS_WIDTH - 20;
const PLAYER_XP_TEXT_X = PLAYER_XP_BAR_X + 5;
const PLAYER_XP_TEXT_Y = PLAYER_XP_BAR_Y + 15;



// Player Energy bar variables
let player_MAX_ENERGY = parseInt(localStorage.getItem('player_MAX_ENERGY')) || 100;
let current_energy = parseInt(localStorage.getItem('current_energy')) || player_MAX_ENERGY;
let energy_multiplier = parseInt(localStorage.getItem('energy_multiplier')) || 1;
const PLAYER_ENERGY_BAR_HEIGHT = 20;
const PLAYER_ENERGY_BAR_WIDTH = CANVAS_WIDTH - 20;
const PLAYER_ENERGY_BAR_X = 10;
const PLAYER_ENERGY_BAR_Y = CANVAS_HEIGHT - 100;
const PLAYER_ENERGY_TEXT_X = PLAYER_XP_BAR_X + 5;
const PLAYER_ENERGY_TEXT_Y = PLAYER_XP_BAR_Y + 15;





// HP particle variables
const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
const HP_PARTICLE_SIZE = 20;
const HP_PARTICLE_DURATION = 10;
const hpParticles = [];
let hpParticle = null;


playerImage.src = 'images/IDLE.png';

const backgroundLayer1 = new Image();
backgroundLayer1.src = "images/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "images/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "images/layer-3.png"
const backgroundLayer4 = new Image();
backgroundLayer4.src = "images/layer-4.png";

// Boss timer variables
const BOSS_TIMER_X = 10;
const BOSS_TIMER_Y = 25;
const BOSS_TIMER_WIDTH = CANVAS_WIDTH - 20;
const BOSS_TIMER_HEIGHT = 5
const TIMER_DECREASE_RATE = 1 / 60; // Decrease 1 second per frame (assuming 60 FPS)
let MAX_BOSS_TIME = parseInt(localStorage.getItem('MAX_BOSS_TIME')) || 15;
let bossTimer = parseInt(localStorage.getItem('bossTimer')) || MAX_BOSS_TIME;


/// Stat Variables
strength_stat_multi = parseInt(localStorage.getItem('strength_stat_multi')) || 1;
strength_stat_multi_added = parseInt(localStorage.getItem('strength_stat_multi_added')) || 0;
stamina_stat_multi = parseInt(localStorage.getItem('stamina_stat_multi')) || 1;
stamina_stat_multi_added = parseInt(localStorage.getItem('stamina_stat_multi_added')) || 0;

///Spawn Boss Var

//Animation var//
///////////////////////////////////////////////////////////////////////////////////////////
let enemy_name = localStorage.getItem('enemy_name') || 'Demon Fly: ';

///Animation Functions//
/////////////////////////////////////////////////////////////////////////////////////////

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 650;
    this.height = 900;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);

  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
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
    // this.bar_symbol = symbol;
  }

  updateBoss(){
    this.bar_current = currentHP;
    this.bar_max = MAX_HP;
  }
  drawHPBar(){
    ctx.fillStyle = this.bar_color;
    ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
    if (this.bar_current > 0){
      const ratio = this.bar_current / this.bar_max;
      const width = this.bar_width * ratio;
      ctx.fillStyle = this.bar_color_2;
      ctx.fillRect(this.bar_x, this.bar_y, width, this.bar_height);
    }else{
      ctx.fillStyle = this.bar_color;
      ctx.fillRect(this.bar_x, this.bar_y, this.bar_width, this.bar_height);
    }
  }

  
}



const HP_BAR = new bar(HP_BAR_HEIGHT, HP_BAR_WIDTH, HP_BAR_X, 
HP_BAR_Y, HP_TEXT_Y, HP_TEXT_X, MAX_HP, currentHP, 'darkred', 'green');




const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);


function drawBossTimer() {

  let remainingTime = MAX_BOSS_TIME - bossTimer;
  let timerRatio = remainingTime / MAX_BOSS_TIME;
  if (enemy_level % 5 == 0) {
    // Draw the timer background
    ctx.fillStyle = 'black';
    ctx.fillRect(BOSS_TIMER_X, BOSS_TIMER_Y, BOSS_TIMER_WIDTH, BOSS_TIMER_HEIGHT);

    // Draw the timer bar
    ctx.fillStyle = 'white';
    ctx.fillRect(BOSS_TIMER_X, BOSS_TIMER_Y, BOSS_TIMER_WIDTH * timerRatio, BOSS_TIMER_HEIGHT);
    bossTimer += TIMER_DECREASE_RATE;
    localStorage.setItem('bossTimer', bossTimer);
    // Check if the boss timer has reached the maximum time
    if (bossTimer >= MAX_BOSS_TIME) {
      handleBossAttack();
      bossTimer = 0;
      enemy_level -= 1;
      localStorage.setItem('enemy_level', enemy_level);
      MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
      localStorage.setItem('MAX_HP', MAX_HP);
      currentHP = MAX_HP;
      localStorage.setItem('currentHP', currentHP);
      gold -= 1 + Math.round((6 * (enemy_level / 10)));
      localStorage.setItem('gold', gold);
      localStorage.setItem('currentHP', currentHP);
      localStorage.setItem('enemy_level', enemy_level);
      localStorage.setItem('bossTimer', bossTimer);
    }
  }
}

function drawPlayerHPBar(){
  
  // Draw HP bar background
  ctx.fillStyle = 'darkred';
  ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, PLAYER_HP_BAR_WIDTH, PLAYER_HP_BAR_HEIGHT);
  if (player_currentHP > 0) {
    const hpRatio = player_currentHP / player_MAX_HP;
    const hpBarWidth = PLAYER_HP_BAR_WIDTH * hpRatio;
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, hpBarWidth, PLAYER_HP_BAR_HEIGHT);}
}

function drawPlayerXpBar(){
  ctx.fillStyle = 'white';
  ctx.fillRect(PLAYER_XP_BAR_X, PLAYER_XP_BAR_Y, PLAYER_XP_BAR_WIDTH, PLAYER_XP_BAR_HEIGHT);
  if (current_xp <= player_MAX_XP) {
    const XPRatio = current_xp / player_MAX_XP;
    const XPBarWidth = PLAYER_XP_BAR_WIDTH * XPRatio;
    ctx.fillStyle = 'blue';
    ctx.fillRect(PLAYER_XP_BAR_X, PLAYER_XP_BAR_Y, XPBarWidth, PLAYER_XP_BAR_HEIGHT);
  }

}


function drawHPText() {
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`HP: ${currentHP.toFixed(2)}/${MAX_HP.toFixed(2)}`, HP_TEXT_X, HP_TEXT_Y);
}

function drawPlayerHpText() {
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Player HP: ${player_currentHP.toFixed(2)}/${player_MAX_HP.toFixed(2)}`, PLAYER_HP_TEXT_X, PLAYER_HP_TEXT_Y);
}

function drawPlayerXpText(){
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Player XP: ${current_xp.toFixed(2)}/${player_MAX_XP.toFixed(2)}`, PLAYER_XP_TEXT_X, PLAYER_XP_TEXT_Y);

}

function drawHPParticle() {
  for (let i = hpParticles.length - 1; i >= 0; i--) {
    const particle = hpParticles[i];
    ctx.font = `${HP_PARTICLE_SIZE}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(particle.text, particle.x, particle.y);
    particle.y -= 3;
    particle.duration -= 0.12;

    if (particle.duration <= 0) {
      hpParticles.splice(i, 1); // Remove the particle from the array
    }
  }
}

function animate1() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Update and draw background layers
  layer1.update();
  layer1.draw();
  layer2.update();
  layer2.draw();
  layer3.update();
  layer3.draw();
  layer4.update();
  layer4.draw();

  check_upgrades();
  update_inventory();
  HP_BAR.drawHPBar();
  HP_BAR.updateBoss();
  drawPlayerHPBar();
  drawPlayerXpBar();
  drawBossTimer();
  drawHPParticle();



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



  gameframe++;
  requestAnimationFrame(animate1);
}

function drawDeadAnimation() {
  ctx.drawImage(
    playerDeadImage,
    framex * deathFrameWidth,
    0,
    deathFrameWidth,
    deathFrameHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (gameframe % staggerframes_dead === 0) {
    if (framex < 5) framex++;
    else {
      framex = 0;
      isDead = false;
    }
  }
}

function drawHurtAnimation() {
  localStorage.setItem('currentHP', currentHP);
  ctx.drawImage(
    playerHurtImage,
    hurt_framex * hurt_width,
    0,
    hurt_width,
    hurt_height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (gameframe % staggerframes_hurt === 0) {
    if (hurt_framex < 3) hurt_framex++;
    else {
      hurt_framex = 3;
      isHurt = false;
    }
  }
}

function drawAttackAnimation() {
  

  ctx.drawImage(
    playerAttackImage,
    framex * player_width,
    0,
    player_width,
    player_height,
    0,
    0,
    canvas.width,
    canvas.height
  );

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
  ctx.drawImage(
    playerImage,
    framex * player_width,
    framey * player_height,
    player_width,
    player_height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (gameframe % staggerframes === 0) {
    if (framex < 3) framex++;
    else framex = 0;
  }
}

function drawEnemyLevel() {
  ctx.font = '1.2rem Lugrasimo';

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
  drawHPText();
  drawPlayerHpText();
  drawPlayerXpText();
  requestAnimationFrame(drawLoop);
}



let isClickDisabled = false; // Add a flag to track if the click is disabled

function handle_click() {
  if (!isClickDisabled) { // Check if the click is not disabled
    isClickDisabled = true; // Disable the click

    if (!isHurt) {
      if (isAttacking) {
        currentHP -= playerDmg;
        localStorage.setItem('currentHP', currentHP);
        if (currentHP <= 0) {
          bossTimer = 0
          localStorage.setItem('bossTimer', bossTimer);
          isDead = true;
          framex = 0
          resetPlayerHP();
          update_enemy();
          update_inventory();
        }
  } else {
    isHurt = true;
    framex = 0;
    currentHP -= playerDmg;
    localStorage.setItem('currentHP', currentHP);
    if (currentHP <= 0) {
      bossTimer = 0;
      localStorage.setItem('bossTimer', bossTimer);
      isDead = true;
      framex = 0;
      update_enemy();
      update_inventory();
    }
  }
        
      // Create a new HP particle with updated text
    const HP_PARTICLE_TEXT = "-" + formatNumber(playerDmg) + " HP";
    hpParticles.push({
      x: canvas.width - 100,
      y: canvas.height - 190,
      duration: HP_PARTICLE_DURATION,
      text: HP_PARTICLE_TEXT, // Add the text property
    });
  }

  // Add a delay of 500 milliseconds (0.5 seconds) before re-enabling the click
  setTimeout(function() {
    isClickDisabled = false; // Re-enable the click
  }, click_delay); // Adjust the delay time as needed (in milliseconds)
}
}


animate1();
drawLoop();
canvas.addEventListener('click', handle_click);




window.onload = function () {
  restore_BossAttack();
  default_purchased();
  highlightSelectedButton();

 
};

////////////////////////////////
//Utilities

function showGoldGainedAnimation(goldGained) {
  // Create a new div element
  const goldGainedElement = document.createElement('div');
  goldGainedElement.textContent = `+${goldGained} Gold`;
  goldGainedElement.style.position = 'absolute';
  goldGainedElement.style.left = (CANVAS_WIDTH + 100) + 'px';
  goldGainedElement.style.top = (CANVAS_HEIGHT / 2) + 'px';
  goldGainedElement.style.fontSize = '24px';
  goldGainedElement.style.color = 'gold';
  goldGainedElement.style.opacity = 1;

  // Append the element to the document
  document.body.appendChild(goldGainedElement);

  // Animation
  let opacity = 1;
  let yOffset = 0;
  const animationInterval = setInterval(() => {
    opacity -= 0.05;
    yOffset -= 20; // Adjust this value to control the upward speed
    goldGainedElement.style.opacity = opacity;
    goldGainedElement.style.top = (CANVAS_HEIGHT / 2 + yOffset) + 'px';

    if (opacity <= 0) {
      clearInterval(animationInterval);
      document.body.removeChild(goldGainedElement);
    }
  }, 500); // Update every 60th of a second (assuming 60 FPS)
}

function update_enemy(){
  if (islock_stage === 2){
    not_locked_stage();
  }
  else{
    locked_stage();
  }
handleBossAttack();
}
  
function not_locked_stage(){
  enemy_level += enemy_level_increase;
  localStorage.setItem('enemy_level', enemy_level);
  if ((enemy_level) % 5 === 0) {
    isAttacking = true
    framex = 0;
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    calculate_gold_gain();
    gain_xp_unlocked();
  }
  else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    calculate_gold_gain();
    gain_xp_unlocked();
    }
}


function update_hp(){
  if (enemy_level % 5 === 0){
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
  }
  else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
  }
}

function locked_stage(){
  enemy_level += 0;
  localStorage.setItem('enemy_level', enemy_level);
  if ((enemy_level) % 5 === 0) {
    isAttacking = true
    framex = 0;
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    lock_stage_gold_gain();
    gain_xp_locked();
  }
  else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    lock_stage_gold_gain();
    gain_xp_locked();
    }

}

function calculate_gold_gain(){
  if ((enemy_level - 1) % 5 === 0) {
    const goldGained = 10 + Math.round((12 * (enemy_level / 5)));
    gold += goldGained;
    localStorage.setItem('gold', gold);
    showGoldGainedAnimation(goldGained)}
  else{
    const goldGained = 1 + Math.round((6 * (enemy_level / 10)))
    gold += goldGained;
    localStorage.setItem('gold', gold);
    showGoldGainedAnimation(goldGained)}

}

function lock_stage_gold_gain(){
  if ((enemy_level) % 5 === 0) {
    const goldGained = 10 + Math.round((12 * (enemy_level / 5)));
    gold += goldGained;
    localStorage.setItem('gold', gold);
    showGoldGainedAnimation(goldGained)}
  else{
    const goldGained = 1 + Math.round((6 * (enemy_level / 10)))
    gold += goldGained;
    localStorage.setItem('gold', gold);
    showGoldGainedAnimation(goldGained)}
}


function reset() {
  localStorage.clear();
  location.reload()
}

function update_inventory() {
  const skill_point_button = document.getElementById('skill_point');
  const player_level_button = document.getElementById('player_level');
  const skill_points_button = document.getElementById('skill_points');
  const str_stat_button = document.getElementById('Strength');
  const stamina_stat_button = document.getElementById('Stamina');
  gold_status = document.getElementById('gold');
  boss_dps = 2 * boss_damage
  gold_status.innerHTML = "Gold: " + formatNumber(gold);
  player_damage_status = document.getElementById('player_damage');
  boss_damage_status = document.getElementById('boss_damage');
  player_damage_status.innerHTML = "Player Damage: " + formatNumber(playerDmg) + " ";
  boss_damage_status.innerHTML = "Boss DPS: " + boss_dps + " ";
  player_level_button.innerHTML = 'Player Level: ' + formatNumber(player_level);
  skill_points_button.innerHTML = 'Skill Points: ' + formatNumber(skill_points);
  str_stat_button.innerHTML = 'Strength: ' + strength_stat_multi_added;
  stamina_stat_button.innerHTML = 'Stamina: ' + stamina_stat_multi_added;
  skill_point_button.innerHTML = 'Skill Points: '+ skill_points;


  if (enemy_level > max_enemy_level) {
    max_enemy_level = enemy_level;
    localStorage.setItem('max_enemy_level', max_enemy_level);
  }
  if (islock_stage === 1) {
    lock_button = document.getElementById('lock_stage');
    lock_button.style.backgroundColor = "darkred";
    lock_button.style.color = "white";
    lock_button.innerHTML = 'Unlock Stage';
  }
  else{
    lock_button = document.getElementById('lock_stage');
    lock_button.style.backgroundColor = "green";
    lock_button.style.color = "white";
    lock_button.innerHTML = "Lock Stage";
  }

  
}

function formatNumber(num) {
  const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
    , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
  ];
  const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
  const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
  return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
}

////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
//Game //

function purchase_upgrade(id) {
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
    }
  }

  const upgrade = Upgrades[id];

  if (id == "clicker_upgrade") {
    const baseCost = upgrade.cost;
    const new_requiredCost = check_cost(upgrade.clicker_upgrade_purchased, upgrade.cost, 1.5);
    buy_clicker_upgrade(new_requiredCost, 'clicker_upgrade');
  }

  else if (id == "hp_upgrade"){
    const baseCost = upgrade.cost;
    const new_requiredCost = check_cost(upgrade.hp_upgrade_purchased, upgrade.cost, 1.5);
    buy_hp_upgrade(new_requiredCost, 'hp_upgrade');
  }

  localStorage.setItem('gold', gold);
  localStorage.setItem('playerDmg', playerDmg);
  localStorage.setItem('player_MAX_HP', player_MAX_HP);
  localStorage.setItem('player_currentHP', player_currentHP);
  update_inventory();
}

function buy_clicker_upgrade(new_requiredCost, id){
  const Upgrades = {
    clicker_upgrade: {
      button_id: "clicker_upgrade",
      cost_id: "clicker_upgrade_cost",
      cost: 2,
      clicker_upgrade_purchased: parseInt(localStorage.getItem('clicker_upgrade_purchased')) || 0,
      click_multiplier: parseInt(localStorage.getItem('click_multiplier')) || 1,
    }}

  const upgrade = Upgrades[id];
  baseCost = upgrade.cost
  if (gold >= new_requiredCost) {
    upgrade.clicker_upgrade_purchased += buy_upgrade;
    gold -= new_requiredCost;
    upgrade.click_multiplier += 0.1
    const add_playerDmg = Math.round(strength_stat_multi + (1 + strength_stat_multi) * (buy_upgrade + buy_upgrade * upgrade.click_multiplier));
    playerDmg += add_playerDmg;
    localStorage.setItem('click_multiplier', upgrade.click_multiplier)
    localStorage.setItem('clicker_upgrade_purchased', upgrade.clicker_upgrade_purchased);
  }
  else{
    console.log("Not enough gold", new_requiredCost);
  }

}

function buy_hp_upgrade(new_requiredCost, id){
  Upgrades = {hp_upgrade: {
    button_id: "hp_upgrade",
    cost_id: "hp_upgrade_cost",
    cost: 5,
    hp_upgrade_purchased: parseInt(localStorage.getItem('hp_upgrade_purchased')) || 0,
    hp_multiplier: parseInt(localStorage.getItem('hp_multiplier')) || 1,
  }}

  upgrade = Upgrades[id]
  if (gold >= new_requiredCost){
    upgrade.hp_upgrade_purchased += buy_upgrade;
    gold -= new_requiredCost;
    upgrade.hp_multiplier += 0.1;
    const add_hp = Math.round(stamina_stat_multi + (1 + stamina_stat_multi) * (buy_upgrade + buy_upgrade * (buy_upgrade ** upgrade.hp_multiplier)));
    player_MAX_HP += add_hp;
    if (enemy_level % 5 !== 0){
      player_currentHP = player_MAX_HP;
    }
    localStorage.setItem('hp_multiplier', upgrade.hp_multiplier)
    localStorage.setItem('hp_upgrade_purchased', upgrade.hp_upgrade_purchased);
  }

}

function check_upgrades() {
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
    }
  }

  for (const upgrade in Upgrades) {
    if (upgrade == "clicker_upgrade") {
      data = Upgrades[upgrade];
      const new_requiredCost = check_cost(data.clicker_upgrade_purchased, data.cost, 1.5);
      button = document.getElementById(data.button_id);
      const add_playerDmg = Math.round(strength_stat_multi + (1 + strength_stat_multi) * (buy_upgrade + buy_upgrade * data.click_multiplier));
      upgrade_check(data.cost_id, new_requiredCost, button, data.clicker_upgrade_purchased, upgrade, 'clicker_upgrade', 
        add_playerDmg, 'Player Damage', 'Train Strength')
    }
    else if (upgrade == 'hp_upgrade'){
      data = Upgrades[upgrade];
      const new_requiredCost = check_cost(data.hp_upgrade_purchased, data.cost, 1.5);
      button = document.getElementById(data.button_id);
      const add_hp = Math.round(stamina_stat_multi + (1 + stamina_stat_multi) * (buy_upgrade + buy_upgrade * (buy_upgrade ** data.hp_multiplier)));
      upgrade_check(data.cost_id, new_requiredCost, button, data.hp_upgrade_purchased, upgrade, 'hp_upgrade',
        add_hp, 'HP', 'Train Stamina')
    }
  }
}

function upgrade_check(cost_id, requiredCost, button, amount_purchased, upgrade, name, increase_by, increase_by_name, upgrade_name) {
  const amountAble = buy_upgrade || 0; // Provide a default value for buy_upgrade
  const costElement = document.getElementById(cost_id); // Get the cost element

  if (upgrade === name && costElement) { // Check if the element exists
    if (gold >= requiredCost) {
      button.disabled = false;
      button.style.background = "green";
      button.style.color = "white";
      costElement.innerHTML = `Cost: ${requiredCost} Gold <br> Trained: (${amount_purchased}) <br> Purchase Amount: ${amountAble}<br>
      Increase ${increase_by_name} : ${increase_by}`
} else {
      button.style.background = "darkred";
      button.style.color = "white";
      button.disabled = true;
      costElement.innerHTML = `Cost: ${requiredCost} Gold <br> Trained: (${amount_purchased}) <br> Purchase Amount: ${amountAble}<br>
      Increase ${increase_by_name} : ${increase_by}`};

  }
}

function check_cost(purchased, baseCost, cost_multi) {
  const new_requiredCost = baseCost + (cost_multi * (purchased + buy_upgrade)) * buy_upgrade;
  return new_requiredCost;
}


function previous_level() {
  if (islock_stage === 2){
    enemy_level -= 1
  }
  else{
    enemy_level += 0
  }
  localStorage.setItem('enemy_level', enemy_level);
  if (enemy_level < 1) {
    enemy_level += enemy_level_increase;
  }
  bossTimer = 0
  localStorage.setItem('bossTimer', bossTimer);
  resetPlayerHP();
  if ((enemy_level) % 5 === 0) {
    isAttacking = true;
    start_bossAttack();
    localStorage.setItem('enemy_level', enemy_level);
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
  }
  else {
    stop_bossAttack();
    localStorage.setItem('enemy_level', enemy_level);
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
  }
}

function next_level() {
  if (islock_stage === 2){
    enemy_level += enemy_level_increase
  }
  else{
    enemy_level += 0
  }
  localStorage.setItem('enemy_level', enemy_level);
  if (enemy_level > max_enemy_level) {
    enemy_level -= 1;
  }
  else {
    bossTimer = 0
    localStorage.setItem('bossTimer', bossTimer);
    resetPlayerHP();
    if ((enemy_level) % 5 === 0) {
      isAttacking = true;
      start_bossAttack();
      localStorage.setItem('enemy_level', enemy_level);
      MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
      localStorage.setItem('MAX_HP', MAX_HP);
      currentHP = MAX_HP;
      localStorage.setItem('currentHP', currentHP);
    }
    else {
      stop_bossAttack();
      localStorage.setItem('enemy_level', enemy_level);
      MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
      localStorage.setItem('MAX_HP', MAX_HP);
      currentHP = MAX_HP;
      localStorage.setItem('currentHP', currentHP);
    }
  }
}

function lock_stage(){
  handleBossAttack();
  if (enemy_level < max_enemy_level){
    if (islock_stage === 2){
      islock_stage = 1;
      localStorage.setItem('islock_stage', islock_stage);
      enemy_level_increase = 0;
      localStorage.setItem('enemy_level_increase', enemy_level_increase);
    }
    else if (islock_stage === 1){
      islock_stage = 2;
      localStorage.setItem('islock_stage', islock_stage);
      enemy_level_increase = 1;
      localStorage.setItem('enemy_level_increase', enemy_level_increase);
    }
  }
}

function bossAttack(){
  isAttacking = true;
  boss_damage = Math.round(6 + enemy_level * (15 * (enemy_level / 20)))
  localStorage.setItem('boss_damage', boss_damage);
  player_currentHP -= boss_damage;
  localStorage.setItem('player_currentHP', player_currentHP);
  check_player_hp();
  update_inventory();
}

function start_bossAttack() {
  clearInterval(bossAttackInterval);
  bossAttackInterval = setInterval(bossAttack, boss_attack_time);
  localStorage.setItem('bossAttackInterval', bossAttackInterval);
}

function stop_bossAttack(){
  clearInterval(bossAttackInterval)
  localStorage.removeItem('bossAttackInterval')

}

function restore_BossAttack() {
  clearInterval(bossAttackInterval);
  bossAttackInterval = setInterval(() => bossAttack(), boss_attack_time);
  localStorage.setItem('bossAttackInterval', bossAttackInterval);

  if (enemy_level % 5 !== 0) {
    stop_bossAttack();
  }
}

function check_player_hp(){
  if (player_currentHP <= 0){
    stop_bossAttack();
    bossTimer = 0;
    localStorage.setItem('bossTimer', bossTimer);
    if (islock_stage === 2){
      enemy_level -= 2;
    }
    localStorage.setItem('enemy_level', enemy_level);
    player_currentHP = player_MAX_HP;
    localStorage.setItem('player_currentHP', player_currentHP);
    update_hp();
    handleBossAttack();
  }
}

function handleBossAttack() {
  if (enemy_level % 5 === 0) {
    start_bossAttack();
  } 
  else {
    stop_bossAttack();
  }
}

function resetPlayerHP(){
  player_currentHP = player_MAX_HP;
  localStorage.setItem('player_currentHP', player_currentHP);
}


function purchase_amount(number, id){
  button = document.getElementById(id)
  button.style.backgroundColor = 'white'
  button.style.color = 'black'
  if (number === 1){
    button.innerHTML = '1x';
    buy_upgrade = 1;
    localStorage.setItem('buy_upgrade', buy_upgrade);
    localStorage.setItem('selectedButtonId', id); 
  }
  else if (number === 10){
    button.style.backgroundColor = 'white'
    button.style.color = 'black'
    button.innerHTML = '10x';
    buy_upgrade = 10;
    localStorage.setItem('buy_upgrade', buy_upgrade);
    localStorage.setItem('selectedButtonId', id); 

  }
  else if (number === 100){
    button.style.backgroundColor = 'white'
    button.style.color = 'black'
    button.innerHTML = '100x';
    buy_upgrade = 100;
    localStorage.setItem('buy_upgrade', buy_upgrade);
    localStorage.setItem('selectedButtonId', id); 


  }

  clickedButton += 1;
  localStorage.setItem('clickedButton', clickedButton);
  check_purchase(id)

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
  clickedButton.style.backgroundColor = 'green';
  clickedButton.style.color = 'white';
  highlightSelectedButton();
}


function gain_xp_locked(){
  const skill_point_button = document.getElementById('skill_point');
  let xp_add;
  let level_add;
  if (enemy_level % 5 === 0){
    xp_add = 100 + 2 * (((200 * enemy_level)/100) * 1.5)
    console.log('Boss XP GAINED: ' , xp_add)

  }
  else{
    xp_add = 100 + (((100 * enemy_level)/100) * 1.5)
    console.log('Mob XP GAINED: ' , xp_add)

  }
  if (player_currentHP >= 1){
    current_xp += xp_add;
  }
  if (current_xp >= player_MAX_XP){
    xp_multiply += 1;
    player_MAX_XP = 1000 + 2 * (1000 * xp_multiply + 100 * xp_multiply);
    level_add = Math.floor(player_MAX_XP/current_xp);
    player_level += level_add;
    skill_points += level_add * 2;
    current_xp = 0;
    localStorage.setItem('skill_points', skill_points);
    skill_point_button.innerHTML = 'Skill Points: '+ skill_points;

  }
  localStorage.setItem('player_level', player_level);
  localStorage.setItem('current_xp', current_xp);
  localStorage.setItem('player_MAX_XP', player_MAX_XP);
  localStorage.setItem('xp_multiply', xp_multiply);

}

function gain_xp_unlocked(){
  const skill_point_button = document.getElementById('skill_point');
  let xp_add;
  let level_add;
  if ((enemy_level - 1) % 5 === 0){
    xp_add = 100 + 2 * (((200 * enemy_level)/100) * 1.5)
    console.log('Boss XP GAINED: ' , xp_add)
  }
  else{
    xp_add = 100 + (((100 * enemy_level)/100) * 1.5)
    console.log('Mob XP GAINED: ' , xp_add)

  }
  if (player_currentHP >= 1){
    current_xp += xp_add;
  }  
  if (current_xp >= player_MAX_XP){
    xp_multiply += 1;
    player_MAX_XP = 1000 + 2 * (1000 * xp_multiply + 100 * xp_multiply);
    level_add = Math.floor(player_MAX_XP/current_xp);
    player_level += level_add;
    localStorage.setItem('player_level', player_level);
    skill_points += level_add * 2;
    current_xp = 0;
    localStorage.setItem('skill_points', skill_points);
    skill_point_button.innerHTML = 'Skill Points: '+ skill_points;
  }
  localStorage.setItem('current_xp', current_xp);
  localStorage.setItem('player_MAX_XP', player_MAX_XP);
  localStorage.setItem('xp_multiply', xp_multiply);
}

function add_stat(stat){
  if (stat === 'Strength'){
    if (skill_points >= 1){
      skill_points -= 1;
      strength_stat_multi += 0.1;
      strength_stat_multi_added += 1;
      localStorage.setItem('strength_stat_multi', strength_stat_multi);
      localStorage.setItem('strength_stat_multi_added', strength_stat_multi_added);
      localStorage.setItem('skill_points', skill_points);
    }
  }
  else if (stat === 'Stamina'){
    if (skill_points >= 1){
      skill_points -= 1;
      stamina_stat_multi += 0.1;
      stamina_stat_multi_added += 1;
      localStorage.setItem('stamina_stat_multi', stamina_stat_multi);
      localStorage.setItem('stamina_stat_multi_added', stamina_stat_multi_added);
      localStorage.setItem('skill_points', skill_points);
    }
  }
}

function highlightSelectedButton() {
  const selectedButtonId = localStorage.getItem('selectedButtonId');
  if (selectedButtonId) {
    const selectedButton = document.getElementById(selectedButtonId);
    if (selectedButton) {
      selectedButton.style.backgroundColor = 'darkgrey';
      selectedButton.style.color = 'white';
    }
  }
}


function default_purchased(){
  if (clickedButton === 0){
    document.getElementById('button1').style.backgroundColor = 'darkgrey';
    document.getElementById('button1').style.color = 'white';
  }
}





////music playing
const audioElementTwo = document.getElementById('BGM-2');
const playPauseBtnTwo = document.getElementById('play_audio_2');
let isPlayingTwo = false;

function togglePlayPauseTwo() {
  if (isPlayingTwo) {
    audioElementTwo.pause();
    playPauseBtnTwo.textContent = 'Play';
  } else {
    audioElementTwo.play();
    playPauseBtnTwo.textContent = 'Pause';
  }
  isPlayingTwo = !isPlayingTwo;
}

function spawn_boss(boss_name){
  if (boss_name === 'Amotheus'){
    alert('Amotheus Duke of Hell has appeared!')
    MAX_HP = 100000;
    currentHP = MAX_HP;}
    boss_damage = 1000;
    enemy_level = 500;
    boss_fight = 'true';
  }
  localStorage.setItem('boss_fight', boss_fight);
  localStorage.setItem('boss_damage', boss_damage);

function check_boss(){

}

var canvass = document.getElementById('can');
canvass.onselectstart = function () { return false; }