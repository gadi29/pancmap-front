import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function NewRegister() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
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
    specieId: specie.id,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user.name === "Visitante") {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setRegister({
        ...register,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const response = axios.get(`${backUrl}/species`);

    response
      .then((r) => {
        setList([...r.data]);
        setLoading(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${backUrl}/register`, { ...register }, config);
      navigate("/user-registers");
    } catch (error) {
      alert(`Campo obrigatório não preenchido, ou preenchido incorretamente`);
      setLoading(false);
    }
  }

  return (
    <Body>
      <Container showBar={showBar} specieId={specie.id}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            minLength={3}
            maxLength={200}
            value={register.title}
            onChange={(e) =>
              setRegister({ ...register, title: e.target.value })
            }
            placeholder="Descrição breve do local (uma frase curta)"
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            required
          ></input>
          <div className="specie" onClick={() => setShowBar(!showBar)}>
            <h2>
              {specie.id ? `${specie.name}` : "Não há uma espécie selecionada"}
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
              {!loading ? (
                list.map((specie) => (
                  <>
                    <h3
                      onClick={() => {
                        setSpecie({
                          id: specie.id,
                          name: specie.cientificName,
                        });
                        setRegister({ ...register, specieId: specie.id });
                        setShowBar(!showBar);
                      }}
                    >
                      {specie.cientificName}
                    </h3>
                  </>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <ThreeDots width={50} color="#FFFFFF" /> : "Submeter"}
          </button>
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
