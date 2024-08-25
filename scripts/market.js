//variables for canvas size
const market_canva = document.getElementById("market_canvas");
const ctx2 = market_canva.getContext('2d');
const CANVASHEIGHT = market_canva.height = 300;
const CANVASWIDTH = market_canva.width = 300;

//variables for increasing player hp
let market_MAX_HP = parseInt(localStorage.getItem('player_MAX_HP')) || 100;
let market_currentHP = parseInt(localStorage.getItem('player_currentHP')) || market_MAX_HP;

//variables of images of weapons
const epicSword = new Image();
epicSword.src = '../images/epic_Sword.png';
const dirtyIceCream = new Image();
dirtyIceCream.src ='../images/dirtyIceCream.png';
const w_Sword = new Image();
w_Sword.src = '../images/w_Sword.png';
const d_Sword = new Image();
d_Sword.src = '../images/d_Sword.png';
const e_pickaxe = new Image();
e_pickaxe.src = '../images/e_pickaxe.png';
const i_pickaxe = new Image();
i_pickaxe.src = '../images/i_pickaxe.png';
const w_pickaxe = new Image();
w_pickaxe.src = '../images/w_pickaxe.png';
const genkidama = new Image();
genkidama.src = '../images/genki_dama.png';
const helmet = new Image();
helmet.src='../images/helmet.png';
const e_armer = new Image();
e_armer.src= '../images/epic_armer.png';
const n_armer = new Image();
n_armer.src= '../images/normal_armer.png';

// variables for weapons on the canvas
const spriteWidth = 256;
const spriteHeight = 256;

//variables for price and purchased Items
let marketPrice = 0;
let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];

//variables for music and sound effects
const backGroundMusic = document.getElementById('BGM-1');
const playPause = document.getElementById('play_audio_1');
const coin_flip = document.getElementById('coin');
const preview = document.getElementById('preview');
let isPlaying = false;
let playPauseFxMarket = document.getElementById('play_fx_market');
let fx_play_market = false;

//function for opening the navigation page
function openNav() {
  document.getElementById("mySidenav").style.width = "10rem";
  document.getElementById("main_Page").style.marginLeft == "11.5rem";
  document.getElementById("main_Page").style.transition = "0.9s";
}

//function for closing the navigation page
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main_Page").style.marginLeft = "1.5rem";
}
 
//function for display number in format
function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
        , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
}

// dictionary of the weapon price
const priceDict = {
    "Epic Sword": 15000,
    "Wood Sword": 500,
    "Diamond Sword": 50000,
    "Dirty Icecream": 100000,
    'Wood Pickaxe': 3000,
    'Iron Pickaxe': 5500,
    'Emerald Pickaxe': 8000,
    'Genki Dama':9999999,
    'Helmet':9999,
    'Epic Armer':199990,
    'Normal Armer':29990,

  };

// dictionary of the hp and damage of the weapon
const skillDict = {
  "Epic Sword": {
    damage: 400,
    point:0,
  },
  "Wood Sword": {
    damage: 20,
    point:0,
  },
  "Diamond Sword": {
    damage : 1500,
    point:0,
  },
  "Dirty Icecream": {
    damage: 5000,
    point:0,
  },
  'Wood Pickaxe': {
    damage: 50,
    point:20,
  },
  'Iron Pickaxe': {
    damage: 100,
    point:80,
  },
  'Emerald Pickaxe': {
    damage: 140,
    point:100,
  },
  'Genki Dama':{
    damage:99999,
    point:99999,
  },
  'Helmet':{
    damage:5,
    point:200,
  },
  'Epic Armer':{
    damage:40,
    point:29000,
  },
  'Normal Armer':{
    damage:30,
    point:2000,
  },

};

// dictionary of the npc's random sentences
const sentences = {
  1: "Yeah babe",
  2: "Buy some.",
  3: "Plz......",
  4: "Let's popping.",
  5: "The best way is creating.",
  6: "Success is not final.",
  7: "Glory!!!",
  8: "Believe you.",
  9: "Wahttuup noys.",
  10: "Happiness is a journey.",
  11: "Death is not destination.",
  12: "I'm J_J",
  13:"Put my food on the placemat.",
  14:"This should help you remember.",
  15:"I can’t get this lift to work.",
  16:"This is when it starts getting serious.",
  17:"Keep your hands to yourself!",
  18:"Not a big room but beautiful.",
  19:"Naps are good for you.",
  20:"This is too hefty to easily carry.",
  21:"He was married to a friend of mine.",
  22:"Sit down and cross your legs, please!"
};



// generate the random sentence of npc on the market page
function randomSentenceGenearte(){
  let randomKey = Math.floor(Math.random() * Object.keys(sentences).length) + 1;//generate random number of the senence key
  let randomSentence = sentences[randomKey];//get the random key 
  let conversation = document.getElementById('random_text');
  conversation.textContent = randomSentence;// display random sentence
}

