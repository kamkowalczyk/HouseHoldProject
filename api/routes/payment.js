import express from 'express';
import { 
    createCheckoutSession,
} from "../controllers/payment.js";
import {verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create-checkout-session", verifyUser, createCheckoutSession);

export default router;
