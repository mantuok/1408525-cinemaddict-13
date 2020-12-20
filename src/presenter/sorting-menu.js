import SortingMenuView from "../view/sorting-menu.js";
import {render} from "../utils/render.js";

export default class SortingMenu {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._view = null;
  }

  init() {
    this._view = new SortingMenuView();
    render(this._containerElement, this._view.getElement());
  }
}
