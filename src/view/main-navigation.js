import {changeFirstCharToUppercase} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createFilterTemplate = (filters, currentFilterType) => filters.map((filter) =>
  `<a href="#${filter.name}"
      class="main-navigation__item ${filter.type === currentFilterType ? `main-navigation__item--active` : ``}"
      data-filter-type="${filter.type}"
    >
  ${changeFirstCharToUppercase(filter.name)}
  <span class="main-navigation__item-count">${filter.count}</span></a>`);

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
    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilterType);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.clickFilterType = callback;
    this.getElement()
        .querySelectorAll(`.main-navigation__item`)
        .forEach((item) =>
          item.addEventListener(`click`, this._filterTypeClickHandler)
        );
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement()
        .querySelector(`.main-navigation__additional`)
        .addEventListener(`click`, this._statsClickHandler);
  }

  _filterTypeClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFilterType(evt.target.dataset.filterType);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statsClick();
  }
}

