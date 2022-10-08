import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";

import { backUrl } from "../utils/constants";

function ListLoaded(token, list, setLoading, state, setState, navigate) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function handleDelete(registerId) {
    if (window.confirm("Tem certeza que deseja apagar este registro?")) {
      setLoading(true);

      const response = axios.delete(
        `${backUrl}/register/${registerId}`,
        config
      );

      response
        .then(() => setState(!state))
        .catch((e) => {
          alert(`Error ${e.response.status}`);
          setLoading(false);
        });
    }
  }

  return (
    <>
      {list.length === 0 ? (
        <h3>Você ainda não possui registros</h3>
      ) : (
        list.map((register) => (
          <div className="register">
            <div className="text">
              <h2>{register.title}</h2>
              <h3>- {register.specie.cientificName}</h3>
            </div>
            <div className="icons">
              <div className="edit">
                <AiFillEdit
                  onClick={() => navigate(`/edit-register/${register.id}`)}
                  size={25}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="delete">
                <FaTrashAlt
                  onClick={() => handleDelete(register.id)}
                  size={20}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default function UserRegisters() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();
  const [state, setState] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.name === "Visitante") {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const response = axios.get(`${backUrl}/myregisters/${user.id}`);

    response
      .then((r) => {
        setList([...r.data]);
        setLoading(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, [state, user]);

  return (
    <Body>
      <Container>
        <h1>Lista de seus registros</h1>
        <Lista loading={loading}>
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            ListLoaded(token, list, setLoading, state, setState, navigate)
          )}
        </Lista>
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
  margin-top: 200px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    width: 75%;
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 13px;
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
    height: 65px;
    margin-top: 20px;
    margin-bottom: 35px;
    padding: 10px 15px;

    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    h1 {
      font-size: 20px;
      margin-bottom: 18px;
    }

    button {
      width: 30%;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 480px) {
    button {
      width: 40%;
      font-size: 14px;
    }
  }
`;

const Lista = styled.div`
  width: 75%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  border: 5px solid #7b1254;

  margin-bottom: 30px;
  padding: 20px 15px 10px 15px;

  display: flex;
  flex-direction: column;
  align-items: ${({ loading }) => (loading ? "center" : "initial")};

  h2 {
    font-size: 20px;
    font-weight: 600;
    padding: 20px 0;
  }

  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    padding: 0 0 8px 5px;
  }

  .register {
    width: 100%;
    border-bottom: 1px solid #000000;
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-style: italic;
      font-size: 20px;
      font-weight: 400;
      padding: 0;
      margin-left: 15px;
    }

    .text {
      display: flex;
      align-items: center;

      h3 {
        color: #6e6e6e;
        font-size: 14px;
        font-style: italic;
        margin-left: 6px;
        padding: 0;
      }
    }

    .icons {
      width: 8%;
      margin-right: 15px;
      padding: 0;
      display: flex;
      align-items: center;

      .edit,
      .delete {
        width: 50%;
        border-bottom: none;
        padding: 0;
        margin: 0;
      }

      .delete {
        margin-left: 10px;
      }
    }
  }

  .register:first-of-type {
    margin-top: 8px;
  }

  .register:last-of-type {
    border-bottom: none;
  }

  @media screen and (max-width: 900px) {
    div {
      .icons {
        width: 10%;
      }
    }
  }

  @media screen and (max-width: 720px) {
    div {
      .icons {
        width: 15%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    div {
      h2 {
        padding-right: 20px;
        text-align: center;
      }
      .icons {
        width: 23%;
      }
    }
  }
`;
