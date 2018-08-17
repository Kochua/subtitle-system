import React from "react"
import PropTypes from "prop-types"
import { Table } from "../../Components"

const moviesTitles = ["Poster", "Title", "File Name", "Flags"]

const Movies = ({ data }) => {
  return <Table type="movie" titles={moviesTitles} body={data} />
}

Movies.propTypes = {
  data: PropTypes.array.isRequired
}

export default Movies
