const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mätarens egenskaper
let meter = {
    y: canvas.height - 150,  // Startposition för mätaren på y-axeln
    speed: 5,
    height: 20,  // Höjd på mätaren
    width: 150,  // Bredden på mätaren (hur långt mätaren rör sig vertikalt)
    isMoving: true, // Håller koll på om mätaren rör sig eller inte
    angle: 0 // Vinkel mellan -90 och 90
};

export let shootAngle = 0;

// Funktion för att rita mätaren (vertikal version)
export function drawAngleMeter() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width - 50, meter.y, 30, 30); // Bakgrund till mätaren (vertikal)

    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width - 50, meter.y, 30, meter.height); // Själva mätaren (vertikal)
}

// Funktion för att uppdatera mätarens position
export function updateAngleMeter() {
    if (meter.isMoving) {
        meter.y += meter.speed;

        // Om mätaren går utanför canvas, ändra riktning
        if (meter.y + meter.height > canvas.height || meter.y < 0) {
            meter.speed = -meter.speed;
        }
    }

    // Om mätaren har stannat, beräkna vinkeln
    meter.angle = mapToAngle(meter.y);
}

// Mappa mätarens y-position till en vinkel mellan -90 och 90
function mapToAngle(yPosition) {
    let angle = ((yPosition / canvas.height) * 180) - 90; // Mappning från 0 till canvas.height till -90 till 90 grader
    return angle;
}

// Lyssna på Enter-knappen för att stoppa mätaren och välja värdet
document.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        meter.isMoving = false; // Stoppa mätaren
        shootAngle = meter.angle;
        console.log("Vinkel valdes: " + meter.angle + " grader");
    }
});
