import { ball } from "./ball.js";
import { canvas,ctx, } from "./game.js";

const gubbe = new Image();
gubbe.src = 'assets/golfspelare.png';

let x = 300;
let y = 200;
const speed = 2;

export function updatePlayer() {
  // Uppdatera bollens position som mål
  const targetX = ball.x;
  const targetY = ball.y;

  const dx = targetX - x;
  const dy = targetY - y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1 && ball.speedFactor===0) {
    x += (dx / distance) * speed;
    y += (dy / distance) * speed;
  }else if(distance > 1){
    x += (dx / distance) * speed/2;
    y += (dy / distance) * speed/2;
  }
}

export function drawPlayer() {
  ctx.drawImage(gubbe, x - 25, y - 25, 75, 75); // justera storlek
}
