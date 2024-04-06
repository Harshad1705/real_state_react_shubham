import express from "express";
import { createUser } from "../controllers/userController.js";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController.js";

const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
