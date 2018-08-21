import _ from "lodash"

const mergeAndFilterMovies = (info, array) => {
  //merge info by movie id
  const mergedMovies = _.merge(array, info)

  //remove movies wheere dont exist seasons
  const filteredMovies = []
  _.forEach(mergedMovies, (value, key) => {
    if (_.size(value) > 2) {
      value = {
        id: key,
        ...value
      }
      filteredMovies.push(value)
    }
  })
  return filteredMovies
}

const orderTvShowsBySeasons = (info, array) => {
  const seasonsArr = []

  Object.keys(array).forEach(theShowId => {
    Object.keys(array[theShowId]).forEach(seasonNum => {
      // so every season is pushed to a `seasonsArr`
      seasonsArr.push({
        id: theShowId,
        season: seasonNum,
        ...info[theShowId],
        episodes: []
      })
      // remember the recently pushed season
      // so that down we can add episodes to it
      const recentlyPushedSeason = seasonsArr[seasonsArr.length - 1]

      Object.keys(array[theShowId][seasonNum]).forEach(episodeNum => {
        const episode = array[theShowId][seasonNum][episodeNum]

        // add episodes to the season
        recentlyPushedSeason.episodes.push({
          episodeNum: episodeNum,
          ...episode
        })
      })
    })
  })

  return seasonsArr
}

//_.isNumber
export default ({ info, movie, tv }) => {
  const movies = mergeAndFilterMovies(info, movie)
  const serials = orderTvShowsBySeasons(info, tv)

  return {
    movies,
    serials
  }
}
