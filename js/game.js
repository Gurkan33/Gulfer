
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImg = new Image();
backgroundImg.src = "assets/golfbana2_gulfer.png";

import { state } from "./gameState.js";

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

import {
    updatePlayer,
    drawPlayer,
} from "./player.js";

canvas.addEventListener('click', shootBall);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    drawBall();
    ballUpdate();
    drawObjects();

    if (state.gamePhase === "angle") {
        updateAngleMeter();// Lägg till drawAngleMeter om du vill ha visuell indikator
    } else if (state.gamePhase === "speed") {
        drawSpeedMeter();
        updateSpeedMeter();
    }

    moveBall();
    detectCollision(ball, objects);
    updatePlayer();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && state.gamePhase === "shot") {
            shootBall();
            state.gamePhase = "angle"

    }
});

gameLoop();
