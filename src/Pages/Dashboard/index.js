import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"
import * as actions from "../../actions"
import { getCookie } from "../../utils/cookies"
import CircularProgress from "@material-ui/core/CircularProgress"

import { TablesWrapper, TableContainer, TabsWrapper } from "./styles"
import Movies from "./Movies"
import Serials from "./Serials"

const styles = {
  root: {
    flexGrow: 1
  }
}

class Dashboard extends Component {
  state = {
    value: 0
  }

  componentDidMount() {
    //Check if user exists
    const user = getCookie("user")
    if (!user) {
      this.props.history.push("/login")
    }
    //get data
    this.props.getTablesData_a()
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  logoutHandler = () => {
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    window.location = "/"
  }

  render() {
    const { tables, classes } = this.props
    const { value } = this.state

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
            <button
              style={{ position: "absolute", right: 10, top: 5 }}
              type="button"
              className="btn btn-dark"
              onClick={() => {
                this.logoutHandler()
              }}
            >
              Logout
            </button>
          </Paper>
        </TabsWrapper>
        <TablesWrapper>
          {tables ? (
            <Fragment>
              {value === 0 && (
                <TableContainer>
                  <Movies data={tables.movies} />
                </TableContainer>
              )}
              {value === 1 && (
                <TableContainer>
                  <Serials data={tables.serials} />
                </TableContainer>
              )}
            </Fragment>
          ) : (
            <div style={{ margin: "30px auto" }}>
              <CircularProgress size={50} />
            </div>
          )}
        </TablesWrapper>
      </div>
    )
  }
}

const mapStateToProps = ({ tables }) => {
  return { tables }
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(withStyles(styles)(Dashboard)))
