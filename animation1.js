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


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 4000;
const CANVAS_HEIGHT = canvas.height = 4000;
let gameSpeed = 50


const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png"
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png"

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 4000;
        this.height = 4000;
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