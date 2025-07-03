import { Router } from "express";
import {
  getAllProvider,
  getProviderById,
  updateProvider,
  createProvider,
  deleteProvider,
} from "../controllers/provider.controller.js";
import { verifyToken } from "../middlewares/auth.js";


const router = Router();

router.get("/", verifyToken, getAllProvider);

router.get("/:id", verifyToken, getProviderById);

router.post("/", verifyToken, createProvider);

router.delete("/:id", verifyToken, deleteProvider);

router.put("/:id", verifyToken, updateProvider);

export default router;
