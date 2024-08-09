import { Router } from "express";
import {loggerTest} from "../controllers/test.controllers.js";

const  router = Router();

router.get('/loggertest', loggerTest)

export default router;