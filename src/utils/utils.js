const MINUTE_IN_HOUR = 60;
const KeyboardKey = {
  ESCAPE: `Escape`
};

export const changeFirstCharToUppercase = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
export const getHourMinuteFormat = (duration) => `${Math.floor(duration / MINUTE_IN_HOUR)}h ${duration % MINUTE_IN_HOUR}m`;
export const getTruncatedText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}...`
    : text;
export const isEscapeKey = (key) => key === KeyboardKey.ESCAPE;
