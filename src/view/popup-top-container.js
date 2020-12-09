import AbstractView from "./abstract.js";

const createPopupTopConainerTemplate = () => {
  return `<div class="film-details__top-container">
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
</div>`;
};

export default class PopupTopConainer extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTopConainerTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClosePopupButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._clickHandler);
  }
}
