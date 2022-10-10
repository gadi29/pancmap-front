import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { backUrl } from "../utils/constants";

export default function Modal({
  data,
  modalIsOpen,
  setModalIsOpen,
  config,
  state,
  setState,
}) {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  console.log(data);
  function handleDeleteSpecie(e) {}

  function handleDeleteRegister(e) {
    setLoading(true);

    const response = axios.delete(`${backUrl}/register/${data.id}`, config);

    response
      .then(() => {
        setState(!state);
        setLoading(false);
        setModalIsOpen(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
        setLoading(false);
        setModalIsOpen(false);
      });
  }

  function handleSignout(e) {
    e.preventDefault();
    setLoading(true);

    localStorage.removeItem("token");
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Visitante", superuser: false })
    );
    navigate("/");
    setLoading(false);
    window.location.reload();
  }

  return (
    <>
      <Body modalIsOpen={modalIsOpen}></Body>
      <Container modalIsOpen={modalIsOpen}>
        <h1>
          {data.key === "SIGNOUT"
            ? "Você tem certeza que deseja se deslogar?"
            : "Você tem certeza que deseja deletar este registro?"}
        </h1>
        {loading ? (
          <ThreeDots color="#3bb551" width={40} height={40} />
        ) : (
          <div className="buttons">
            <button onClick={() => setModalIsOpen(false)} disabled={loading}>
              Não, {data.key === "SIGNOUT" ? "voltar" : "cancelar"}
            </button>
            <button
              onClick={
                data.key === "SIGNOUT"
                  ? handleSignout
                  : data.key === "DELETE_R"
                  ? handleDeleteRegister
                  : handleDeleteSpecie
              }
            >
              Sim, {data.key === "SIGNOUT" ? "Sair" : "Deletar!"}
            </button>
          </div>
        )}
      </Container>
    </>
  );
}

const Body = styled.div`
  background-color: #ffffff;
  opacity: 80%;

  width: 100%;
  height: 100vh;
  z-index: 5999;
  position: absolute;

  display: ${({ modalIsOpen }) => (modalIsOpen ? "flex" : "none")};
`;

const Container = styled.div`
  background-color: #a82b7a;
  opacity: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50px;

  z-index: 6000;
  width: 600px;
  margin-right: -50%;
  padding: 50px 100px;
  display: ${({ modalIsOpen }) => (modalIsOpen ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;

  h1 {
    color: #ffffff;
    font-size: 34px;
    text-align: center;
    margin-bottom: 30px;
  }

  .buttons {
    width: 320px;
    display: flex;
    justify-content: space-around;

    button {
      font-size: 18px;
      font-weight: 600;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 8px 20px;
    }

    button:first-child {
      background-color: #ffffff;
      color: #3bb551;
    }

    button:last-child {
      background-color: #3bb551;
      color: #ffffff;
    }
  }

  @media screen and (max-width: 720px) {
    width: 70%;
    padding: 50px 60px;

    h1 {
      font-size: 30px;
    }

    .buttons {
      width: 90%;
      display: flex;
      justify-content: space-between;

      button {
        width: 45%;
        font-size: 16px;
        padding: 9px 15px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    width: 80%;
    padding: 50px 40px;

    h1 {
      font-size: 28px;
    }

    .buttons {
      width: 90%;
      display: flex;
      justify-content: space-between;

      button {
        width: 45%;
        font-size: 14px;
        padding: 9px 10px;
      }
    }
  }
`;
