export const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const getRandomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));
export const getRandomBoolean = () => Boolean(Math.round(Math.random()));
export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
