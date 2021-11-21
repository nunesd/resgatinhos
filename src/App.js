import React, { createContext, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Routes from "./components/Routes/Routes";
import Modal from "./components/Modal";
import useLocalStorageState from "./helpers/localStorage";

export const GeneralStateContext = createContext({
  generalState: {},
  setGeneralState: () => {},
});

export const ModalContext = createContext({
  modalState: {},
  handleClose: () => {},
});

const defaultModalState = {
  isOpen: false,
  title: "",
  description: "",
  link: "",
};

const App = () => {
  const [isLogged, setIsLogged] = useLocalStorageState("isLogged", false);
  const [generalState, setGeneralState] = useState({ logged: isLogged });
  const [modalState, setModalState] = useState(defaultModalState);

  const handleGeneralState = (newState) => {
    if (newState.logged !== undefined) {
      setIsLogged(newState.logged);
    }

    setGeneralState((oldState) => ({ ...oldState, ...newState }));
  };

  const state = { generalState, setGeneralState: handleGeneralState };

  const handleSetModalState = (newState) => {
    if (!newState.isOpen) {
      setModalState(defaultModalState);
      return;
    }

    setModalState((oldState) => ({ ...oldState, ...newState }));
  };
  return (
    <GeneralStateContext.Provider value={state}>
      <ModalContext.Provider
        value={{ modalState, setModalState: handleSetModalState }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes />
          <Modal />
        </LocalizationProvider>
      </ModalContext.Provider>
    </GeneralStateContext.Provider>
  );
};

export default App;
