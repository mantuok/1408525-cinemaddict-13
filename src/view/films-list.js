import {createElement} from "../utils/render.js";

export const FilmsListType = {
  MAIN: `All movies. Upcoming`,
  TOP_RATED: `Top rated`,
  TOP_COMMENTED: `Most commented`
};

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
