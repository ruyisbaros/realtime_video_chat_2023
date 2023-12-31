import React, { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedInRoutes from "./ristrict_routes/LoggedInRoutes";
import NotLoggedInRoutes from "./ristrict_routes/NotLoggedInRoutes";
import RegisteredRoutes from "./ristrict_routes/RegisteredRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { reduxLogout, reduxRegisterUser } from "./redux/currentUserSlice";
import { connectToSocketServer, joinUser } from "./SocketIOConnection";

const App = () => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  //Web socket actions
  useEffect(() => {
    if (loggedUser) {
      connectToSocketServer();
    }
  }, [loggedUser]);

  /* Join room */
  useEffect(() => {
    if (loggedUser) {
      joinUser(loggedUser.id);
    }
  }, [loggedUser]);
  const reFreshToken = useCallback(async () => {
    try {
      const { data } = await axios.get("/auth/refresh_token");
      window.localStorage.setItem(
        "registeredUserDiscord",
        JSON.stringify(data.user)
      );
      await dispatch(reduxRegisterUser(data.user));
    } catch (error) {
      dispatch(reduxLogout());
      toast.error(error.response.data.message);
    }
  }, [dispatch]);
  useEffect(() => {
    if (loggedUser) {
      reFreshToken();
    }
  }, [reFreshToken]);
  return (
    <div>
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RegisteredRoutes />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
