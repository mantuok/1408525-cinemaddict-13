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

export const totalWatchedFilms = (films) => {
  return filterTypeToFilmsFilter[FilterType.HISTORY](films);
}

export const watchedFilmsByPeriond = (totalWatchedFilms, period) => {
  const arr = []
  totalWatchedFilms.forEach((watchedFilm) => {
    if (dayjs(watchedFilm.watchDate).isBetween(dayjs(), dayjs().subtract(1, period))) {
      arr.push(watchedFilm)
    }
  })
  return arr;
}

export const getWatchedFilmsDuration = (watchedFilms) => {
  let totalDuration = 0;
  watchedFilms.forEach((watchedFilm) => {
        totalDuration += watchedFilm.duration
      })
  return {
    hours: getHours(totalDuration),
    minutes: getMinutes(totalDuration)
  }
}

export const getFavouriteGenre = (watchedFilms) => {
  const watchedGenres = watchedFilms.map((film) => film.genres).flat();
  const genresCount = {};
  watchedGenres.forEach((genre) => genresCount[genre] = (genresCount[genre] || 0) + 1)
  return Object.entries(genresCount)
      .sort((a, b) => b[1] - a[1])[0][0]
}

export const countWatchedFilmsInPeriodByGenre = (films, period) => {

}
