import React from "react";
import _ from "lodash";
import Flag from "react-world-flags";

export default ({ langs }) => {
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
