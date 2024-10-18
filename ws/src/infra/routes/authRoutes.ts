import { Router } from "express";
import { AuthController } from "@/interfaces/http/controllers/authController";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/profile", authController.verifyAccess.bind(authController));

export default router;
