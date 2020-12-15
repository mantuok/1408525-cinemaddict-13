import FilmDetailsPopupView from "../view/film-details-popup.js";
import PopupTopContainerView from "../view/popup-top-container.js";
import PopupBottomContainerView from "../view/popup-bottom-container.js";
import FilmDetailsView from "../view/film-details.js";
import FilmControlsView from "../view/film-controls.js";
import CommentsListView from "../view/comments-list.js";
import CommentsTitleView from "../view/comments-title.js";
import NewCommentView from "../view/new-comment.js";
import {renderElement} from "../utils/render.js";
import {FilmsListType} from "../utils/const.js";
import {
  isEscapeKey,
  isEmptyList
} from "../utils/utils.js";

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
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments.slice();

    renderElement(this._mainElement, this._filmDetailsPopupElement);
    renderElement(this._filmDetailsFormElement, this._popupTopContainerElement);
    renderElement(this._filmDetailsFormElement, this._popupBottomContainerElement);

    this._renderFilmPopup();
  }

  _renderFilmDetails() {
    renderElement(this._popupTopContainerElement, new FilmDetailsView(this._film).getElement());
  }

  _renderFilmControls() {
    renderElement(this._popupTopContainerElement, new FilmControlsView(this._film).getElement());
  }

  _renderCommentsTitle() {
    renderElement(this._commentsContainerElement, new CommentsTitleView(this._film).getElement());
  }

  _renderCommentsList() {
    renderElement(this._commentsContainerElement, new CommentsListView(this._film, this._comments).getElement());
  }

  _renderNewComment() {
    renderElement(this._commentsContainerElement, new NewCommentView().getElement());
  }

  _closeFilmDetailsPopup() {
    filmDetailsPopupElement.remove();
    filmDetailsPopupComponent.removeElement();
    bodyElement.classList.remove(`hide-overflow`)
  }

  _escapeKeydownHandler(evt) {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      closeFilmDetailsPopup();
      document.removeEventListener(`keydown`, escapeKeydownHandler);
    }
  }

  _closePopupButtonClickHandler() {
    closeFilmDetailsPopup();
    document.removeEventListener(`keydown`, escapeKeydownHandler);
  }

  _renderFilmPopup() {
    this._renderFilmDetails();
    this._renderFilmControls();
    this._renderCommentsTitle();
    this._renderCommentsList();
    this._renderNewComment();
  }

  // popupTopContainerComponent.setCloseButtonClickHandler(closePopupButtonClickHandler);
  // document.addEventListener(`keydown`, escapeKeydownHandler);
}
