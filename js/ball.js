import { course_levels } from "./course.js";
import { shootAngle, resetAngleMeter, drawArrow, angle } from "./angleMeter.js";
import { shootSpeed, resetSpeedMeter } from "./speedmeter.js";
import { state } from "./gameState.js";
import{level} from "./course.js";
import { canvas,ctx, } from "./game.js";

let ballImg = new Image();
ballImg.src = "assets/golfboll2_gulfer.png";

export let ball = {
    radius: 11, 

    x: course_levels[level].teeStartPosX,
    y: course_levels[level].teeStartPosY,
    z: 0,   // Höjd över marken        
                      
    zSpeed: 0,            
    speed: 0,
    speedFactor: 0,
    angle: 0,
    directionX: 0,
    directionY: 0,


    friction: 0.975,         // Friktion på marken
    sandFriction: 0.9,      // Friktion i bunkern
    airFriction: 0.985,       // Friktion i luften
    gravity: 0.4,            // Gravitation   
    rotation: 0,    // vinkel för bollens snurr 
    
    isInAir: false,  // Om bollen är i luften
    onGreen: false, // Om bollen är på greenen
    inWater: false, // Om bollen är i vattnet
    inHole: false, // Om bollen är i hålet
    inBunker: false, // Om bollen är i bunkern
    inBush: false, // Om bollen är i buskarna

};

export let lastBallPosition = { x: ball.x, y: ball.y }; // Variabel för att spara senaste positionen innan slaget

function ballSize() {
    let baseSize = ball.radius * 2;
    let maxExtraSize = 22;
    let dynamicSize = baseSize + maxExtraSize * ball.speedFactor;

    // Gör bollen större beroende på höjd
    let heightBoost = 1 + (ball.z / 100); // Ökar storlek med höjd
    return dynamicSize * heightBoost;
}

export function drawBall() {
    const size = ballSize();

    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.rotate(ball.rotation);
    ctx.drawImage(ballImg, -size / 2, -size / 2, size, size);
    ctx.restore();
}

export function ballUpdate() {
    ball.speed = Math.sqrt(ball.directionX ** 2 + ball.directionY ** 2);
    ball.speedFactor = Math.min(ball.speed / shootSpeed, 1);
}

export function ballInWater() {
    ball.x = lastBallPosition.x;
    ball.y = lastBallPosition.y;


    ball.directionX = 0;
    ball.directionY = 0;
    ball.speed = 0;
    ball.z = 0;
    ball.zSpeed = 0;

    //INGOLF FIXAR LJUD HÄR

    state.gamePhase = "angle";
}

export function moveBall() {
    if (Math.abs(ball.directionX) < 0.2 && Math.abs(ball.directionY) < 0.2 && ball.z <= 0) {

        ball.directionX = 0;
        ball.directionY = 0;
        ball.speed = 0;
        ball.z = 0;
        ball.zSpeed = 0;
        
        return;
        
    }

   
    let friction = ball.friction;
    
    if (ball.isInAir) {
        friction = ball.airFriction;
    } else if (ball.inBunker) {
        friction = ball.sandFriction; }// Lägre friktion i bunkern

    

    ball.directionX *= friction;
    ball.directionY *= friction;

    ball.x += ball.directionX;
    ball.y += ball.directionY;

    // Höjdhantering
    if (ball.isInAir) {
        ball.zSpeed -= ball.gravity;
        ball.z += ball.zSpeed;

        if (ball.z <= 0) {
            ball.z = 0;
            ball.zSpeed = 0;
            ball.isInAir = false;
        }
    }

    const size = ballSize();
    const halfSize = size / 2;

    if (ball.x + halfSize > canvas.width || ball.x - halfSize < 0) {
        ball.directionX = -ball.directionX;
    }

    if (ball.y + halfSize > canvas.height || ball.y - halfSize < 0) {
        ball.directionY = -ball.directionY;
    }

    // Uppdatera rotation baserat på bollens hastighet
    const rotationSpeed = ball.speed * 0.05;
    ball.rotation += rotationSpeed;
}

const ljud = document.getElementById("ljud");

export function shootBall() {
    // Spara bollens position innan slaget
    lastBallPosition.x = ball.x;
    lastBallPosition.y = ball.y;

    // Beräkna bollens rörelse
    ball.directionX = Math.cos(shootAngle) * shootSpeed;
    ball.directionY = Math.sin(shootAngle) * shootSpeed;

    ball.z = 0;
    ball.zSpeed = shootSpeed * 0.4; // Uppåthastighet med liten variation
    ball.isInAir = true;

    state.strokeCount++;

    resetSpeedMeter();
    resetAngleMeter();

    ljud.play(); // Spela upp ljudet
}


