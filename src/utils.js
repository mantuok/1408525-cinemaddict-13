export const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
export const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length / 2), getRandom(arr.length / 2 + 1, arr.length - 1));
