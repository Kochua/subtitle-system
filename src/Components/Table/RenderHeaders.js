import React, { Fragment } from "react";

export default ({ titles }) => {
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
