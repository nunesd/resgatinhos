import React, { useContext } from "react";
import { Redirect, Route as RouterRoute } from "react-router";
import { Context } from "../../App";

const Route = (props) => {
  const { path } = props;
  const { generalState } = useContext(Context);

  return generalState.logged || path === "/login" ? (
    <RouterRoute {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }, //eslint-disable-line
      }}
    />
  );
};

export default Route;
