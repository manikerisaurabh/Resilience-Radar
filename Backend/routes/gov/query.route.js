import express from 'express';
import { takeChargeOnTask } from '../../controller/gov/query.controller.js';

const router = express.Router();

router.post("/assign", takeChargeOnTask);

export default router;