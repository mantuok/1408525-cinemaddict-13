import dayjs from "dayjs";

const DescriptionLength = {
  MIN: 0,
  MAX: 140,
  LIMIT: 139
};

const getDescription = (text) => text.length > DescriptionLength.MAX
  ? `${text.slice(DescriptionLength.MIN, DescriptionLength.LIMIT)}...`
  : text;
const getYearFormat = (date) => dayjs(date).format(`YYYY`);
const getHourMinuteFormat = (duration) => `${Math.floor(duration / 60)}h ${duration % 60}m`;
const getFilterStatus = (filter) => filter ? `film-card__controls-item--active` : ``;

export const createFilmCardTemplate = (film) => {
  const {poster, title, rating, date, duration, genres, description, comments, isInWatchlist, isFavourite, isWatched} = film;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${getYearFormat(date)}</span>
    <span class="film-card__duration">${getHourMinuteFormat(duration)}</span>
    <span class="film-card__genre">${genres[0]}</span>
  </p>
  <img src="${poster}" alt="${title}" class="film-card__poster">
  <p class="film-card__description">${getDescription(description)}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getFilterStatus(isInWatchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getFilterStatus(isWatched)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${getFilterStatus(isFavourite)}" type="button">Mark as favorite</button>
  </div>
</article>`;
};
