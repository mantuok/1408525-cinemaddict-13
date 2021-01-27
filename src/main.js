import FilmsBoardPresenter from "./presenter/films-board.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import MainNavigationPresenter from "./presenter/main-navigation.js";
import FilmsCountPresenter from "./presenter/films-count.js";
import FilmsModel from "./model/films.js";
import FiltersModel from "./model/filters.js";
import CommentsModel from "./model/comments.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";

const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic 8pqmOeOPAOZ1FSl`;

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);

const userProfilePresenter = new UserProfilePresenter(headerElement, filmsModel);
const mainNavigationPresenter = new MainNavigationPresenter(mainElement, filtersModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(mainElement, filmsModel, filtersModel, commentsModel, api);
const filmsCountPresenter = new FilmsCountPresenter(footerElement, filmsModel);

const handleFilmDownload = (films) => {
  filmsModel.set(UpdateType.INIT, films);
  mainNavigationPresenter.init();
  filmsCountPresenter.init();
};

userProfilePresenter.init();
filmsBoardPresenter.init();

api.getFilms()
  .then((films) => {
    handleFilmDownload(films);
  })
  .catch(() => {
    handleFilmDownload([]);
  });
