import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginPage, DashboardPage } from "./Pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
