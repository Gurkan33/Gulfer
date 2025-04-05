
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import { course_levels } from "./course.js";
import { shootAngle, resetAngleMeter } from "./angleMeter.js";
import { shootSpeed, resetSpeedMeter } from "./speedmeter.js";

export let level = 1;

export let ball = {
    x: course_levels[level].teeStartPosX,
    y: course_levels[level].teeStartPosY,
    radius: 10,
    shoot_speed: 50,
    speed: 0,
    angle: 0,
    directionX: 0,
    directionY: 0,
};

let ballImg = new Image();
ballImg.src = "../assets/golfball.png";

export function drawBall() {
    ctx.drawImage(ballImg, ball.x - (ballImg.width / 2), ball.y - (ballImg.height / 2));
}

export function moveBall() {
    if (Math.abs(ball.directionX) < 0.01 && Math.abs(ball.directionY) < 0.01) {
        ball.directionX = 0;
        ball.directionY = 0;
        ball.speed = 0;
        return;
    }

    let friction = 0.9875;
    ball.directionX *= friction;
    ball.directionY *= friction;

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
    let angleInRadians = shootAngle * (Math.PI / 180);
    ball.directionX = Math.cos(angleInRadians) * shootSpeed;
    ball.directionY = Math.sin(angleInRadians) * shootSpeed;
    resetSpeedMeter();
    resetAngleMeter();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        shootBall();
    }
});
