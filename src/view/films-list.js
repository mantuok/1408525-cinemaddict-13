import {createElement} from "../utils/render.js";

const FilmsListName = {
  MAIN: `All movies. Upcoming`,
  TOP_RATED: `Top rated`,
  TOM_COMMENTED: `Most commented`
};

const TOP_LIST = `films-list--extra`;

const createFilmsListTemplate = (filmsListType) => {
  return `<section class="films-list ${filmsListType !== FilmsListName.MAIN ? TOP_LIST : ``}">
    <h2 class="films-list__title visually-hidden">${filmsListType}</h2>
    <div class="films-list__container">
  </div>
    </section>`;
};

export default class FilmsList {
  constructor(filmsListType) {
    this._filmsListType = filmsListType;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._filmsListType);
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
