import {getRandom} from "../utils.js"
import {getRandomFrom} from "../utils.js"
import {getRandomArray} from "../utils.js"
import dayjs from "dayjs";

const dates = [
  `2020-02-10 22:00`,
  `2019-11-27 23:00`,
  `2020-12-15 21:30`,
  `2020-07-12 19:00`
]

const texts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`
]

const identifiers = [1, 2, 3, 4, 5];

const getCommentDate = () => dayjs(getRandomFrom(dates)).format(`YYYY/MM/DD HH:MM`);
const getCommentText = () => getRandomFrom(texts);
const getCommentID = () => identifiers.shift();

export const generateComment = () => {
  return {
    id: getCommentID(),
    text: getCommentText(),
    emotion: `./images/emoji/smile.png`,
    author: `John Doe`,
    date: getCommentDate()
  }
}
