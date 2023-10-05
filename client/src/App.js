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

const App = () => {
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
