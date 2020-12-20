import AbstractView from "./abstract.js";

const createUserProfileTemplate = (ratingTitle) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${ratingTitle}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserProfile extends AbstractView {
  constructor(ratingTitle) {
    super();
    this._ratingTitle = ratingTitle;
  }

  getTemplate() {
    return createUserProfileTemplate(this._ratingTitle);
  }
}
