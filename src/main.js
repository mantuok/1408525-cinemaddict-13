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
import NewCommentView from "./view/new-comment.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filter.js";
import {renderElement, Position} from "./utils/render.js";
import {isEscapeKey} from "./utils/utils.js";
import {FilmsListType} from "./utils/const.js";

const FilmCount = {
  MAIN: 17,
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
const mainFilmsListComponent = new FilmsListView(FilmsListType.MAIN);
const topRatedFilmsListComponent = new FilmsListView(FilmsListType.TOP_RATED);
const topCommentedFilmsListComponent = new FilmsListView(FilmsListType.TOP_COMMENTED);
const showMoreButtonComponent = new ShowMoreButtonView();

renderElement(headerElement, new UserProfileView(watchedFilms).getElement(), Position.BEFOREEND);
renderElement(mainElement, new MainNavigationView(filters).getElement(), Position.BEFOREEND);
renderElement(mainElement, new SortingMenuView().getElement(), Position.BEFOREEND);
renderElement(mainElement, filmsListsContainerComponent.getElement(), Position.BEFOREEND);
renderElement(filmsListsContainerComponent.getElement(), mainFilmsListComponent.getElement(), Position.BEFOREEND);
renderElement(filmsListsContainerComponent.getElement(), topRatedFilmsListComponent.getElement(), Position.BEFOREEND);
renderElement(filmsListsContainerComponent.getElement(), topCommentedFilmsListComponent.getElement(), Position.BEFOREEND);
renderElement(mainFilmsListComponent.getElement(), showMoreButtonComponent.getElement(), Position.BEFOREEND);
renderElement(footerElement, new FilmsCountView(films.length).getElement(), Position.BEFOREEND);

const renderFilmCard = (film, filmsListElement) => {
  const filmCardComponent = new FilmCardView(film);
  renderElement(filmsListElement.querySelector(`div`), filmCardComponent.getElement(), Position.BEFOREEND);
  Array.from(filmCardComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`))
    .forEach((element) => element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      renderFilmDetailsPopup(film);
    }))
}

const renderMainFilmsCards = (FilmRenderStep, filmsListElement, films) => {
  if ((films.length - filmToRenderCursor) > FilmRenderStep) {
    for (let i = filmToRenderCursor; i < (FilmRenderStep + filmToRenderCursor); i++) {
      renderFilmCard(films[i], filmsListElement);
    }
  } else {
    for (let i = filmToRenderCursor; i < films.length; i++) {
      renderFilmCard(films[i], filmsListElement);
      showMoreButtonComponent.getElement().removeEventListener(`click`, onShowMoreButtonComponentClick);
      showMoreButtonComponent.getElement().classList.add(`visually-hidden`)
    }
  }
  filmToRenderCursor += FilmRenderStep;
};

const renderTopFilmsCards = (FilmRenderStep, filmsListElement, films) => {
  for (let i = 0; i < FilmRenderStep; i++) {
    renderFilmCard(films[i], filmsListElement);
  }
};

const onShowMoreButtonComponentClick = () => {
  renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListComponent.getElement(), films);
};

renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListComponent.getElement(), films);
renderTopFilmsCards(FilmRenderStep.TOP_RATED, topRatedFilmsListComponent.getElement(), topRatedFilms);
renderTopFilmsCards(FilmRenderStep.TOP_COMMENTED, topCommentedFilmsListComponent.getElement(), topCommentedFilms);

showMoreButtonComponent.getElement().addEventListener(`click`, onShowMoreButtonComponentClick);

const renderFilmDetailsPopup = (film) => {
  const filmDetailsPopupComponent = new FilmDetailsPopupView();
  const filmDetailsPopupElement = filmDetailsPopupComponent.getElement();
  const filmDetailsFormElement = filmDetailsPopupElement.querySelector(`form`);
  const popupTopContainerComponent = new PopupTopContainerView();
  const popupTopContainerElement = popupTopContainerComponent.getElement();
  const popupBottomContainerComponent = new PopupBottomContainerView();
  const popupBottomContainerElement = popupBottomContainerComponent.getElement();
  const closePopupButtonElement = popupTopContainerComponent.getElement().querySelector(`.film-details__close-btn`);

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

  const onClosePopupButtonElementClick = () => {
    closeFilmDetailsPopup();
    document.removeEventListener(`keydown`, onEscapeKeydown);
  }

  renderElement(mainElement, filmDetailsPopupElement, Position.BEFOREEND);
  renderElement(filmDetailsFormElement, popupTopContainerElement, Position.BEFOREEND);
  renderElement(filmDetailsFormElement, popupBottomContainerElement, Position.BEFOREEND);
  renderElement(popupTopContainerElement, new FilmDetailsView(film).getElement(), Position.BEFOREEND);
  renderElement(popupTopContainerElement, new FilmControlsView(film).getElement(), Position.BEFOREEND);
  renderElement(popupBottomContainerElement, new CommentsListView(film, comments).getElement(), Position.AFTERBEGIN);
  renderElement(
    popupBottomContainerElement.querySelector(`.film-details__comments-wrap`),
    new NewCommentView().getElement(),
    Position.BEFOREEND
  );

  closePopupButtonElement.addEventListener(`click`, onClosePopupButtonElementClick);
  document.addEventListener(`keydown`, onEscapeKeydown);
};
