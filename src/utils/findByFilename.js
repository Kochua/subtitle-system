import { getCookie } from "./cookies"

export default (array, fileName, type) => {
  const userToken = getCookie("user")
  let data = []
  //create data for file info in one object
  //if serial NEED {userToken:'sds',imbdId:'tt33e3',episode:'2',season:'1'}
  if (type === "serial") {
    array.serials.map(serial => {
      return serial.episodes.map(episode => {
        if (episode.filename === fileName) {
          data = {
            userToken,
            imbdID: serial.id,
            episode: episode.episodeNum,
            season: serial.season
          }
          return data
        }
        return ""
      })
    })
  } else {
    array.movies.map(movie => {
      if (movie.filename === fileName) {
        data = {
          userToken,
          imbdID: movie.id
        }
        return data
      }
      return ""
    })
  }
  console.log(data)
  return data
}
