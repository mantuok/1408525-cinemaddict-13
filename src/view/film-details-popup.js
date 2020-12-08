import AbstractView from "./abstract.js"

const createFilmDetailsPopupTemplate = () => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>`;
};

export default class FilmDetailsPopup extends AbstractView {
  getTemplate() {
    return createFilmDetailsPopupTemplate();
  }
}
