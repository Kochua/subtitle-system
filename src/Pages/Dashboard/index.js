import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import * as actions from "../../actions";
import { getCookie } from "../../utils/cookies";

import { TablesWrapper, TableContainer, TabsWrapper } from "./styles";
import Movies from "./Movies";
import Serials from "./Serials";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Dashboard extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    //Check if user exists
    const user = getCookie("user");
    if (!user) {
      this.props.history.push("/login");
    }
    //get data
    this.props.getTablesData_a();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { tables, classes } = this.props;
    const { value } = this.state;
    console.log(tables);
    return (
      <div>
        <TabsWrapper>
          <Paper className={classes.root}>
            <img
              src="https://apollogroup.tv/wp-content/uploads/2016/05/new-logo.png"
              alt="logo"
              style={{ width: 140, position: "absolute", left: 10, top: 5 }}
            />
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              centered
            >
              <Tab label="Movies" />
              <Tab label="TV Shows" />
            </Tabs>
          </Paper>
        </TabsWrapper>
        <TablesWrapper>
          {value === 0 &&
            tables.movies && (
              <TableContainer>
                <Movies data={tables.movies} />
              </TableContainer>
            )}
          {value === 1 &&
            tables.serials && (
              <TableContainer>
                <Serials data={tables.serials} />
              </TableContainer>
            )}
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
)(withRouter(withStyles(styles)(Dashboard)));
