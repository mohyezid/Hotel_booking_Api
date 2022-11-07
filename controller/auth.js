import User from "../models/User.js";
import { createError } from "../utils/errorinfo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin ?? false,
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));
    const ispasscorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!ispasscorrect)
      return next(createError(400, "wrong password or username"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.jwt
    );
    console.log(token);
    const { isAdmin, password, ...other } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ ...other });
  } catch (error) {
    next(error);
  }
};
