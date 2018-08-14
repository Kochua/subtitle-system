import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

class Dashboard extends Component {
  componentDidMount() {
    //Check if user exists
    const user = getCookie("user");
    if (!user) {
      this.props.history.push("/login");
    }
  }

  render() {
    return <div>Dashboard</div>;
  }
}

export default withRouter(Dashboard);
