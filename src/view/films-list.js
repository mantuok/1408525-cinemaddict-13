import {FilmsListType} from "../utils/const.js";
import AbstractView from "./abstract.js";

const createFilmsListTemplate = (filmsListType) => {
  return `<section class="films-list ${filmsListType.isExtra ? `films-list--extra` : ``}">
    <h2 class="films-list__title ${filmsListType.isHidden ? `visually-hidden` : ``}">${filmsListType.title}</h2>
    ${filmsListType.title === FilmsListType.EMPTY.title ? `` : `<div class="films-list__container"></div>`}
  </section>`;
};

export default class FilmsList extends AbstractView {
  constructor(type) {
    super();
    this._type = type;
  }

  getTemplate() {
    return createFilmsListTemplate(this._type);
  }
}
