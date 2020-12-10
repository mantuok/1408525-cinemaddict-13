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
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTopConainerTemplate();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeButtonClickHandler);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
