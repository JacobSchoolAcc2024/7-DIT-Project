// const canvas1 = document.getElementById('canvas2');
// const ctx1 = canvas1.getContext('2d');
// const CANVAS_WIDTH1 = canvas1.width = 500;
// const CANVAS_HEIGHT1 = canvas1.height = 500;
// const player_width = 120;
// const player_height = 100;
// const playerImage = new Image();

// let framex = 0;
// let framey = 0;
// let gameframe = 0;
// const staggerframes = 4;


// playerImage.src = '_Run.png';


// function animate1() {
//   ctx1.clearRect(0, 0, CANVAS_WIDTH1, CANVAS_HEIGHT1);
//   // ctx.fillRect(50,50,100,100);
//   ctx1.drawImage(playerImage, framex * player_width, framey * player_height ,
//     player_width,player_height, 0, 0, canvas1.width, canvas1.height);
//     if (gameframe % staggerframes == 0){
//       if (framex < 9) framex++;
//       else framex = 0;
//     }
//     gameframe++;
//   requestAnimationFrame(animate)
// };

// animate1();


// Get the canvas element with id 'canvas1'
const canvas1 = document.getElementById('canvas1');

// Check if the canvas element exists
if (canvas1) {
    // Get the 2D rendering context for the canvas
    const ctx = canvas1.getContext('2d');

    // Set the canvas width to 600 pixels and store it in CANVAS_WIDTH
    const CANVAS_WIDTH = canvas1.width = 600;

    // Set the canvas height to 650 pixels and store it in CANVAS_HEIGHT
    const CANVAS_HEIGHT = canvas1.height = 650;
}
// Set the game speed
let gameSpeed = 20

// Initialize frame counters for different animations
let framex = 0
let hurt_framex = 3
let framey = 0
let gameframe = 0

// Define stagger frames for different animations
const staggerframes = 7
const staggerframes_hurt = 12
const staggerframes_dead = 4
const staggerframes_attack = 5

// Initialize player state flags
let isHurt = false
let isDead = false

// Retrieve attacking state from localStorage, default to false if not found
let isAttacking = localStorage.getItem('isAttacking') || false

const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png"
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png"


// Create a new button element

// const startButton = document.createElement('button');
// startButton.textContent = 'Start';
// startButton.style.position = 'absolute';
// startButton.style.zIndex = '1000'; // Ensure the button is on top of other elements
// startButton.style.left = '50%';
// startButton.style.top = '50%';
// startButton.style.transform = 'translate(-50%, -50%)';
// startButton.style.fontSize = '2rem'; // Increase font size
// startButton.style.padding = '1rem 2rem'; // Increase padding


// // Add the button to the document body
// document.body.appendChild(startButton);


// // Redirect to start.html when the button is clicked
// startButton.addEventListener('click', () => {
//   window.location.href = 'start.html';
// });

// Get the modal
let modal_timer = 5;

const modal = document.getElementById('modal');

// Get the button that opens the modal
const startGameButton = document.getElementById('startGameButton');

// Get the <span> element that closes the modal
const closeModal = document.getElementsByClassName('close')[0];

// When the page loads, show the modal
window.onload = function() {
  modal.style.display = 'block';
};

// When the user clicks on the "Start Game" button, redirect to the game page
startGameButton.onclick = function() {
  window.location.href = 'new_index.html';};

// // When the user clicks on <span> (x), close the modal
// closeModal.onclick = function() {
//   window.location.href = 'start.html'
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target === modal) {
//     window.location.href = 'index.html'
//   }
// };

function start_timer(){
  modal_timer -= 1
  if (modal_timer <= 0){
    startGameButton.style.display = "block";
  }
  else{
    startGameButton.style.display = "none";
  }
}

setInterval(start_timer, 1000)





class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 4000;
        this.height = 2450;
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

// const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
// const layer4 = new Layer(backgroundLayer4, 0.8);

const gameObjects = [ layer2,layer3 ,layer2];
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
}
animate();