import { Router } from "express";
import { createInvestmentDetail, 
    deleteInvestmentDetail, 
    getAllInvestmentDetail, 
    getInvestmentDetailById, 
    updateInvestmentDetail 
} from "../controllers/investmentDetail.controller.js";
import { verifyToken } from "../middlewares/auth.js";



const router = Router();

router.get("/", verifyToken, getAllInvestmentDetail);

router.get("/:id", verifyToken, getInvestmentDetailById);

router.post("/", verifyToken, createInvestmentDetail);

router.delete("/:id", verifyToken, deleteInvestmentDetail);

router.put("/:id", verifyToken, updateInvestmentDetail);

export default router;
