const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import { course_levels } from "./course.js";
import { shootAngle, resetAngleMeter, drawArrow, angle } from "./angleMeter.js";
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
    onGreen: false,
    friction: 0.975,
};

let ballImg = new Image();
ballImg.src = "assets/golfboll2_gulfer.png";

function ballSize() {
    let baseSize = ball.radius * 2;
    let maxExtraSize = 22; // max hur mycket bollen kan växa
    let dynamicSize = baseSize + maxExtraSize * ball.speedFactor;
    return dynamicSize;
}

export function drawBall() {
    const size = ballSize();
    ctx.drawImage(ballImg, ball.x - size / 2, ball.y - size / 2, size, size);

    if (ball.directionX === 0 && ball.directionY === 0) {
        drawArrow(ball.x , ball.y);
    }
}

export function ballUpdate() {
    ball.speed = Math.sqrt(ball.directionX ** 2 + ball.directionY ** 2);
    ball.speedFactor = Math.min(ball.speed / shootSpeed, 1);
}

export function moveBall() {
    if (Math.abs(ball.directionX) < 0.2 && Math.abs(ball.directionY) < 0.2) {
        ball.directionX = 0;
        ball.directionY = 0;
        ball.speed = 0;
        return;
    }

    ball.directionX *= ball.friction;
    ball.directionY *= ball.friction;

    ball.x += ball.directionX;
    ball.y += ball.directionY;

    const size = ballSize();
    const halfSize = size / 2;

    if (ball.x + halfSize > canvas.width || ball.x - halfSize < 0) {
        ball.directionX = -ball.directionX;
    }

    if (ball.y + halfSize > canvas.height || ball.y - halfSize < 0) {
        ball.directionY = -ball.directionY;
    }
}

export function shootBall() {
    ball.directionX = Math.cos(shootAngle) * shootSpeed;
    ball.directionY = Math.sin(shootAngle) * shootSpeed;
    resetSpeedMeter();
    resetAngleMeter();

    const ljud = document.getElementById("ljud");

    // Lyssna på hela dokumentet för tangenttryck
    document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        ljud.play(); // Spela upp ljudet
    }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        shootBall();
    }
});
