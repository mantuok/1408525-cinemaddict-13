import FilmDetailsPopupView from "../view/film-details-popup.js";
import PopupTopContainerView from "../view/popup-top-container.js";
import PopupBottomContainerView from "../view/popup-bottom-container.js";
import FilmDetailsView from "../view/film-details.js";
import FilmControlsView from "../view/film-controls.js";
import CommentsListView from "../view/comments-list.js";
import CommentsTitleView from "../view/comments-title.js";
import NewCommentView from "../view/new-comment.js";
import LoadingView from "../view/loading.js";
import {
  render,
  remove,
  replace
} from "../utils/render.js";
import {
  isEscapeKey,
  isEnterKey
} from "../utils/common.js";
import {
  UserAction,
  UpdateType
} from "../const.js";

export default class FilmPopup {
  constructor(mainElement, changeView, commentsModel, api) {
    this._mainElement = mainElement;
    this._changeView = changeView;
    this._commentsModel = commentsModel;
    this._api = api;
    this._isLoadingComments = true;

    this._filmControlsComponent = null;
    this._commentsListComponent = null;
    this._commentsTitleComponent = null;

    this._handleClosePopupButtonClick = this._handleClosePopupButtonClick.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._submitKeydownHandler = this._submitKeydownHandler.bind(this);
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
    this._loadingComponent = new LoadingView();

    render(this._mainElement, this._filmDetailsPopupComponent);
    render(this._filmDetailsFormElement, this._popupTopContainerComponent);
    render(this._filmDetailsFormElement, this._popupBottomContainerComponent);
    render(this._commentsContainerElement, this._loadingComponent);

    document.body.classList.add(`hide-overflow`);
    this._popupTopContainerComponent.setCloseButtonClickHandler(this._handleClosePopupButtonClick);
    document.addEventListener(`keydown`, this._escapeKeydownHandler);

    this._api.getComments(film.id)
      .then((comments) => {
        this._commentsModel.set(UpdateType.INIT, comments);
      });

    this._render();
  }

  destroy() {
    this._close();
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

  updateNewComment() {
    const prevNewCommentComponent = this._newCommentComponent;
    this._newCommentComponent = new NewCommentView();
    replace(this._newCommentComponent, prevNewCommentComponent);
    remove(prevNewCommentComponent);
  }

  _getFilmComments() {
    const comments = this._commentsModel.get().slice();
    return comments.filter((comment) => this._film.comments.includes(comment.id));
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
    render(this._commentsContainerElement, this._newCommentComponent);
  }

  _close() {
    remove(this._filmDetailsPopupComponent);
    document.body.classList.remove(`hide-overflow`);
  }

  _render() {
    this._renderFilmDetails();
    this._renderFilmControls();
    this._setControlClickHandlers();
  }

  _initComments() {
    remove(this._loadingComponent);
    this._commentsTitleComponent = new CommentsTitleView(this._getFilmComments());
    this._commentsListComponent = new CommentsListView(this._getFilmComments());
    this._newCommentComponent = new NewCommentView();
    this._renderCommentsTitle();
    this._renderCommentsList();
    this._renderNewComment();
    this._commentsListComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
    document.addEventListener(`keydown`, this._submitKeydownHandler);
  }

  _setControlClickHandlers() {
    this._filmControlsComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._filmControlsComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmControlsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _handleClosePopupButtonClick() {
    this._close();
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  _handleDeleteButtonClick(commentId) {
    this._api.deleteComment(commentId).then((response) => {
      this._commentsModel.delete(UserAction.DELETE_COMMENT, commentId);
    })
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

  _handleModelEvent(actionType, data) {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this._changeView(
            UserAction.UPDATE_FILM,
            UpdateType.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: [data.id, ...this._film.comments]
                }
            )
        );
        break;
      case UserAction.DELETE_COMMENT:
        this._changeView(
            UserAction.UPDATE_FILM,
            UpdateType.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: this._film.comments.filter((id) => id !== data)
                }
            )
        );
        break;
      case UpdateType.INIT:
        this._initComments();
        break;
    }
  }

  _submitKeydownHandler(evt) {
    if (evt.ctrlKey && isEnterKey(evt.key)) {

      const newComment = this._newCommentComponent.get();

      if (newComment.emotion === `` || newComment.text === ``) {
        return;
      }

      // newComment.date = new Date();
      // newComment.author = `Tom Smith`;
      // newComment.id = Date.now() + parseInt(Math.random() * 10000, 10);
      this._api.addComment(newComment).then((response) => {
        this._commentsModel.add(UserAction.ADD_COMMENT, newComment);
      })
    }
  }

  _escapeKeydownHandler(evt) {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      this._close();
      document.removeEventListener(`keydown`, this._escapeKeydownHandler);
    }
  }
}
