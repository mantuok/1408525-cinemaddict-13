import FilmsListsContainerView from "../view/films-lists-container.js";
import FilmsListView from "../view/films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmCardPresenter from "../presenter/film-card.js";
import {render, remove} from "../utils/render.js";
import {
  FilmsListType,
  UserAction,
  UpdateType,
  SortType
} from "../const.js";
import {
  isEmptyList
} from "../utils/common.js";
import {filter} from "../utils/filter.js"
import SortingMenuPresenter from "../presenter/sorting-menu.js";

export default class FilmsBoard {
  constructor(mainElement, filmsModel, filtersModel) {
    this._mainElement = mainElement;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._filmCardPresenter = {};

    this._filmsListsContainerComponent = new FilmsListsContainerView();
    this._mainFilmsListComponent = new FilmsListView(FilmsListType.MAIN);
    this._topRatedFilmsListComponent = new FilmsListView(FilmsListType.TOP_RATED);
    this._topCommentedFilmsListComponent = new FilmsListView(FilmsListType.TOP_COMMENTED);
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortingMenuPresenter = new SortingMenuPresenter(this._mainElement, this._filmsModel);

    this._filmToRenderCursor = 0;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleSortAction = this._handleSortAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init(comments) {
    this._comments = comments.slice();
    this._sortedFilmsList = null;

    this._sortingMenuPresenter.init(this._handleSortAction);

    this._render();
  }

  _getFilms(filmsListType) {
    const films = this._filmsModel.getFilms().slice();
    const filterType = this._filtersModel.getFilter();

    switch (filmsListType) {
      case FilmsListType.MAIN:
        return filter[filterType](this._sortingMenuPresenter.getSortedFilmsList());
      case FilmsListType.TOP_RATED:
        return films.sort((a, b) =>  b.rating - a.rating);
      case FilmsListType.TOP_COMMENTED:
        return films.sort((a, b) => b.comments.length - a.comments.length);
    }
  };

  _renderListsContainer() {
    render(this._mainElement, this._filmsListsContainerComponent);
  }

  _renderMainFilmsList() {
    render(this._filmsListsContainerComponent, this._mainFilmsListComponent);
  }

  _renderTopRatedFilmsList() {
    render(this._filmsListsContainerComponent, this._topRatedFilmsListComponent);
  }

  _renderTopCommentedFilmsList() {
    render(this._filmsListsContainerComponent, this._topCommentedFilmsListComponent);
  }

  _renderEmptyList() {
    render(this._filmsListsContainerComponent, new FilmsListView(FilmsListType.EMPTY));
  }

  _renderShowMoreButton() {
    render(this._mainFilmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _createFilmCard(film, listComponent) {
    const filmCardPresenter = new FilmCardPresenter(
        listComponent.getContainerElement(),
        this._mainElement,
        this._handleViewAction
    );
    filmCardPresenter.init(film, this._comments);
    if (!listComponent.isExtraList()) {
      this._filmCardPresenter[film.id] = filmCardPresenter;
    }
  }

  _renderMainFilmsCards(films = this._getFilms(FilmsListType.MAIN)) {
    const filmRenderStep = FilmsListType.MAIN.renderStep;
    if ((films.length - this._filmToRenderCursor) > filmRenderStep) {
      const maxFilmToRender = filmRenderStep + this._filmToRenderCursor;
      for (let i = this._filmToRenderCursor; i < maxFilmToRender; i++) {
        this._createFilmCard(films[i], this._mainFilmsListComponent);
      }
    } else {
      for (let i = this._filmToRenderCursor; i < films.length; i++) {
        this._createFilmCard(films[i], this._mainFilmsListComponent);
      }
      this._showMoreButtonComponent.removeClickHandler();
      this._showMoreButtonComponent.hide();
    }
    this._filmToRenderCursor += filmRenderStep;
  }

  _renderTopFilmsCards(listComponent, filmsListType) {
    const films = this._getFilms(filmsListType);
    const filmRenderStep = filmsListType.renderStep;
    for (let i = 0; i < filmRenderStep; i++) {
      this._createFilmCard(films[i], listComponent);
    }
  }

  _clearFilmList({resetSortType = false} = {}) {
    Object
        .values(this._filmCardPresenter)
        .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._filmToRenderCursor = 0;

    remove(this._showMoreButtonComponent);

    if (resetSortType) {
      this._sortingMenuPresenter.currentSortType = SortType.DEAFULT;
    }
  }

  _handleShowMoreButtonClick() {
    if (this._sortedFilmsList) {
      this._renderMainFilmsCards(this._sortedFilmsList);
      return
    }
    this._renderMainFilmsCards();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update)
        break;
      case UserAction.OPEN_POPUP:
        Object
            .values(this._filmCardPresenter)
            .forEach((presenter) => presenter.resetView());
        break;
    }
  }

  _handleModelEvent(updateType, data){
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmCardPresenter[data.id].init(data, this._comments);
        this._filmCardPresenter[data.id].updatePopup(data);
        break;
      case UpdateType.MINOR:
        this._filmCardPresenter[data.id].updatePopup(data);
        this._clearFilmList();
        this._renderMainFilmsCards();
        this._renderShowMoreButton();
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetSortType: true});
        this._renderMainFilmsCards();
        this._renderShowMoreButton();
        break;
    }
  }

  _handleSortAction(sortedFilms) {
    this._sortedFilmsList = sortedFilms;
    this._clearFilmList();
    this._renderMainFilmsCards(this._sortedFilmsList);
    this._renderShowMoreButton();
  }

  _render() {
    this._renderListsContainer();

    if (isEmptyList(this._getFilms(FilmsListType.MAIN))) {
      this._renderEmptyList();
    } else {
      this._renderMainFilmsList();
      this._renderTopRatedFilmsList();
      this._renderTopCommentedFilmsList();
      this._renderShowMoreButton();
      this._renderMainFilmsCards();
      this._renderTopFilmsCards(this._topRatedFilmsListComponent, FilmsListType.TOP_RATED);
      this._renderTopFilmsCards(this._topCommentedFilmsListComponent, FilmsListType.TOP_COMMENTED);
    }
  }
}

