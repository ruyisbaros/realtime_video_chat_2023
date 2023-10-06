import React, { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedInRoutes from "./ristrict_routes/LoggedInRoutes";
import NotLoggedInRoutes from "./ristrict_routes/NotLoggedInRoutes";
import RegisteredRoutes from "./ristrict_routes/RegisteredRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { reduxRegisterUser } from "./redux/currentUserSlice";

const App = () => {
  const dispatch = useDispatch();
  const reFreshToken = useCallback(async () => {
    try {
      const { data } = await axios.get("/auth/refresh_token");
      window.localStorage.setItem(
        "registeredUserDiscord",
        JSON.stringify(data.user)
      );
      await dispatch(reduxRegisterUser(data.user));
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error.response.data.message);
    }
  }, [dispatch]);
  useEffect(() => {
    reFreshToken();
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
