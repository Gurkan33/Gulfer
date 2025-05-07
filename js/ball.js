const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import { course_levels } from "./course.js";
import { shootAngle, resetAngleMeter, drawArrow, angle } from "./angleMeter.js";
import { shootSpeed, resetSpeedMeter } from "./speedmeter.js";
import { state } from "./gameState.js";

export let level = 1;

export let ball = {
    x: course_levels[level].teeStartPosX,
    y: course_levels[level].teeStartPosY,
    z: 0,                    // Höjd över marken
    zSpeed: 0,               // Vertikal hastighet
    radius: 11,
    speed: 0,
    speedFactor: 0,
    angle: 0,
    directionX: 0,
    directionY: 0,
    friction: 0.975,         // Friktion på marken
    airFriction: 0.99,       // Friktion i luften
    gravity: 0.4,            // Gravitation   
    rotation: 0,    // Nytt: vinkel för bollens snurr 
    
    isInAir: false,  // Om bollen är i luften
    onGreen: false, // Om bollen är på greenen
    inWater: false, // Om bollen är i vattnet
    inHole: false, // Om bollen är i hålet
    inBunker: false, // Om bollen är i bunkern

};

let ballImg = new Image();
ballImg.src = "assets/golfboll2_gulfer.png";

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
    ctx.drawImage(
        ballImg,
        -size / 2,
        -size / 2,
        size,
        size
    );
    ctx.restore();

    if (ball.directionX === 0 && ball.directionY === 0 && !ball.isInAir) {
        drawArrow(ball.x, ball.y);
    }
}

export function ballUpdate() {
    ball.speed = Math.sqrt(ball.directionX ** 2 + ball.directionY ** 2);
    ball.speedFactor = Math.min(ball.speed / shootSpeed, 1);
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

    // Välj friktion baserat på om bollen är i luften
    const friction = ball.isInAir ? ball.airFriction : ball.friction;

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

export function shootBall() {
    ball.directionX = Math.cos(shootAngle) * shootSpeed;
    ball.directionY = Math.sin(shootAngle) * shootSpeed;

    ball.z = 0;
    ball.zSpeed = shootSpeed * 0.4; // Uppåthastighet med liten variation
    ball.isInAir = true;

    state.strokeCount++

    resetSpeedMeter();
    resetAngleMeter();

    const ljud = document.getElementById("ljud");
    ljud.play(); // Spela upp ljudet
}


