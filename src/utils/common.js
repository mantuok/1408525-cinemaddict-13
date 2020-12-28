import dayjs from "dayjs";

const MINUTE_IN_HOUR = 60;
const KeyboardKey = {
  ESCAPE: `Escape`
};

export const changeFirstCharToUppercase = (word) =>
  `${word[0].toUpperCase()}${word.slice(1)}`;

export const getHourMinuteFormat = (duration) =>
  `${Math.floor(duration / MINUTE_IN_HOUR)}h ${duration % MINUTE_IN_HOUR}m`;

export const getTruncatedText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}...`
    : text;

export const isEscapeKey = (key) => key === KeyboardKey.ESCAPE;

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
