import AbstractView from "./abstract.js";

const createPopupBottomConainerTemplate = () => {
  return `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
  </section>
</div>`;
};

export default class PopupBottomConainer extends AbstractView {
  getTemplate() {
    return createPopupBottomConainerTemplate();
  }

  getCommetsContainer() {
    return this.getElement().querySelector(`.film-details__comments-wrap`);
  }
}
