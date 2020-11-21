import {getRandom} from "../utils.js"
import {getRandomFrom} from "../utils.js"
import {getRandomArray} from "../utils.js"
import dayjs from "dayjs";

const Rating = {
  MIN: 0,
  MAX: 10
};

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam id orci ut lectus varius viverra.`,
  ``
];

const dates = [
  `1939-02-10`,
  `1936-11-27`,
  `1933-12-15`,
  `1986-07-12`,
  `1900-01-01`,
  `1945-01-14`,
  `1955-12-14`
];

const genres = [
  `drama`,
  `comedy, drama`
];

const comments = [
  {
    id: 1,
    text: `Fusce tristique felis at fermentum pharetra`
  },
  {
    id: 2,
    text: `Sed blandit, eros vel aliquam faucibus`
  },
  {
    id: 3,
    text: `Sed sed nisi sed augue convallis. Sed sed nisi sed augue convallis. Sed sed nisi sed augue convallis`
  },
  {
    id: 4,
    text: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  },
  {
    id: 5,
    text: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
  }
]

const getFilmRating = () => getRandom(Rating.MIN, Rating.MAX);
const getDescription = () => getRandomFrom(descriptions);
const getYearFormat = (date) => dayjs(date).format(`YYYY`);
const getFullDateFormat = (date) => dayjs(date).format(`DD MMMM YYYY`);
const getGenre = () => getRandomFrom(genres);
const getCommets = () => getRandomArray(comments);
const getCommentsIds = () => getCommets().map(({id}) => id);

export const generateFilm = () => {
  const filmDate = getRandomFrom(dates);
  return {
    poster: `./public/images/posters/popeye-meets-sinbad.png`,
    title: `Popeye meets sindbad`,
    titleOriginal: `Popeye meets sindbad`,
    rating: getFilmRating(),
    director: `Dave Fleischer`,
    writer: `Willard Bowsky`,
    actors: `Jack Mercer, Mae Questel, Gus Wickie`,
    year: getYearFormat(filmDate),
    date: getFullDateFormat(filmDate),
    length: `1h 30m`,
    country: `USA`,
    genre: getGenre(),
    description: getDescription(),
    parentAdvisory: `R`,
    comments: getCommentsIds()
  }
}
