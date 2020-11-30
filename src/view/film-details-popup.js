import {createElement} from "../utils/render";

const createFilmDetailsPopupTemplate = () => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      </section>
    </div>
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
