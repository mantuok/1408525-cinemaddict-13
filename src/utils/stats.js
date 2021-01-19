import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  getRatingTitle,
  getHours,
  getMinutes,
  countWatchedFilms
} from "../utils/common.js"
import {filterTypeToFilmsFilter} from "../utils/filter.js";
import {
  FilterType,
  TimePeriod
} from "../const.js";


dayjs.extend(isBetween);

export const getTotalWatchedFilms = (films) => {
  return filterTypeToFilmsFilter[FilterType.HISTORY](films);
}

export const getWatchedFilmsByPeriond = (films, period) => {
  const totalWatchedFilms = getTotalWatchedFilms(films);
  if (period === TimePeriod.ALL_TIME) {
    return totalWatchedFilms;
  }
  const watchedFilmsByPeriond = [];
  totalWatchedFilms.forEach((watchedFilm) => {
    if (dayjs(watchedFilm.watchDate).isBetween(dayjs(), dayjs().subtract(1, period))) {
      watchedFilmsByPeriond.push(watchedFilm)
    }
  });
  return watchedFilmsByPeriond;
}

export const getWatchedFilmsDuration = (watchedFilms) => {
  if (watchedFilms.length === 0) {
    return {
      hours: 0,
      minutes: 0
    }
  }
  let totalDuration = 0;
  watchedFilms.forEach((watchedFilm) => {
        totalDuration += watchedFilm.duration
      })
  return {
    hours: getHours(totalDuration),
    minutes: getMinutes(totalDuration)
  }
}

export const getWatchedGenres = (watchedFilms) => watchedFilms.map((film) => film.genres).flat();

export const getWatchedGenresCount = (watchedFilms) => {
  const watchedGenres = getWatchedGenres(watchedFilms);
  const genresCount = {};
  watchedGenres.forEach((genre) => genresCount[genre] = (genresCount[genre] || 0) + 1);
  return genresCount;
}

export const getFavouriteGenre = (watchedFilms) => {
  if (watchedFilms.length === 0) {
    return ``;
  }
  const watchedGenresCount = getWatchedGenresCount(watchedFilms);
  return Object.entries(watchedGenresCount)
      .sort((a, b) => b[1] - a[1])[0][0]
}
