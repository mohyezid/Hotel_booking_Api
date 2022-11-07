import express from "express";
import {
  deleteUser,
  getallUsers,
  getUser,
  updateUser,
} from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/check", verifyToken, (req, res) => {
  res.send("logged in");
});

router.get("/check/:id", verifyUser, (req, res) => {
  res.send("logged in and can delete account");
});
router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
  res.send("logged in and can delete all account");
});
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getallUsers);

export default router;
