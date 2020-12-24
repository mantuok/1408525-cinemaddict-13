import FilmDetailsPopupView from "../view/film-details-popup.js";
import PopupTopContainerView from "../view/popup-top-container.js";
import PopupBottomContainerView from "../view/popup-bottom-container.js";
import FilmDetailsView from "../view/film-details.js";
import FilmControlsView from "../view/film-controls.js";
import CommentsListView from "../view/comments-list.js";
import CommentsTitleView from "../view/comments-title.js";
import NewCommentView from "../view/new-comment.js";
import {
  render,
  remove,
  replace
} from "../utils/render.js";
import {isEscapeKey} from "../utils/common.js";

export default class FilmPopup {
  constructor(mainElement, bodyElement, changeData) {
    this._bodyElement = bodyElement;
    this._mainElement = mainElement;
    this._changeData = changeData;

    this._filmDetailsPopupComponent = null;

    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments.slice();

    const prevFilmDetailsPopupComponent = this._filmDetailsPopupComponent;

    this._filmDetailsPopupComponent = new FilmDetailsPopupView();
    this._filmDetailsFormElement = this._filmDetailsPopupComponent.getFormElement();
    this._popupTopContainerComponent = new PopupTopContainerView();
    this._popupBottomContainerComponent = new PopupBottomContainerView();
    this._commentsContainerElement = this._popupBottomContainerComponent.getCommetsContainer();

    render(this._mainElement, this._filmDetailsPopupComponent);
    render(this._filmDetailsFormElement, this._popupTopContainerComponent);
    render(this._filmDetailsFormElement, this._popupBottomContainerComponent);

    this._bodyElement.classList.add(`hide-overflow`);
    this._popupTopContainerComponent.setCloseButtonClickHandler(this._handleClosePopupButtonClick);
    document.addEventListener(`keydown`, this._escapeKeydownHandler);

    this._filmControlsComponent = new FilmControlsView(this._film);
    this._filmControlsComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._filmControlsComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmControlsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmDetailsPopupComponent === null) {
      this._render();
      return;
    }

    if (this._mainElement.contains(prevFilmDetailsPopupComponent.getElement())) {
      replace(this._filmDetailsPopupComponent, prevFilmDetailsPopupComponent);
    }

    remove(prevFilmDetailsPopupComponent);
  }

  destroy() {
    this._closeFilmDetailsPopup();
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  _renderFilmDetails() {
    render(this._popupTopContainerComponent, new FilmDetailsView(this._film));
  }

  _renderFilmControls() {
    render(this._popupTopContainerComponent, this._filmControlsComponent);
  }

  _renderCommentsTitle() {
    render(this._commentsContainerElement, new CommentsTitleView(this._film));
  }

  _renderCommentsList() {
    render(this._commentsContainerElement, new CommentsListView(this._film, this._comments));
  }

  _renderNewComment() {
    render(this._commentsContainerElement, new NewCommentView());
  }

  _closeFilmDetailsPopup() {
    remove(this._filmDetailsPopupComponent);
    this._bodyElement.classList.remove(`hide-overflow`);
  }

  _render() {
    this._renderFilmDetails();
    this._renderFilmControls();
    this._renderCommentsTitle();
    this._renderCommentsList();
    this._renderNewComment();
  }

  _escapeKeydownHandler(evt) {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      this._closeFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._escapeKeydownHandler);
    }
  }

  _handleClosePopupButtonClick() {
    this._closeFilmDetailsPopup();
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
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
