import { Router } from "express";
import { createSaleDetail, 
    deleteSaleDetail, 
    getAllSaleDetail, 
    getSaleDetailById, 
    updateSaleDetail 
} from "../controllers/saleDetail.controller.js";
import { verifyToken } from "../middlewares/auth.js";


const router = Router();

router.get("/", verifyToken, getAllSaleDetail);

router.get("/:id", verifyToken, getSaleDetailById);

router.post("/", verifyToken, createSaleDetail);

router.delete("/:id", verifyToken, deleteSaleDetail);

router.put("/:id", verifyToken, updateSaleDetail);

export default router;
