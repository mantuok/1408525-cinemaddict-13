import UserProfileView from "./view/user-profile.js";
import MainNavigationView from "./view/main-navigation.js";
import SortingMenuView from "./view/sorting-menu.js";
import FilmsListsContainerView from "./view/films-lists-container.js";
import FilmsListView from "./view/films-list.js";
import ShowMoreButtonView from "./view/show-more.js";
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

const FilmsListType = {
  MAIN: `All movies. Upcoming`,
  TOP_RATED: `Top rated`,
  TOP_COMMENTED: `Most commented`
};

let filmToRenderCursor = 0;

const films = Array.from({length: FilmCount.MAIN}, generateFilm);
const topCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
const topRatedFilms = [...films].sort((a, b) => b.rating - a.rating);
const watchedFilms = films.filter((film) => film.isWatched);
const comments = Array.from({length: COMMENT_COUNT}, generateComment);

const filters = generateFilter(films);

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

const renderMainFilmsCards = (FilmRenderStep, filmsListComponent, films) => {
  if ((films.length - filmToRenderCursor) > FilmRenderStep) {
    for (let i = filmToRenderCursor; i < (FilmRenderStep + filmToRenderCursor); i++) {
      renderElement(filmsListComponent.querySelector(`div`), new FilmCardView(films[i]).getElement(), Position.BEFOREEND);
    }
  } else {
    console.log(`else`)
    for (let i = filmToRenderCursor; i < films.length; i++) {
      renderElement(filmsListComponent.querySelector(`div`), new FilmCardView(films[i]).getElement(), Position.BEFOREEND);
      showMoreButtonComponent.getElement().removeEventListener(`click`, onShowMoreButtonComponentClick);
      showMoreButtonComponent.getElement().classList.add(`visually-hidden`)
    }
  }
  filmToRenderCursor += FilmRenderStep;
};

const renderTopFilmsCards = (FilmRenderStep, filmsListComponent, films) => {
  for (let i = 0; i < FilmRenderStep; i++) {
    renderElement(filmsListComponent.querySelector(`div`), new FilmCardView(films[i]).getElement(), Position.BEFOREEND);
  }
};

const onShowMoreButtonComponentClick = () => {
  console.log(films);
  renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListComponent.getElement(), films);
};

renderMainFilmsCards(FilmRenderStep.MAIN, mainFilmsListComponent.getElement(), films);
renderTopFilmsCards(FilmRenderStep.TOP_RATED, topRatedFilmsListComponent.getElement(), topRatedFilms);
renderTopFilmsCards(FilmRenderStep.TOP_COMMENTED, topCommentedFilmsListComponent.getElement(), topCommentedFilms);

showMoreButtonComponent.getElement().addEventListener(`click`, onShowMoreButtonComponentClick);

// const filmDetailsPopupComponent = new FilmDetailsPopupView();
// const popupTopContainerComponent = new PopupTopContainerView();
// const popupBottomContainerComponent = new PopupBottomContainerView();

// renderElement(mainElement, filmDetailsPopupComponent.getElement(), Position.BEFOREEND);
// renderElement(
//   filmDetailsPopupComponent.getElement().querySelector(`form`),
//   popupTopContainerComponent.getElement(),
//   Position.BEFOREEND
// );
// renderElement(
//   filmDetailsPopupComponent.getElement().querySelector(`form`),
//   popupBottomContainerComponent.getElement(),
//   Position.BEFOREEND
// );
// renderElement(popupTopContainerComponent.getElement(), new FilmDetailsView(films[0]).getElement(), Position.BEFOREEND);
// renderElement(popupTopContainerComponent.getElement(), new FilmControlsView(films[0]).getElement(), Position.BEFOREEND);
// renderElement(
//   popupBottomContainerComponent.getElement(),
//   new CommentsListView(films[0], comments).getElement(),
//   Position.AFTERBEGIN
//   );
// renderElement(
//   popupBottomContainerComponent.getElement().querySelector(`.film-details__comments-wrap`),
//   new NewCommentView().getElement(),
//   Position.BEFOREEND
// );
