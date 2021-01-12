import FilmsBoardPresenter from "./presenter/films-board.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import MainNavigationPresenter from "./presenter/main-navigation.js";
import FilmsCountPresenter from "./presenter/films-count.js";
import FilmsModel from "./model/films.js";
import FiltersModel from "./model/filters.js"
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comments.js";

const FilmCount = {
  MAIN: 19,
  TOP_RATED: 2,
  TOP_COMMENTED: 2
};

const COMMENT_COUNT = 5;

const films = Array.from({length: FilmCount.MAIN}, generateFilm);
const comments = Array.from({length: COMMENT_COUNT}, generateComment);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filtersModel = new FiltersModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfilePresenter = new UserProfilePresenter(headerElement, filmsModel);
const mainNavigationPresenter = new MainNavigationPresenter(mainElement, filtersModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(mainElement, filmsModel, filtersModel);
const filmsCountPresenter = new FilmsCountPresenter(footerElement);

userProfilePresenter.init();
mainNavigationPresenter.init();
filmsBoardPresenter.init(comments);
filmsCountPresenter.init(films);
