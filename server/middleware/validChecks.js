const { validateEmail, validateLength } = require("../utils/validation");

exports.validateRegister = async (req, res, next) => {
  const { name, email, password, username } = req.body;

  if (!name) {
    return res.status(500).json({ message: "Please provide your name!" });
  } else if (!validateLength(name, 3, 30)) {
    return res
      .status(500)
      .json({ message: "Name must be between 3-30 chars!" });
  }

  if (!email) {
    return res
      .status(500)
      .json({ message: "Please provide your email address" });
  } else if (!validateEmail(email)) {
    return res
      .status(500)
      .json({ message: "Invalid email. Please provide a valid email" });
  }
  if (!password) {
    return res.status(500).json({ message: "Please provide your password" });
  } else if (password.length < 6) {
    return res
      .status(500)
      .json({ message: "Password must be minimum 6 chars!" });
  }
  if (!username) {
    return res.status(500).json({ message: "Please provide your username!" });
  } else if (!validateLength(username, 3, 30)) {
    return res
      .status(500)
      .json({ message: "Name must be between 3-30 chars!" });
  }
  next();
};

exports.validateLogin = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email && !username) {
    return res
      .status(500)
      .json({ message: "Please provide your email address or username" });
  } else if (!validateEmail(email)) {
    return res
      .status(500)
      .json({ message: "Invalid email. Please provide a valid email" });
  }
  if (!password) {
    return res.status(500).json({ message: "Please provide your password" });
  } else if (password.length < 6) {
    return res
      .status(500)
      .json({ message: "Password must be minimum 6 chars!" });
  }

  next();
};
