import MainNavigationView from "../view/main-navigation.js";
import {filterTypeToFilmsFilter} from "../utils/filter.js";
import {
  render,
  replace,
  remove
} from "../utils/render.js";
import {
  FilterType,
  UpdateType
} from "../const.js";

export default class MainNavigation {
  constructor(containerElement, filtersModel, filmsModel) {
    this._containerElement = containerElement;
    this._view = null;
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._currentFilterType = ``;

    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilterType = this._filtersModel.get();

    const filters = this._getFilters();
    const prevView = this._view;

    this._view = new MainNavigationView(filters, this._currentFilterType);
    this._view.setFilterTypeClickHandler(this._handleFilterTypeClick);
    this._view.setStatsClickHandler(this._handleStatsClick);

    if (prevView === null) {
      render(this._containerElement, this._view);
      return;
    }

    replace(this._view, prevView);
    remove(prevView);
  }

  _getFilters() {
    const films = this._filmsModel.get();

    return [
      {
        type: FilterType.ALL,
        name: `all`,
        count: filterTypeToFilmsFilter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `watchlist`,
        count: filterTypeToFilmsFilter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `favorites`,
        count: filterTypeToFilmsFilter[FilterType.FAVORITES](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `history`,
        count: filterTypeToFilmsFilter[FilterType.HISTORY](films).length
      }
    ];
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeClick(filterType) {
    if (this._currentFilterType === FilterType) {
      return;
    }

    this._filtersModel.set(UpdateType.MAJOR, filterType);
  }

  _handleStatsClick() {
    this._filtersModel.set(UpdateType.SWITCH, FilterType.STATS);
  }
}
