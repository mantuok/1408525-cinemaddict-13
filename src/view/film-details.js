import {getFullDateFormat} from "../utils/day.js"

const GenreTerm = {
  SINGLE: `Genre`,
  PLURAL: `Genres`
};

const Term = {
  DIRECTOR: `Director`,
  WRITERS: `Writers`,
  ACTORS: `Actors`,
  RELEASE: `Release Date`,
  DURATION: `Runtime`,
  COUNTRY: `Country`
};

const getGenreTerm = (genres) => genres.length > 1 ? GenreTerm.PLURAL : GenreTerm.SINGLE;
const createGenreTemplate = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
const getHourMinuteFormat = (duration) => `${Math.floor(duration / 60)}h ${duration % 60}m`;

const createFilmDetailTemplate = (term, value) => (
  `<tr class="film-details__row">
    <td class="film-details__term">${term}</td>
    <td class="film-details__cell">${value}</td>
  </tr>`
);
export const createFilmDetailsTemplate = (film) => {
  return `<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${film.poster}" alt="">
    <p class="film-details__age">${film.contentRating}</p>
  </div>
  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${film.title}</h3>
        <p class="film-details__title-original">Original: ${film.titleOriginal}</p>
      </div>
      <div class="film-details__rating">
        <p class="film-details__total-rating">${film.rating}</p>
      </div>
    </div>
    <table class="film-details__table">
    ${createFilmDetailTemplate(Term.DIRECTOR, film.director)}
    ${createFilmDetailTemplate(Term.WRITERS, film.writers.join(`, `))}
    ${createFilmDetailTemplate(Term.ACTORS, film.actors.join(`, `))}
    ${createFilmDetailTemplate(Term.RELEASE, getFullDateFormat(film.date))}
    ${createFilmDetailTemplate(Term.DURATION, getHourMinuteFormat(film.duration))}
    ${createFilmDetailTemplate(Term.COUNTRY, film.country)}
    ${createFilmDetailTemplate(getGenreTerm(film.genres), createGenreTemplate(film.genres))}
    </table>
    <p class="film-details__film-description">${film.description}</p>
  </div>
</div>`;
};
