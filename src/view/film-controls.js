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
  const {isInWatchlist, isFavorite, isMarkedAsWatched} = film;

  return `<section class="film-details__controls">
    ${createControlTemplate(ControlName.WATCHLIST, ControlNameLabel[ControlName.WATCHLIST], isInWatchlist)}
    ${createControlTemplate(ControlName.WATCHED, ControlNameLabel[ControlName.WATCHED], isMarkedAsWatched)}
    ${createControlTemplate(ControlName.FAVORITE, ControlNameLabel[ControlName.FAVORITE], isFavorite)}
  </section>`;
};

export default class FilmControls extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmControlsTemplate(this._film);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._addToWatchlistClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.addToFavoriteClick = callback;
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.markAsWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }
}
