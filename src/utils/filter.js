import {FilterType} from "../const.js";

export const filterTypeToFilmsFilter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.slice().filter((film) => film.isInWatchlist),
  [FilterType.FAVORITES]: (films) => films.slice().filter((film) => film.isFavorite),
  [FilterType.HISTORY]: (films) => films.slice().filter((film) => film.isMarkedAsWatched)
};
