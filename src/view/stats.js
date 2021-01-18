import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SmartView from "./smart.js";
import {
  getRatingTitle,
  getHours,
  getMinutes,
  countWatchedFilms
} from "../utils/common.js"
import {
  watchedFilmsByPeriond
} from "../utils/stats.js"
import {
  FilterType,
  TimePeriod
} from "../const.js";
import {filterTypeToFilmsFilter} from "../utils/filter.js";

const getWatchedFilmsDuration = (watchedFilms) => {
  let totalDuration = 0;
  watchedFilms.forEach((watchedFilm) => {
        totalDuration += watchedFilm.duration
      })
  return {
    hours: getHours(totalDuration),
    minutes: getMinutes(totalDuration)
  }
}

const getFavouriteGenre = (watchedFilms) => {
  const watchedGenres = watchedFilms.map((film) => film.genres).flat();
  const genresCount = {};
  watchedGenres.forEach((genre) => genresCount[genre] = (genresCount[genre] || 0) + 1)
  return Object.entries(genresCount)
      .sort((a, b) => b[1] - a[1])[0][0]
}

const createStatsTemplate = (data) => {
  const watchedFilms = filterTypeToFilmsFilter[FilterType.HISTORY](data.films);

  console.log(watchedFilmsByPeriond(watchedFilms, TimePeriod.WEEK))

  return `<section class="statistic" style="display: none">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${getRatingTitle(watchedFilms.length)}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getWatchedFilmsDuration(watchedFilms).hours}<span class="statistic__item-description">h</span>${getWatchedFilmsDuration(watchedFilms).minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${getFavouriteGenre(watchedFilms)}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`;
};

export default class Stats extends SmartView {
  constructor(films) {
    super();

    // this._statsPeriod = TimePeriod.ALL_TIME;
    // this._watchedFilms = filterTypeToFilmsFilter[FilterType.HISTORY](films);
    // this._watchedFilmsCount = this._watchedFilms.length;
    // this._watchedFilmsDuration = getWatchedFilmsDuration(this._watchedFilms);
    // this._favouriteGenre = getFavouriteGenre(this._watchedFilms);

    this._data = {
      films,
      period: TimePeriod.ALL_TIME
    }

    this._timePeriodClickHandler = this._timePeriodClickHandler.bind(this);

    this._setCharts();

  }
  getTemplate() {
    return createStatsTemplate(this._data)
  }

  show() {
    this.getElement().style.display = `block`
  }

  _setCharts() {

  }

  _timePeriodClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      period: evt.target.value
    }, false);
  }

  _setInnerHandlers() {
    this.getElement()
        .querySelectorAll(`.statistic__filters-label`)
        .forEach((element) =>
            element.addEventListener(`click`, this._timePeriodClickHandler))
  }



}

