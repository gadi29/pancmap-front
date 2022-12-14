import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProgressBar } from "react-loader-spinner";

import api from "../services/api";

import PositionContext from "../contexts/PositionContext";

function SpeciePageLoaded(specie, registers, setPosition, navigate) {
  return (
    <Main>
      <Top>
        <h2>Nome científico: </h2>
        <h1>{specie.cientificName}</h1>
      </Top>
      <Center>
        <Left>
          <div className="image-morfology">
            <img src={`${specie.leafPicturePath}`} alt="Folha" />
            <h3>Morfologia da folha</h3>
            <h4>{specie.leafMorfology}</h4>
          </div>
          <div className="image-morfology">
            <img src={`${specie.flowerPicturePath}`} alt="Flor" />
            <h3>Morfologia da flor</h3>
            <h4>{specie.flowerMorfology}</h4>
          </div>
          {specie.fruitMorfology ? (
            <div className="image-morfology">
              {specie.fruitPicturePath ? (
                <img src={`${specie.fruitPicturePath}`} alt="Fruto" />
              ) : (
                <></>
              )}
              <h3>Morfologia do fruto</h3>
              <h4>{specie.fruitMorfology}</h4>
            </div>
          ) : (
            <></>
          )}
          {specie.undergroundMorfology ? (
            <div className="image-morfology">
              {specie.undergroundPicturePath ? (
                <img
                  src={`${specie.undergroundPicturePath}`}
                  alt="Órgão subterrâneo"
                />
              ) : (
                <></>
              )}
              <h3>Morfologia do órgão subterrâneo</h3>
              <h4>{specie.undergroundMorfology}</h4>
            </div>
          ) : (
            <></>
          )}
        </Left>
        <Right>
          <div>
            <h3>Características gerais</h3>
            <h4>{specie.generalCharacteristics}</h4>
          </div>
          {specie.curiosities ? (
            <div>
              <h3>Curiosidades</h3>
              <h4>{specie.curiosities}</h4>
            </div>
          ) : (
            <></>
          )}
          <div>
            <h3>Partes comestíveis</h3>
            <h4>{specie.edibleParts}</h4>
          </div>
          {registers.length === 0 ? (
            <></>
          ) : (
            <div className="registers">
              <h3>Lista de registros da espécie</h3>
              {registers.map((register) => (
                <h4
                  onClick={() => {
                    setPosition([
                      Number(register.latitude),
                      Number(register.longitude),
                    ]);
                    navigate("/");
                  }}
                >
                  {register.title}
                </h4>
              ))}
            </div>
          )}
        </Right>
      </Center>
    </Main>
  );
}

export default function SpeciePage() {
  const { setPosition } = useContext(PositionContext);
  const { specieId } = useParams();
  const [specie, setSpecie] = useState();
  const [registers, setRegisters] = useState([]);
  const [loadingSpecie, setLoadingSpecie] = useState(true);
  const [loadingRegisters, setLoadingRegisters] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const response = api.get(`/specie/${specieId}`);

    response
      .then((r) => {
        setSpecie({ ...r.data });
        setLoadingSpecie(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, [specieId]);

  useEffect(() => {
    const response = api.get(`/registers/${specieId}`);

    response
      .then((r) => {
        setRegisters([...r.data]);
        setLoadingRegisters(false);
      })
      .catch((e) => {
        alert(`Erro ${e.response.status}`);
      });
  }, [specieId]);

  return (
    <Body>
      <Container loading={loadingRegisters || loadingSpecie}>
        {loadingRegisters || loadingSpecie ? (
          <ProgressBar
            width={150}
            height={150}
            borderColor="#b93c8b"
            barColor="#FFFFFF"
          />
        ) : (
          SpeciePageLoaded(specie, registers, setPosition, navigate)
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
  margin-top: 80px;
  height: ${({ loading }) => (loading ? "80vh" : "100%")};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 100%;
  margin-top: 100px;
  padding: 0 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 900px) {
    padding: 0 70px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Top = styled.div`
  margin-bottom: 25px;

  display: flex;
  align-items: center;

  font-size: 33px;
  color: #921c66;

  h1 {
    margin-left: 10px;
    font-style: italic;
  }
  h2 {
    font-weight: 600;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;

    font-size: 23px;
  }

  @media screen and (max-width: 575px) {
    flex-direction: column;
    text-align: center;
    h1 {
      margin-left: 0;
    }
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;

  h3 {
    font-size: 19px;
    font-weight: 600;
    text-align: center;

    margin-bottom: 20px;
  }

  h4 {
    font-size: 16px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const Left = styled.div`
  width: 50%;
  margin-right: 50px;

  .image-morfology {
    background-color: #ffffff;
    border-radius: 20px;
    border: 5px solid #7b1254;

    margin-bottom: 30px;
    padding: 20px 5px;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 5px;
      width: 95%;
      margin-bottom: 15px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const Right = styled.div`
  width: 50%;

  div {
    background-color: #ffffff;
    border: 5px solid #7b1254;
    border-radius: 20px;

    margin-bottom: 30px;
    padding: 20px 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .registers {
    h4 {
      font-size: 18px;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
