import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { backUrl } from "../utils/constants";

function SpeciePageLoaded(specie) {
  return (
    <>
      <h2>{specie.cientificName}</h2>
    </>
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
  height: 80vh;

  display: flex;
  justify-content: center;
  align-items: center;
  //cursor: ${({ loading }) => (loading ? "initial" : "pointer")};
`;
