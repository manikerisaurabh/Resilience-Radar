import express from "express";
import { addQuery, allQueries, approveCommit, completedQueries, editQuery, getApprovationCount, getEditQueryInfo, pendinfForApprovationQueriess, pendingQueries, totalQueris } from "../controller/query.controller.js";
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

router.put("/:id/approvation", approveCommit);

router.get("/:id/approvation", isValidUser, pendinfForApprovationQueriess);

router.get("/:id/approvationCount", isValidUser, getApprovationCount);

export default router;