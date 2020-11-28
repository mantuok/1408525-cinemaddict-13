const ProfileRating = {
  NONE: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

const RatingStep = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
  MOVIE_BUFF: 21
};

const getProfileRating = (wathcedFilms) => {
  if (wathcedFilms === RatingStep.NONE) {
    return ProfileRating.NONE;
  } else if (wathcedFilms <= RatingStep.NOVICE) {
    return ProfileRating.NOVICE;
  } else if (wathcedFilms <= RatingStep.FAN) {
    return ProfileRating.FAN;
  } else if (wathcedFilms >= RatingStep.MOVIE_BUFF) {
    return ProfileRating.MOVIE_BUFF;
  } else {
    return ProfileRating.NONE;
  }
};

export const createUserProfileTemplate = (watchedFilms) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${getProfileRating(watchedFilms.length)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};
