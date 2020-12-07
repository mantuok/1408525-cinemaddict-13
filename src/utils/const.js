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
