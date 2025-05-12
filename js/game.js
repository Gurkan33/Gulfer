export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backgroundImg = new Image();


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
import { course_levels } from "./course.js";

//canvas.addEventListener('click', shootBall);


function drawScore() {
    ctx.font = "32px MinFont";
    ctx.fillStyle = "white";
    ctx.fillText("Slag: " + state.strokeCount, 30, 50);
}

function drawBallStatus() {
    ctx.font = "32px MinFont";
    ctx.fillStyle = "white";
    let ballStatus = "On the course";

    if (ball.inWater) {
        ballStatus = "In water"
    } else if (ball.inBunker) {
        ballStatus = "In bunker"
    } else if (ball.inBush){
        ballStatus = "In bush"
    }


    ctx.fillText("Ball Status : " + ballStatus, 30, 80);
}

export function goToNextLevel() {
  state.level++;

  if (!course_levels[state.level]) {
    console.log("Spelet är slut!");
    return;
  }

  // Ladda ny bakgrund
  backgroundImg.src = course_levels[state.level].backgroundImg;

  // Återställ bollen
  ball.x = course_levels[state.level].teeStartPosX;
  ball.y = course_levels[state.level].teeStartPosY;
  ball.directionX = 0;
  ball.directionY = 0;
  ball.z = 0;
  ball.zSpeed = 0;
  ball.inHole = false;
  ball.inWater = false;
  ball.inBunker = false;
  ball.inBush = false;
  ball.isInAir = false;

  state.strokeCount = 0;
  state.gamePhase = "angle";
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg.src = course_levels[state.level].backgroundImg;
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);


    drawBall();
    ballUpdate();
    drawObjects();
    drawSpeedMeter();
    moveBall();
    detectCollision(ball, objects[state.level]);
    updatePlayer();
    drawPlayer();
    drawScore();
    drawBallStatus();

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

startGame()

document.addEventListener("keydown", function (event) {
    if (!gameStarted && event.code === "Enter") {
        // startGame();
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