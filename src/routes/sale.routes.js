import { Router } from "express";
import { createSale, 
    deleteSale, 
    getAllSale, 
    getSaleById, 
    updateSale 
} from "../controllers/sale.controller.js";
import { verifyToken } from "../middlewares/auth.js";


const router = Router();

router.get("/", verifyToken, getAllSale);

router.get("/:id", verifyToken, getSaleById);

router.post("/", verifyToken, createSale);

router.delete("/:id", verifyToken, deleteSale);

router.put("/:id", verifyToken, updateSale);

export default router;
