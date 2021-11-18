import React, { useContext } from "react";
import { Redirect, Route as RouterRoute } from "react-router";
import { Context } from "../../App";

const Route = (props) => {
  const { path } = props;
  const { generalState } = useContext(Context);

  if (generalState.logged) {
    if (path !== "/login") {
      return <RouterRoute {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }, //eslint-disable-line
        }}
      />
    );
  }

  if (path === "/login") {
    return <RouterRoute {...props} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }, //eslint-disable-line
      }}
    />
  );
};

export default Route;
