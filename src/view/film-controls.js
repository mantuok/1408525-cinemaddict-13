const createControlTemplate = (isInFilterList, labelName, name) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}"
  ${isInFilterList ? `checked` : ``}>
  <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${labelName}</label>`;
};

export const createFilmControlsTemplate = (film) => {
  const {isInWatchlist, isFavourite, isWatched} = film;
  const Watchlist = {
    IS_IN: isInWatchlist,
    LABEL: `Add to watchlist`,
    NAME: `watchlist`
  };
  const Favourite = {
    IS_IN: isFavourite,
    LABEL: `Add to favorites`,
    NAME: `favorite`
  };
  const History = {
    IS_IN: isWatched,
    LABEL: `Already watched`,
    NAME: `watched`
  };

  return `<section class="film-details__controls">
    ${createControlTemplate(Watchlist.IS_IN, Watchlist.LABEL, Watchlist.NAME)}
    ${createControlTemplate(History.IS_IN, History.LABEL, History.NAME)}
    ${createControlTemplate(Favourite.IS_IN, Favourite.LABEL, Favourite.NAME)}
  </section>`;
};
