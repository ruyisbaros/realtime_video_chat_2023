import React, { useState } from "react";
import logo from "../../assets/online_meeting.png";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const [logUser, setLogUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLogUser({ ...logUser, [name]: value });
  };
  console.log(logUser);
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
            Welcome Back Ahmet
          </h4>
          {/* <h6 style={{ color: "#b9bbbe", textAlign: "center" }}>
            We are happy that you are with us :)
          </h6> */}
        </header>
        <form className="auth-form">
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
          <button className="btn auth-btn">Login</button>
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
