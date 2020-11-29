import {changeFirstCharToUppercase} from "../utils/utils.js";

const createFilterTemplate = (filters) => filters.map((filter) =>
  `<a href="#${filter.name}" class="main-navigation__item">
  ${changeFirstCharToUppercase(filter.name)} <span class="main-navigation__item-count">${filter.count}</span></a>`);

export const createMainNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFilterTemplate(filters).join(``)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
