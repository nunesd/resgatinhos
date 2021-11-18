import React from "react";
import { Switch } from "react-router";
import Route from "./Route";
import Login from "../../pages/login";
import Vaccines from "../../pages/vaccine-list";
import AnimalList from "../../pages/animals-list";
import AddAdopter from "../../pages/add-adopter";
import AddAdoption from "../../pages/add-adoption";
import AddVaccine from "../../pages/add-vaccine";
import AddVaccination from "../../pages/add-vaccination";
import AddUser from "../../pages/add-user";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/vaccines" render={() => <Vaccines />} />
      <Route exact path="/add/adopter" render={() => <AddAdopter />} />
      <Route exact path="/add/adoption" render={() => <AddAdoption />} />
      <Route exact path="/add/vaccine" render={() => <AddVaccine />} />
      <Route exact path="/add/vaccination" render={() => <AddVaccination />} />
      <Route exact path="/add/animals" render={() => <AnimalList />} />
      <Route exact path="/add/user" render={() => <AddUser />} />
      <Route exact path="/" render={() => <Vaccines />} />
      <Route exact path="*" render={() => <div>Página não encontrada</div>} />
    </Switch>
  );
};

export default Routes;
