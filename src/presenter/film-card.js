import FilmCardView from "../view/film-card.js";
import FilmPopupPresenter from "../presenter/film-popup.js";
import {
  render,
  replace,
  remove
} from "../utils/render.js";
import {
  UserAction,
  UpdateType
} from "../const.js";

export default class FilmCard {
  constructor(filmListElement, mainElement, changeView, commentsModel) {
    this._mainElement = mainElement;
    this._filmsListElement = filmListElement;
    this._changeView = changeView;
    this._component = null;
    this._filmPopupPresenter = null;
    this._commentsModel = commentsModel;

    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._component;

    this._component = new FilmCardView(this._film);

    this._component.setClickHandler(() => {
      this._changeView(UserAction.OPEN_POPUP, this.resetView);
      this._filmPopupPresenter = new FilmPopupPresenter(
          this._mainElement,
          this._changeView,
          this._commentsModel
      );
      this._filmPopupPresenter.init(this._film);
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
    if (this._filmPopupPresenter !== null) {
      this._filmPopupPresenter.destroy();
      this._filmPopupPresenter = null;
    }
  }

  updatePopup(updatedFilm) {
    if (this._filmPopupPresenter !== null) {
      this._filmPopupPresenter.updateControls(updatedFilm);
      this._filmPopupPresenter.updateComments();
      this._filmPopupPresenter.updatetitle();
    }
  }

  _render() {
    render(this._filmsListElement, this._component);
  }

  _handleAddToWatchlistClick() {
    this._changeView(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
    this._changeView(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
    this._changeView(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
