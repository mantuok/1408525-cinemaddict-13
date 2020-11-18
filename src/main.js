import {createUserProfileTemplate} from "./view/userProfile.js";
import {createMainNavigationTemplate} from "./view/mainNavigation.js";
import {createSortingMenuTemplate} from "./view/sortingMenu.js";
import {createFilmsListsContainerTemplate} from "./view/filmsListsContainer.js";
import {createfilmCardTemplate} from "./view/filmCard.js";
import {createFilmsCountTemplate} from "./view/filmsCount";

const FilmCount = {
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

const filmsListsContainer = mainElement.querySelector(`.films`);
const mainFilmsList = filmsListsContainer.querySelector(`.films-list:first-child > .films-list__container`);
const topRatedFilmsList = filmsListsContainer.querySelector(`.films-list:nth-child(2) > .films-list__container`);
const topCommentedFilmsList = filmsListsContainer.querySelector(`.films-list:nth-child(3) > .films-list__container`);
const renderFilmCard = (filmsList) => renderElements(filmsList, createfilmCardTemplate(), `beforeend`);

for (let i = 0; i < FilmCount.MAIN; i++) {
  renderFilmCard(mainFilmsList);
};

for (let i = 0; i < FilmCount.TOP_RATED; i++) {
  renderFilmCard(topRatedFilmsList);
}

for (let i = 0; i < FilmCount.TOP_COMMENTED; i++) {
  renderFilmCard(topCommentedFilmsList);
}


