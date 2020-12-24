import FilmsListsContainerView from "../view/films-lists-container.js";
import FilmsListView from "../view/films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmCardPresenter from "../presenter/film-card.js";
import {render, remove} from "../utils/render.js";
import {
  FilmsListType,
  FilmRenderStep
} from "../utils/const.js";
import {
  isEmptyList,
  updateItemById
} from "../utils/common.js";

export default class FilmsBoard {
  constructor(mainElement) {
    this._mainElement = mainElement;
    this._filmCardPresenter = {};
    this._filmPopupPresenter = {};

    this._filmsListsContainerComponent = new FilmsListsContainerView();
    this._mainFilmsListComponent = new FilmsListView(FilmsListType.MAIN);
    this._topRatedFilmsListComponent = new FilmsListView(FilmsListType.TOP_RATED);
    this._topCommentedFilmsListComponent = new FilmsListView(FilmsListType.TOP_COMMENTED);
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._filmToRenderCursor = 0;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handlePopupClosure = this._handlePopupClosure.bind(this);
  }

  init(films, comments, topCommentedFilms, topRatedFilms) {
    this._films = films.slice();
    this._comments = comments.slice();
    this._topCommentedFilms = topCommentedFilms.slice();
    this._topRatedFilms = topRatedFilms.slice();

    this._render();
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

  _handleShowMoreButtonClick() {
    this._renderMainFilmsCards(
        FilmRenderStep.MAIN,
        this._mainFilmsListComponent,
        this._films
    );
  }

  _renderShowMoreButton() {
    render(this._mainFilmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _createFilmCard(film, listComponent) {
    const filmCardPresenter = new FilmCardPresenter(
        listComponent.getContainerElement(),
        this._mainElement,
        this._handleFilmChange,
        this._handlePopupClosure,
        this._filmPopupPresenter
    );
    filmCardPresenter.init(film, this._comments);
    if (!listComponent.isExtraList()) {
      this._filmCardPresenter[film.id] = filmCardPresenter;
    }
  }

  _renderMainFilmsCards(filmRenderStep, listComponent, films) {
    if ((films.length - this._filmToRenderCursor) > filmRenderStep) {
      const maxFilmToRender = filmRenderStep + this._filmToRenderCursor;
      for (let i = this._filmToRenderCursor; i < maxFilmToRender; i++) {
        this._createFilmCard(films[i], listComponent);
      }
    } else {
      for (let i = this._filmToRenderCursor; i < films.length; i++) {
        this._createFilmCard(films[i], listComponent);
        this._showMoreButtonComponent.removeClickHandler();
        this._showMoreButtonComponent.hide();
      }
    }
    this._filmToRenderCursor += filmRenderStep;
  }

  _renderTopFilmsCards(filmRenderStep, listComponent, films) {
    for (let i = 0; i < filmRenderStep; i++) {
      this._createFilmCard(films[i], listComponent);
    }
  }

  _clearFilmList() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._filmToRenderCursor = 0;
    remove(this._showMoreButtonComponent);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItemById(this._films, updatedFilm);
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm, this._comments);
    if (Object.keys(this._filmPopupPresenter).length !== 0) {
      this._filmPopupPresenter[updatedFilm.id].updateControls(updatedFilm, this._comments);
    }
  }

  _handlePopupClosure() {
    Object
      .values(this._filmPopupPresenter)
      .forEach((presenter) => presenter.destroy());
  }

  _render() {
    this._renderListsContainer();

    if (isEmptyList(this._films)) {
      this._renderEmptyList();
    } else {
      this._renderMainFilmsList();
      this._renderTopRatedFilmsList();
      this._renderTopCommentedFilmsList();
      this._renderShowMoreButton();
      this._renderMainFilmsCards(
          FilmRenderStep.MAIN,
          this._mainFilmsListComponent,
          this._films
      );
      this._renderTopFilmsCards(
          FilmRenderStep.TOP_RATED,
          this._topRatedFilmsListComponent,
          this._topRatedFilms
      );
      this._renderTopFilmsCards(
          FilmRenderStep.TOP_COMMENTED,
          this._topCommentedFilmsListComponent,
          this._topCommentedFilms
      );
    }
  }
}

