import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import { backUrl } from "../utils/constants";

export default function NewSpecie() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  if (!user.superuser) {
    navigate("/");
  }

  const [specie, setSpecie] = useState({});

  return (
    <Body>
      <Container>
        <form
          id="form"
          action={`${backUrl}/specie`}
          method="post"
          encType="multipart/form-data"
        >
          <input
            id="cientific-name"
            name="cientific-name"
            type="text"
            placeholder="Nome científico"
            onChange={(e) =>
              setSpecie({ ...specie, cientificName: e.target.value })
            }
          ></input>
          <input
            id="general-characteristicse"
            name="general-characteristics"
            type="text"
            placeholder="Características gerais da espécie"
            onChange={(e) =>
              setSpecie({ ...specie, generalCharacteristics: e.target.value })
            }
          ></input>
          <input
            id="leaf-morfology"
            name="leaf-morfology"
            type="text"
            placeholder="Morfologia da folha"
            onChange={(e) =>
              setSpecie({ ...specie, leafMorfology: e.target.value })
            }
          ></input>
          <label htmlFor="leaf-pic">Imagem da folha:</label>
          <input
            id="leaf-pic"
            name="leaf-pic"
            type="file"
            onChange={(e) =>
              setSpecie({ ...specie, leafPicture: e.target.files[0] })
            }
          ></input>
          <input
            id="flower-morfology"
            name="flower-morfology"
            type="text"
            placeholder="Morfologia da flor"
            onChange={(e) =>
              setSpecie({ ...specie, flowerMorfology: e.target.value })
            }
          ></input>
          <label htmlFor="flower-pic">Imagem da flor:</label>
          <input
            id="flower-pic"
            name="flower-pic"
            type="file"
            onChange={(e) =>
              setSpecie({ ...specie, flowerPicture: e.target.files[0] })
            }
          ></input>
          <input
            id="fruit-morfology"
            name="fruit-morfology"
            type="text"
            placeholder="Morfologia do fruto"
            onChange={(e) =>
              setSpecie({ ...specie, fruitMorfology: e.target.value })
            }
          ></input>
          <label htmlFor="fruit-pic">Imagem do fruto:</label>
          <input
            id="fruit-pic"
            name="fruit-pic"
            type="file"
            onChange={(e) =>
              setSpecie({ ...specie, fruitPicture: e.target.files[0] })
            }
          ></input>
          <input
            id="underground-morfology"
            name="underground-morfology"
            type="text"
            placeholder="Morfologia do órgão subterrâneo"
            onChange={(e) =>
              setSpecie({ ...specie, undergroundMorfology: e.target.value })
            }
          ></input>
          <label htmlFor="underground-pic">Imagem do órgão subterrâneo:</label>
          <input
            id="underground-pic"
            name="underground-pic"
            type="file"
            onChange={(e) =>
              setSpecie({ ...specie, undergroundPicture: e.target.files[0] })
            }
          ></input>
          <input
            id="edible-parts"
            name="edible-parts"
            type="text"
            placeholder="Partes comestíveis"
            onChange={(e) =>
              setSpecie({ ...specie, edibleParts: e.target.value })
            }
          ></input>
          <button type="submit">Submeter</button>
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

      font-size: 15px;

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
      font-size: 16px;
      font-weight: 400;

      width: 20%;
      height: 40px;
      margin-top: 20px;
      margin-bottom: 35px;

      cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
    }
  }
`;
