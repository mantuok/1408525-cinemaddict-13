import {changeFirstCharToUppercase} from "../utils.js";

const renderFilters = (filters) => {
  const filterELements = [];
  for (let filter of filters) {
    const filterElement = `<a href="#${filter.name}" class="main-navigation__item">${changeFirstCharToUppercase(filter.name)} <span class="main-navigation__item-count">${filter.count}</span></a>`;
    filterELements.push(filterElement);
  }
  return filterELements.join(` `);
};

export const createMainNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${renderFilters(filters)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
