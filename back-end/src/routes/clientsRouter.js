import { Router } from "express";
import { getAllUserInfo } from "../controllers/clientsController.js";

const router = Router();

router.get("/clients/:cnpj", getAllUserInfo);

export default router;
