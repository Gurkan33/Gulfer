export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

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
    updateAngleMeter,
    chooseAngle,
    resetAngleMeter,
    drawArrow,
} from "./angleMeter.js";

import {
    drawSpeedMeter,
    updateSpeedMeter,
    chooseSpeed,
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

//canvas.addEventListener('click', shootBall);

function drawScore() {
    ctx.font = "32px MinFont";
    ctx.fillStyle = "white";
    ctx.fillText("Slag: " + state.strokeCount, 30, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    drawBall();
    ballUpdate();
    drawObjects();
    drawSpeedMeter();
    moveBall();
    detectCollision(ball, objects);
    updatePlayer();
    drawPlayer();
    drawScore();

    if (ball.directionX === 0 && ball.directionY === 0) {
        drawArrow(ball.x, ball.y);
    }

    if (state.gamePhase === "angle") {
        updateAngleMeter();// Lägg till drawAngleMeter om du vill ha visuell indikator
    } else if (state.gamePhase === "speed") {
        updateSpeedMeter();
    }

    requestAnimationFrame(gameLoop);
}

let gameStarted = false;
let spacePressed = false

function startGame() {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    gameStarted = true;
    gameLoop();
}

document.addEventListener("keydown", function (event) {
    if (!gameStarted && event.code === "Enter") {
        startGame();
    }

    if (gameStarted && event.code === "Space" && !spacePressed) {
        spacePressed = true;

        if (state.gamePhase === "angle") {
            chooseAngle();
            resetAngleMeter();
            state.gamePhase = "speed";
        } else if (state.gamePhase === "speed") {
            chooseSpeed();
            state.gamePhase = "shot";
        } else if (state.gamePhase === "shot") {
            shootBall();
            state.gamePhase = "angle";
        }

        setTimeout(() => {
            spacePressed = false;
        }, 50);
    }
});