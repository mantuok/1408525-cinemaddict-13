import {getRandomFrom} from "./random.js";
import {getDateTimeFormat} from "../utils/day.js";

const dates = [
  `2020-02-10 22:00`,
  `2019-11-27 23:00`,
  `2020-12-15 21:30`,
  `2020-07-12 19:00`
];

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const texts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`
];

const identifiers = [1, 2, 3, 4, 5];

const getCommentDate = () => getDateTimeFormat(getRandomFrom(dates));
const getCommentText = () => getRandomFrom(texts);
const getCommentID = () => identifiers.shift();
const getEmotion = () => getRandomFrom(emotions);

export const generateComment = () => {
  return {
    id: getCommentID(),
    text: getCommentText(),
    emotion: getEmotion(),
    author: `John Doe`,
    date: getCommentDate()
  };
};
