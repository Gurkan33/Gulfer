const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import { state } from "./gameState.js";


export let angle = 0;
let spinning = true;
export let shootAngle = null;

export function drawArrow(x, y) {
    // x = bollens x värde
    // y = bollens y värde
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    // Rita pil 
    ctx.moveTo(0, 0);         
    ctx.lineTo(50, 0);          
    ctx.lineTo(40, -10);       
    ctx.moveTo(50, 0);
    ctx.lineTo(40, 10);          

    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
}


// Funktion för att uppdatera mätarens position
export function updateAngleMeter() {
    if (spinning) {
        angle += 0.05;
        if (angle > Math.PI * 2) {
          angle -= Math.PI * 2;
        }
      }
}


document.addEventListener("keydown", function(event){
    if (event.code === "Enter" && state.gamePhase === "angle"){
        if (spinning) {
            spinning = false;
            shootAngle = angle;
            console.log("Skjuter i riktning:", shootAngle.toFixed(2), "radianer");
            state.gamePhase = "speed"
          }
    }
});

export function resetAngleMeter(){
    spinning = true
}
