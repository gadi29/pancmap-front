import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import { backUrl } from "../utils/constants";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(`${backUrl}/signup`, {
        ...user,
      });

      setLoading(false);
      navigate("/login");
    } catch (error) {
      alert("Informação incorreta!");
      setLoading(false);
    }
  }

  return (
    <Body>
      <Container loading={loading}>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Nome de usuário"
            disabled={loading}
            required
          />
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
          <input
            type="password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            placeholder="Confirme a senha"
            disabled={loading}
            required
          />
          <button type="submit">
            {loading ? <ThreeDots width={50} color="#FFFFFF" /> : "Entrar"}
          </button>
          <h3 onClick={() => navigate("/login")}>
            Já está cadastrado? Clique aqui e faça seu login!
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
  position: absolute;
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

      font-size: 16px;

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
      font-size: 18px;
      font-weight: 600;

      width: 20%;
      height: 50px;
      margin-top: 20px;
      margin-bottom: 35px;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
    }

    h3 {
      color: #ffffff;
      font-size: 15px;
      font-weight: 400;
      text-align: center;

      margin: 20px;

      cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
    }
  }

  @media screen and (max-width: 720px) {
    form {
      button {
        width: 30%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    form {
      button {
        width: 40%;
      }
    }
  }
`;
