import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./../pages/Login";

const LoggedInRoutes = () => {
  const { loggedUser } = useSelector((store) => store.currentUser);
  //console.log(loggedUser);
  return loggedUser ? <Outlet /> : <Login />;
};

export default LoggedInRoutes;
