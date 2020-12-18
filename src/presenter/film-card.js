
import FilmCardView from "../view/film-card.js";
import FilmPopupPresenter from "../presenter/film-popup.js";
import {
  render,
  replace,
  remove
} from "../utils/render.js";


export default class FilmCard {
  constructor(filmListElement, mainElement, bodyElement) {
    this._mainElement = mainElement;
    this._bodyElement = bodyElement;
    this._filmsListElement = filmListElement;

    this._filmCardComponent = null;
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    this._filmPopupPresenter = new FilmPopupPresenter(this._mainElement, this._bodyElement);

    if (prevFilmCardComponent === null) {
      this._renderFilmCard();
      return
    }

    if (this._filmsListElement.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent)
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _renderFilmCard() {
    render(this._filmsListElement, this._filmCardComponent.getElement());
    this._filmCardComponent.setClickHandler(() => {
      this._filmPopupPresenter.init(this._film, this._comments)
    });
  }
}
