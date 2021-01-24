import {changeFirstCharToUppercase} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createFilterTemplate = (filters, currentFilterType) => filters.map((filter) =>
  `<a href="#${filter.name}"
      class="main-navigation__item ${filter.type === currentFilterType ? `main-navigation__item--active` : ``}"
      data-filter-type="${filter.type}"
    >
  ${changeFirstCharToUppercase(filter.name)}
  <span class="main-navigation__item-count" data-filter-type="${filter.type}">${filter.count}</span></a>`);

const createMainNavigationTemplate = (filters, currentFilterType) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
      ${createFilterTemplate(filters, currentFilterType).join(``)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class MainNavigation extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._navigationItemClickHandler = this._navigationItemClickHandler.bind(this);
    this._navigationAdditionalClickHandler = this._navigationAdditionalClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilterType);
  }

  setNavigationItemClickHandler(callback) {
    this._callback.clickNavigationItem = callback;
    this.getElement()
        .querySelectorAll(`.main-navigation__item`)
        .forEach((item) =>
          item.addEventListener(`click`, this._navigationItemClickHandler)
        );
  }

  setStatsClickHandler(callback) {
    this._callback.navigationAdditional = callback;
    this.getElement()
        .querySelector(`.main-navigation__additional`)
        .addEventListener(`click`, this._navigationAdditionalClickHandler);
  }

  _navigationItemClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickNavigationItem(evt.target.dataset.filterType);
  }

  _navigationAdditionalClickHandler(evt) {
    evt.preventDefault();
    this._callback.navigationAdditional();
  }
}

