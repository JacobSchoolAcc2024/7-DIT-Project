

let playerDmg = parseInt(localStorage.getItem('playerDmg')) || 1;
let gold = parseInt(localStorage.getItem('gold')) || 0;
let enemey_level = parseInt(localStorage.getItem('enemy_level')) || 1;




///Game Var////
/////////////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
const player_width = 79;
const player_height = 69;
const playerImage = new Image();
const playerHurtImage = new Image();
playerHurtImage.src = 'HURT.png';
const hurt_width = 79;
const hurt_height = 69;
let gameSpeed = 20;

let framex = 0;
let framey = 0;
let gameframe = 0;
const staggerframes = 10;
const staggerframes_hurt = 1.5;
let isHurt = false;

// HP bar variables
let MAX_HP = parseInt(localStorage.getItem('MAX_HP')) || 20;
let currentHP = parseInt(localStorage.getItem('currentHP')) || 20;
const HP_BAR_HEIGHT = 20;
const HP_BAR_X = 10;
const HP_BAR_Y = 10;
const HP_BAR_WIDTH = CANVAS_WIDTH - 20;
const HP_TEXT_X = HP_BAR_X + 5;
const HP_TEXT_Y = HP_BAR_Y + 15;

// HP particle variables
const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
const HP_PARTICLE_SIZE = 20;
const HP_PARTICLE_DURATION = 60;
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

//Animation var//
///////////////////////////////////////////////////////////////////////////////////////////



///Animation Functions//
/////////////////////////////////////////////////////////////////////////////////////////

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 550;
        this.height = 500;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);

    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);

function drawHPBar() {

  // Draw HP bar background
  ctx.fillStyle = 'gray';
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
  ctx.font = '16px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${currentHP}/${MAX_HP}`, HP_TEXT_X, HP_TEXT_Y);
}

function drawHPParticle() {
  if (hpParticle) {
    ctx.font = `${HP_PARTICLE_SIZE}px Arial`;
    ctx.fillStyle = 'red';
    ctx.fillText(hpParticle.text, hpParticle.x, hpParticle.y); // Use hpParticle.text
    hpParticle.y -= 2;
    hpParticle.duration--;

    if (hpParticle.duration <= 0) {
      hpParticle = null;
    }
  }
}


function animate1() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer1.update();
  layer1.draw();
  layer2.update();
  layer2.draw();


  drawHPBar();
  drawHPParticle();

  if (isHurt) {
    // Draw hurt animation frames
    ctx.drawImage(
      playerHurtImage,
      framex * hurt_width,
      0,
      hurt_width,
      hurt_height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (gameframe % staggerframes_hurt === 0) {
      if (framex < 3) framex++;
      else {
        framex = 0;
        isHurt = false;
      }
    }
  } else {
    // Draw idle animation frames
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
  ctx.font = '2vw Robotto';
  ctx.fillStyle = 'white';
  ctx.fillText('Newbie Demon Fly', 10, CANVAS_HEIGHT - 430);
  gameframe++;
  requestAnimationFrame(animate1);
}

function drawLoop() {
  drawHPText();
  requestAnimationFrame(drawLoop);
}

canvas.addEventListener('click', () => {
  if (!isHurt) {
    isHurt = true;
    framex = 0;
    currentHP -= playerDmg;
    localStorage.setItem('currentHP', currentHP);
    if (currentHP <= 0) {
      MAX_HP += 5 + (20 * (enemey_level / 10));
      localStorage.setItem('MAX_HP', MAX_HP);
      currentHP = MAX_HP;
      localStorage.setItem('currentHP', currentHP);
      gold += 1 + (2 * (enemey_level / 10));
      localStorage.setItem('gold', gold);
      update_inventory();
    }

    // Create a new HP particle with updated text
    const HP_PARTICLE_TEXT = "-" + playerDmg + "HP";
    hpParticle = {
      x: canvas.width - 100,
      y: canvas.height - 200,
      duration: HP_PARTICLE_DURATION,
      text: HP_PARTICLE_TEXT, // Add the text property
    };
  }
});


animate1();
drawLoop();


////////////////////////////////
//Utilities

function reset(){
    localStorage.clear();
}

function update_inventory(){
    gold_status = document.getElementById('gold');
    gold_status.innerHTML = "Gold:" + gold;
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

function purchase_upgrade(id){
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

  if (id == "clicker_upgrade"){
    const requiredCost = baseCost + formatNumber((baseCost * Math.pow(1.15, upgrade.clicker_upgrade_purchased)));
    if (gold >= requiredCost){
      upgrade.clicker_upgrade_purchased += 1;
      gold -= requiredCost;
      playerDmg += 1;
      localStorage.setItem('clicker_upgrade_purchased', upgrade.clicker_upgrade_purchased);
      document.getElementById(upgrade.cost_id).innerHTML = requiredCost + " Gold";
      console.log(upgrade.clicker_upgrade_purchased);
      console.log(requiredCost);
  }}

  localStorage.setItem('gold', gold);
  localStorage.setItem('playerDmg', playerDmg); 
  update_inventory();

  

}
