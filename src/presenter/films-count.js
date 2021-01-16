import FilmsCountView from "../view/films-count.js";
import {render} from "../utils/render.js";

const countFilms = (films) => films.length;

export default class FilmsCount {
  constructor(containerElement, filmsModel) {
    this._containerElement = containerElement;
    this._filmsModel = filmsModel;
    this._view = null;
  }

  init() {
    const films = this._filmsModel.get();
    const count = countFilms(films);
    this._view = new FilmsCountView(count);

    render(this._containerElement, this._view);
  }
}
