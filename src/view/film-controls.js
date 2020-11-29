const createControlTemplate = (name, label, isChecked = false) => {
  return `<input
  class="film-details__control-input visually-hidden"
  id="${name}"
  name="${name}"
  type="checkbox"
  ${isChecked ? `checked` : ``}>
  <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${label}</label>`;
};

export const createFilmControlsTemplate = (film) => {
  const {isInWatchlist, isFavourite, isWatched} = film;

  const ControlName = {
    WATCHLIST: `watchlist`,
    FAVORITE: `favorite`,
    WATCHED: `watched`,
  };

  const ControlNameLabel = {
    [ControlName.WATCHLIST]: `Add to watchlist`,
    [ControlName.FAVORITE]: `Add to favorites`,
    [ControlName.WATCHED]: `Already watched`,
  };

  return `<section class="film-details__controls">
    ${createControlTemplate(ControlName.WATCHLIST, ControlNameLabel[ControlName.WATCHLIST], isInWatchlist)}
    ${createControlTemplate(ControlName.WATCHED, ControlNameLabel[ControlName.WATCHED], isWatched)}
    ${createControlTemplate(ControlName.FAVORITE, ControlNameLabel[ControlName.FAVORITE], isFavourite)}
  </section>`;
};
