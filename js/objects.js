
import { canvas,ctx, } from "./game.js";
import {state} from "./gameState.js";

/*olika kommandon för objekten: 

    type: "collider" - lämna även blank för collider, "water", "sand", "hole", "bush"(lägg till i collision.js)

    x: position i x led för objektet, placerat från centrum;
    y: position i y led för objektet, placerat från centrum;
    z: höjd på hitbox

    hitbox: typen av hitbox, "circle" eller "rectangle";
        Om (hitbox === "circle"){
            radius: radien på cirkeln;
        }
        Om (hitbox === "rectangle"){
            rotation: rotationen på rektangeln (grader)
            width: bredden på rektangeln;
            height: höjden på rektangeln;
        }

    color: färg på FORMEN

    sprite: URL till image på sprite
        if(sprite){
        offsetX: position på sprite själständigt från hitbox i x led
        offsetY: position på sprite själständigt från hitbox i y led
        size: original size
        }

    VIKTIGT : en sprite behåller formen och storleken av hitboxen. Du måste fortfarande välja hitbox etc även fast det är en sprite.

*/


export let objects = {
    1:[
    { x: 1400, y: 500, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100 },
    { x: 1000, y: 600, radius: 30, hitbox: 'circle', color: '', sprite: "assets/golfspelare.png", offsetX: 25, offsety: 10, size:100},
    // { x: 500, y: 700, radius: 115, hitbox: 'circle', color: 'red', type:"collider"},

    //water:
    { x: 270, y: 200, radius: 80, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 1480, y: 260, radius: 115, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 700, y: 172.5, width: 350, height: 400, hitbox: 'rectangle', color: 'blue', rotation: -4, type:"water"},
    { x: 250, y: 202, radius: 70, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 228, y: 204, radius: 52, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 285, y: 194, radius: 72, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 295, y: 185, width: 400, height: 137, hitbox: 'rectangle', color: 'blue', rotation: +12, type:"water"},
    { x: 390, y: 179, width: 200, height: 137, hitbox: 'rectangle', color: 'blue', rotation: +8, type:"water"},
    { x: 900, y: 400, radius: 242, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 865, y: 407, radius: 250, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 480, y: 370, width: 400, height: 137, hitbox: 'rectangle', color: 'blue', rotation: 47, type:"water"},
    { x: 370, y: 280, width: 500, height: 137, hitbox: 'rectangle', color: 'blue', rotation: 30, type:"water"},
    { x: 500, y: 185, width: 300, height: 137, hitbox: 'rectangle', color: 'blue', rotation: -2, type:"water"},
    { x: 1045, y: 180, width: 300, height: 367, hitbox: 'rectangle', color: 'blue', rotation: -2, type:"water"},
    { x: 1110, y: 360, radius: 207, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 940, y: 500, width: 250, height: 100, hitbox: 'rectangle', color: 'blue', rotation: -25, type:"water"},


    //water 2:
    { x: 1280, y: 725, width: 310, height: 120, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
    { x: 1235, y: 790, radius: 55, hitbox: 'circle', color: 'blue', type:"water"},

    //sand
    { x: 1600, y: 600, radius: 100, hitbox: 'circle', color: 'yellow', type:"sand"},
    { x: 500, y: 600, radius: 100, hitbox: 'circle', color: 'yellow', type:"sand"},
    //hole:
    {x:1650, y:475, radius:10, hitbox: "circle", color:"black", type:"hole"}
    
    ],
    2:[
        { x: 1400, y: 500, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100 },
        { x: 1000, y: 600, radius: 30, hitbox: 'circle', color: '', sprite: "assets/golfspelare.png", offsetX: 25, offsety: 10, size:100},
        // { x: 500, y: 700, radius: 115, hitbox: 'circle', color: 'red', type:"collider"},
        { x: 790, y: 310, radius: 60, hitbox: 'circle', color: 'yellow', type: "sand"}, 
        { x: 600, y: 310, radius: 40, hitbox: 'circle', color: 'yellow', type: "sand'"},
        { x: 630, y: 250, width: 200, height: 90, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"sand"},
        { x: 550, y: 570, radius: 55, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 755, y: 590, radius: 35, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 550, y: 530, width: 200, height: 90, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"sand"},
        { x: 1425, y: 220, width: 200, height: 70, hitbox: 'rectangle', color: 'blue', rotation: -25, type:"sand"},
        { x: 1300, y: 590, width: 140, height: 60, hitbox: 'rectangle', color: 'blue', rotation: 10, type:"sand"},
        { x: 1300, y: 610, radius: 30, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 1430, y: 625, radius: 35, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 1220, y: 275, radius: 30, hitbox: 'circle', color: 'yellow', type: "water"},
        { x: 1390, y: 200, radius: 30, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1230, y: 210, width: 160, height: 60, hitbox: 'rectangle', color: 'blue', rotation: -20, type:"water"},

        //hole:
        {x:1700, y:365, radius:10, hitbox: "circle", color:"black", type:"hole"}

    ],
    3:[
        { x: 470, y: 620, width: 1200, height: 800, hitbox: 'rectangle', color: 'blue', rotation: -30, type:"water"},
        { x: 1200, y: 310, width: 1200, height: 800, hitbox: 'rectangle', color: 'blue', rotation: -30, type:"water"},
        { x: 1400, y: 280, width: 1200, height: 800, hitbox: 'rectangle', color: 'blue', rotation: -65, type:"water"},
        { x: 1430, y: 450, radius: 70, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1490, y: 470, radius: 70, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1120, y: 330, radius: 146, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1110, y: 380, width: 200, height: 100, hitbox: 'rectangle', color: 'blue', rotation: -30, type:"water"},
        {x:1550, y:260, radius:10, hitbox: "circle", color:"black", type:"hole"}
        
        
    ],
    4:[
        { x: 1580, y: 650, radius: 60, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1630, y: 625, radius: 80, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1720, y: 600, radius: 70, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1340, y: 710, radius: 60, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 900, y: 690, width: 400, height: 130, hitbox: 'rectangle', color: 'blue', rotation: -8, type:"water"},
        { x: 870, y: 780, radius: 60, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 950, y: 330, radius: 50, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1520, y: 180, radius: 60, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 940, y: 190, width: 600, height: 120, hitbox: 'rectangle', color: 'blue', rotation: -15, type:"water"},
        {x:1700, y:350, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    5:[
        { x: 1430, y: 500, radius: 40, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1490, y: 590, radius: 30, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1550, y: 540, radius: 30, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1530, y: 750, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -90, type:"water"},
        { x: 1680, y: -60, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -70, type:"water"},
        { x: 1680, y: -50, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 60, type:"water"},
        { x: 1810, y: -60, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
        {x:1670, y:300, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    6:[
        { x: 1580, y: 210, radius: 130, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1480, y: 230, radius: 90, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1690, y: 270, radius: 80, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 670, y: 1330, radius: 600, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1170, y: 740, radius: 220, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 600, y: 650, width: 700, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -25, type:"water"},
        { x: 1300, y: 800, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
        { x: 1300, y: 770, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -10, type:"water"},
        {x:1600, y:600, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    7:[
        { x: 100, y: 890, radius: 220, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 200, y: 740, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 6, type:"water"},
        { x: 930, y: 975, radius: 320, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 900, y: 720, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 10, type:"water"},
        { x: 1200, y: 740, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -5, type:"water"},
        { x: 100, y: 70, radius: 220, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 200, y: -260, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -6, type:"water"},
        { x: 1200, y: -30, radius: 320, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 250, y: -260, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 6, type:"water"},
        { x: 1200, y: -290, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -8, type:"water"},
        { x: 1950, y: -70, radius: 320, hitbox: 'circle', color: 'yellow', type: 'water'},
        {x:1700, y:500, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    8:[
        { x: 1720, y: 500, radius: 70, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 670, y: 750, radius: 120, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 700, y: 610, width: 600, height: 240, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
        { x: 1370, y: 700, radius: 120, hitbox: 'circle', color: 'yellow', type: 'water'},
        {x:1700, y:800, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    9:[
        { x: 1100, y: 280, radius: 150, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1200, y: 260, radius: 130, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1000, y: 280, radius: 100, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1750, y: 800, radius: 100, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1800, y: 700, radius: 100, hitbox: 'circle', color: 'yellow', type: 'sand'},
        {x:1600, y:150, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
};


export function drawObjects() {
    objects[state.level].forEach(obj => {
        if (!obj.sprite) {

            if (obj.type === "water") {
                ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
                // ctx.fillStyle = "transparent";
            } else if (obj.type === "sand") {
                ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
                // ctx.fillStyle = "transparent";
            }
            else if (obj.type === "hole") {
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
            } 
            else {
                ctx.fillStyle = obj.color;
            }

            if (obj.hitbox === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

            } else if (obj.hitbox === 'rectangle') {
                ctx.save();
                ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
                ctx.rotate((obj.rotation || 0) * Math.PI / 180);
                ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
                ctx.restore();
            }

        } else {
            const img = new Image();
            img.src = obj.sprite;
            ctx.drawImage(img, obj.x - (img.width / 2) + obj.offsetX, obj.y - (img.width / 2) + obj.offsety, obj.size, obj.size);

            ctx.fillStyle = "rgba(195, 238, 5, 0.5)";
            if (obj.hitbox === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            } else if (obj.hitbox === 'rectangle') {
                ctx.save();
                ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
                ctx.rotate((obj.rotation || 0) * Math.PI / 180);
                ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
                ctx.restore();
            }
        }
    });
}
