import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import api from "../services/api";

import TokenContext from "../contexts/TokenContext";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await api.post(`/signin`, {
        ...user,
      });
      localStorage.setItem("token", JSON.stringify(data.token));
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setLoading(false);
      navigate("/");
      window.location.reload();
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
          <button type="submit">
            {loading ? <ThreeDots width={50} color="#FFFFFF" /> : "Entrar"}
          </button>
          <div onClick={() => navigate("/signup")} className="to-signup">
            <h3>Ainda não é registrado?</h3>
            <h3>Clique aqui e cadastre-se!</h3>
          </div>
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

    .to-signup {
      margin: 20px;
      display: flex;

      h3 {
        color: #ffffff;
        font-size: 15px;
        font-weight: 400;
        text-align: center;

        cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
      }

      h3:first-of-type {
        margin-right: 5px;
      }
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

      .to-signup {
        flex-direction: column;

        h3:first-of-type {
          margin-right: 0;
        }
      }
    }
  }
`;
