import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSortingMenuTemplate} from "./view/sorting-menu.js";
import {createFilmsListsContainerTemplate} from "./view/films-lists-container.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsCountTemplate} from "./view/films-count.js";
import {createFilmDetailsPopupTemplate} from "./view/film-details-popup.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFilmControlsTemplate} from "./view/film-controls.js";
import {createCommentsListTemplate} from "./view/comments-list.js";
import {createNewCommentTemplate} from "./view/new-comment.js";
import {generateFilm} from "./mock/film.js"
import {generateComment} from "./mock/comments.js";

const FilmCount = {
  MAIN: 15,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
}

const COMMENT_COUNT = 5;

const FilmCountRender = {
  MAIN: 5,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
}

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const renderElements = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
}

renderElements(headerElement, createUserProfileTemplate(), `beforeend`);
renderElements(mainElement, createMainNavigationTemplate(), `beforeend`);
renderElements(mainElement, createSortingMenuTemplate(), `beforeend`);
renderElements(mainElement, createFilmsListsContainerTemplate(), `beforeend`);
renderElements(footerElement, createFilmsCountTemplate(), `beforeend`);


const filmsListsContainerElement = mainElement.querySelector(`.films`);
const mainFilmsListElement = filmsListsContainerElement.querySelector(`.films-list:first-child > .films-list__container`);
const topRatedFilmsListElement = filmsListsContainerElement.querySelector(`.films-list:nth-child(2) > .films-list__container`);
const topCommentedFilmsListElement = filmsListsContainerElement.querySelector(`.films-list:nth-child(3) > .films-list__container`);
const renderFilmCards = (filmCountRender, filmsList, films) => {
  for (let i = 0; i < filmCountRender; i++) {
    renderElements(filmsList, createFilmCardTemplate(films[i]), `beforeend`);
  }
};

const films = new Array(FilmCount.MAIN).fill().map(generateFilm);
const comments = new Array(COMMENT_COUNT).fill().map(generateComment);


renderFilmCards(FilmCountRender.MAIN, mainFilmsListElement, films);
renderFilmCards(FilmCountRender.TOP_RATED, topRatedFilmsListElement, films);
renderFilmCards(FilmCountRender.TOP_COMMENTED, topCommentedFilmsListElement, films);

// renderElements(mainElement, createFilmDetailsPopupTemplate(), `beforeend`);

// const filmDetailsPopupElement = mainElement.querySelector(`.film-details`);
// const popupTopContainerElement = filmDetailsPopupElement.querySelector(`.film-details__top-container`);
// const popupBottomContainerElement = filmDetailsPopupElement.querySelector(`.film-details__bottom-container`);
// const commentsContainerElement = popupBottomContainerElement.querySelector(`.film-details__comments-wrap`);

// renderElements(popupTopContainerElement, createFilmDetailsTemplate(films[0]), `beforeend`);
// renderElements(popupTopContainerElement, createFilmControlsTemplate(), `beforeend`);
// renderElements(commentsContainerElement, createCommentsListTemplate(films[0], comments), `beforeend`);
// renderElements(commentsContainerElement, createNewCommentTemplate(), 'beforeend');


