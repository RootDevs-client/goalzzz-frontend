// helpers/scoreHelpers.js

export function calculateTotalScore(scores) {
  let homeTotal = 0;
  let awayTotal = 0;

  scores.forEach((score) => {
    const {
      score: { goals },
      participant,
    } = score;
    if (participant === 'home') {
      homeTotal += goals;
    } else if (participant === 'away') {
      awayTotal += goals;
    }
  });

  return `${homeTotal}-${awayTotal}`;
}
