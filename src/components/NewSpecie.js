import { useContext, useState } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function NewSpecie() {
  const { token } = useContext(TokenContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [specie, setSpecie] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(specie);
    try {
      await axios.post(`${backUrl}/specie`, { ...specie }, config);
    } catch (error) {}
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="cientific-name">Nome científico:</label>
        <input
          id="cientific-name"
          name="cientific-name"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, cientificName: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="general-characteristics">
          Características gerais da espécie:
        </label>
        <input
          id="general-characteristicse"
          name="general-characteristics"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, generalCharacteristics: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="leaf-morfology">Morfologia da folha:</label>
        <input
          id="leaf-morfology"
          name="leaf-morfology"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, leafMorfology: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="leaf-pic">Imagem da folha:</label>
        <input
          id="leaf-pic"
          name="leaf-pic"
          type="file"
          onChange={(e) =>
            setSpecie({ ...specie, leafPicture: e.target.files[0] })
          }
        ></input>
        <br />
        <label htmlFor="flower-morfology">Morfologia da flor:</label>
        <input
          id="flower-morfology"
          name="flower-morfology"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, flowerMorfology: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="flower-pic">Imagem da flor:</label>
        <input
          id="flower-pic"
          name="flower-pic"
          type="file"
          onChange={(e) =>
            setSpecie({ ...specie, flowerPicture: e.target.files[0] })
          }
        ></input>
        <br />
        <label htmlFor="fruit-morfology">Morfologia do fruto:</label>
        <input
          id="fruit-morfology"
          name="fruit-morfology"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, fruitMorfology: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="fruit-pic">Imagem do fruto:</label>
        <input
          id="fruit-pic"
          name="fruit-pic"
          type="file"
          onChange={(e) =>
            setSpecie({ ...specie, fruitPicture: e.target.files[0] })
          }
        ></input>
        <br />
        <label htmlFor="underground-morfology">
          Morfologia do órgão subterrâneo:
        </label>
        <input
          id="underground-morfology"
          name="underground-morfology"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, undergroundMorfology: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="underground-pic">Imagem do órgão subterrâneo:</label>
        <input
          id="underground-pic"
          name="underground-pic"
          type="file"
          onChange={(e) =>
            setSpecie({ ...specie, undergroundPicture: e.target.files[0] })
          }
        ></input>
        <br />
        <label htmlFor="edible-parts">Partes comestíveis:</label>
        <input
          id="edible-parts"
          name="edible-parts"
          type="text"
          onChange={(e) =>
            setSpecie({ ...specie, edibleParts: e.target.value })
          }
        ></input>
        <br />
        <button type="submit">Submeter</button>
      </form>
    </div>
  );
}
