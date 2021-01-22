import Observer from "./observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(updateType, films) {
    this._items = films.slice();
    this._notify(updateType);
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
    const filmInfo = film.film_info;
    const userDetails = film.user_details;
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          poster: filmInfo.poster,
          title: filmInfo.title,
          titleOriginal: filmInfo.alternative_title,
          rating: filmInfo.total_rating,
          director: filmInfo.director,
          writers: filmInfo.writers,
          actors: filmInfo.actors,
          date: new Date(filmInfo.release.date),
          duration: filmInfo.runtime,
          country: filmInfo.release.release_country,
          genres: filmInfo.genre,
          description: filmInfo.description,
          contentRating: filmInfo.age_rating,
          isInWatchlist: userDetails.watchlist,
          isFavorite: userDetails.favorite,
          isMarkedAsWatched: userDetails.already_watched,
          watchDate: new Date(userDetails.watching_date)
        }
    );
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
    );
    return adaptedFilm;
  }
}
