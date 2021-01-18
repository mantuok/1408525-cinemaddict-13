import {getRandom} from "./random.js";
import {getRandomFrom} from "./random.js";
import {getRandomArray} from "./random.js";
import {shuffleArray} from "./random.js";
import {getRandomBoolean} from "./random.js";

const getFilmId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const Rating = {
  MIN: 0,
  MAX: 10
};

const DescriptionLength = {
  MIN: 1,
  MAX: 5
};

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
];

const dates = [
  new Date(1939, 1, 10),
  new Date(1936, 10, 27),
  new Date(1933, 11, 15),
  new Date(1986, 6, 12),
  new Date(1900, 0, 1),
  new Date(1945, 0, 14),
  new Date(1955, 11, 14)
];

const watchDates = [
  new Date(2020, 10, 25),
  new Date(2019, 1, 25),
  new Date(2021, 0, 15),
  new Date(2020, 11, 30),
  new Date(2020, 11, 10),
  new Date(2020, 0, 13)
]

const genres = [
  [`drama`],
  [`comedy`, `drama`],
  [`thriller`, `comedy`, `drama`]
];

const comments = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

const getFilmRating = () => getRandom(Rating.MIN, Rating.MAX);
const getDescription = () => shuffleArray(descriptions)
  .slice(0, getRandom(DescriptionLength.MIN, DescriptionLength.MAX))
  .join(` `);
const getGenres = () => getRandomFrom(genres);
const getComments = () => getRandomArray(comments);
const getWatchDate = getRandomFrom(watchDates);

export const generateFilm = () => {
  const filmDate = getRandomFrom(dates);
  const commentsList = getComments();
  const getCommentsIds = () => commentsList.map(({id}) => id);
  return {
    id: getFilmId(),
    poster: `./images/posters/popeye-meets-sinbad.png`,
    title: `Popeye meets sindbad`,
    titleOriginal: `Popeye meets sindbad`,
    rating: getFilmRating(),
    director: `Dave Fleischer`,
    writers: [`Willard Bowsky`],
    actors: [`Jack Mercer`, `Mae Questel`, `Gus Wickie`],
    date: filmDate,
    duration: 130,
    country: `USA`,
    genres: getGenres(),
    description: getDescription(),
    contentRating: `R`,
    comments: getCommentsIds(),
    isInWatchlist: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    isMarkedAsWatched: getRandomBoolean(),
    watchDate: getRandomFrom(watchDates)

  };
};
