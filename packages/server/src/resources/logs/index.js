import { Router } from "express";
import { getAll, createOne } from "./logs.controller.js";

const router = Router();

// /api/logs
router
  .route("/")
  .get(getAll)
  .post(createOne);

export default router;
