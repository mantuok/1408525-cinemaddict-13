import Observer from "./observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(updateType, films) {
    this._items = films.slice();
    this._notify(updateType)
  }

  get() {
    return this._items;
  }

  update(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  isEmpty() {
    return this._items.length === 0;
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        poster: film.film_info.poster,
        title: film.film_info.title,
        titleOriginal: film.film_info.alternative_title,
        rating: film.film_info.total_rating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        date: new Date(film.film_info.release.date),
        duration: film.film_info.runtime,
        country: film.film_info.release.release_country,
        genres: film.film_info.genre,
        description: film.film_info.description,
        contentRating: film.film_info.age_rating,
        isInWatchlist: film.user_details.watchlist,
        isFavorite: film.user_details.favorite,
        isMarkedAsWatched: film.user_details.already_watched,
        watchDate: film.user_details.watching_date
      }
    )
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      {
        "id": film.id,
        "comments": film.comments,
        "film_info": {
          "title": film.title,
          "poster": film.poster,
          "age_rating": film.contentRating,
          "runtime": film.duration,
          "total_rating": film.rating,
          "director": film.director,
          "writers": film.writers,
          "actors": film.actors,
          "description": film.description,
          "alternative_title": film.titleOriginal,
          "genre": film.genres,
          "release": {
            "date": film.date,
            "release_country": film.country,
          },
        },
        "user_details": {
          "already_watched": film.isMarkedAsWatched,
          "watchlist": film.isInWatchlist,
          "favorite": film.isFavorite,
          "watching_date": film.watchDate
        }
      }
    )
  return adaptedFilm;
  }
}
