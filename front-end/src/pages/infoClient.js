import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function InfoClient() {
  const [info, setInfo] = useState({});
  const { cnpj } = useParams();
  const [billsToPay, setBillsToPay] = useState("");
  const [dateOfFirstBill, setDateOfFirstBill] = useState("");
  const [overdueBills, setOverdueBills] = useState("");
  const [paidBills, setPaidBills] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clients/${cnpj}`)
      .then((res) => {
        setInfo(res.data);
        setBillsToPay(res.data.billsToPay?.[0]["Contas em aberto"]);
        setDateOfFirstBill(
          res.data.dateOfFirstBill?.[0][
            "Data de vencimento da primeira conta em aberto"
          ]
        );
        setOverdueBills(res.data.overdueBills?.[0]["Valor em atraso"]);
        setPaidBills(res.data.paidBills?.[0]["Valor total pago"]);
      })
      .catch((erro) => {
        setInfo(erro.response.data);
      });
  }, [cnpj]);
  return (
    <Container>
      <h1>Dados do cliente</h1>
      {info.message ? (
        <>
          <Table>
            <Valores font="bold" align="center">
              Esse CNPJ não está entre os nossos clientes.
            </Valores>
          </Table>
          <StyledLink to={"/"}> Digite outro CNPJ</StyledLink>
        </>
      ) : (
        <>
          <Table>
            <Valores>
              <h2>Valor total em atraso:</h2>
              <h3> R${overdueBills} </h3>
            </Valores>

            <Valores>
              <h2>Valor já pago:</h2> <h3> R${paidBills} </h3>
            </Valores>

            <Valores>
              <h2>Contas em aberto mas sem atraso:</h2> <h3> {billsToPay} </h3>
            </Valores>

            <Valores>
              <h2>Data de vencimento da primeira conta em aberto:</h2>
              <h3> {dateOfFirstBill} </h3>
            </Valores>
          </Table>
          <StyledLink to={"/"}> Digite outro CNPJ</StyledLink>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: justify;

  h1 {
    font-size: 40px;
    font-weight: bold;
    margin-top: 5vh;
  }
`;

const Table = styled.div`
  height: 25vh;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #528383;
  border-radius: 5px;
  border: 3px solid #2fb189;
  margin-top: 10vh;
`;

const Valores = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 13px;
  font-size: 30px;
  font-weight: ${(props) => props.font};

  h2 {
    font-size: 26px;
    font-weight: bold;
  }

  h3 {
    font-size: 23px;
    margin-left: 10px;
  }
`;

const StyledLink = styled(Link)`
  width: 30%;
  height: 5%;
  margin-top: 5vh;
  border-radius: 5px;
  border: none;
  background-color: #c9e3c2;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
