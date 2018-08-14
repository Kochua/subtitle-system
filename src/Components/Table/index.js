import React, { Fragment } from "react";
import _ from "lodash";
import Flag from "react-world-flags";

const renderLangs = langs => {
  const langsName = [];
  //IF lang's key (en,it,ru...) is 0 show me
  _.forEach(langs, (value, key) => {
    if (value === 0) {
      langsName.push(key);
    }
  });

  return langsName.map(lang => {
    return (
      <span key={lang} style={{ display: "inline-block", marginRight: 5 }}>
        <Flag code={lang} height="16" />
      </span>
    );
  });
};

const renderTD = items => {
  if (items) {
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
          {item.season && <td>{item.season}</td>}
          {item.episode && <td>{item.episode}</td>}
          <td>{item.filename}</td>
          <td style={{ display: "flex" }}>{renderLangs(item.lang)}</td>
        </tr>
      );
    });
  }
};

const renderTH = titles => {
  return (
    <Fragment>
      <th scope="col">#</th>
      {titles.map(title => (
        <th key={title} scope="col">
          {title}
        </th>
      ))}
    </Fragment>
  );
};

//MAIN
const Table = ({ titles, body }) => {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>{renderTH(titles)}</tr>
      </thead>
      <tbody>{renderTD(body)}</tbody>
    </table>
  );
};

Table.defaultProps = {
  body: [],
  titles: []
};

export default Table;
