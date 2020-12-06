import {createElement} from "../utils/render.js";
import {FilmsListType} from "../utils/const.js";

const createFilmsListTemplate = (filmsListType) => {
  return `<section class="films-list ${filmsListType.isExtra ? `films-list--extra` : ``}">
    <h2 class="films-list__title ${filmsListType.isHidden ? `visually-hidden` : ``}">${filmsListType.title}</h2>
    ${filmsListType.title === FilmsListType.EMPTY.title ? `` : `<div class="films-list__container"></div>`}
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
