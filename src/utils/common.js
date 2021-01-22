import dayjs from "dayjs";
import {RATING_TITLES} from "../const.js";

const MINUTE_IN_HOUR = 60;
const KeyboardKey = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};

export const changeFirstCharToUppercase = (word) =>
  `${word[0].toUpperCase()}${word.slice(1)}`;

export const getHourMinuteFormat = (time) =>
  `${getHours(time)}h ${getMinutes(time)}m`;

export const getHours = (time) => Math.floor(time / MINUTE_IN_HOUR);
export const getMinutes = (time) => time % MINUTE_IN_HOUR;


export const getTruncatedText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}...`
    : text;

export const isEscapeKey = (key) => key === KeyboardKey.ESCAPE;

export const isEnterKey = (key) => key === KeyboardKey.ENTER;

export const isEmptyList = (items) => items.length === 0;

export const updateItemById = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const sortByDate = (itemA, itemB) => dayjs(itemB.date).diff(dayjs(itemA.date));

export const getRatingTitle = (value) => RATING_TITLES
  .find(({rating}) => rating <= value)
  .title;

export const countWatchedFilms = (films) => films
  .reduce((count, {isMarkedAsWatched}) => isMarkedAsWatched ? count + 1 : count, 0);

export const getFilmId = () => Date.now() + parseInt(Math.random() * 10000, 10);
