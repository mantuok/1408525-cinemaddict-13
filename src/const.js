export const FilmsListType = {
  MAIN: {
    title: `All movies. Upcoming`,
    isHidden: true,
    isExtra: false
  },
  TOP_RATED: {
    title: `Top rated`,
    isHidden: false,
    isExtra: true
  },
  TOP_COMMENTED: {
    title: `Most commented`,
    isHidden: false,
    isExtra: true
  },
  EMPTY: {
    title: `There are no movies in our database`,
    isHidden: false,
    isExtra: false
  }
};

export const FilmRenderStep = {
  MAIN: 5,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  OPEN_POPUP: `OPEN_POPUP`
};

export const SortType = {
  DEAFULT: `DEFAULT`,
  BY_DATE: `BY_DATE`,
  BY_RATING: `BY_RATING`
}
