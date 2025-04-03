const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import{
    ball,
    drawBall,
    moveBall,
    shootBall,

}from "./ball.js"

import{
    drawAngleMeter,
    updateAngleMeter
}from "./angleMeter.js"

import{
    objects,
    drawObjects,
}from "./objects.js"

function detectCollision() {
    objects.forEach((obj, index) => {
        if (obj.hitbox === 'circle') {
            // Kollision mellan bollen och en cirkel
            let dx = ball.x - obj.x;
            let dy = ball.y - obj.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius + obj.radius) {
                //console.log('Bollen träffade en cirkel (objekt ' + (index + 1) + ')');
                // Trigger event för cirkelkollision
                handleHitEvent(obj);
            }
        } else if (obj.hitbox === 'rectangle') {
            // Kollision mellan bollen och en fyrkant
            if (ball.x + ball.radius > obj.x && ball.x - ball.radius < obj.x + obj.width &&
                ball.y + ball.radius > obj.y && ball.y - ball.radius < obj.y + obj.height) {
                //console.log('Bollen träffade en fyrkant (objekt ' + (index + 1) + ')');
                // Trigger event för fyrkantskollision
                handleHitEvent(obj);
            }
        }
    });
}

function handleHitEvent(obj) {
    // Sätt olika event här beroende på objektet
    if (obj.color === 'red') {
        //alert('Bollen träffade det röda objektet (cirkel)');
    } else if (obj.color === 'blue') {
        //alert('Bollen träffade det blå objektet (fyrkant)');
    }
    
    // Stanna bollen efter kollisionen
    ball.directionX = 0;
    ball.directionY = 0;
}



canvas.addEventListener('click', shootBall);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa skärmen
    drawBall();
    drawObjects();
    drawAngleMeter();
    updateAngleMeter();
    moveBall();
    detectCollision();
    requestAnimationFrame(gameLoop); // Håll spelet igång
}

gameLoop();
