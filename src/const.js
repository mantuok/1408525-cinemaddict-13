export const FilmsListType = {
  MAIN: {
    title: `All movies. Upcoming`,
    isHidden: true,
    isExtra: false,
    renderStep: 5
  },
  TOP_RATED: {
    title: `Top rated`,
    isHidden: false,
    isExtra: true,
    renderStep: 2
  },
  TOP_COMMENTED: {
    title: `Most commented`,
    isHidden: false,
    isExtra: true,
    renderStep: 2
  },
  EMPTY: {
    title: `There are no movies in our database`,
    isHidden: false,
    isExtra: false,
    renderStep: 0
  }
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  OPEN_POPUP: `OPEN_POPUP`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const SortType = {
  DEAFULT: `DEFAULT`,
  BY_DATE: `BY_DATE`,
  BY_RATING: `BY_RATING`
}

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
}

export const FilterType = {
  ALL: `ALL`,
  WATCHLIST: `WATCHLIST`,
  FAVORITES: `FAVORITES`,
  HISTORY: `HISTORY`,
  STATS: `STATS`
}

export const RATING_TITLES = [
  {rating: 21, title: `Movie Buff`},
  {rating: 11, title: `Fan`},
  {rating: 1, title: `Novice`},
  {rating: 0, title: ``}
];
