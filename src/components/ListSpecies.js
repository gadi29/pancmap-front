import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";

import { backUrl } from "../utils/constants";

function ListLoaded(
  token,
  list,
  superuser,
  setLoading,
  state,
  setState,
  navigate
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function handleEdit(specieId) {}

  function handleDelete(specieId) {
    if (window.confirm("Tem certeza que deseja apagar esta espécie?")) {
      setLoading(true);

      const response = axios.delete(`${backUrl}/specie/${specieId}`, config);

      response
        .then(() => setState(!state))
        .catch((e) => {
          if (e.response.status === 409)
            alert(
              "Existem registros cadastrados para esta espécie, exclua primeiro os registros."
            );
          else alert(`Error ${e.response.status}`);

          setLoading(false);
        });
    }
  }

  return (
    <>
      {list.map((specie) => (
        <div>
          <h2 onClick={() => navigate(`/specie/${specie.id}`)}>
            {specie.cientificName}
          </h2>
          {superuser ? (
            <div className="icons">
              <AiFillEdit
                onClick={() => handleEdit(specie.id)}
                size={25}
                style={{ cursor: "pointer" }}
              />
              <FaTrashAlt
                onClick={() => handleDelete(specie.id)}
                size={20}
                style={{ cursor: "pointer" }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}

export default function ListSpecies() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();
  const [state, setState] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const response = axios.get(`${backUrl}/species`);

    response
      .then((r) => {
        setList([...r.data]);
        setLoading(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
        setLoading(false);
      });
  }, [state]);

  return (
    <Body>
      <Container>
        <h1>Lista de espécies cadastradas no sistema:</h1>
        <Lista loading={loading} superuser={user.superuser}>
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            ListLoaded(
              token,
              list,
              user.superuser,
              setLoading,
              state,
              setState,
              navigate
            )
          )}
        </Lista>
        {user.superuser ? (
          <button onClick={() => navigate("/new-specie")}>
            Cadastrar nova espécie
          </button>
        ) : (
          <></>
        )}
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
    height: 50px;
    margin-top: 20px;
    margin-bottom: 35px;

    cursor: pointer;
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

  div {
    width: 100%;
    border-bottom: 1px solid #000000;
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    justify-content: ${({ superuser }) =>
      superuser ? "space-between" : "center"};
    align-items: center;

    h2 {
      font-style: italic;
      font-size: 20px;
      font-weight: 400;
      padding: 0;
      margin-left: 15px;
      cursor: pointer;
    }

    .icons {
      width: 5%;
      margin-right: 15px;
    }
  }

  div:first-of-type {
    margin-top: 8px;
  }

  div:last-of-type {
    border-bottom: none;
  }
`;
