import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function EditSpecie() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const { specieId } = useParams();
  const [specie, setSpecie] = useState({
    cientificName: "",
    generalCharacteristics: "",
    curiosities: "",
    leafMorfology: "",
    flowerMorfology: "",
    fruitMorfology: "",
    undergroundMorfology: "",
    edibleParts: "",
    leafPicturePath: "",
    flowerPicturePath: "",
    fruitPicturePath: "",
    undergroundPicturePath: "",
  });

  if (specie.curiosities === null) {
    setSpecie({ ...specie, curiosities: "" });
  }
  if (specie.fruitMorfology === null) {
    setSpecie({ ...specie, fruitMorfology: "" });
  }
  if (specie.undergroundMorfology === null) {
    setSpecie({ ...specie, undergroundMorfology: "" });
  }
  if (specie.fruitPicturePath === null) {
    setSpecie({ ...specie, fruitPicturePath: "" });
  }
  if (specie.undergroundPicturePath === null) {
    setSpecie({ ...specie, undergroundPicturePath: "" });
  }

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!user.superuser) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const response = axios.get(`${backUrl}/specie/${specieId}`);

    response
      .then((r) => {
        setSpecie({ ...r.data });
        setLoading(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, [specieId]);

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${backUrl}/specie/${specieId}`,
        {
          cientificName: specie.cientificName,
          generalCharacteristics: specie.generalCharacteristics,
          curiosities: specie.curiosities,
          leafMorfology: specie.leafMorfology,
          flowerMorfology: specie.flowerMorfology,
          fruitMorfology: specie.fruitMorfology,
          undergroundMorfology: specie.undergroundMorfology,
          edibleParts: specie.edibleParts,
          leafPicturePath: specie.leafPicturePath,
          flowerPicturePath: specie.flowerPicturePath,
          fruitPicturePath: specie.fruitPicturePath,
          undergroundPicturePath: specie.undergroundPicturePath,
        },
        config
      );
      setLoading(false);
      navigate(`/specie/${specieId}`);
    } catch (error) {
      alert(`Campo obrigatório não preenchido, ou preenchido incorretamente`);
      setLoading(false);
    }
  }

  return (
    <Body>
      <Container>
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <form onSubmit={handleEdit}>
            <input
              type="text"
              value={specie.cientificName}
              onChange={(e) =>
                setSpecie({ ...specie, cientificName: e.target.value })
              }
              placeholder="Nome científico*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.generalCharacteristics}
              onChange={(e) =>
                setSpecie({ ...specie, generalCharacteristics: e.target.value })
              }
              placeholder="Características gerais da espécie*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.curiosities}
              onChange={(e) =>
                setSpecie({ ...specie, curiosities: e.target.value })
              }
              placeholder="Curiosidades"
              disabled={loading}
            ></input>
            <input
              type="text"
              value={specie.leafMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, leafMorfology: e.target.value })
              }
              placeholder="Morfologia da folha*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.flowerMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, flowerMorfology: e.target.value })
              }
              placeholder="Morfologia da flor*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.fruitMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, fruitMorfology: e.target.value })
              }
              placeholder="Morfologia do fruto"
              disabled={loading}
            ></input>
            <input
              type="text"
              value={specie.undergroundMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, undergroundMorfology: e.target.value })
              }
              placeholder="Morfologia do órgão subterrâneo"
              disabled={loading}
            ></input>
            <input
              type="text"
              value={specie.edibleParts}
              onChange={(e) =>
                setSpecie({ ...specie, edibleParts: e.target.value })
              }
              placeholder="Partes comestíveis*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.leafPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, leafPicturePath: e.target.value })
              }
              placeholder="Imagem da folha (URL)*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.flowerPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, flowerPicturePath: e.target.value })
              }
              placeholder="Imagem da flor (URL)*"
              disabled={loading}
              required
            ></input>
            <input
              type="text"
              value={specie.fruitPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, fruitPicturePath: e.target.value })
              }
              placeholder="Imagem do fruto (URL)"
              disabled={loading}
            ></input>
            <input
              type="text"
              value={specie.undergroundPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, undergroundPicturePath: e.target.value })
              }
              placeholder="Imagem do órgão subterrâneo (URL)"
              disabled={loading}
            ></input>
            <button type="submit">Submeter</button>
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

      cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
    }
  }

  @media screen and (max-width: 768px) {
    form {
      button {
        font-size: 15px;
        width: 25%;
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
        width: 30%;
      }
    }
  }
`;
