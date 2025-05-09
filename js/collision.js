import { 
  ball, 
  ballInHole, 
  ballInWater
} from "./ball.js";
import { canvas,ctx, } from "./game.js";

// Funktion som kollar om bollen träffar en roterad rektangel
function isBallCollidingWithRotatedRect(ball, rect) {
  const angle = (rect.rotation * Math.PI) / 180; // Konvertera rotation till radianer
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  // Flytta bollens position relativt till rektangelns centrum
  const dx = ball.x - centerX;
  const dy = ball.y - centerY;

  // Roterar bollens koordinater så att rektangeln betraktas som axis-aligned
  const rotatedX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
  const rotatedY = dx * Math.sin(-angle) + dy * Math.cos(-angle);

  // Halva bredden och höjden på rektangeln
  const halfW = rect.width / 2;
  const halfH = rect.height / 2;

  // Hitta närmaste punkt inom rektangeln
  const closestX = Math.max(-halfW, Math.min(rotatedX, halfW));
  const closestY = Math.max(-halfH, Math.min(rotatedY, halfH));

  // Avståndet från bollen till närmaste punkt på rektangeln
  const distX = rotatedX - closestX;
  const distY = rotatedY - closestY;

  // Returnerar true om avståndet är mindre än bollens radie (=> kollision)
  return distX * distX + distY * distY < ball.radius * ball.radius;
}

// Uppdaterar bollens riktning när den träffar en roterad rektangel
function bounceOffRotatedRect(ball, rect) {
  const angle = (rect.rotation * Math.PI) / 180;

  // Normalt vektor (vinkelrät mot ytan)
  const normal = {
    x: Math.sin(angle),
    y: -Math.cos(angle),
  };

  // Beräkna "dot product" mellan rörelse och normal
  const dot = ball.directionX * normal.x + ball.directionY * normal.y;

  // Reflektera bollens rörelsevektor mot normalen
  ball.directionX = ball.directionX - 2 * dot * normal.x;
  ball.directionY = ball.directionY - 2 * dot * normal.y;
}

// Kollisionsdetektion mellan boll och cirkelobjekt
function handleCircleCollision(ball, obj) {
  let dx = ball.x - obj.x;
  let dy = ball.y - obj.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ball.radius + obj.radius) {
    // Normalisera vektor (få enhetsvektor)
    let length = distance;
    let normalX = dx / length;
    let normalY = dy / length;

    // Reflektera bollens rörelse längs normal
    let dot = ball.directionX * normalX + ball.directionY * normalY;
    ball.directionX = ball.directionX - 2 * dot * normalX;
    ball.directionY = ball.directionY - 2 * dot * normalY;

    // Flytta bollen så att den inte fastnar i objektet
    ball.x = obj.x + (ball.radius + obj.radius + 0.1) * normalX;
    ball.y = obj.y + (ball.radius + obj.radius + 0.1) * normalY;
  }
}

function handleRectangleCollision(ball, obj) {
  if (obj.rotation) {
    // Om rektangeln är roterad, använd roterad kollisionskontroll
    if (isBallCollidingWithRotatedRect(ball, obj)) {
      bounceOffRotatedRect(ball, obj);
    }
  } else {
    // Axis-aligned rektangel
    if (
      ball.x + ball.radius > obj.x &&
      ball.x - ball.radius < obj.x + obj.width &&
      ball.y + ball.radius > obj.y &&
      ball.y - ball.radius < obj.y + obj.height
    ) {
      // Enkel studs-effekt
      ball.directionY *= -1;
    }
  }
}

export function detectCollision(ball, objects) {
  objects.forEach((obj) => {
    let isInside = false;

    // Kontrollera om bollen är inuti objektet baserat på hitbox-typ
    if (obj.hitbox === "circle") {
      const dx = ball.x - obj.x;
      const dy = ball.y - obj.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      isInside = distance < ball.radius + obj.radius;
    } else if (obj.hitbox === "rectangle") {
      const withinX =
        ball.x + ball.radius > obj.x &&
        ball.x - ball.radius < obj.x + obj.width;
      const withinY =
        ball.y + ball.radius > obj.y &&
        ball.y - ball.radius < obj.y + obj.height;
      isInside = withinX && withinY;
    }

    // Om bollen är inuti objektet, hantera baserat på objektets typ
    if (isInside) {
      if (obj.type === "collider" || !obj.type) {
        // Hantera studs för collider-objekt
        if (obj.hitbox === "circle") {
          handleCircleCollision(ball, obj);
        } else if (obj.hitbox === "rectangle") {
          handleRectangleCollision(ball, obj);
        }
      } else if (obj.type === "water" && !ball.isInAir) {
        ball.inWater = true;
        ballInWater()
      } else if (obj.type === "sand" && !ball.isInAir) {
        ball.inBunker = true;
      } else if (obj.type === "hole" && !ball.isInAir) {
        ball.inHole = true;
        ballInHole()
      } else if (obj.type === "bush" && !ball.isInAir) {
        ball.inBush = true;
      }
    } else {
      // Om bollen inte är inuti objektet, återställ tillstånd
      if (obj.type === "water") {
        ball.inWater = false;
      } else if (obj.type === "sand") {
        ball.inBunker = false;
      } else if (obj.type === "hole") {
        ball.inHole = false;
      }
    }
  });
}
