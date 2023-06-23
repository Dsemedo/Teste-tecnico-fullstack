import { Router } from "express";
import { getUser, getUserByCnpj } from "../controllers/clientsController.js";

const router = Router();

router.get("/clientes", getUser);

router.get("/clientes/:cnpj", getUserByCnpj);

export default router;
