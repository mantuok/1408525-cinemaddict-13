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
import {
  UserAction,
  UpdateType
} from "../const.js";

export default class FilmPopup {
  constructor(mainElement, changeView, commentsModel) {
    this._mainElement = mainElement;
    this._changeView = changeView;
    this._commentsModel = commentsModel;

    this._filmControlsComponent = null;
    this._commentsListComponent = null;
    this._commentsTitleComponent = null;

    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    this._film = film;

    this._filmDetailsPopupComponent = new FilmDetailsPopupView();
    this._filmDetailsFormElement = this._filmDetailsPopupComponent.getFormElement();
    this._popupTopContainerComponent = new PopupTopContainerView();
    this._filmControlsComponent = new FilmControlsView(this._film);
    this._popupBottomContainerComponent = new PopupBottomContainerView();
    this._commentsContainerElement = this._popupBottomContainerComponent.getCommetsContainer();
    this._commentsListComponent = new CommentsListView(this._getFilmComments());
    this._commentsTitleComponent = new CommentsTitleView(this._getFilmComments());

    render(this._mainElement, this._filmDetailsPopupComponent);
    render(this._filmDetailsFormElement, this._popupTopContainerComponent);
    render(this._filmDetailsFormElement, this._popupBottomContainerComponent);

    document.body.classList.add(`hide-overflow`);
    this._popupTopContainerComponent.setCloseButtonClickHandler(this._handleClosePopupButtonClick);
    this._commentsListComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
    document.addEventListener(`keydown`, this._escapeKeydownHandler);

    this._render();
  }

  destroy() {
    this._closeFilmDetailsPopup();
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  updateControls(updatedfilm) {
    this._film = updatedfilm;
    const prevFilmControlsComponent = this._filmControlsComponent;
    this._filmControlsComponent = new FilmControlsView(this._film);
    replace(this._filmControlsComponent, prevFilmControlsComponent);
    this._setControlClickHandlers();
    remove(prevFilmControlsComponent);
  }

  updateComments() {
    const prevCommentsListComponent = this._commentsListComponent;
    this._commentsListComponent = new CommentsListView(this._getFilmComments());
    replace(this._commentsListComponent, prevCommentsListComponent);
    this._commentsListComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
    remove(prevCommentsListComponent);
  }

  updateTitle() {
    const prevCommentsTitleComponent = this._commentsTitleComponent;
    this._commentsTitleComponent = new CommentsTitleView(this._getFilmComments());
    replace(this._commentsTitleComponent, prevCommentsTitleComponent);
    remove(prevCommentsTitleComponent);
  }

  _getFilmComments() {
    const comments = this._commentsModel.getComments().slice();
    // console.log(comments)
    return comments.filter((comment) => this._film.comments.includes(comment.id));
  }

  _setControlClickHandlers() {
    this._filmControlsComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._filmControlsComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmControlsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _renderFilmDetails() {
    render(this._popupTopContainerComponent, new FilmDetailsView(this._film));
  }
  _renderFilmControls() {
    render(this._popupTopContainerComponent, this._filmControlsComponent);
  }
  _renderCommentsTitle() {
    render(this._commentsContainerElement, this._commentsTitleComponent);
  }
  _renderCommentsList() {
    render(this._commentsContainerElement, this._commentsListComponent);
  }
  _renderNewComment() {
    render(this._commentsContainerElement, new NewCommentView());
  }
  _closeFilmDetailsPopup() {
    remove(this._filmDetailsPopupComponent);
    document.body.classList.remove(`hide-overflow`);
  }

  _render() {
    this._renderFilmDetails();
    this._renderFilmControls();
    this._renderCommentsTitle();
    this._renderCommentsList();
    this._renderNewComment();
    this._setControlClickHandlers();
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
    this._changeView(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist,
            }
        )
    );
  }

  _handleMarkAsWatchedClick() {
    this._changeView(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
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
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleDeleteButtonClick(commentId) {
    this._handleViewAction(UpdateType.MINOR, UserAction.DELETE_COMMENT, commentId);
  }

  _handleViewAction(updateType, actionType, commentId) {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, comment);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, commentId);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // debugger
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
          this._changeView(
            UserAction.UPDATE_FILM,
            UpdateType.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: this._film.comments.filter((comment) => comment != data)
                }
            )
          )

        break;
      case UpdateType.MAJOR:
        break;
    }
  }



  // _handleDeleteClick(comment) {
  //   this._changeView(
  //       UserAction.DELETE_COMMENT,
  //       UpdateType.MINOR,
  //       comment
  //   )
  // }
}
