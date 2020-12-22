import AbstractView from "./abstract.js";

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

const createControlTemplate = (name, label, isChecked = false) => {
  return `<input
  class="film-details__control-input visually-hidden"
  id="${name}"
  name="${name}"
  type="checkbox"
  ${isChecked ? `checked` : ``}>
  <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${label}</label>`;
};

const createFilmControlsTemplate = (film) => {
  const {isInWatchlist, isFavourite, isWatched} = film;

  return `<section class="film-details__controls">
    ${createControlTemplate(ControlName.WATCHLIST, ControlNameLabel[ControlName.WATCHLIST], isInWatchlist)}
    ${createControlTemplate(ControlName.WATCHED, ControlNameLabel[ControlName.WATCHED], isWatched)}
    ${createControlTemplate(ControlName.FAVORITE, ControlNameLabel[ControlName.FAVORITE], isFavourite)}
  </section>`;
};

export default class FilmControls extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmControlsTemplate(this._film);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
