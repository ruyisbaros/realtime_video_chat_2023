import React, { useEffect, useState } from "react";
import logo from "../../assets/online_meeting.png";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reduxRegisterUser } from "../../redux/currentUserSlice";
import { validateEmail, validatePassword } from "../../utils/validators";
import { connectWithSocketServer, joinUser } from "../../SocketIOConnection";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [regUser, setRegUser] = useState({ name: "", email: "", password: "" });
  const { email, password } = regUser;
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegUser({ ...regUser, [name]: value });
  };
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  useEffect(() => {
    setPasswordIsValid(validatePassword(password));
  }, [password]);
  useEffect(() => {
    setEmailIsValid(validateEmail(email));
  }, [email]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setStatus(true);
      const { data } = await axios.post("/auth/register", { ...regUser });
      console.log(data.user);
      setStatus(false);
      window.localStorage.setItem(
        "registeredUserDiscord",
        JSON.stringify(data.user)
      );
      await dispatch(reduxRegisterUser(data.user));
      connectWithSocketServer();
      joinUser({ id: data?.user?.id, email: data?.user?.email });
      setRegUser({ email: "", password: "", name: "" });
      toast.success(data.message);
    } catch (error) {
      setStatus(false);
      toast.error(error.response.data.message);
    }
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
            Join us
          </h2>
          {/* <h6 style={{ color: "#b9bbbe", textAlign: "center" }}>
            We are happy that you are with us :)
          </h6> */}
        </header>
        <form className="auth-form" onSubmit={handleRegister}>
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
          <div className="custom_input pwd-box">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={regUser.email}
              onChange={handleInputs}
            />
            {email.length > 0 && (
              <span className="valid_check_email">
                {emailIsValid ? (
                  <AiOutlineLike color="green" />
                ) : (
                  <AiOutlineDislike color="red" />
                )}
              </span>
            )}
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
            {password.length > 0 && (
              <span className="valid_check_pwd">
                {passwordIsValid ? (
                  <AiOutlineLike color="green" />
                ) : (
                  <AiOutlineDislike color="red" />
                )}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn auth-btn auth-reg"
            disabled={!regUser.email || !regUser.password || !regUser.name}
            data-hover={
              !regUser.email || !regUser.password || !regUser.name
                ? "Fill infos before Register!"
                : "Click for Register"
            }
          >
            {status ? <PulseLoader color="#fff" size={14} /> : "Register"}
          </button>
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
