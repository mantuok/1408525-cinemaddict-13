import FilmCardView from "../view/film-card.js";
import FilmPopupPresenter from "../presenter/film-popup.js";
import {
  render,
  replace,
  remove
} from "../utils/render.js";

export default class FilmCard {
  constructor(filmListElement, mainElement, bodyElement, changeData, closePopup) {
    this._mainElement = mainElement;
    this._bodyElement = bodyElement;
    this._filmsListElement = filmListElement;
    this._changeData = changeData;
    this._closePopup = closePopup;

    this._component = null;
    this._isFilmPopupOpen = false;

    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmCardComponent = this._component;

    this._component = new FilmCardView(this._film);
    this._filmPopupPresenter = new FilmPopupPresenter(
        this._mainElement,
        this._bodyElement,
        this._changeData);

    this._component.setClickHandler(() => {
      if (this._isFilmPopupOpen) {
        this._closePopup();
        this._filmPopupPresenter = new FilmPopupPresenter(
            this._mainElement,
            this._bodyElement,
            this._changeData);
      }
      this._filmPopupPresenter.init(this._film, this._comments);
      this._isFilmPopupOpen = true;
    });

    this._component.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._component.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._component.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmCardComponent === null) {
      this._render();
      return;
    }

    if (this._filmsListElement.contains(prevFilmCardComponent.getElement())) {
      replace(this._component, prevFilmCardComponent);
      if (this._isFilmPopupOpen) {
        this._filmPopupPresenter.init(this._film, this._comments);
      }
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._component);
  }

  resetPopup() {
    if (this._isFilmPopupOpen) {
      this._filmPopupPresenter.destroy();
    }
  }

  _render() {
    render(this._filmsListElement, this._component);
  }

  _handleAddToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist
            }
        )
    );
  }

  _handleMarkAsWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isMarkedAsWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
