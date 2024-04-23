import express from "express";
import { addQuery, allQueries, editQuery, getEditQueryInfo, pendingQueries } from "../controller/query.controller.js";
import { isValidUser } from "../middlewares/isValidUser.js";

const router = express.Router();

router.get("/", allQueries);

router.post("/add/:id", isValidUser, addQuery);

router.get("/edit/:id", getEditQueryInfo);

router.put("/edit/:id", isValidUser, editQuery);

router.get("/pending/:id", isValidUser, pendingQueries);

router.get("/:id/total",);

export default router;