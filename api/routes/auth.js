import express from "express";
import { login, register, googleLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/google-login", googleLogin)

export default router