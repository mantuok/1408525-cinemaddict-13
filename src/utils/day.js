import dayjs from "dayjs";

export const getDateTimeFormat = (date) => dayjs(date).format(`YYYY/MM/DD HH:MM`);
export const getYearFormat = (date) => dayjs(date).format(`YYYY`);
export const getFullDateFormat = (date) => dayjs(date).format(`DD MMMM YYYY`);

