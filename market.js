const market_canva = document.getElementById("market_canvas");
const ctx2 = market_canva.getContext('2d');
const CANVASHEIGHT = market_canva.height = 300;
const CANVASWIDTH = market_canva.width = 300;

const epicSword = new Image();
epicSword.src = 'epic_Sword.png';
const dirtyIceCream = new Image();
dirtyIceCream.src ='dirtyIceCream.png';
const w_Sword = new Image();
w_Sword.src = 'w_Sword.png';
const d_Sword = new Image();
d_Sword.src = 'd_Sword.png';

const spriteWidth = 256;
const spriteHeight = 256;
const frameX=0;
const frameY=0;
let marketPrice = 0;

function formatNumber(num) {
    const suffixes = ["", " K", " Million", " Billion", " Trillion", " Quadrillion"
        , " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion"
    ];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const formattedNum = parseFloat((num / Math.pow(1000, suffixIndex)).toFixed(2));
    return (isNaN(formattedNum) || formattedNum === 0) ? "0" : formattedNum + (suffixes[suffixIndex] || "");
}

const priceDict = {
    "Epic Sword": 9999,
    "Wood Sword": 5,
    "Diamond Sword": 799,
    "Dirty Icecream": 2499,
  };


function drawSwordAnimation() {
    ctx2.clearRect(0,0,CANVASWIDTH,CANVASHEIGHT);
    ctx2.drawImage(epicSword,frameX*spriteWidth-30,frameY*spriteHeight-10,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    marketPrice = priceDict["Epic Sword"];
}

function drawWSwordAnimation() {
    ctx2.clearRect(0,0,CANVASWIDTH,CANVASHEIGHT);
    ctx2.drawImage(w_Sword,frameX*spriteWidth-30,frameY*spriteHeight-10,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    marketPrice = priceDict["Wood Sword"];
}

function drawDSwordAnimation() {
    ctx2.clearRect(0,0,CANVASWIDTH,CANVASHEIGHT);
    ctx2.drawImage(d_Sword,frameX*spriteWidth-30,frameY*spriteHeight-10,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    marketPrice = priceDict["Diamond Sword"];
}

function drawDirtyIceCreamAnimation() {
    ctx2.clearRect(0,0,CANVASWIDTH,CANVASHEIGHT);
    ctx2.drawImage(dirtyIceCream,frameX*spriteWidth-15,frameY*spriteHeight-30,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    marketPrice = priceDict["Dirty Icecream"];
}

function purchaseItem(){
    if(gold>=marketPrice){
        gold-=marketPrice;
        localStorage.setItem("gold",gold)
    }
}
function update_window() {
    document.getElementById('market_price').innerHTML = "Price: " + formatNumber(marketPrice);
    document.getElementById('market_gold').innerHTML = "Gold: " + formatNumber(gold);
}

setInterval(update_window, 100);
