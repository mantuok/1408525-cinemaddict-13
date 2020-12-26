import FilmCardView from "../view/film-card.js";
import FilmPopupPresenter from "../presenter/film-popup.js";
import {
  render,
  replace,
  remove
} from "../utils/render.js";
import {UserAction} from "../const.js"

// const Mode = {
//   DEFAULT: `DEFAULT`,
//   OPENED_POPUP: `OPENED_POPUP`
// }

export default class FilmCard {
  constructor(filmListElement, mainElement, change) {
    this._mainElement = mainElement;
    this._filmsListElement = filmListElement;
    this._change = change;
    // this._closePopup = closePopup;
    this._component = null;
    this._filmPopupPresenter = null;


    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmCardComponent = this._component;

    this._component = new FilmCardView(this._film);

    this._component.setClickHandler(() => {

      this._change(UserAction.OPEN_POPUP, this.resetView)
      // this._closePopup();
      this._filmPopupPresenter = new FilmPopupPresenter(
          this._mainElement,
          this._change
        );
      this._filmPopupPresenter.init(this._film, this._comments);
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
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._component);
  }

  resetView() {
    console.log(`reset`)
    if (this._filmPopupPresenter !== null) {
      this._filmPopupPresenter.destroy();
      this._filmPopupPresenter = null;
    }
  }

  updatePopup(updatedFilm) {
    if (this._filmPopupPresenter !== null) {
      this._filmPopupPresenter.updateControls(updatedFilm);
    }
  }

  _render() {
    render(this._filmsListElement, this._component);
  }

  _handleAddToWatchlistClick() {
    this._change(
        UserAction.UPDATE_FILM,
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
    this._change(
        UserAction.UPDATE_FILM,
        Object.assign(
            {},
            this._film,
            {
              isMarkedAsWatched: !this._film.isMarkedAsWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._change(
        UserAction.UPDATE_FILM,
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
