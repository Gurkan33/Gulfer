export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backgroundImg = new Image();
let runGameLoop = true;


import { state, getScoreText,saveStrokesForCourse } from "./gameState.js";

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


function drawHoleInfo(){
    ctx.font = "32px MinFont";
    ctx.fillStyle = "white";
    ctx.fillText("hole:  " + state.level + "  -  par:  " + state.parPerCourse[state.level], 30, 50);
}

function drawScore() {
    ctx.font = "32px MinFont";
    ctx.fillStyle = "white";
    ctx.fillText("Slag:  " + state.strokeCount, 30, 80);
}

function drawBallStatus() {
    ctx.font = "32px MinFont";
    ctx.fillStyle = "white";
    let ballStatus = "On  the  course";

    if (ball.inWater) {
        ballStatus = "In water"
    } else if (ball.inBunker) {
        ballStatus = "In bunker"
    } else if (ball.inBush){
        ballStatus = "In bush"
    }


    ctx.fillText("Ball  Status:  " + ballStatus, 30, 110);
}



export function goToNextLevel() {
     runGameLoop = false; // Stoppar gameLoop

    saveStrokesForCourse(state.level, state.strokeCount); //sparar poänegenm för hålet
    const scoreText = getScoreText(state.level); //räknar ut poängen
    state.strokeCount = 0;

    ctx.fillStyle = "white";
    ctx.font = "48px MinFont";
    ctx.fillText(scoreText, canvas.width / 2 - 100, canvas.height / 2);

    // Vänta 5 sekunder innan nästa nivå laddas
    setTimeout(() => {
        runGameLoop = true; 
        state.level++; // Öka nivån

        if (state.level > course_levels.length) {
            console.log("Spelet är slut!");
            return;
        }

        // Ladda ny bakgrund
        backgroundImg.src = course_levels[state.level].backgroundImg;

        // Återställ bollen
        ball.x = course_levels[state.level].teeStartPosX;
        ball.y = course_levels[state.level].teeStartPosY;
        ball.speed = 0
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
    }, 3000); // Vänta 5000 ms (5 sekunder)
}

function gameLoop() {
    if(runGameLoop){
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
    drawHoleInfo();


    if (ball.directionX === 0 && ball.directionY === 0) {
        drawArrow(ball.x, ball.y);
    }

    if (state.gamePhase === "angle") {
        updateAngleMeter();// Lägg till drawAngleMeter om du vill ha visuell indikator
    } else if (state.gamePhase === "speed") {
        updateSpeedMeter();
    }
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