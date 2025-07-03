import { Router } from "express";
import { createInvestment, 
    deleteInvestment, 
    getAllInvestment, 
    getInvestmentById, 
    updateInvestment 
} from "../controllers/investment.controller.js";
import { verifyToken } from "../middlewares/auth.js";



const router = Router();

router.get("/", verifyToken, getAllInvestment);

router.get("/:id", verifyToken, getInvestmentById);

router.post("/", verifyToken, createInvestment);

router.delete("/:id", verifyToken, deleteInvestment);

router.put("/:id", verifyToken, updateInvestment);

export default router;
