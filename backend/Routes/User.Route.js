import express from "express";
import {
  Login,
  Profile,
  Register,
  VerificationEmail,
} from "../Controllers/User.Controller.js";
import { Authentication } from "../Utils/Authentication.js";

const router = express.Router();

router.post("/register", Register);
router.post("/verify", VerificationEmail);
router.post("/login", Login);
router.get("/profile", Authentication, Profile);

export default router;
