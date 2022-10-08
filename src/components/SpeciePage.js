import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { backUrl } from "../utils/constants";

function SpeciePageLoaded(specie) {
  return (
    <Main>
      <h2>Nome científico: {specie.cientificName}</h2>
      <h3>Características gerais: {specie.generalCharacteristics}</h3>
      {specie.curiosities ? <h3>Curiosidades: {specie.curiosities}</h3> : <></>}
      <h3>Morfologia da folha: {specie.leafMorfology}</h3>
      <img src={`${backUrl}${specie.leafPicturePath}`} alt="Folha" />
      <h3>Morfologia da flor: {specie.flowerMorfology}</h3>
      <img src={`${backUrl}${specie.flowerPicturePath}`} alt="Flor" />
      <h3>Morfologia do fruto: {specie.fruitMorfology}</h3>
      <img src={`${backUrl}${specie.fruitPicturePath}`} alt="Fruto" />
      <h3>Morfologia do órgão subterrâneo: {specie.undergroundMorfology}</h3>
      {specie.undergroundPicturePath ? (
        <img
          src={`${backUrl}${specie.undergroundPicturePath}`}
          alt="Órgão subterrâneo"
        />
      ) : (
        <></>
      )}
      <h3>Partes comestíveis: {specie.edibleParts}</h3>
    </Main>
  );
}

export default function SpeciePage() {
  const { specieId } = useParams();
  const [specie, setSpecie] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = axios.get(`${backUrl}/specie/${specieId}`);

    response
      .then((r) => {
        setSpecie({ ...r.data });
        setLoading(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
        setLoading(false);
      });
  }, [specieId]);

  return (
    <Body>
      <Container loading={loading}>
        {specie ? SpeciePageLoaded(specie) : "Carregando..."}
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
  margin-top: 80px;
  height: ${({ loading }) => (loading ? "80vh" : "100%")};

  display: flex;
  justify-content: ${({ loading }) => (loading ? "center" : "initial")};
  align-items: ${({ loading }) => (loading ? "center" : "initial")};
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 500px;
  }
`;
