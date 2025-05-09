export const state = {
  gamePhase: "angle",
  strokeCount: 0, // Antal slag för den aktuella banan
  strokesPerCourse: {}, // Sparar antal slag för varje bana
  level: 1, // Aktuell bana
};

export function saveStrokesForCourse(level) {
  state.strokesPerCourse[level] = state.strokeCount;
  console.log(`Saved strokes for course ${level}: ${state.strokeCount}`);
}
