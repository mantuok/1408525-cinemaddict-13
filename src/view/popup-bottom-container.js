import AbstractView from "./abstract.js"

const createPopupBottomConainerTemplate = () => {
  return `<div class="film-details__bottom-container">
</div>`;
};

export default class PopupBottomConainer extends AbstractView {
  getTemplate() {
    return createPopupBottomConainerTemplate();
  }
}
