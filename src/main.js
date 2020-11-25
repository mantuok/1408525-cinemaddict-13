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
import {generateFilter} from "./mock/filter.js";

const TopFilmProperties = {
  TOP_RATED: `rating`,
  TOP_COMMENTED: `commentsCount`
}

const FilmCount = {
  MAIN: 17,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
}

const COMMENT_COUNT = 5;

const FilmRenderStep = {
  MAIN: 5,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
}

let filmToRenderCursor = 0;

const films = new Array(FilmCount.MAIN).fill().map(generateFilm);
const comments = new Array(COMMENT_COUNT).fill().map(generateComment);
const filters = generateFilter(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const renderElements = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
}

renderElements(headerElement, createUserProfileTemplate(), `beforeend`);
renderElements(mainElement, createMainNavigationTemplate(filters), `beforeend`);
renderElements(mainElement, createSortingMenuTemplate(), `beforeend`);
renderElements(mainElement, createFilmsListsContainerTemplate(), `beforeend`);
renderElements(footerElement, createFilmsCountTemplate(), `beforeend`);

const filmsListsContainerElement = mainElement.querySelector(`.films`);
const mainFilmsListElement = filmsListsContainerElement.querySelector(`.films-list:first-child > .films-list__container`);
const topRatedFilmsListElement = filmsListsContainerElement.querySelector(`.films-list:nth-child(2) > .films-list__container`);
const topCommentedFilmsListElement = filmsListsContainerElement.querySelector(`.films-list:nth-child(3) > .films-list__container`);
const showMoreElement = filmsListsContainerElement.querySelector(`.films-list__show-more`);
const renderMainFilmsCards = (FilmRenderStep, filmsList, films) => {
  if ((films.length - filmToRenderCursor) > FilmRenderStep) {
    for (let i = filmToRenderCursor; i < (FilmRenderStep + filmToRenderCursor); i++) {
      renderElements(filmsList, createFilmCardTemplate(films[i]), `beforeend`);
    }
  } else {
    for (let i = filmToRenderCursor; i < films.length; i++) {
      renderElements(filmsList, createFilmCardTemplate(films[i]), `beforeend`);
      showMoreElement.removeEventListener(`click`, onShowMoreClick);
      showMoreElement.classList.add(`visually-hidden`)
    }
  }
  filmToRenderCursor += FilmRenderStep
};

const renderTopFilmsCards = (FilmRenderStep, filmsList, films, property) => {
  const sortedTopFilms = films.sort((a, b) => b[property] - a[property])
  for (let i = 0; i < FilmRenderStep; i++) {
    renderElements(filmsList, createFilmCardTemplate(films[i]), `beforeend`);
  }
  console.log(sortedTopFilms);
}

const onShowMoreClick = () => {
  renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListElement, films);
}

renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListElement, films);
renderTopFilmsCards(FilmRenderStep.TOP_RATED, topRatedFilmsListElement, films, TopFilmProperties.TOP_RATED);
renderTopFilmsCards(FilmRenderStep.TOP_COMMENTED, topCommentedFilmsListElement, films, TopFilmProperties.TOP_COMMENTED);

showMoreElement.addEventListener(`click`, onShowMoreClick);



// renderElements(mainElement, createFilmDetailsPopupTemplate(), `beforeend`);

// const filmDetailsPopupElement = mainElement.querySelector(`.film-details`);
// const popupTopContainerElement = filmDetailsPopupElement.querySelector(`.film-details__top-container`);
// const popupBottomContainerElement = filmDetailsPopupElement.querySelector(`.film-details__bottom-container`);
// const commentsContainerElement = popupBottomContainerElement.querySelector(`.film-details__comments-wrap`);

// renderElements(popupTopContainerElement, createFilmDetailsTemplate(films[0]), `beforeend`);
// renderElements(popupTopContainerElement, createFilmControlsTemplate(), `beforeend`);
// renderElements(commentsContainerElement, createCommentsListTemplate(films[0], comments), `beforeend`);
// renderElements(commentsContainerElement, createNewCommentTemplate(), 'beforeend');


