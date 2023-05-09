const db = require("../models");
const User = db.users;
const LoginLoging = db.login_loging;

const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let ExtractJwt = passportJWT.ExtractJwt;
const constants = require("../constants");

require("dotenv").config();
const secretOrKey = process.env.SECRETORKEY;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secretOrKey;

const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

const createToken = (payload, secretOrKey, expiresIn) => {
  const token = jwt.sign(payload, secretOrKey, {
    expiresIn,
  });
  return token;
};

exports.login = async (req, res) => {
  try {
    const { u_email, u_password } = req.body;
    let user = await getUser({ u_email });
    const match = await bcrypt.compareSync(u_password, user.u_password);

    const now = new Date();
    const options = { timeZone: "Asia/Bangkok", hour12: false };
    const formattedDate = now.toLocaleString("en-US", options);
    const userId = user.dataValues.id;

    delete user.dataValues.u_password;
    const { u_status } = user.dataValues;
    if (!u_status) {
      res.status(404).json({
        message: constants.kResultNok,
        result: "User login Not found",
      });
      return;
    }

    if (!match) {
      const checkLoginCount = await LoginLoging.findAll({
        where: { status: false },
        include: [{ model: User, where: { u_email: u_email } }],
        limit: 5,
        order: [["createdAt", "DESC"]],
      });

      if (checkLoginCount.length >= 5) {
        const payload = { u_status: false };
        await User.update(payload, {
          where: {
            u_email: u_email,
          },
        });
        res.status(400).json({
          message: constants.kResultNok,
          result:
            "User account is locked due to Logged in incorrectly more than 5 times",
        });
        return;
      }

      await LoginLoging.create({
        ip_description: "LOGIN_FAIL",
        time: formattedDate,
        date: formattedDate,
        userId,
        status: false,
      });

      res.status(404).json({
        message: constants.kResultNok,
        result: "Password is incorrect",
      });
      return;
    }

    await LoginLoging.create({
      ip_description: "LOGIN_SUCCESS",
      time: formattedDate,
      date: formattedDate,
      userId,
    });

    let payload = { id: user.id, u_email, u_role: user.u_role };
    let token = createToken(payload, jwtOptions.secretOrKey, "1d");

    res.status(200).json({
      message: constants.kResultOk,
      result: { ...user.dataValues, token },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: constants.kResultNok });
  }
};

exports.register = async (req, res) => {
  try {
    const { u_password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(u_password, salt);
    const result = await User.create({ ...req.body, u_password: hash });
    res.status(201).json({
      result,
      message: constants.kResultOk,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: constants.kResultNok });
  }
};

exports.decodeUser = async (req, res) => {
  try {
    const headers = req;
    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = getToken(headers);
    const user = jwt.decode(token);
    const { id, u_email } = user;
    res.status(200).json({
      user: {
        id,
        u_email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: constants.kResultNok });
  }
};
