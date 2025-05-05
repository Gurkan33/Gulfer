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
    updateAngleMeter,
    chooseAngle,
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

    console.log("Current phase:", state.gamePhase); // Debug

    if (state.gamePhase === "angle") {
        updateAngleMeter();// Lägg till drawAngleMeter om du vill ha visuell indikator
    } else if (state.gamePhase === "speed") {
        console.log("hastighet"); // Debug
        updateSpeedMeter();
    }


    requestAnimationFrame(gameLoop);
}

let spacePressed = false; // Flagga för att spåra om Enter redan tryckts

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !spacePressed) {
        spacePressed = true; // Blockera ytterligare aktiveringar

        if (state.gamePhase === "angle") {
            chooseAngle();
            state.gamePhase = "speed";
        } else if (state.gamePhase === "speed") {
            chooseSpeed();
            state.gamePhase = "shot";
        }else if (state.gamePhase === "shot") {
            shootBall();
            state.gamePhase = "angle";
        }

        setTimeout(() => {
            spacePressed = false; 
        }, 50); 
    }
});

gameLoop();
