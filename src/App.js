import React, { createContext, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Routes from "./components/Routes/Routes";
import useLocalStorageState from "./helpers/localStorage";

export const Context = createContext({
  generalState: {},
  setGeneralState: () => {},
});

const App = () => {
  const [isLogged, setIsLogged] = useLocalStorageState("isLogged", false);
  const [generalState, setState] = useState({ logged: isLogged });

  const setGeneralState = (newState) => {
    if (newState.logged !== undefined) {
      setIsLogged(newState.logged);
    }

    setState((oldState) => ({ ...oldState, ...newState }));
  };

  const state = { generalState, setGeneralState };

  return (
    <Context.Provider value={state}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes />
      </LocalizationProvider>
    </Context.Provider>
  );
};

export default App;
