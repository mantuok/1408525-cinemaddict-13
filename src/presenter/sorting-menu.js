import SortingMenuView from "../view/sorting-menu.js";
import {render} from "../utils/render.js";
import {SortType} from "../const.js";
import {
  sortByDate
} from "../utils/common.js";


export default class SortingMenu {
  constructor(containerElement, filmsModel, changeSortType) {
    this._containerElement = containerElement;
    this._filmsModel = filmsModel;
    this._changeSortType = changeSortType;
    this._currentSortType = SortType.DEAFULT;
    this._view = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._view = new SortingMenuView();
    render(this._containerElement, this._view);

    this._view.toggleActiveControl(SortType.DEAFULT);
    this._view.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  resetSortType() {
    this._handleSortTypeChange(SortType.DEAFULT);
  }

  getSortedFilmsList() {
    return this._sortFilms(this._currentSortType);
  }

  hide() {
    this._view.hide();
  }

  show() {
    this._view.show();
  }

  _sortFilms(sortType) {
    const films = this._getFilms();
    let sortedFilms = [];

    switch (sortType) {
      case SortType.DEAFULT:
        sortedFilms = films;
        break;
      case SortType.BY_DATE:
        sortedFilms = films.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        sortedFilms = films.sort((a, b) => b.rating - a.rating);
        break;
    }

    return sortedFilms;
  }

  _getFilms() {
    return this._filmsModel.get().slice();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._view.toggleActiveControl(this._currentSortType);
    this._changeSortType(this._sortFilms(sortType));
    this._currentSortType = sortType;
    this._view.toggleActiveControl(sortType);
  }
}
