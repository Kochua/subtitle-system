import React from "react";
import PropTypes from "prop-types";
import { Table } from "../../Components";

const serialsTitles = [
  "Poster",
  "Title",
  "Season",
  "Episode",
  "File Name",
  "Flags"
];

const Serials = ({ data }) => {
  return <Table type="serial" titles={serialsTitles} body={data} />;
};

Serials.propTypes = {
  data: PropTypes.array.isRequired
};
export default Serials;
