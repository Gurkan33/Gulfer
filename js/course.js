const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


export const course_levels = {
    1: {
        teeStartPosX: 220,
        teeStartPosY: 800,
        backgroundImg: "assets/golfbana1_gulfer.png", 
    },
    2: {
        teeStartPosX: 100,
        teeStartPosY: 500,
        backgroundImg: "assets/golfbana2_gulfer.png",
    },
    3: {
        teeStartPosX: 200,
        teeStartPosY: 500,
        backgroundImg: "assets/golfbana3_gulfer.png",
    },
};