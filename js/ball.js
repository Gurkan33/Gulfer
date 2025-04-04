const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*------------------------------------------------------------------------------------*/

import { course_levels } from "./course.js";
import { shootAngle, resetAngleMeter } from "./angleMeter.js";
import { shootSpeed, resetSpeedMeter } from "./speedmeter.js";

export let level = 1;

export let ball = {
    x: course_levels[level].teeStartPosX,
    y: course_levels[level].teeStartPosY,
    radius: 10,
    shoot_speed: 50,
    speed: 0, // Initial hastighet
    angle: 0, // Justerbar vinkel i grader
    directionX: 0,
    directionY: 0,
};

let ballImg = new Image();
ballImg.src = "../assets/golfball.png";

// Rita bollen
export function drawBall() {
    ctx.drawImage(ballImg, ball.x - (ballImg.width / 2), ball.y - (ballImg.height / 2));
}

// Flytta bollen med friktion
export function moveBall() {
    // Om hastigheten är för låg (nära 0), stoppa rörelsen
    if (Math.abs(ball.directionX) < 0.01 && Math.abs(ball.directionY) < 0.01) {
        ball.directionX = 0;
        ball.directionY = 0;
        ball.speed = 0 // Sätt hastigheten till 0 när bollen har stannat
        return;
    }

    // Applicera friktion (minskar hastigheten långsamt)
    let friction = 0.9875; // Friktionsfaktor, justera för mer eller mindre friktion
    ball.directionX *= friction;
    ball.directionY *= friction;

    ball.x += ball.directionX;
    ball.y += ball.directionY;

    // Kollision med väggarna
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.directionX = -ball.directionX; // Invertera riktning vid vägg
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.directionY = -ball.directionY; // Invertera riktning vid vägg
    }
}

// Skjut bollen baserat på vinkel och hastighet
export function shootBall() {
    // Omvandla vinkel från grader till radianer
    let angleInRadians = shootAngle * (Math.PI / 180);

    // Beräkna bollens rörelse baserat på hastighet och vinkel
    ball.directionX = Math.cos(angleInRadians) * shootSpeed;
    ball.directionY = Math.sin(angleInRadians) * shootSpeed;

    resetSpeedMeter()
    resetAngleMeter()
}

// Lyssna på Space-knappen för att skjuta bollen
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        shootBall();
    }
});
