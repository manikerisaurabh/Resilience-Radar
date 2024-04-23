import express from "express";
import { addQuery, allQueries, approveCommit, completedQueries, editQuery, getEditQueryInfo, pendinfForApprovationQueriess, pendingQueries, totalQueris } from "../controller/query.controller.js";
import { isValidUser } from "../middlewares/isValidUser.js";

const router = express.Router();

router.get("/", allQueries);

router.post("/add/:id", isValidUser, addQuery);

//passing query id 
router.get("/edit/:id", getEditQueryInfo);

//passing query id 
router.put("/edit/:id", isValidUser, editQuery);

router.get("/pending/:id", isValidUser, pendingQueries);

router.get("/:id/total", isValidUser, totalQueris);

router.get("/:id/completed", isValidUser, completedQueries);

router.get("/:id/approvation", isValidUser, pendinfForApprovationQueriess);

router.put("/:id/approvation", approveCommit);
export default router;