//draw the images of weapon on the canvas by clicking the button
function drawAnimation(weaponPic, weaponName) {
  ctx2.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
  //clean the canavs
  //the different coordinate for different weapons.
  switch (weaponName) {
    case "Epic Sword":
      ctx2.drawImage(epicSword, - 30, - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      //draw the image
      marketPrice = priceDict["Epic Sword"];
      check_button();
      //get the price 
      play_sound_fx(preview);
      break;
    case "Wood Sword":
      ctx2.drawImage(w_Sword,  - 30,  - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict["Wood Sword"];
      check_button();
      play_sound_fx(preview);
      break;
    case "Diamond Sword":
      ctx2.drawImage(d_Sword,  - 30,  - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict["Diamond Sword"];
      check_button();
      play_sound_fx(preview);
      break;
    case "Dirty Icecream":
      ctx2.drawImage(dirtyIceCream, - 15,  - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict["Dirty Icecream"];
      check_button();
      play_sound_fx(preview);
      break;
    case 'Wood Pickaxe':
      ctx2.drawImage(w_pickaxe,  - 15, - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict['Wood Pickaxe'];
      check_button();
      play_sound_fx(preview);
      break;
    case 'Iron Pickaxe':
      ctx2.drawImage(i_pickaxe, - 15,  - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict['Iron Pickaxe'];
      check_button();
      play_sound_fx(preview);
      break;
    case 'Emerald Pickaxe':
      ctx2.drawImage(e_pickaxe,  - 15, - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict['Emerald Pickaxe'];
      check_button();
      play_sound_fx(preview);
      break;
    case 'Genki Dama':
      ctx2.drawImage(genkidama,  - 15, - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict['Genki Dama'];
      check_button();
      play_sound_fx(preview);
      break;
    default:
      ctx2.drawImage(weaponPic, - 30,  - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
      marketPrice = priceDict[weaponName];
      check_button();
      play_sound_fx(preview);
      break;
  }
}



//get weapon name by its price
function getWeaponNameByPrice(price) {
    for (const [weaponName, weaponPrice] of Object.entries(priceDict)) {
      if (weaponPrice === price) {
        return weaponName;
      }
    }
    return null; 
  }

//get the weapon damage from its price
function getWeaponDamageByPrice(price) {
  let NameOfWeapon = getWeaponNameByPrice(price);
  return skillDict[NameOfWeapon].damage;
}

//get the skill point from its price
function getWeaponPointByPrice(price) {
  let NameOfWeapon = getWeaponNameByPrice(price);
  return skillDict[NameOfWeapon].point;
}

//function of purchasing items
function purchaseItem() {
  let NameOfWeapon = getWeaponNameByPrice(marketPrice);
  // to check it the weapon has been purchased and owns enough money
  if (gold >= marketPrice && !purchasedItems.includes(NameOfWeapon)) {
      gold -= marketPrice;
      purchasedItems.push(NameOfWeapon);
      //add the 
      playerDmg+=skillDict[NameOfWeapon].damage;
      market_MAX_HP+=skillDict[NameOfWeapon].point;
      market_currentHP+=skillDict[NameOfWeapon].point;
      document.getElementById('purchaseItem').style.backgroundColor = "darkred";
      localStorage.setItem('player_MAX_HP', market_MAX_HP);
      localStorage.setItem('player_currentHP',market_currentHP);
      localStorage.setItem('playerDmg', playerDmg);
      localStorage.setItem('purchasedItems',JSON.stringify(purchasedItems));
      localStorage.setItem("gold", gold);
      play_sound_fx(coin_flip);
  }
}

//update the display on the page
function update_window() {
    document.getElementById('market_price').innerHTML = "Price: " + formatNumber(marketPrice);
    document.getElementById('market_gold').innerHTML = "Gold: " + formatNumber(gold);
    document.getElementById('dmg_display').innerHTML = "Damage: "+ getWeaponDamageByPrice(marketPrice);
    document.getElementById('hp_display').innerHTML = "HP: +" + getWeaponPointByPrice(marketPrice);
}

//function for checking if the weapon has been purchased
function check_button(){
  let NameOfWeapon = getWeaponNameByPrice(marketPrice);
  if(purchasedItems.includes(NameOfWeapon)){
    document.getElementById('purchaseItem').style.backgroundColor = "darkred";
  }else{
    document.getElementById('purchaseItem').style.backgroundColor = "#F0F0F0";
  }
}

//control of background music playing
function togglePlayPause() {
  if (isPlaying) {
    backGroundMusic.pause();
    playPause.textContent = 'Play BGM';
  } else {
    backGroundMusic.play();
    playPause.textContent = 'Pause BGM';
  }
  isPlaying = !isPlaying;
}

//control of sound effect playing
function PlayFxMarket(){
  if (fx_play_market) {
    playPauseFxMarket.textContent = 'Play Sound';
  } else {
    playPauseFxMarket.textContent = 'Pause Sound';
  }
  fx_play_market = !fx_play_market;
}

//control which sound to play
function play_sound_fx(sound){
  if(fx_play_market){
    sound.play();
  }
}

setInterval(update_window, 100);
setInterval(randomSentenceGenearte,5000);
