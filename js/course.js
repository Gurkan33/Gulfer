const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export let level = 1;

export const course_levels = {
    1: {teeStartPosX: 40, teeStartPosY: canvas.height/2, course:"", par: 3},
    2: {},
    3: {}
};