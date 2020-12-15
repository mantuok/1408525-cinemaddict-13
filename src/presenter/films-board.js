import MainNavigationView from "../view/main-navigation.js";
import SortingMenuView from "../view/sorting-menu.js";
import FilmsListsContainerView from "../view/films-lists-container.js";
import FilmsListView from "../view/films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmCardView from "../view/film-card.js";
import FilmsCountView from "../view/films-count.js";
import FilmPopupPresenter from "../presenter/film-popup.js"
import {renderElement} from "../utils/render.js";
import {
  FilmsListType,
  FilmRenderStep
} from "../utils/const.js";
import {
  isEscapeKey,
  isEmptyList
} from "../utils/utils.js";

export default class FilmsBoard {
  constructor(mainElement, bodyElement) {
    this._mainElement = mainElement;
    this._bodyElement = bodyElement

    this._filmsListsContainerComponent = new FilmsListsContainerView();
    this._filmsListsContainerElement = this._filmsListsContainerComponent.getElement()
    this._mainFilmsListComponent = new FilmsListView(FilmsListType.MAIN);
    this._topRatedFilmsListComponent = new FilmsListView(FilmsListType.TOP_RATED);
    this._topCommentedFilmsListComponent = new FilmsListView(FilmsListType.TOP_COMMENTED);
    this._emptyFilmsListComponent = new FilmsListView(FilmsListType.EMPTY);
    this._showMoreButtonComponent = new ShowMoreButtonView();
  }

  init(films, comments, topCommentedFilms, topRatedFilms, filters) {
    this._films = films.slice();
    this._comments = comments.slice();
    this._topCommentedFilms = topCommentedFilms.slice();
    this._topRatedFilms = topRatedFilms.slice();
    this._filters = filters.slice();

    this._renderFilmsBoard()
  }

  _renderMainNavigation(filters) {
    renderElement(this._mainElement, new MainNavigationView(filters).getElement());
  }

  _renderSortingMenu() {
    renderElement(this._mainElement, new SortingMenuView().getElement());
  }

  _renderListsContainer() {
    renderElement(this._mainElement, this._filmsListsContainerElement);
  }

  _renderMainFilmsList() {
    renderElement(this._filmsListsContainerElement, this._mainFilmsListComponent.getElement());
  }

  _renderTopFilmsLists() {
    renderElement(this._filmsListsContainerElement, this._topRatedFilmsListComponent.getElement());
    renderElement(this._filmsListsContainerElement, this._topCommentedFilmsListComponent.getElement());
  }

  _renderEmptyList() {
    renderElement(this._filmsListsContainerElement, this._emptyFilmsListComponent.getElement());
  }

  _onShowMoreButtonComponentClick() {
    this._renderMainFilmsCards(FilmRenderStep.MAIN, this._mainFilmsListComponent.getContainerElement(), this._films);
  };

  _renderShowMoreButton() {
    renderElement(this._mainFilmsListComponent.getElement(), this._showMoreButtonComponent.getElement());
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonComponentClick);
  }

  _renderFilmCard(film, filmsListElement) {
    const filmCardComponent = new FilmCardView(film);
    renderElement(filmsListElement, filmCardComponent.getElement());
    filmCardComponent.setClickHandler(() => {
      const filmPopupPresenter = new FilmPopupPresenter(this._mainElement, this._bodyElement);
      filmPopupPresenter.init(film, this._comments)
    });
  }

  _renderMainFilmsCards(FilmRenderStep, filmsListContainerElement, films) {
    let filmToRenderCursor = 0;
    if ((films.length - filmToRenderCursor) > FilmRenderStep) {
      for (let i = filmToRenderCursor; i < (FilmRenderStep + filmToRenderCursor); i++) {
        this._renderFilmCard(films[i], filmsListContainerElement);
      }
    } else {
      for (let i = filmToRenderCursor; i < films.length; i++) {
        this._renderFilmCard(films[i], filmsListContainerElement);
        // showMoreButtonComponent.removeClickHandler();
        // showMoreButtonComponent.hide();
      }
    }
    filmToRenderCursor += FilmRenderStep;
  }

  _renderTopFilmsCards(FilmRenderStep, filmsListContainerElement, films) {
    for (let i = 0; i < FilmRenderStep; i++) {
      this._renderFilmCard(films[i], filmsListContainerElement);
    }
  }

  _renderFilmsBoard() {
    this._renderMainNavigation(this._filters);
    this._renderSortingMenu();
    this._renderListsContainer();

    if (isEmptyList(this._films)) {
      this._renderEmptyList();
    } else {
      this._renderMainFilmsList();
      this._renderTopFilmsLists();
      this._renderShowMoreButton();
      this._renderMainFilmsCards(
        FilmRenderStep.MAIN,
        this._mainFilmsListComponent.getContainerElement(),
        this._films
      );
      this._renderTopFilmsCards(
        FilmRenderStep.TOP_RATED,
        this._topRatedFilmsListComponent.getContainerElement(),
        this._topRatedFilms
      );
      this._renderTopFilmsCards(
        FilmRenderStep.TOP_COMMENTED,
        this._topCommentedFilmsListComponent.getContainerElement(),
        this._topCommentedFilms
      );
    }
  }
}

