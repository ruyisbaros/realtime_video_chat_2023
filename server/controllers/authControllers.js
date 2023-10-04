const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { uploadToCloudinary } = require("../utils/imageService");
const {
  createJsonToken,
  createReFreshToken,
  verifyRefreshToken,
} = require("../utils/createToken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, username, picture } = req.body;
      let image;
      if (picture) {
        image = await uploadToCloudinary(picture, "whatsapp_api", "image");
      }
      const newUser = await User.create({
        name: name.toLowerCase(),
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        picture: picture ? image : process.env.DEFAULT_PICTURE,
      });
      const token = await createJsonToken(
        { id: newUser._id, email: newUser.email },
        "1d"
      );
      const refreshToken = await createReFreshToken(
        { id: newUser._id, email: newUser.email },
        "30d"
      );

      req.session = {
        jwtR: refreshToken,
        jwt: token,
      };

      res.status(201).json({
        message: "Register success",
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
          picture: newUser.picture,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      let user;
      if (email) {
        user = await User.findOne({ email: email.toLowerCase() });
      } else if (username) {
        user = await User.findOne({ username: username.toLowerCase() });
      }
      if (!user) {
        return res.status(500).json({ message: `Wrong credentials!` });
      }
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res.status(500).json({ message: `Wrong credentials!` });
      }
      const token = await createJsonToken(
        { id: user._id, email: user.email },
        "1d"
      );
      const refreshToken = await createReFreshToken(
        { id: user._id, email: user.email },
        "30d"
      );

      req.session = {
        jwtR: refreshToken,
        jwt: token,
      };

      res.status(201).json({
        message: "Login success",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          username: newUser.username,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      req.session = {
        jwtR: null,
        jwt: null,
      };
      //console.log(req.session);
      return res.status(200).json({ message: "You have been logged out!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  refresh_token: async (req, res) => {
    try {
      const token = req.session?.jwtR;
      //console.log(req.session, token)
      if (!token)
        return res.status(500).json({ message: "Please login again" });
      const { id } = await verifyRefreshToken(token);
      if (!id) return res.status(500).json({ message: "Please login again" });

      const user = await User.findOne({ _id: id }).select("-password");
      //console.log(user)
      if (!user)
        return res.status(500).json({ message: "Please login again!" });
      //console.log(user)
      const access_token = await createJsonToken(
        { id: user._id, email: user.email },
        "1d"
      );
      req.session = {
        jwtR: token,
        jwt: access_token,
      };
      //console.log(req.session)

      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          username: newUser.username,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authCtrl;
