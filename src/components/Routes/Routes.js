import React from "react";
import { Switch } from "react-router";
import Route from "./Route";
import Login from "../../pages/login";
import Vaccines from "../../pages/vaccine-list";
import AnimalList from "../../pages/animal-list";
import AdopterList from "../../pages/adopter-list";
import AddAdopter from "../../pages/add-adopter";
import AddAdoption from "../../pages/add-adoption";
import AddVaccine from "../../pages/add-vaccine";
import AddVaccination from "../../pages/add-vaccination";
import AddUser from "../../pages/add-user";
import AdoptionList from "../../pages/adoption-list";
import AttendanceList from "../../pages/attendance-list";
import AddAttendance from "../../pages/add-attendance";
import AddAnimal from "../../pages/add-animal";
import EditAnimal from "../../pages/edit-animal";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/vaccines" render={() => <Vaccines />} />
      <Route exact path="/" render={() => <AnimalList />} />
      <Route exact path="/adopters" render={() => <AdopterList />} />
      <Route exact path="/adoptions" render={() => <AdoptionList />} />
      <Route exact path="/attendances" render={() => <AttendanceList />} />
      <Route exact path="/add/adopter" render={() => <AddAdopter />} />
      <Route exact path="/add/adoption" render={() => <AddAdoption />} />
      <Route exact path="/add/vaccine" render={() => <AddVaccine />} />
      <Route exact path="/add/vaccination" render={() => <AddVaccination />} />
      <Route exact path="/add/user" render={() => <AddUser />} />
      <Route exact path="/add/attendance" render={() => <AddAttendance />} />
      <Route exact path="/add/animal" render={() => <AddAnimal />} />
      <Route exact path="/edit/animal/:id" render={() => <EditAnimal />} />
      <Route exact path="*" render={() => <div>Página não encontrada</div>} />
    </Switch>
  );
};

export default Routes;
