const market_canva = document.getElementById("market_canvas");
const ctx2 = market_canva.getContext('2d');
const CANVASHEIGHT = market_canva.height = 300;
const CANVASWIDTH = market_canva.width = 300;

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

const spriteWidth = 256;
const spriteHeight = 256;
const frameX=0;
const frameY=0;
let marketPrice = 0;
let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];

function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
        , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
}

const priceDict = {
    "Epic Sword": 900,
    "Wood Sword": 5,
    "Diamond Sword": 70,
    "Dirty Icecream": 2000,
    'Wood Pickaxe': 10,
    'Iron Pickaxe': 150,
    'Emerald Pickaxe': 12,
  };

const skillDict = {
  "Epic Sword": {
    damage: 400,
    enemyhp : 100,
    skillpoint : 1,
  },
  "Wood Sword": {
    damage: 10,
    enemyhp : 1,
    skillpoint : 1,
  },
  "Diamond Sword": {
    damage : 150,
    enemyhp : 10,
    skillpoint : 1,
  },
  "Dirty Icecream": {
    damage: 400,
    enemyhp : 10000,
    skillpoint : 1,
  },
  'Wood Pickaxe': {
    damage: 1,
    enemyhp : 1,
    skillpoint : 10,
  },
  'Iron Pickaxe': {
    damage: 2,
    enemyhp : 2,
    skillpoint : 100,
  },
  'Emerald Pickaxe': {
    damage: 4,
    enemyhp : 4,
    skillpoint : 1000,
  },

};

  function drawAnimation(weaponPic, weaponName) {
    ctx2.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    switch (weaponName) {
      case "Epic Sword":
        ctx2.drawImage(epicSword, frameX * spriteWidth - 30, frameY * spriteHeight - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict["Epic Sword"];
        break;
      case "Wood Sword":
        ctx2.drawImage(w_Sword, frameX * spriteWidth - 30, frameY * spriteHeight - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict["Wood Sword"];
        break;
      case "Diamond Sword":
        ctx2.drawImage(d_Sword, frameX * spriteWidth - 30, frameY * spriteHeight - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict["Diamond Sword"];
        break;
      case "Dirty Icecream":
        ctx2.drawImage(dirtyIceCream, frameX * spriteWidth - 15, frameY * spriteHeight - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict["Dirty Icecream"];
        break;
      case 'Wood Pickaxe':
        ctx2.drawImage(w_pickaxe, frameX * spriteWidth - 15, frameY * spriteHeight - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict['Wood Pickaxe'];
        break;
      case 'Iron Pickaxe':
        ctx2.drawImage(i_pickaxe, frameX * spriteWidth - 15, frameY * spriteHeight - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict['Iron Pickaxe'];
        break;
      case 'Emerald Pickaxe':
          ctx2.drawImage(e_pickaxe, frameX * spriteWidth - 15, frameY * spriteHeight - 30, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
          marketPrice = priceDict['Emerald Pickaxe'];
          break;
      default:
        ctx2.drawImage(weaponPic, frameX * spriteWidth - 30, frameY * spriteHeight - 10, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        marketPrice = priceDict[weaponName];
        break;
    }
  }

function getWeaponNameByPrice(price) {
    for (const [weaponName, weaponPrice] of Object.entries(priceDict)) {
      if (weaponPrice === price) {
        return weaponName;
      }
    }
    return null; 
  }


function purchaseItem() {
    NameOfWeapon = getWeaponNameByPrice(marketPrice);
    if (gold >= marketPrice && !purchasedItems.includes(NameOfWeapon)) {
        gold -= marketPrice;
        purchasedItems.push(NameOfWeapon);
        purchasedItems.push(skillDict[NameOfWeapon].damage);
        playerDmg+=skillDict[NameOfWeapon].damage/2;
        localStorage.setItem('playerDmg', playerDmg);
        localStorage.setItem("gold", gold);
        localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
    }
  }

function update_window() {
    document.getElementById('market_price').innerHTML = "Price: " + formatNumber(marketPrice);
    document.getElementById('market_gold').innerHTML = "Gold: " + formatNumber(gold);
    document.getElementById("purchaseItem").innerHTML = "purchase Item: " + purchasedItems;
}

const backGroundMusic = document.getElementById('BGM-1');
const playPause = document.getElementById('play_audio_1');
let isPlaying = false;

function togglePlayPause() {
  if (isPlaying) {
    backGroundMusic.pause();
    playPause.textContent = 'Play';
  } else {
    backGroundMusic.play();
    playPause.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
}


setInterval(update_window, 100);
