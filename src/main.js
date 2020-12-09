import UserProfileView from "./view/user-profile.js";
import MainNavigationView from "./view/main-navigation.js";
import SortingMenuView from "./view/sorting-menu.js";
import FilmsListsContainerView from "./view/films-lists-container.js";
import FilmsListView from "./view/films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmCardView from "./view/film-card.js";
import FilmsCountView from "./view/films-count.js";
import FilmDetailsPopupView from "./view/film-details-popup.js";
import PopupTopContainerView from "./view/popup-top-container.js";
import PopupBottomContainerView from "./view/popup-bottom-container.js";
import FilmDetailsView from "./view/film-details.js";
import FilmControlsView from "./view/film-controls.js";
import CommentsListView from "./view/comments-list.js";
import CommentsTitleView from "./view/comments-title.js";
import NewCommentView from "./view/new-comment.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filter.js";
import {renderElement} from "./utils/render.js";
import {
  isEscapeKey,
  isEmptyList
} from "./utils/utils.js";
import {FilmsListType} from "./utils/const.js";


const FilmCount = {
  MAIN: 19,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
};

const COMMENT_COUNT = 5;

const FilmRenderStep = {
  MAIN: 5,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
};

let filmToRenderCursor = 0;

const films = Array.from({length: FilmCount.MAIN}, generateFilm);
const topCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
const topRatedFilms = [...films].sort((a, b) => b.rating - a.rating);
const watchedFilms = films.filter((film) => film.isWatched);
const comments = Array.from({length: COMMENT_COUNT}, generateComment);
const filters = generateFilter(films);

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const filmsListsContainerComponent = new FilmsListsContainerView();
const filmsListsContainerElement = filmsListsContainerComponent.getElement()
const mainFilmsListComponent = new FilmsListView(FilmsListType.MAIN);
const topRatedFilmsListComponent = new FilmsListView(FilmsListType.TOP_RATED);
const topCommentedFilmsListComponent = new FilmsListView(FilmsListType.TOP_COMMENTED);
const emptyFilmsListComponent = new FilmsListView(FilmsListType.EMPTY);
const showMoreButtonComponent = new ShowMoreButtonView();

const renderFilmCard = (film, filmsListElement) => {
  const filmCardComponent = new FilmCardView(film);
  renderElement(filmsListElement, filmCardComponent.getElement());
  filmCardComponent.setClickHandler(() => {
    renderFilmDetailsPopup(film);
  });
}

const renderMainFilmsCards = (FilmRenderStep, filmsListContainerElement, films) => {
  if ((films.length - filmToRenderCursor) > FilmRenderStep) {
    for (let i = filmToRenderCursor; i < (FilmRenderStep + filmToRenderCursor); i++) {
      renderFilmCard(films[i], filmsListContainerElement);
    }
  } else {
    for (let i = filmToRenderCursor; i < films.length; i++) {
      renderFilmCard(films[i], filmsListContainerElement);
      showMoreButtonComponent.removeClickHandler();
      showMoreButtonComponent.setVisuallyHidden();
    }
  }
  filmToRenderCursor += FilmRenderStep;
};

const renderTopFilmsCards = (FilmRenderStep, filmsListContainerElement, films) => {
  for (let i = 0; i < FilmRenderStep; i++) {
    renderFilmCard(films[i], filmsListContainerElement);
  }
};

const onShowMoreButtonComponentClick = () => {
  renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListComponent.getElement(), films);
};

const renderFilmDetailsPopup = (film) => {
  const filmDetailsPopupComponent = new FilmDetailsPopupView();
  const filmDetailsPopupElement = filmDetailsPopupComponent.getElement();
  const filmDetailsFormElement = filmDetailsPopupComponent.getFormElement();
  const popupTopContainerComponent = new PopupTopContainerView();
  const popupTopContainerElement = popupTopContainerComponent.getElement();
  const popupBottomContainerComponent = new PopupBottomContainerView();
  const popupBottomContainerElement = popupBottomContainerComponent.getElement();
  const commentsContainerElement = popupBottomContainerComponent.getCommetsContainer();

  bodyElement.classList.add(`hide-overflow`);

  const closeFilmDetailsPopup = () => {
    filmDetailsPopupElement.remove();
    filmDetailsPopupComponent.removeElement();
    bodyElement.classList.remove(`hide-overflow`)
  }

  const onEscapeKeydown = (evt) => {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      closeFilmDetailsPopup();
      document.removeEventListener(`keydown`, onEscapeKeydown);
    }
  }

  const onClosePopupButtonClick = () => {
    closeFilmDetailsPopup();
    document.removeEventListener(`keydown`, onEscapeKeydown);
  }

  renderElement(mainElement, filmDetailsPopupElement);
  renderElement(filmDetailsFormElement, popupTopContainerElement);
  renderElement(filmDetailsFormElement, popupBottomContainerElement);
  renderElement(popupTopContainerElement, new FilmDetailsView(film).getElement());
  renderElement(popupTopContainerElement, new FilmControlsView(film).getElement());
  renderElement(commentsContainerElement, new CommentsTitleView(film).getElement());
  renderElement(commentsContainerElement, new CommentsListView(film, comments).getElement());
  renderElement(commentsContainerElement, new NewCommentView().getElement());
  
  popupTopContainerComponent.setClosePopupButtonClickHandler(onClosePopupButtonClick);
  document.addEventListener(`keydown`, onEscapeKeydown);
};

renderElement(headerElement, new UserProfileView(watchedFilms).getElement());
renderElement(mainElement, new MainNavigationView(filters).getElement());
renderElement(mainElement, new SortingMenuView().getElement());
renderElement(mainElement, filmsListsContainerComponent.getElement());
renderElement(footerElement, new FilmsCountView(films.length).getElement());
if (isEmptyList(films)) {
  renderElement(filmsListsContainerElement, emptyFilmsListComponent.getElement());
} else {
  renderElement(filmsListsContainerElement, mainFilmsListComponent.getElement());
  renderElement(filmsListsContainerElement, topRatedFilmsListComponent.getElement());
  renderElement(filmsListsContainerElement, topCommentedFilmsListComponent.getElement());
  renderElement(mainFilmsListComponent.getElement(), showMoreButtonComponent.getElement());
  renderMainFilmsCards(
    FilmRenderStep.MAIN,
    mainFilmsListComponent.getFilmsListContainerElement(),
    films
  );
  renderTopFilmsCards(
    FilmRenderStep.TOP_RATED,
    topRatedFilmsListComponent.getFilmsListContainerElement(),
    topRatedFilms
  );
  renderTopFilmsCards(
    FilmRenderStep.TOP_COMMENTED,
    topCommentedFilmsListComponent.getFilmsListContainerElement(),
    topCommentedFilms
  );
  showMoreButtonComponent.setClickHandler(onShowMoreButtonComponentClick);
}
