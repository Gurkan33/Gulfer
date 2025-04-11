const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const gubbe = new Image();
gubbe.src = 'assets/golfspelare.png'; 

import {
  ball
} from "./ball.js";

let x = 300;
let y = 200;
let targetX = ball.directionX;
let targetY = ball.directionY;
const speed = 2;



canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  targetX = event.clientX - rect.left;
  targetY = event.clientY - rect.top;
});

export function update() {
  const dx = targetX - x;
  const dy = targetY - y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    x += (dx / distance) * speed;
    y += (dy / distance) * speed;
  }
}

export function draw() {
  ctx.drawImage(gubbe, x - 25, y - 25, 50, 50); // Anpassa storlek och position
}
