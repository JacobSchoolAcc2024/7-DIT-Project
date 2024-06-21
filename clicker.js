
function openNav() {
  document.getElementById("mySidenav").style.width = "10rem";
  document.getElementById("main_Page").style.marginLeft = "11.5rem";
  document.getElementById("main_Page").style.transition = "0.9s";

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main_Page").style.marginLeft = "1.5rem";
}




let playerDmg = parseInt(localStorage.getItem('playerDmg')) || 1;
let gold = parseInt(localStorage.getItem('gold')) || 0;
let enemy_level = parseInt(localStorage.getItem('enemy_level')) || 1;
let max_enemy_level = parseInt(localStorage.getItem('max_enemy_level')) || 1;
let islock_stage = parseInt(localStorage.getItem('islock_stage')) || 2;





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
playerHurtImage.src = 'HURT.png';
playerDeadImage.src = 'DEATH.png';
playerAttackImage.src = 'New_ATTACK.png';
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
let player_MAX_HP = parseInt(localStorage.getItem('player_MAX_HP')) || 10;
let player_currentHP = parseInt(localStorage.getItem('player_currentHP')) || player_MAX_HP;
const PLAYER_HP_BAR_HEIGHT = 25;
const PLAYER_HP_BAR_X = 10;
const PLAYER_HP_BAR_Y = 30;
const PLAYER_HP_BAR_WIDTH = CANVAS_WIDTH - 20;
const PLAYER_HP_TEXT_X = PLAYER_HP_BAR_X + 5;
const PLAYER_HP_TEXT_Y = PLAYER_HP_BAR_Y + 20;






// HP particle variables
const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
const HP_PARTICLE_SIZE = 20;
const HP_PARTICLE_DURATION = 10;
const hpParticles = [];
let hpParticle = null;


playerImage.src = 'IDLE.png';

const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png"
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png";

// Boss timer variables
const BOSS_TIMER_X = 10;
const BOSS_TIMER_Y = 25;
const BOSS_TIMER_WIDTH = CANVAS_WIDTH - 20;
const BOSS_TIMER_HEIGHT = 5
const TIMER_DECREASE_RATE = 1 / 60; // Decrease 1 second per frame (assuming 60 FPS)
let MAX_BOSS_TIME = parseInt(localStorage.getItem('MAX_BOSS_TIME')) || 15;
let bossTimer = parseInt(localStorage.getItem('bossTimer')) || MAX_BOSS_TIME;



//Animation var//
///////////////////////////////////////////////////////////////////////////////////////////



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
  ctx.fillStyle = 'blue';
  ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, PLAYER_HP_BAR_WIDTH, PLAYER_HP_BAR_HEIGHT);
  if (player_currentHP > 0) {
    const hpRatio = player_currentHP / player_MAX_HP;
    const hpBarWidth = PLAYER_HP_BAR_WIDTH * hpRatio;
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, hpBarWidth, PLAYER_HP_BAR_HEIGHT);
  } else {
    // If currentHP is 0, make the HP bar completely red
    ctx.fillStyle ='red';
    ctx.fillRect(PLAYER_HP_BAR_X, PLAYER_HP_BAR_Y, PLAYER_HP_BAR_WIDTH, PLAYER_HP_BAR_HEIGHT);

  }
}


function drawHPBar() {

  // Draw HP bar background
  ctx.fillStyle = 'darkred';
  ctx.fillRect(HP_BAR_X, HP_BAR_Y, HP_BAR_WIDTH, HP_BAR_HEIGHT);

  // Draw HP bar
  if (currentHP > 0) {
    const hpRatio = currentHP / MAX_HP;
    const hpBarWidth = HP_BAR_WIDTH * hpRatio;
    ctx.fillStyle = 'green';
    ctx.fillRect(HP_BAR_X, HP_BAR_Y, hpBarWidth, HP_BAR_HEIGHT);
  } else {
    // If currentHP is 0, make the HP bar completely red
    ctx.fillStyle = 'red';
    ctx.fillRect(HP_BAR_X, HP_BAR_Y, HP_BAR_WIDTH, HP_BAR_HEIGHT);
  }
}

function drawHPText() {
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${currentHP.toFixed(2)}/${MAX_HP.toFixed(2)}`, HP_TEXT_X, HP_TEXT_Y);
}

function drawPlayerHpText() {
  ctx.font = '1rem Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Player HP: ${player_currentHP.toFixed(2)}/${player_MAX_HP.toFixed(2)}`, PLAYER_HP_TEXT_X, PLAYER_HP_TEXT_Y);
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
  drawHPBar();
  drawPlayerHPBar();
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
  ctx.font = '1.5rem Robotto';

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
    ctx.fillText('Newbie Demon Fly Level: ' + enemy_level, 1, CANVAS_HEIGHT - 5);
    ctx.fillText('Max Level: ' + max_enemy_level, CANVAS_WIDTH - 150, CANVAS_HEIGHT - 5);

  }
}




function drawLoop() {
  drawHPText();
  drawPlayerHpText();
  requestAnimationFrame(drawLoop);
}



