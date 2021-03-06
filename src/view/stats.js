import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SmartView from "./smart.js";
import {
  getRatingTitle,
} from "../utils/common.js";
import {
  getTotalWatchedFilms,
  getWatchedFilmsByPeriond,
  getWatchedFilmsDuration,
  getFavouriteGenre,
  getWatchedGenresCount
} from "../utils/stats.js";
import {
  TimePeriod
} from "../const.js";

const BAR_HEIGHT = 50;

const renderChart = (statisticCtx, data) => {
  const watchedFilmsByPeriod = getWatchedFilmsByPeriond(data.films, data.period);
  const watchedGenresCount = getWatchedGenresCount(watchedFilmsByPeriod);
  const watchedGenresTotalCount = Object.entries(watchedGenresCount).length;

  statisticCtx.height = BAR_HEIGHT * watchedGenresTotalCount;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(watchedGenresCount),
      datasets: [{
        data: Object.values(watchedGenresCount),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatsTemplate = (data) => {
  const watchedFilmsByPeriod = getWatchedFilmsByPeriond(data.films, data.period);
  const totalWatchedFilms = getTotalWatchedFilms(data.films);

  return `<section class="statistic" style="display: none">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${getRatingTitle(totalWatchedFilms.length)}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${data.period === TimePeriod.ALL_TIME ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${data.period === TimePeriod.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${data.period === TimePeriod.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${data.period === TimePeriod.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${data.period === TimePeriod.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsByPeriod.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getWatchedFilmsDuration(watchedFilmsByPeriod).hours}<span class="statistic__item-description">h</span>${getWatchedFilmsDuration(watchedFilmsByPeriod).minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${getFavouriteGenre(watchedFilmsByPeriod)}</p>
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

    this._statsChart = null;

    this._data = {
      films,
      period: TimePeriod.ALL_TIME
    };

    this._statisticFilteInputHandler = this._statisticFilteInputHandler.bind(this);
    this._setCharts();
    this._setInnerHandlers();
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  show() {
    this.getElement().style.display = `block`;
  }

  restoreHandlers() {
    this._setCharts();
    this._setInnerHandlers();
    this.show();
  }

  _setCharts() {
    if (this._statsChart !== null) {
      this._statsChart = null;
    }
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._statsChart = renderChart(statisticCtx, this._data);
  }

  _setInnerHandlers() {
    this.getElement()
        .querySelectorAll(`.statistic__filters-input`)
        .forEach((element) =>
          element.addEventListener(`input`, this._statisticFilteInputHandler));
  }

  _statisticFilteInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      period: evt.target.value
    }, false);
  }
}
