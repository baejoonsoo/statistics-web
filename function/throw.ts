export const coinThrow = (num: number): number[] => {
  let statistics: number[] = [0, 0];

  for (let i = 0; i < num; i++) {
    statistics[Math.floor(Math.random() * 2)]++;
  }

  return statistics;
};

export const diceThrow = (num: number): number[] => {
  let statistics: number[] = Array(6).fill(0);

  for (let i = 0; i < num; i++) {
    statistics[Math.floor(Math.random() * 6)]++;
  }

  return statistics;
};
