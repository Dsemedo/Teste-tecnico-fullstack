import { Router } from "express";
import {
  getUser,
  getOverdueBills,
  getBillsToPay,
  getPaidBills,
  getDateOfFirstBill,
} from "../controllers/clientsController.js";

const router = Router();

router.get("/clients/:cnpj", getOverdueBills);

router.get("/clients/overduebills/:cnpj", getOverdueBills);

router.get("/clients/billstopay/:cnpj", getBillsToPay);

router.get("/clients/paidbills/:cnpj", getPaidBills);

router.get("/clients/dateoffirstbill/:cnpj", getDateOfFirstBill);

export default router;
