import {createElement} from "../utils/render";

const createFilmDetailsPopupTemplate = () => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>`;
};

export default class FilmDetailsPopup {
  constructor () {
    this._element = null;
  };

  getTemplate() {
    return createFilmDetailsPopupTemplate();
  };

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  };

  removeElement() {
    this._element = null;
  };
};
