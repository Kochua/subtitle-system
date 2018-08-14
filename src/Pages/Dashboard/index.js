import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import { getCookie } from "../../utils/cookies";
import { Table } from "../../Components";
import { TablesWrapper, TableContainer } from "./styles";

const moviesTitles = ["Poster", "Title", "File Name", "Flags"];
const serialsTitles = [
  "Poster",
  "Title",
  "Season",
  "Episode",
  "File Name",
  "Flags"
];

class Dashboard extends Component {
  componentDidMount() {
    //Check if user exists
    const user = getCookie("user");
    if (!user) {
      this.props.history.push("/login");
    }

    //get data
    this.props.getTablesData_a();
  }

  render() {
    const { tables } = this.props;
    console.log(tables);
    return (
      <div>
        <TablesWrapper>
          <TableContainer>
            <Table titles={moviesTitles} body={tables.movies} />
          </TableContainer>
        </TablesWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ tables }) => {
  return { tables };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Dashboard));
