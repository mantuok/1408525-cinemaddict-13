import Observer from "./observer.js";
import {FilterType} from "../const.js";

export default class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  set(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get() {
    return this._activeFilter;
  }
}
