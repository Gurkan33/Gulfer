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
        teeStartPosX: 125,
        teeStartPosY: 450,
        backgroundImg: "assets/golfbana2_gulfer.png",
    },
    3: {
        teeStartPosX: 125,
        teeStartPosY: 400,
        backgroundImg: "assets/golfbana3_gulfer.png",
    },
    4: {
        teeStartPosX: 150,
        teeStartPosY: 700,
        backgroundImg: "assets/golfbana4_gulfer.png",
    },
    5: {
        teeStartPosX: 200,
        teeStartPosY: 500,
        backgroundImg: "assets/golfbana5_gulfer.png",
    },
    6: {
        teeStartPosX: 180,
        teeStartPosY: 650,
        backgroundImg: "assets/golfbana6_gulfer.png",
    },
    7: {
        teeStartPosX: 200,
        teeStartPosY: 500,
        backgroundImg: "assets/golfbana7_gulfer.png",
    },
    8: {
        teeStartPosX: 125,
        teeStartPosY: 550,
        backgroundImg: "assets/golfbana8_gulfer.png",
    },
    9: {
        teeStartPosX: 200,
        teeStartPosY: 500,
        backgroundImg: "assets/golfbana9_gulfer.png",
    },

};