import { Router } from "express";
import { getResponse } from "../controllers/chat";

const router = Router();

router.get("/chatbot",getResponse)

export default router;