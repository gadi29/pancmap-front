import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSignout(e) {
    e.preventDefault();

    if (window.confirm("Você realmente deseja se deslogar do sistema?")) {
      localStorage.removeItem("token");
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "Visitante", superuser: false })
      );
      window.location.reload();
    }
  }

  return (
    <Top>
      <h1>Panc Map</h1>
      <div>
        <h2 onClick={() => navigate("/species")}>Espécies</h2>
      </div>
      <div>
        {user.name !== "Visitante" ? (
          <>
            <h2>Novo registro</h2>
            <h2 onClick={handleSignout}>Sair</h2>
          </>
        ) : (
          <>
            <h2 onClick={() => navigate("/login")}>Login</h2>
            <h2 onClick={() => navigate("/signup")}>Cadastre-se</h2>
          </>
        )}
      </div>
    </Top>
  );
}

const Top = styled.div`
  background-color: #b93c8b;
  color: #ffffff;

  width: 100%;
  height: 80px;
  padding: 0 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  h1 {
    font-size: 45px;
    font-family: "Rubik Dirt", cursive !important;
    position: fixed;
    top: 15px;
    left: 42%;
  }

  div {
    display: flex;

    h2 {
      font-size: 18px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
`;
