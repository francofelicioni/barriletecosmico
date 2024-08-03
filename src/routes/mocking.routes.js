import { Router } from "express";
import mockingController from "../controllers/mocking.controller.js";

const router = Router();

router.get('/', mockingController.mockingProducts);

export default router;