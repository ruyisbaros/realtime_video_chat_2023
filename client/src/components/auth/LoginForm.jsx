import React, { useEffect, useState } from "react";
import logo from "../../assets/online_meeting.png";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reduxRegisterUser } from "../../redux/currentUserSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [logUser, setLogUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLogUser({ ...logUser, [name]: value });
  };
  //console.log(logUser);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setStatus(true);
      const { data } = await axios.post("/auth/login", { ...logUser });
      console.log(data.user);
      setStatus(false);
      window.localStorage.setItem(
        "registeredUserDiscord",
        JSON.stringify(data.user)
      );
      await dispatch(reduxRegisterUser(data.user));
      setLogUser({ email: "", password: "" });
      toast.success(data.message);
    } catch (error) {
      setStatus(false);
      toast.error(error.response.data.message);
    }
  };
  /* /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ */
  return (
    <div className="boxWrapper">
      <img src={logo} alt="" className="login-logo" />
      <div className="auth-child">
        <header>
          <h4
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Welcome Back
          </h4>
          {/* <h6 style={{ color: "#b9bbbe", textAlign: "center" }}>
            We are happy that you are with us :)
          </h6> */}
        </header>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="custom_input">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={logUser.email}
              onChange={handleInputs}
            />
          </div>
          <div className="custom_input pwd-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              required
              value={logUser.password}
              onChange={handleInputs}
            />
            <span
              className="hide-show-pwd"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="btn auth-btn auth-log"
            disabled={!logUser.email || !logUser.password}
            data-hover={
              !logUser.email || !logUser.password
                ? "Fill infos before Login!"
                : "Click for Login"
            }
          >
            {status ? <PulseLoader color="#fff" size={14} /> : "Login"}
          </button>
          <p className="auth-forward-box">
            <span className="">Don't have an account?</span>
            <Link to="/register" className="auth-forward">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
