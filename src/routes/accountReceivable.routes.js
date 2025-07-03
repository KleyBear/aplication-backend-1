import { Router } from "express";
import { createAccountReceivable, 
    deleteAccountReceivable, 
    getAllAccountReceivable, 
    getAccountReceivableById, 
    updateAccountReceivable 
} from "../controllers/accountReceivable.controller.js";
import { verifyToken } from "../middlewares/auth.js";



const router = Router();

router.get("/", verifyToken, getAllAccountReceivable);

router.get("/:id", verifyToken, getAccountReceivableById);

router.post("/", verifyToken, createAccountReceivable);

router.delete("/:id", verifyToken, deleteAccountReceivable);

router.put("/:id", verifyToken, updateAccountReceivable);

export default router;
