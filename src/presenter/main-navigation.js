import MainNavigationView from "../view/main-navigation.js";
import {render} from "../utils/render.js";

export default class MainNavigation {
  constructor(containerElement) {
    this._containerELement = containerElement;
    this._view = null;
  }

  init(filters) {
    this._filters = filters.slice();

    this._view = new MainNavigationView(this._filters);
    render(this._containerELement, this._view.getElement());
  }
}
