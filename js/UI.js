// Mätarens egenskaper
let meter = {
    x: 0,
    speed: 5,
    width: 20,
    isMoving: true, // Håller koll på om mätaren rör sig eller inte
    angle: 0 // Vinkel mellan -90 och 90
};

export let shootAngle = 0
// Funktion för att rita mätaren
export function drawMeter() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 30); // Bakgrund till mätaren

    ctx.fillStyle = 'green';
    ctx.fillRect(meter.x, canvas.height - 50, meter.width, 30); // Själva mätaren
}

// Funktion för att uppdatera mätarens position
export function updateMeter() {
    if (meter.isMoving) {
        meter.x += meter.speed;

        // Om mätaren går utanför canvas, ändra riktning
        if (meter.x + meter.width > canvas.width || meter.x < 0) {
            meter.speed = -meter.speed;
        }
    }

    // Om mätaren har stannat, beräkna vinkeln
    meter.angle = mapToAngle(meter.x);
}

// Mappa mätarens x-position till en vinkel mellan -90 och 90
function mapToAngle(xPosition) {
    let angle = (xPosition / canvas.width) * 180 - 90; // Mappning från 0 till canvas.width till -90 till 90 grader
    return angle;
}


// Lyssna på Enter-knappen för att stoppa mätaren och välja värdet
document.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        meter.isMoving = false; // Stoppa mätaren
        shootAngle = meter.angle
        console.log("Vinkel valdes: " + meter.angle + " grader");
    }
});