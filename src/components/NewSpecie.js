import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function NewSpecie() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
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
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.superuser) {
      navigate("/");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${backUrl}/specie`, { ...specie }, config);
      setLoading(false);
      navigate("/species");
    } catch (error) {
      alert(`Erro ${error}`);
    }
  }

  return (
    <Body>
      <Container>
        <form onSubmit={handleSubmit}>
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

    .images {
      width: 70%;
      margin-top: 25px;
      padding-left: 10px;

      display: flex;
      flex-wrap: wrap;

      .bottom,
      .top {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;

        div {
          width: 50%;

          input {
            border: none;
            color: #ffffff;

            width: 50%;
            margin-top: 5px;
          }
          label {
            font-size: 18px;
            color: #ffffff;
          }
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
      .images {
        .top,
        .bottom {
          div {
            width: 100%;
          }
        }
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
      .images {
        .top,
        .bottom {
          div {
            label {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
`;
