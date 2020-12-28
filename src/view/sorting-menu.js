import AbstractView from "./abstract.js";
import {SortType} from "../const.js"

const createSortingMenuTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DEAFULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
</ul>`;
};

export default class SortingMenu extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  // setActiveControl() {
  //   this.getElement()
  //     .querySelectorAll(`.sort__button`)
  //     .forEach((element) => element
  //         .classList.toggle(`sort__button--active`)
  //     )
  // }

  setActiveControl(sortType) {
    this.getElement()
      .querySelector(`[data-sort-type="${sortType}"]`)
      .classList.toggle(`sort__button--active`)
  }

  getTemplate() {
    return createSortingMenuTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler)
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
