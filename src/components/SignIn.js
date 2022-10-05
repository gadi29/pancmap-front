import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const { data: token } = await axios.post(`${backUrl}/signin`, {
        ...user,
      });
      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
      setLoading(false);
      navigate("/main");
    } catch (error) {
      alert("E-mail ou senha incorretos!");
      setLoading(false);
    }
  }

  return (
    <Body>
      <Container loading={loading}>
        <form onSubmit={handleSignin}>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="E-mail"
            disabled={loading}
            required
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Senha"
            disabled={loading}
            required
          />
          <button type="submit">{loading ? "Carregando..." : "Entrar"}</button>
          <h3 onClick={navigate("/signup")}>
            Ainda não é registrado? Clique aqui e cadastre-se!
          </h3>
        </form>
      </Container>
    </Body>
  );
}

const Body = styled.div`
  background: linear-gradient(
    0deg,
    rgba(17, 120, 35, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  width: 100%;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 80px;

  form {
    width: 100%;
    padding-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      border: 2px solid #5e053d;
      border-radius: 7px;
      outline: none;

      font-size: 15px;

      width: 70%;
      height: 50px;
      margin-bottom: 15px;
      padding-left: 10px;
    }

    button {
      background-color: #a82b7a;
      border-radius: 5px;
      outline: none;
      border: none;

      color: #ffffff;
      font-size: 16px;
      font-weight: 400;

      width: 20%;
      height: 40px;
      margin-top: 20px;

      cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
    }

    h3 {
      color: #ffffff;
      font-size: 13px;
      font-weight: 400;

      margin-top: 20px;

      cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
    }
  }
`;
