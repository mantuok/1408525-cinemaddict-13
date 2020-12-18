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
  remove
} from "../utils/render.js";
import {isEscapeKey} from "../utils/common.js";

export default class FilmPopup {
  constructor(mainElement, bodyElement) {
    this._bodyElement = bodyElement;
    this._mainElement = mainElement;

    this._filmDetailsPopupComponent = new FilmDetailsPopupView();
    this._filmDetailsPopupElement = this._filmDetailsPopupComponent.getElement();
    this._filmDetailsFormElement = this._filmDetailsPopupComponent.getFormElement();
    this._popupTopContainerComponent = new PopupTopContainerView();
    this._popupTopContainerElement = this._popupTopContainerComponent.getElement();
    this._popupBottomContainerComponent = new PopupBottomContainerView();
    this._popupBottomContainerElement = this._popupBottomContainerComponent.getElement();
    this._commentsContainerElement = this._popupBottomContainerComponent.getCommetsContainer();

    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments.slice();

    render(this._mainElement, this._filmDetailsPopupElement);
    render(this._filmDetailsFormElement, this._popupTopContainerElement);
    render(this._filmDetailsFormElement, this._popupBottomContainerElement);

    this._bodyElement.classList.add(`hide-overflow`);
    this._popupTopContainerComponent.setCloseButtonClickHandler(this._handleClosePopupButtonClick)
    document.addEventListener(`keydown`, this._escapeKeydownHandler);

    this._renderFilmPopup();
  }

  _renderFilmDetails() {
    render(this._popupTopContainerElement, new FilmDetailsView(this._film).getElement());
  }

  _renderFilmControls() {
    render(this._popupTopContainerElement, new FilmControlsView(this._film).getElement());
  }

  _renderCommentsTitle() {
    render(this._commentsContainerElement, new CommentsTitleView(this._film).getElement());
  }

  _renderCommentsList() {
    render(this._commentsContainerElement, new CommentsListView(this._film, this._comments).getElement());
  }

  _renderNewComment() {
    render(this._commentsContainerElement, new NewCommentView().getElement());
  }

  _closeFilmDetailsPopup() {
    remove(this._filmDetailsPopupComponent);
    this._bodyElement.classList.remove(`hide-overflow`);
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

  _renderFilmPopup() {
    this._renderFilmDetails();
    this._renderFilmControls();
    this._renderCommentsTitle();
    this._renderCommentsList();
    this._renderNewComment();
  }
}
