const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

import { state } from "./gameState.js";


export let shootSpeed = 0; // Startvärde för hastigheten
let increasing = true; // Om hastigheten ökar eller minskar
let speedLocked = false; 

let meterSpeed = 0.1 // ändrar hastigheten på själva mätaren

export function drawSpeedMeter() {
    let meterWidth = 300;
    let meterHeight = 20;
    let meterX = (canvas.width - meterWidth) / 2;
    let meterY = canvas.height - 50;

    // Rita bakgrund
    ctx.fillStyle = "black";
    ctx.fillRect(meterX, meterY, meterWidth, meterHeight);

    // Rita hastighetsindikatorn
    let speedPercentage = shootSpeed / 100; // Antag att maxhastighet är 100
    ctx.fillStyle = "red";
    ctx.fillRect(meterX, meterY, meterWidth * speedPercentage, meterHeight);

    // Rita text
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Hastighet: " + Math.round(shootSpeed), meterX + 10, meterY - 5);
}

export function updateSpeedMeter() {
    if (speedLocked === false){
        if (increasing) {
            shootSpeed += meterSpeed;
            if (shootSpeed >= 20) {
                increasing = false;
            }
        } else {
            shootSpeed -= meterSpeed;
            if (shootSpeed <= 1) {
                increasing = true;
            }
        }
    }
}


export function chooseSpeed() {
    if (speedLocked === false) {
        speedLocked = true; // Lås hastigheten
        console.log("Skjuter med hastighet:", shootSpeed.toFixed(2));
    }
}

export function resetSpeedMeter(){
    speedLocked = false;
    shootSpeed = 30;
}
