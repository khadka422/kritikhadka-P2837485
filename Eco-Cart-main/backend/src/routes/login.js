import bcrpyt from "bcrypt";
import express from "express";
import Users from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");
  const validPassword = await bcrpyt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");
  const token = user.generateAuthToken();
  res.json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    token: token,
  });
});

export default router;
