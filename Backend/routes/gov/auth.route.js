import express from "express";
import { getProfileinfo, login, logout, signup } from "../../controller/gov/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/:id/profile", getProfileinfo)

export default router;