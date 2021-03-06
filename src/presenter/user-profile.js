import UserProfileView from "../view/user-profile.js";
import {
  render,
  remove,
  replace
} from "../utils/render.js";
import {
  getRatingTitle,
  countWatchedFilms
} from "../utils/common.js";

export default class UserProfile {
  constructor(containerElement, filmsModel) {
    this._containerElement = containerElement;
    this._filmsModel = filmsModel;
    this._view = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const films = this._filmsModel.get();
    const count = countWatchedFilms(films);
    const title = getRatingTitle(count);

    const prevView = this._view;

    this._view = new UserProfileView(title);

    if (prevView === null) {
      render(this._containerElement, this._view);
      return;
    }

    replace(this._view, prevView);
    remove(prevView);
  }

  _handleModelEvent() {
    this.init();
  }
}
