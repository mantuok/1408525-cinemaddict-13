import SortingMenuView from "../view/sorting-menu.js";
import {render} from "../utils/render.js";
import {SortType} from "../const.js";
import {
  sortByDate
} from "../utils/common.js";


export default class SortingMenu {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._view = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films, changeSortType) {
    this._films = films.slice();
    this._changeSortType = changeSortType;

    this._initialFilms = this._films.slice();

    this._view = new SortingMenuView();
    render(this._containerElement, this._view);

    this._currentSortType = SortType.DEAFULT;
    this._view.toggleActiveControl(SortType.DEAFULT);

    this._view.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._view.toggleActiveControl(this._currentSortType);

    switch (sortType) {
      case SortType.DEAFULT:
        this._changeSortType(this._initialFilms);
        break;
      case SortType.BY_DATE:
        this._changeSortType(
            this._films.sort(sortByDate)
        );
        break;
      case SortType.BY_RATING:
        this._changeSortType(
            this._films.sort((a, b) => b.rating - a.rating)
        );
        break;
    }

    this._currentSortType = sortType;
    this._view.toggleActiveControl(sortType);
  }
}
