
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

    this._filmCardComponent = null;
    this._isFilmPopupOpen = false;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    this._filmPopupPresenter = new FilmPopupPresenter(
        this._mainElement,
        this._bodyElement,
        this._changeData);

    this._filmCardComponent.setClickHandler(() => {
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

    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavouriteClickHandler(this._handleFavouriteClick);

    if (prevFilmCardComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._filmsListElement.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      if (this._isFilmPopupOpen) {
        this._filmPopupPresenter.init(this._film, this._comments);
      }
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetPopup() {
    if (this._isFilmPopupOpen) {
      this._filmPopupPresenter.destroy();
    }
  }

  _renderFilmCard() {
    render(this._filmsListElement, this._filmCardComponent.getElement());
  }

  _handleWatchlistClick() {
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

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavouriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavourite: !this._film.isFavourite
            }
        )
    );
  }
}
