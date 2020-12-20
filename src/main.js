import FilmsBoardPresenter from "./presenter/films-board.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import MainNavigationPresenter from "./presenter/main-navigation.js";
import SortingMenuPresenter from "./presenter/sorting-menu.js";
import FilmsCountPresenter from "./presenter/films-count.js"
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filter.js";

const FilmCount = {
  MAIN: 19,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
};

const COMMENT_COUNT = 5;

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

const userProfilePresenter = new UserProfilePresenter(headerElement);
const mainNavigationPresenter = new MainNavigationPresenter(mainElement);
const sortingMenuPresenter = new SortingMenuPresenter(mainElement);
const filmsBoardPresenter = new FilmsBoardPresenter(mainElement, bodyElement);
const filmsCountPresenter = new FilmsCountPresenter(footerElement);

userProfilePresenter.init(films);
mainNavigationPresenter.init(filters);
sortingMenuPresenter.init();
filmsBoardPresenter.init(films, watchedFilms, comments, topCommentedFilms, topRatedFilms, filters);
filmsCountPresenter.init(films);
