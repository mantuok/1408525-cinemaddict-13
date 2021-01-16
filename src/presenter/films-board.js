import FilmsListsContainerView from "../view/films-lists-container.js";
import FilmsListView from "../view/films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmCardPresenter from "../presenter/film-card.js";
import StatsPresenter from "../presenter/stats.js";
import {render, remove} from "../utils/render.js";
import {
  FilmsListType,
  UserAction,
  UpdateType,
  FilterType
} from "../const.js";
import {filterTypeToFilmsFilter} from "../utils/filter.js";
import SortingMenuPresenter from "../presenter/sorting-menu.js";

export default class FilmsBoard {
  constructor(mainElement, filmsModel, filtersModel, commentsModel) {
    this._mainElement = mainElement;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._commentsModel = commentsModel;
    this._filmCardPresenter = {};
    this._sortedFilmsList = [];
    this._filmToRenderCursor = 0;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleSortAction = this._handleSortAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsListsContainerComponent = new FilmsListsContainerView();
    this._mainFilmsListComponent = new FilmsListView(FilmsListType.MAIN);
    this._topRatedFilmsListComponent = new FilmsListView(FilmsListType.TOP_RATED);
    this._topCommentedFilmsListComponent = new FilmsListView(FilmsListType.TOP_COMMENTED);
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortingMenuPresenter = new SortingMenuPresenter(this._mainElement, this._filmsModel, this._handleSortAction);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._sortingMenuPresenter.init();
    this._render();
  }

  _getFilms(filmsListType) {
    const films = this._filmsModel.get().slice();
    const filterType = this._filtersModel.get();
    let filteredFilms = [];

    switch (filmsListType) {
      case FilmsListType.MAIN:
        filteredFilms = filterTypeToFilmsFilter[filterType](this._sortingMenuPresenter.getSortedFilmsList());
        break;
      case FilmsListType.TOP_RATED:
        filteredFilms = films.sort((a, b) => b.rating - a.rating);
        break;
      case FilmsListType.TOP_COMMENTED:
        filteredFilms = films.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }

    return filteredFilms;
  }

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
        this._handleViewAction,
        this._commentsModel
    );
    filmCardPresenter.init(film);
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
    if (films.length < filmRenderStep) {
      for (let i = 0; i < films.length; i++) {
        this._createFilmCard(films[i], listComponent);
      }
    } else {
      for (let i = 0; i < filmRenderStep; i++) {
        this._createFilmCard(films[i], listComponent);
      }
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
      this._sortingMenuPresenter.resetSortType();
    }
  }

  _renderStats() {
    debugger
    this._statsPresenter = new StatsPresenter(this._mainElement);
    this._statsPresenter.init(this._filmsModel.get().slice());
  }

  _destroyStats() {

  }

  _handleShowMoreButtonClick() {
    if (this._sortedFilmsList.length > 0) {
      this._renderMainFilmsCards(this._sortedFilmsList);
      return;
    }
    this._renderMainFilmsCards();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.update(updateType, update);
        break;
      case UserAction.OPEN_POPUP:
        Object
            .values(this._filmCardPresenter)
            .forEach((presenter) => presenter.destroyPopup());
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmCardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._filmCardPresenter[data.id].updatePopup(data);
        this._clearFilmList();
        this._renderMainFilmsCards();
        this._renderShowMoreButton();
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetSortType: true});
        if (data === FilterType.STATS) {
          this._renderStats();
          break;
        }
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

    if (this._filmsModel.isEmpty()) {
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

