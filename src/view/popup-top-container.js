import AbstractView from "./abstract.js"

const createPopupTopConainerTemplate = () => {
  return `<div class="film-details__top-container">
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
</div>`;
};

export default class PopupTopConainer extends AbstractView {
  getTemplate() {
    return createPopupTopConainerTemplate();
  }
}
