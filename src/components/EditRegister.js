import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { ProgressBar } from "react-loader-spinner";

import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function EditRegister() {
  const { token } = useContext(TokenContext);
  const [loadingSpecies, setLoadingSpecies] = useState(true);
  const [loadingRegister, setLoadingRegister] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { registerId } = useParams();
  const [showBar, setShowBar] = useState(false);
  const [list, setList] = useState();
  const [specie, setSpecie] = useState({
    id: null,
    name: "",
  });
  const [register, setRegister] = useState({
    title: "",
    latitude: 0,
    longitude: 0,
    observations: "",
  });

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const response = axios.get(`${backUrl}/register/${registerId}`);

    response
      .then((r) => {
        setRegister({
          title: r.data.title,
          latitude: r.data.latitude,
          longitude: r.data.longitude,
          observations: r.data.observations,
        });
        setSpecie({ id: r.data.specie.id, name: r.data.specie.cientificName });
        setLoadingRegister(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, [registerId]);

  useEffect(() => {
    const response = axios.get(`${backUrl}/species`);

    response
      .then((r) => {
        setList([...r.data]);
        setLoadingSpecies(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, []);

  async function handleEdit(e) {
    e.preventDefault();

    setLoadingSubmit(true);
    try {
      await axios.put(
        `${backUrl}/register/${registerId}`,
        {
          title: register.title,
          latitude: register.latitude,
          longitude: register.longitude,
          observations: register.observations,
          specieId: specie.id,
        },
        config
      );
      setLoadingSubmit(false);
      navigate(`/user-registers`);
    } catch (error) {
      alert("Campo obrigatório não preenchido, ou preenchido incorretamente");
      setLoadingSubmit(false);
    }
  }

  return (
    <Body>
      <Container
        showBar={showBar}
        specieId={specie.id}
        loading={loadingSpecies || loadingRegister}
      >
        {loadingRegister || loadingSpecies ? (
          <ProgressBar
            width={150}
            height={150}
            borderColor="#b93c8b"
            barColor="#FFFFFF"
          />
        ) : (
          <form onSubmit={handleEdit}>
            <input
              type="text"
              minLength={3}
              maxLength={200}
              value={register.title}
              onChange={(e) =>
                setRegister({ ...register, title: e.target.value })
              }
              placeholder="Descrição breve do local (uma frase curta)"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="number"
              min={-85}
              max={85}
              step={0.00000000001}
              value={register.latitude}
              onChange={(e) =>
                setRegister({ ...register, latitude: Number(e.target.value) })
              }
              placeholder="Latitude (em UTM)"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="number"
              min={-180}
              max={180}
              step={0.00000000001}
              value={register.longitude}
              onChange={(e) =>
                setRegister({ ...register, longitude: Number(e.target.value) })
              }
              placeholder="Longitude (em UTM)"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              minLength={5}
              maxLength={1000}
              value={register.observations}
              onChange={(e) =>
                setRegister({ ...register, observations: e.target.value })
              }
              placeholder="Observações (descrições mais detalhadas)"
              disabled={loadingSubmit}
              required
            ></input>
            <div className="specie" onClick={() => setShowBar(!showBar)}>
              <h2>
                {specie.id
                  ? `${specie.name}`
                  : "Não há uma espécie selecionada"}
              </h2>
              {showBar ? (
                <FaChevronCircleUp
                  onClick={() => setShowBar(!showBar)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaChevronCircleDown
                  onClick={() => setShowBar(!showBar)}
                  style={{ cursor: "pointer" }}
                />
              )}
              <div className="list">
                {list.map((specie) => (
                  <>
                    <h3
                      onClick={() => {
                        setSpecie({
                          id: specie.id,
                          name: specie.cientificName,
                        });
                        setShowBar(!showBar);
                      }}
                    >
                      {specie.cientificName}
                    </h3>
                  </>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loadingSubmit}>
              {loadingSubmit ? (
                <ThreeDots width={50} color="#FFFFFF" />
              ) : (
                "Submeter"
              )}
            </button>
          </form>
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
  height: calc(100% - 100px);
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: ${({ loading }) => (loading ? "center" : "flex-start")};

  form {
    width: 100%;
    margin-top: 100px;
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

    input:invalid {
      background-color: #ffeded;
      border: 2px solid #d90000;
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

    .specie {
      background-color: ${({ specieId }) =>
        specieId === null ? "#ffeded" : "#ffffff"};
      border: 2px solid
        ${({ specieId }) => (specieId === null ? "#d90000" : "#5e053d")};
      border-radius: 7px;

      width: 70%;
      height: 50px;
      margin-bottom: 15px;
      padding: 0 10px;
      padding-right: 20px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      h2 {
        cursor: default;
        font-size: 16px;
        color: ${({ specieId }) => (specieId === null ? "gray" : "black")};
      }

      .list {
        background-color: #ffffff;
        border: 2px solid #5e053d;
        border-top: none;
        border-radius: 0 0 7px 7px;

        width: 100%;
        padding: 10px 10px;

        display: ${({ showBar }) => (showBar ? "initial" : "none")};
        position: absolute;
        top: 47px;
        left: 0;

        h3 {
          margin-bottom: 8px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 720px) {
    form {
      button {
        font-size: 15px;
        width: 30%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    form {
      input {
        font-size: 14px;
      }
      button {
        font-size: 14px;
        width: 40%;
      }
    }
  }
`;
