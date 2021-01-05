import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime);

export const getDateTimeFormat = (date) => dayjs(date).format(`YYYY/MM/DD HH:MM`);
export const getYearFormat = (date) => dayjs(date).format(`YYYY`);
export const getFullDateFormat = (date) => dayjs(date).format(`DD MMMM YYYY`);
export const getHumanDateFormat = (date) => dayjs(date).fromNow();
