import _ from "lodash";

const mergeAndFilter = (info, array) => {
  //merge info by movie id
  const mergedMovies = _.merge(array, info);

  //remove movies wheere donst exist filename
  const filteredMovies = [];
  _.forEach(mergedMovies, (value, key) => {
    if (value.hasOwnProperty("filename")) {
      value = {
        id: key,
        ...value
      };
      filteredMovies.push(value);
    }
  });
  return filteredMovies;
};

export default ({ info, movie, tv }) => {
  const movies = mergeAndFilter(info, movie);

  return {
    movies,
    serials: []
  };
};
