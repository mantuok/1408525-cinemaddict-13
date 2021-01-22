import FilmsBoardPresenter from "./presenter/films-board.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import MainNavigationPresenter from "./presenter/main-navigation.js";
import FilmsCountPresenter from "./presenter/films-count.js";
import FilmsModel from "./model/films.js";
import FiltersModel from "./model/filters.js";
import CommentsModel from "./model/comments.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comments.js";
import Api from "./api.js";
import {UpdateType} from "./const.js"

const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic 8pqmOeOPAOZ1FSl`;

const api = new Api(END_POINT, AUTHORIZATION)

// const FilmCount = {
//   MAIN: 26,
//   TOP_RATED: 2,
//   TOP_COMMENTED: 2
// };
// const COMMENT_COUNT = 5;
// const films = Array.from({length: FilmCount.MAIN}, generateFilm);
// const comments = Array.from({length: COMMENT_COUNT}, generateComment);

// api.getFilms().then((films) => {
//   console.log(films)
// })


const filmsModel = new FilmsModel();
// filmsModel.set(films);

const commentsModel = new CommentsModel();


const filtersModel = new FiltersModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);

const userProfilePresenter = new UserProfilePresenter(headerElement, filmsModel);
const mainNavigationPresenter = new MainNavigationPresenter(mainElement, filtersModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(mainElement, filmsModel, filtersModel, commentsModel, api);
const filmsCountPresenter = new FilmsCountPresenter(footerElement, filmsModel);

userProfilePresenter.init();
filmsBoardPresenter.init();
filmsCountPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
    mainNavigationPresenter.init();
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
    mainNavigationPresenter.init();
  })
