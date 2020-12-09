import {getYearFormat} from "../utils/day.js";
import {getHourMinuteFormat} from "../utils/utils.js";
import {getTruncatedText} from "../utils/utils.js";
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
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    Array.from(
        this.getElement()
        .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`))
    .forEach((element) => {
      element.addEventListener(`click`, this._clickHandler);
    });
  }
}
