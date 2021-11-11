import React from "react";
import { Switch } from "react-router";
import Route from "./Route";
import Login from "../../pages/login";
import Vaccines from "../../pages/vaccine-list";
import AddAdopter from "../../pages/add-adopter";
import AddAdoption from "../../pages/add-adoption";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Route path="/vaccines" render={() => <Vaccines />} />
      <Route path="/add/adopter" render={() => <AddAdopter />} />
      <Route path="/add/adoption" render={() => <AddAdoption />} />
      <Route path="/" render={() => <Vaccines />} />
    </Switch>
  );
};

export default Routes;
