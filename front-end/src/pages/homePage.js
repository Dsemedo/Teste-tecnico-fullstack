import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoSolutto from "../assets/images/logo_solutto.png";

export default function HomePage() {
  const [cnpj, setCnpj] = useState("");

  const linkCnpj = `/cnpj/${cnpj.cnpj}`;

  function handleCnpj(e) {
    setCnpj({
      ...cnpj,
      [e.target.name]: e.target.value,
    });
  }

  // console.log(cnpj.cnpj.length);
  console.log(cnpj);
  const isInputEmpty = cnpj === "";
  const isInputTooShort = cnpj.cnpj?.length < 14;
  return (
    <Container>
      <Logo src={logoSolutto}></Logo>

      <Input
        placeholder="Digite o cnpj aqui"
        name="cnpj"
        type="text"
        onChange={handleCnpj}
      />

      {isInputEmpty || isInputTooShort ? (
        <StyledLink disabled>Acessar os dados</StyledLink>
      ) : (
        <StyledLink to={linkCnpj}>Acessar os dados</StyledLink>
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
  justify-content: center;
`;

const Logo = styled.img`
  margin-bottom: 12%;
  height: 200px;
  width: 300px;
  color: #ffffff;
  object-fit: contain;
`;

const Input = styled.input`
  width: 30%;
  height: 5%;
  margin-bottom: 2%;
  border-radius: 5px;
  border: none;
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  width: 30%;
  height: 5%;
  margin-bottom: 8%;
  border-radius: 5px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#c9e3c2")};
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
