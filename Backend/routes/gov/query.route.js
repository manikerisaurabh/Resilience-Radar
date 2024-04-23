import express from 'express';
import { allAssignedQueries, commitOfResolvation, getAllqueriesRelatedToDepartment, pendingToApprove, takeChargeOnTask } from '../../controller/gov/query.controller.js';

const router = express.Router(); 


//get all the queris releted to employees experties(department)
router.get("/:category", getAllqueriesRelatedToDepartment);

//assign one task to current logged in employee
router.post("/assign", takeChargeOnTask);

//employee commit that query is resolved
router.post("/:id/commit", commitOfResolvation);

//all the queries which are assigned to current employee 
router.get("/:id/inCharge", allAssignedQueries);

router.get("/:id/pending", pendingToApprove);
export default router;