import React from "react"
import PropTypes from "prop-types"

import RenderHeaders from "./RenderHeaders"
import RenderLangs from "./RenderLangs"

const renderMovies = (items, type) => {
  return items.map((item, i) => {
    return (
      <tr key={i++}>
        <th scope="row">{i}</th>
        <td>
          <a href={`https://www.imdb.com/title/${item.id}`} target="_blank">
            <img
              style={{ width: 50, height: "auto" }}
              src={item.poster}
              alt="poster"
            />
          </a>
        </td>
        <td>{item.title}</td>
        <td>{item.filename}</td>
        <td style={{ display: "flex" }}>
          <RenderLangs type={type} data={item.filename} langs={item.lang} />
        </td>
      </tr>
    )
  })
}

const renderSerials = (items, type) => {
  return items.map((item, i) => {
    return (
      <tr key={i++}>
        <th scope="row">{i}</th>
        <td>
          <a href={`https://www.imdb.com/title/${item.id}`} target="_blank">
            <img
              style={{ width: 50, height: "auto" }}
              src={item.poster}
              alt="poster"
            />
          </a>
        </td>
        <td>{item.title}</td>
        <td>{item.season}</td>
        <td style={{ padding: 0 }}>
          <table style={{ width: "100%" }}>
            <tbody>
              {item.episodes.map(episode => {
                return (
                  <tr key={episode.episodeNum}>
                    <td>{episode.episodeNum}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </td>
        <td style={{ padding: 0 }}>
          <table style={{ width: "100%" }}>
            <tbody>
              {item.episodes.map(episode => {
                return (
                  <tr key={episode.episodeNum}>
                    <td>{episode.filename}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </td>
        <td style={{ padding: 0 }}>
          <table style={{ width: "100%" }}>
            <tbody>
              {item.episodes.map(episode => {
                return (
                  <tr key={episode.episodeNum}>
                    <td style={{ display: "flex" }}>
                      <RenderLangs
                        type={type}
                        data={episode.filename}
                        langs={episode.lang}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </td>
      </tr>
    )
  })
}

const renderBody = (items, type) => {
  if (items) {
    if (type === "movie") {
      return renderMovies(items, type)
    } else if (type === "serial") {
      return renderSerials(items, type)
    } else {
      console.error("Wrong type defined")
    }
  }
}

//MAIN
const Table = ({ titles, body, type }) => {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <RenderHeaders titles={titles} />
        </tr>
      </thead>
      <tbody>{body && renderBody(body, type)}</tbody>
    </table>
  )
}

Table.defaultProps = {
  type: "movie"
}

Table.propTypes = {
  body: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  type: PropTypes.string
}

export default Table
