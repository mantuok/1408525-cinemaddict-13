import FilmsBoardPresenter from "./presenter/films-board.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import MainNavigationPresenter from "./presenter/main-navigation.js";
import SortingMenuPresenter from "./presenter/sorting-menu.js";
import FilmsCountPresenter from "./presenter/films-count.js"
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filter.js";
import {sortBy} from "./utils/common.js"

const FilmCount = {
  MAIN: 19,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
};

const COMMENT_COUNT = 5;

const films = Array.from({length: FilmCount.MAIN}, generateFilm);

// const topCommentedFilms = sortBy(films, `comments.length`);
const topCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
const topRatedFilms = [...films].sort((a, b) => b.rating - a.rating);


const comments = Array.from({length: COMMENT_COUNT}, generateComment);
const filters = generateFilter(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfilePresenter = new UserProfilePresenter(headerElement);
const mainNavigationPresenter = new MainNavigationPresenter(mainElement);
// const sortingMenuPresenter = new SortingMenuPresenter(mainElement);
const filmsBoardPresenter = new FilmsBoardPresenter(mainElement);
const filmsCountPresenter = new FilmsCountPresenter(footerElement);

userProfilePresenter.init(films);
mainNavigationPresenter.init(filters);
// sortingMenuPresenter.init();
filmsBoardPresenter.init(films, comments, topCommentedFilms, topRatedFilms);
filmsCountPresenter.init(films);
