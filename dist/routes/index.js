import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleWare.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
const router = Router();
//Auth Routes
router.post('/auth/login', AuthController.login);
//Chat  Group routes
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", authMiddleware, ChatGroupController.show);
router.put("/chat-group-update/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.delete);
export default router;
