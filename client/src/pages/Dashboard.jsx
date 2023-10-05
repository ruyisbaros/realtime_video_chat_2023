import React from "react";
import Sidebar from "../components/dashBoard/Sidebar";
import Messenger from "./../components/dashBoard/Messenger";

const Dashboard = () => {
  return (
    <div className="dash-wrapper">
      <Sidebar />
      <Messenger />
    </div>
  );
};

export default Dashboard;
