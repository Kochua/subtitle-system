import React from "react"
import _ from "lodash"
import FlagModal from "./FlagModal"

//Props:Index.js

const RenderLangs = ({ langs, data, type }) => {
  const filtredLangs = []
  //IF lang's key (en,it,ru...) is 0 show me
  _.forEach(langs, (value, key) => {
    if (key === "en") {
      filtredLangs.push({ code: "gb", active: value })
    } else if (key === "he") {
      filtredLangs.push({ code: "il", active: value })
    } else {
      filtredLangs.push({ code: key, active: value })
    }
  })
  return <FlagModal type={type} fileName={data} langs={filtredLangs} />
}

RenderLangs.defaultProps = {
  data: ""
}

export default RenderLangs
