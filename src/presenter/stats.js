import StatsView from "../view/stats.js";
import {
  render,
  remove,
  replace
} from "../utils/render.js";

export default class Stats {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._view = null;
  }

  init(films) {
    this._films = films;

    this._view = new StatsView();
    render(this._containerElement, this._view);
  }

}