function handle_click() {
 
  if (!isHurt) {
    if (isAttacking){
      currentHP -= playerDmg;
      localStorage.setItem('currentHP', currentHP);
      if (currentHP <= 0){
        bossTimer = 0
        localStorage.setItem('bossTimer', bossTimer);
        isDead = true;  
        framex = 0    
        update_enemy();
        update_inventory();
      
      }
    }
    else{
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
      update_inventory();}
    }

    // Create a new HP particle with updated text
    const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
    hpParticles.push({
      x: canvas.width - 100,
      y: canvas.height - 190,
      duration: HP_PARTICLE_DURATION,
      text: HP_PARTICLE_TEXT, // Add the text property
    });
  }
}

canvas.addEventListener('click', handle_click)
animate1();
drawLoop();


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
  
  }
  
function not_locked_stage(){
  enemy_level += 1;
  localStorage.setItem('enemy_level', enemy_level);
  if ((enemy_level) % 5 === 0) {
    isAttacking = true
    framex = 0;
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    if(islock_stage === 2){
      calculate_gold_gain();
    }
    else{
      calculate_gold_gain();
    }
  }
  else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    calculate_gold_gain();
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
  }
  else {
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
    lock_stage_gold_gain();
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
  gold_status = document.getElementById('gold');
  gold_status.innerHTML = "Gold: " + gold;
  if (enemy_level > max_enemy_level) {
    max_enemy_level = enemy_level;
    localStorage.setItem('max_enemy_level', max_enemy_level);
  }
  if (islock_stage === 1) {
    lock_button = document.getElementById('lock_stage');
    lock_button.style.backgroundColor = "red";
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
    }
  }

  const upgrade = Upgrades[id];
  const baseCost = upgrade.cost;

  if (id == "clicker_upgrade") {
    const requiredCost = baseCost + (1.5 * upgrade.clicker_upgrade_purchased);
    if (gold >= requiredCost) {
      upgrade.clicker_upgrade_purchased += 1.5;
      gold -= requiredCost;
      playerDmg += 1;
      localStorage.setItem('clicker_upgrade_purchased', upgrade.clicker_upgrade_purchased);
      console.log(upgrade.clicker_upgrade_purchased);
      console.log(requiredCost);
    }
    else {
      console.log(requiredCost);
    }

  }

  localStorage.setItem('gold', gold);
  localStorage.setItem('playerDmg', playerDmg);
  update_inventory();
}

function check_upgrades() {
  const Upgrades = {
    clicker_upgrade: {
      button_id: "clicker_upgrade",
      cost_id: "clicker_upgrade_cost",
      cost: 2,
      clicker_upgrade_purchased: parseInt(localStorage.getItem('clicker_upgrade_purchased')) || 0,
    }
  }

  for (const upgrade in Upgrades) {
    if (upgrade == "clicker_upgrade") {
      data = Upgrades[upgrade];
      const requiredCost = data.cost + (1.5 * data.clicker_upgrade_purchased);
      button = document.getElementById(data.button_id);
      if (gold >= requiredCost) {
        button.disabled = false;
        button.style.background = "green";
        button.style.color = "white";
        document.getElementById(data.cost_id).innerHTML = requiredCost + " Gold" + " (" + data.clicker_upgrade_purchased + ")";
      }
      else {
        button.style.background = "darkred";
        button.style.color = "white";
        button.disabled = true;
        document.getElementById(data.cost_id).innerHTML = requiredCost + " Gold" + " (" + data.clicker_upgrade_purchased + ")";
      }
    }
  }
}

function previous_level() {
  if (islock_stage === 2){
    enemy_level -= 1
  }
  else{
    enemy_level += 0
  }
  localStorage.setItem('enemy_level', enemy_level);
  bossTimer = 0
  localStorage.setItem('bossTimer', bossTimer);
  if (enemy_level < 1) {
    enemy_level += 1;
  }
  if ((enemy_level) % 5 === 0) {
    localStorage.setItem('enemy_level', enemy_level);
    MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
  }
  else {
    localStorage.setItem('enemy_level', enemy_level);
    MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
    localStorage.setItem('MAX_HP', MAX_HP);
    currentHP = MAX_HP;
    localStorage.setItem('currentHP', currentHP);
  }
}

function next_level() {
  if (islock_stage === 2){
    enemy_level += 1
  }
  else{
    enemy_level += 0
  }
  localStorage.setItem('enemy_level', enemy_level);
  bossTimer = 0
  localStorage.setItem('bossTimer', bossTimer);
  if (enemy_level > max_enemy_level) {
    enemy_level -= 1;
  }
  else {
    if ((enemy_level) % 5 === 0) {
      localStorage.setItem('enemy_level', enemy_level);
      MAX_HP = Math.round(10 + enemy_level * (20 * (enemy_level / 10)));
      localStorage.setItem('MAX_HP', MAX_HP);
      currentHP = MAX_HP;
      localStorage.setItem('currentHP', currentHP);
    }
    else {
      localStorage.setItem('enemy_level', enemy_level);
      MAX_HP = Math.round(5 + enemy_level * (10 * (enemy_level / 20)));
      localStorage.setItem('MAX_HP', MAX_HP);
      currentHP = MAX_HP;
      localStorage.setItem('currentHP', currentHP);
    }
  }
}

function lock_stage(){
  if (islock_stage === 2){
    islock_stage = 1;
    localStorage.setItem('islock_stage', islock_stage);
  }
  else if (islock_stage === 1){
    islock_stage = 2;
    localStorage.setItem('islock_stage', islock_stage);
  }
}

