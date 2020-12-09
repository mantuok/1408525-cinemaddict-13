import AbstractView from "./abstract.js";

const createFilmsListsContainerTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmsListsContainer extends AbstractView {
  getTemplate() {
    return createFilmsListsContainerTemplate();
  }
}
