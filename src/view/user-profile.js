import {createElement} from "../utils/render.js"

const ProfileRating = {
  NONE: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

const ProfileRatingStep = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
  MOVIE_BUFF: 21
};

const getProfileRating = (watchedFilms) => {
  if (watchedFilms === ProfileRatingStep.NONE) {
    return ProfileRating.NONE;
  }
  if (watchedFilms <= ProfileRatingStep.NOVICE) {
    return ProfileRating.NOVICE;
  }
  if (watchedFilms <= ProfileRatingStep.FAN) {
    return ProfileRating.FAN;
  }
  if (watchedFilms >= ProfileRatingStep.MOVIE_BUFF) {
    return ProfileRating.MOVIE_BUFF;
  }
  return ProfileRating.NONE;
};

const createUserProfileTemplate = (watchedFilms) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${getProfileRating(watchedFilms.length)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserProfile {
  constructor (watchedFilms) {
    this._watchedFilms = watchedFilms;
    this._element = null;
  }

  getTemplate () {
    return createUserProfileTemplate(this._watchedFilms);
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}

