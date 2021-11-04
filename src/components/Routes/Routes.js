import React from "react";
import Login from "../../pages/login";
import { Switch } from "react-router";
import Route from "./Route";
import Vaccines from "../../pages/vaccine-list";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Route path="/vaccines" render={() => <Vaccines />} />
      <Route path="/" render={() => <Vaccines />} />
    </Switch>
  );
};

export default Routes;
