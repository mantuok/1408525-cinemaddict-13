import {getRandom} from "../utils.js"
import {getRandomFrom} from "../utils.js"
import {getRandomArray} from "../utils.js"
import {shuffleArray} from "../utils.js"
import {getRandomBoolean} from "../utils.js"
import dayjs from "dayjs";

const Rating = {
  MIN: 0,
  MAX: 10
};

const DescriptionLength = {
  MIN: 1,
  MAX: 5
}

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
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
  `comedy, drama`,
  `thriller, comedy, drama`
];

const comments = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 }
]

const getFilmRating = () => getRandom(Rating.MIN, Rating.MAX);
const getDescription = () => shuffleArray(descriptions)
  .slice(0, getRandom(DescriptionLength.MIN, DescriptionLength.MAX))
  .join(` `);
const getYearFormat = (date) => dayjs(date).format(`YYYY`);
const getFullDateFormat = (date) => dayjs(date).format(`DD MMMM YYYY`);
const getGenre = () => getRandomFrom(genres);
const getCommets = () => getRandomArray(comments);

export const generateFilm = () => {
  const filmDate = getRandomFrom(dates);
  const commentsList = getCommets();
  const getCommentsCount = () => commentsList.length;
  const getCommentsIds = () => commentsList.map(({id}) => id);
  return {
    poster: `./images/posters/popeye-meets-sinbad.png`,
    title: `Popeye meets sindbad`,
    titleOriginal: `Popeye meets sindbad`,
    rating: getFilmRating(),
    director: `Dave Fleischer`,
    writer: `Willard Bowsky`,
    actors: `Jack Mercer, Mae Questel, Gus Wickie`,
    year: getYearFormat(filmDate),
    date: getFullDateFormat(filmDate),
    duration: `1h 30m`,
    country: `USA`,
    genre: getGenre(),
    description: getDescription(),
    contentRating: `R`,
    comments: getCommentsIds(),
    commentsCount: getCommentsCount(),
    isInWatchlist: getRandomBoolean(),
    isFavourite: getRandomBoolean(),
    isWatched: getRandomBoolean()
  }
}
