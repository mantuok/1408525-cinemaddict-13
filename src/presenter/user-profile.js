import UserProfileView from "../view/user-profile.js";
import {render} from "../utils/render.js";

const RATING_TITLES = [
  {rating: 21, title: `Movie Buff`},
  {rating: 20, title: `Fan`},
  {rating: 10, title: `Novice`},
  {rating: 0, title: ``}
];

const getRatingTitle = (value) => RATING_TITLES
  .find(({rating}) => rating <= value)
  .title;

const countWatchedFilms = (films) => films
  .reduce((count, {isWatched}) => isWatched ? count + 1 : count, 0);

export default class UserProfile {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._view = null;
  }

  init(films) {
    const count = countWatchedFilms(films);
    const title = getRatingTitle(count);

    this._view = new UserProfileView(title);

    render(this._containerElement, this._view);
  }
}
