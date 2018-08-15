import _ from "lodash";

const mergeAndFilter = (info, array) => {
  //merge info by movie id
  const mergedMovies = _.merge(array, info);

  //remove movies wheere dont exist seasons
  const filteredMovies = [];
  _.forEach(mergedMovies, (value, key) => {
    if (_.size(value) > 2) {
      value = {
        id: key,
        ...value
      };
      filteredMovies.push(value);
    }
  });
  return filteredMovies;
};

//_.isNumber
export default ({ info, movie, tv }) => {
  const movies = mergeAndFilter(info, movie);
  const filtredSerials = mergeAndFilter(info, tv);

  //make serial.0 to serial.items = [{season:0,episodes:{}},....]
  const serials = filtredSerials.map(serial => {
    const arr = [];

    _.forEach(serial, (value, key) => {
      //if value is object convert his key into (season:0)
      if (_.isObject(value)) {
        delete serial[key];

        let episodeObj = value;
        let episodes = [];
        //convert objects of object into array
        _.forEach(episodeObj, (value, key) => {
          episodes.push({
            n: key,
            ...value
          });
        });

        arr.push({
          season: key,
          episodes
        });
      }
    });

    //create new property and push our new array with seasons and episodes
    serial.content = arr;
    return serial;
  });

  return {
    movies,
    serials
  };
};
