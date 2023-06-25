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

export async function getOverdueBills(req, res) {
  const { cnpj } = req.params;
  const allInfo = {};

  try {
    const cnpjExists = await connectionDb.query(
      `SELECT COUNT(*) FROM clientes WHERE cnpj = $1`,
      [cnpj]
    );

    if (cnpjExists.rows[0].count === "0") {
      return res
        .status(404)
        .send({ message: "Esse cnpj não existe no nosso banco de dados" });
    }

    console.log(cnpjExists.rows[0].count);

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
    res.status(404).send(err.message);
  }
}

export async function getPaidBills(req, res) {
  const { cnpj } = req.params;
  try {
    const paidBills = await connectionDb.query(
      `SELECT SUM(COALESCE(c.valor_pago, 0)) AS "Valor total pago" FROM contas c WHERE c.cnpj_cliente = $1 ;`,
      [cnpj]
    );

    res.send(paidBills.rows);
    console.log(paidBills.rows);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

export async function getBillsToPay(req, res) {
  const { cnpj } = req.params;
  try {
    const billsToPay = await connectionDb.query(
      `SELECT COUNT(*) AS "Contas em aberto" FROM contas c WHERE c.cnpj_cliente = $1 AND c.valor_pago < c.valor_esperado AND CURRENT_DATE > c.data_vencimento;`,
      [cnpj]
    );

    res.send(billsToPay.rows);
    console.log(billsToPay.rows);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

export async function getDateOfFirstBill(req, res) {
  const { cnpj } = req.params;
  try {
    const dateOfFirstBill = await connectionDb.query(
      `SELECT TO_CHAR(c.data_vencimento, 'DD/MM/YYYY') AS "Data de vencimento da primeira conta em aberto" FROM contas c
      WHERE cnpj_cliente = $1 AND data_pagamento IS NULL AND data_vencimento >= CURRENT_DATE
      ORDER BY data_vencimento ASC
      LIMIT 1;
      `,
      [cnpj]
    );
    res.send(dateOfFirstBill.rows);
    console.log(dateOfFirstBill.rows);
  } catch (err) {
    res.status(404).send(err.message);
  }
}
