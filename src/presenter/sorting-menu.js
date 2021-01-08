import SortingMenuView from "../view/sorting-menu.js";
import {render} from "../utils/render.js";
import {SortType} from "../const.js";
import {
  sortByDate
} from "../utils/common.js";


export default class SortingMenu {
  constructor(containerElement, filmsModel) {
    this._containerElement = containerElement;
    this._filmsModel = filmsModel;
    this._view = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(changeSortType) {
    this._changeSortType = changeSortType;

    this._view = new SortingMenuView();
    render(this._containerElement, this._view);

    this._currentSortType = SortType.DEAFULT;
    this._view.toggleActiveControl(SortType.DEAFULT);
    this._view.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _getFilms() {
    return this._filmsModel.getFilms().slice();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    const films = this._getFilms();

    this._view.toggleActiveControl(this._currentSortType);

    switch (sortType) {
      case SortType.DEAFULT:
        this._changeSortType(films);
        break;
      case SortType.BY_DATE:
        this._changeSortType(
            films.sort(sortByDate)
        );
        break;
      case SortType.BY_RATING:
        this._changeSortType(
            films.sort((a, b) => b.rating - a.rating)
        );
        break;
    }

    this._currentSortType = sortType;
    this._view.toggleActiveControl(sortType);
  }
}
