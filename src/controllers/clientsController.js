import { connectionDb } from "../db/database.js";

export async function getUser(req, res) {
  try {
    console.log("alou");
    const allClients = await connectionDb.query(`SELECT * FROM contas;`);
    res.send(allClients.rows);
    console.log(allClients.rows);
  } catch (err) {
    res.status(402).send(err.message);
  }
}

export async function getUserByCnpj(req, res) {
  const { cnpj } = req.params;
  const allInfo = {};
  try {
    const totalValueDev = await connectionDb.query(
      `SELECT * FROM contas c WHERE c.cnpj_cliente = $1;`,
      [cnpj]
    );

    const overdueBills = await connectionDb.query(
      `SELECT SUM(c.valor_esperado - COALESCE(c.valor_pago, 0)) AS "Valor em atraso" FROM contas c WHERE c.cnpj_cliente = $1 AND c.data_vencimento < CURRENT_DATE;`,
      [cnpj]
    );

    const paidBills = await connectionDb.query(
      `SELECT SUM(COALESCE(c.valor_pago, 0)) AS "Valor total pago" FROM contas c WHERE c.cnpj_cliente = $1 ;`,
      [cnpj]
    );

    const billsToPay = await connectionDb.query(
      `SELECT COUNT(*) AS "Contas em aberto" FROM contas c WHERE c.cnpj_cliente = $1 AND c.valor_pago < c.valor_esperado AND CURRENT_DATE > c.data_vencimento;`,
      [cnpj]
    );

    const dateOfFirstBill = await connectionDb.query(
      `SELECT TO_CHAR(c.data_vencimento, 'DD/MM/YYYY') AS "Data de vencimento da primeira conta em aberto" FROM contas c
      WHERE cnpj_cliente = $1 AND data_pagamento IS NULL AND data_vencimento >= CURRENT_DATE
      ORDER BY data_vencimento ASC
      LIMIT 1;
      `,
      [cnpj]
    );
    allInfo.overdueBills = overdueBills.rows;
    allInfo.paidBills = paidBills.rows;
    allInfo.billsToPay = billsToPay.rows;
    allInfo.dateOfFirstBill = dateOfFirstBill.rows;
    res.send(allInfo);
    console.log(allInfo);
  } catch (err) {
    res.status(402).send(err.message);
  }
}
