import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { ProgressBar } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function EditSpecie() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [loadingSpecie, setLoadingSpecie] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
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
        setLoadingSpecie(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, [specieId]);

  async function handleEdit(e) {
    e.preventDefault();
    setLoadingSubmit(true);

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
      setLoadingSubmit(false);
      navigate(`/specie/${specieId}`);
    } catch (error) {
      alert(`Campo obrigatório não preenchido, ou preenchido incorretamente`);
      setLoadingSubmit(false);
    }
  }

  return (
    <Body>
      <Container loadingSpecie={loadingSpecie}>
        {loadingSpecie ? (
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
              value={specie.cientificName}
              onChange={(e) =>
                setSpecie({ ...specie, cientificName: e.target.value })
              }
              placeholder="Nome científico*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.generalCharacteristics}
              onChange={(e) =>
                setSpecie({ ...specie, generalCharacteristics: e.target.value })
              }
              placeholder="Características gerais da espécie*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.curiosities}
              onChange={(e) =>
                setSpecie({ ...specie, curiosities: e.target.value })
              }
              placeholder="Curiosidades"
              disabled={loadingSubmit}
            ></input>
            <input
              type="text"
              value={specie.leafMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, leafMorfology: e.target.value })
              }
              placeholder="Morfologia da folha*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.flowerMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, flowerMorfology: e.target.value })
              }
              placeholder="Morfologia da flor*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.fruitMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, fruitMorfology: e.target.value })
              }
              placeholder="Morfologia do fruto"
              disabled={loadingSubmit}
            ></input>
            <input
              type="text"
              value={specie.undergroundMorfology}
              onChange={(e) =>
                setSpecie({ ...specie, undergroundMorfology: e.target.value })
              }
              placeholder="Morfologia do órgão subterrâneo"
              disabled={loadingSubmit}
            ></input>
            <input
              type="text"
              value={specie.edibleParts}
              onChange={(e) =>
                setSpecie({ ...specie, edibleParts: e.target.value })
              }
              placeholder="Partes comestíveis*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.leafPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, leafPicturePath: e.target.value })
              }
              placeholder="Imagem da folha (URL)*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.flowerPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, flowerPicturePath: e.target.value })
              }
              placeholder="Imagem da flor (URL)*"
              disabled={loadingSubmit}
              required
            ></input>
            <input
              type="text"
              value={specie.fruitPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, fruitPicturePath: e.target.value })
              }
              placeholder="Imagem do fruto (URL)"
              disabled={loadingSubmit}
            ></input>
            <input
              type="text"
              value={specie.undergroundPicturePath}
              onChange={(e) =>
                setSpecie({ ...specie, undergroundPicturePath: e.target.value })
              }
              placeholder="Imagem do órgão subterrâneo (URL)"
              disabled={loadingSubmit}
            ></input>
            <button type="submit">
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
  align-items: ${(loadingSpecie) => (loadingSpecie ? "center" : "initial")};

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
