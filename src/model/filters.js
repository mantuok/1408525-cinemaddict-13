import Observer from "./observer.js";
import {FilterType} from "../const.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter)
  }

  getFilter() {
    console.log(this._activeFilter)
    return this._activeFilter;
  }
}
