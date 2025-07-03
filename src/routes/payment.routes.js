import { Router } from "express";
import { createPayment, 
    deletePayment, 
    getAllPayment, 
    getPaymentById, 
    updatePayment 
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/auth.js";



const router = Router();

router.get("/", verifyToken, getAllPayment);

router.get("/:id", verifyToken, getPaymentById);

router.post("/", verifyToken, createPayment);

router.delete("/:id", verifyToken, deletePayment);

router.put("/:id", verifyToken, updatePayment);

export default router;
