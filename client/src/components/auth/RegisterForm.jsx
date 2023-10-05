import React, { useState } from "react";
import logo from "../../assets/online_meeting.png";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const RegisterForm = () => {
  const [regUser, setRegUser] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegUser({ ...regUser, [name]: value });
  };
  return (
    <div className="boxWrapper">
      <img src={logo} alt="" className="login-logo" />
      <div className="auth-child">
        <header>
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Welcome Back
          </h2>
          {/* <h6 style={{ color: "#b9bbbe", textAlign: "center" }}>
            We are happy that you are with us :)
          </h6> */}
        </header>
        <form className="auth-form">
          <div className="custom_input">
            <input
              type="name"
              placeholder="Enter your name"
              name="name"
              required
              value={regUser.name}
              onChange={handleInputs}
            />
          </div>
          <div className="custom_input">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={regUser.email}
              onChange={handleInputs}
            />
          </div>
          <div className="custom_input pwd-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              required
              value={regUser.password}
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
          <button className="btn auth-btn">Register</button>
          <p className="auth-forward-box">
            <span className="">You have already an account?</span>
            <Link to="/login" className="auth-forward">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;