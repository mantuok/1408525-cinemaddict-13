import {getYearFormat} from "../utils/day.js";
import {getHourMinuteFormat} from "../utils/common.js";
import {getTruncatedText} from "../utils/common.js";
import AbstractView from "./abstract.js";

const DESCRIPTION_MAX_LENGTH = 140;
const getFilterStatus = (isActive) => isActive ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = (film) => {
  const {poster, title, rating, date, duration, genres, description, comments, isInWatchlist, isFavourite, isWatched} = film;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${getYearFormat(date)}</span>
    <span class="film-card__duration">${getHourMinuteFormat(duration)}</span>
    <span class="film-card__genre">${genres[0]}</span>
  </p>
  <img src="${poster}" alt="${title}" class="film-card__poster">
  <p class="film-card__description">${getTruncatedText(description, DESCRIPTION_MAX_LENGTH)}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getFilterStatus(isInWatchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getFilterStatus(isWatched)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${getFilterStatus(isFavourite)}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
        .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
        .forEach((element) => {
          element.addEventListener(`click`, this._clickHandler);
        });
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }

  setFavouriteClickHandler(callback) {
    this._callback.favouriteClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favouriteClickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favouriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favouriteClick();
  }
}
