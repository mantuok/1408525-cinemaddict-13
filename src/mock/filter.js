const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  favourite: (films) => films.filter((film) => film.isFavorite).length,
  history: (films) => films.filter((film) => film.isMarkedAsWatched).length
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films)
    };
  });
};
