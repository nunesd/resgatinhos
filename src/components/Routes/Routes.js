import React from "react";
import Login from "../../pages/login";
import { Switch } from "react-router";
import Route from "./Route";
import VaccineRegister from "../../pages/vaccine-register";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Route path="/" render={() => <VaccineRegister />} />
    </Switch>
  );
};

export default Routes;
