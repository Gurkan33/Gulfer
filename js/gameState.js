export const state = {
  gamePhase: "angle",
  strokeCount: 0, // Antal slag för den aktuella banan
  strokesPerCourse: {}, // Sparar antal slag för varje bana
  level: 3, // Aktuell bana
  totalScore: 0,

  parPerCourse: {
    1: 3, 
    2: 4, 
    3: 5, 
    4: 4, 
    5: 4, 
    6: 4, 
    7: 4, 
    8: 4, 
    9: 4
  },
};

// Spara antalet slag när ett hål är klart
export function saveStrokesForCourse(level) {
  state.strokesPerCourse[level] = state.strokeCount;
  console.log(`Saved strokes for course ${level}: ${state.strokeCount}`);
}

// Räkna ut poängtexten (Par, Birdie, Bogey, osv.)
export function getScoreText(level) {
  const par = state.parPerCourse[level];
  const strokes = state.strokeCount;

  const diff = strokes - par;

  console.log(`Par: ${par}, Strokes: ${strokes}, Diff: ${diff}`);

  if (diff === 0) return "Par";
  if (diff === -1) return "Birdie!";
  if (diff === -2) return "Eagle!";
  if (diff === 1) return "Bogey";
  if (diff === 2) return "Double Bogey";
  if (diff <= -3) return "Albatross!";
  if (diff >= 3) return `${diff} over par`;

  return "Score okänd";
}