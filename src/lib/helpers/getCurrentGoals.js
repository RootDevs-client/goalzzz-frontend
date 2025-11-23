export function getCurrentGoals(scores) {
  let tOne = 0;
  let tTwo = 0;

  scores?.map((item) => {
    if (item.description === 'CURRENT') {
      if (item?.score?.participant === 'home') {
        tOne = item?.score?.goals;
      } else if (item?.score?.participant === 'away') {
        tTwo = item?.score?.goals;
      }
    }
  });

  return `${tOne} - ${tTwo}`;
}
