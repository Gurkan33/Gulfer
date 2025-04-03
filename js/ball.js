const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*------------------------------------------------------------------------------------*/

import { course_levels } from "./course.js";

import { shootAngle } from "./UI.js";

export let level = 1;


export let ball = {
    x: course_levels[level].teeStartPosX,
    y: course_levels[level].teeStartPosY,
    radius: 15,
    speed: 5, // Justerbar hastighet
    angle: 0, // Justerbar vinkel i grader
    directionX: 0,
    directionY: 0,
}; 


export function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

export function moveBall() {
    ball.x += ball.directionX;
    ball.y += ball.directionY;

    // Kollision med väggarna
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.directionX = -ball.directionX;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.directionY = -ball.directionY;
    }
}

export function shootBall() {
    // Omvandla vinkel från grader till radianer
    let angleInRadians = shootAngle * (Math.PI / 180);
    
    // Beräkna bollens rörelse baserat på hastighet och vinkel
    ball.directionX = Math.cos(angleInRadians) * ball.speed;
    ball.directionY = Math.sin(angleInRadians) * ball.speed;
}

// Lyssna på Space-knappen för att skjuta bollen
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        shootBall();
    }
});
