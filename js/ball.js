
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import { course_levels } from "./course.js";
import { shootAngle, resetAngleMeter, drawArrow, angle} from "./angleMeter.js";
import { shootSpeed, resetSpeedMeter } from "./speedmeter.js";

export let level = 1;

export let ball = {
    x: course_levels[level].teeStartPosX,
    y: course_levels[level].teeStartPosY,
    radius: 11,
    speed: 0,
    speedFactor: 0,
    angle: 0,
    directionX: 0,
    directionY: 0,
    onGreen: false ,
    friction:0.975,
    
};

let ballImg = new Image();
ballImg.src = "assets/golfboll2_gulfer.png"; 

export function drawBall() {
    ctx.drawImage(ballImg, ball.x - (ballImg.width / 2), ball.y - (ballImg.height / 2),ballSize(),ballSize());

    if(ball.directionX === 0 && ball.directionY === 0){ //visar rotationspilen om bollens hastighet är 0
        drawArrow(ball.x - (ballImg.width / 4), ball.y - (ballImg.height / 4));
    }

}

export function ballUpdate(){
    
    ball.speed = Math.sqrt(ball.directionX ** 2 + ball.directionY **2)

    ball.speedFactor = Math.min(ball.speed / shootSpeed, 1)

    return

}

export function moveBall() {
    if (Math.abs(ball.directionX) < 0.2 && Math.abs(ball.directionY) < 0.2) { //stoppar bollen om den är nära noll, så den inte fortsätter för alltid
        ball.directionX = 0;
        ball.directionY = 0;
        ball.speed = 0;
        return;
    }

    ball.directionX *= ball.friction;
    ball.directionY *= ball.friction;

    ball.x += ball.directionX;
    ball.y += ball.directionY;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.directionX = -ball.directionX;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.directionY = -ball.directionY;
    }
}

export function shootBall() {
    ball.directionX = Math.cos(shootAngle) * shootSpeed;
    ball.directionY = Math.sin(shootAngle) * shootSpeed;
    resetSpeedMeter();
    resetAngleMeter();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        shootBall();
    }
});

function ballSize(){
    let baseSize = ball.radius * 2;

    // Lägg till extra storlek beroende på hastighet (ju snabbare, desto större)
    let maxExtraSize = 22; // max hur mycket bollen kan växa
    let dynamicSize = baseSize + maxExtraSize * ball.speedFactor;

    return dynamicSize;
}
