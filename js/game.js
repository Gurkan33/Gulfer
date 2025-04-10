
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import {
    ball,
    drawBall,
    moveBall,
    shootBall,
    ballUpdate,
} from "./ball.js";

import {
    //drawAngleMeter,
    updateAngleMeter
} from "./angleMeter.js";

import {
    drawSpeedMeter,
    updateSpeedMeter
} from "./speedmeter.js";

import {
    objects,
    drawObjects,
} from "./objects.js";

import {
    detectCollision
} from "./collision.js";

canvas.addEventListener('click', shootBall);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    ballUpdate();
    drawObjects();
    updateAngleMeter();
    drawSpeedMeter();
    updateSpeedMeter();
    moveBall();
    detectCollision(ball, objects);
    requestAnimationFrame(gameLoop);
}

gameLoop();
