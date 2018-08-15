import React, { Fragment } from "react";
import PropTypes from "prop-types";

import RenderHeaders from "./RenderHeaders";
import RenderLangs from "./RenderLangs";

const renderMovies = items => {
  return items.map((item, i) => {
    return (
      <tr key={i++}>
        <th scope="row">{i}</th>
        <td>
          <a href={`https://www.imdb.com/title/${item.id}`}>
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
          <RenderLangs langs={item.lang} />
        </td>
      </tr>
    );
  });
};

const renderSerials = items => {
  return items.map((item, i) => {
    return (
      <tr key={i++}>
        <th scope="row">{i}</th>
        <td>
          <a href={`https://www.imdb.com/title/${item.id}`}>
            <img
              style={{ width: 50, height: "auto" }}
              src={item.poster}
              alt="poster"
            />
          </a>
        </td>
        <td>{item.title}</td>
        <td>
          {item.content.map(c => {
            return (
              <Fragment>
                {c.season} <br key={c.season} />
              </Fragment>
            );
          })}
        </td>
      </tr>
    );
  });
};

const renderBody = (items, type) => {
  if (items) {
    if (type === "movie") {
      return renderMovies(items);
    } else if (type === "serial") {
      return renderSerials(items);
    } else {
      console.error("Wrong type defined");
    }
  }
};

//MAIN
const Table = ({ titles, body, type }) => {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <RenderHeaders titles={titles} />
        </tr>
      </thead>
      <tbody>{renderBody(body, type)}</tbody>
    </table>
  );
};

Table.defaultProps = {
  type: "movie"
};

Table.propTypes = {
  body: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  type: PropTypes.string
};

export default Table;
