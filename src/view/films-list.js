import {createElement} from "../utils/render.js";
import {FilmsListType} from "../utils/const.js";

const FilmListClass = {
  [FilmsListType.MAIN]: `films-list`,
  [FilmsListType.TOP_RATED]: `films-list films-list--extra`,
  [FilmsListType.TOP_COMMENTED]: `films-list films-list--extra`
};

const createFilmsListTemplate = (filmsListType) => {
  return `<section class="${FilmListClass[filmsListType]}">
    <h2 class="films-list__title visually-hidden">${filmsListType}</h2>
    <div class="films-list__container">
  </div>
  </section>`;
};

export default class FilmsList {
  constructor(type) {
    this._type = type;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._type);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
