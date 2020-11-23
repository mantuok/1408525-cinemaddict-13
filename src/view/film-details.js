export const createFilmDetailsTemplate = (film) => {
  const GenreTerm = {
    SINGLE: `Genre`,
    PLURAL: `Genres`
  }

  console.log(film);

  const genres = film.genre.split(", ");

  const renderGenreTerm = () => {
    console.log(genres);
    if (genres.length <= 1) {
      return GenreTerm.SINGLE;
    } else {
      return GenreTerm.PLURAL;
    }
  }

  const renderGenres = () => {
    const genreElements = [];
    for (let genre of genres) {
      const genreElement = `<span class="film-details__genre">${genre}</span>`
      genreElements.push(genreElement);
    };
    return genreElements.join(``)
  }

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
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${film.director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${film.writer}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${film.actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${film.date}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${film.duration}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${film.country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">${renderGenreTerm()}</td>
        <td class="film-details__cell">${renderGenres()}</td>
      </tr>
    </table>
    <p class="film-details__film-description">${film.description}</p>
  </div>
</div>`;
};
