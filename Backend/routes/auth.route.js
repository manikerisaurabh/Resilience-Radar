import express, { application } from 'express';
import { signup } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);

router.post("/login",);

router.post("/logout",);

export default router;