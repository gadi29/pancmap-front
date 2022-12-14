import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import styled from "styled-components";
import { AiOutlineAim } from "react-icons/ai";
import { ProgressBar } from "react-loader-spinner";

import api from "../services/api";

import PositionContext from "../contexts/PositionContext";

import "../../node_modules/leaflet/dist/leaflet.css";
import leaf from "../assets/images/leaf-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const { position } = useContext(PositionContext);
  const [registers, setRegisters] = useState();
  const [loading, setLoading] = useState(true);
  const [initialPosition, setInitialPosition] = useState(position);
  const point = new Icon({
    iconUrl: leaf,
    iconSize: [40, 40],
  });

  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    setLoading(true);
    const response = api.get(`/registers`);

    response
      .then((r) => {
        setRegisters([...r.data]);
        setLoading(false);
      })
      .catch((e) => alert(`Erro ${e.response.status}`));
  }, [initialPosition]);

  function displayMap() {
    return (
      <MapContainer center={initialPosition} zoom={16} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={"abcd"}
          maxZoom={20}
        />
        {loading ? (
          <></>
        ) : (
          registers.map((register) => (
            <Marker
              position={[Number(register.latitude), Number(register.longitude)]}
              icon={point}
            >
              <Popup>
                <div className="top">
                  <h2>{register.title}</h2>
                  <h4 onClick={() => navigate(`/specie/${register.specie.id}`)}>
                    {register.specie.cientificName}
                  </h4>
                </div>
                <div className="main">
                  <h3>Obs.: {register.observations}</h3>
                  <h5>Registrado por: {register.user.name}</h5>
                </div>
              </Popup>
            </Marker>
          ))
        )}
        <div
          className="actual"
          onClick={() => {
            setLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
              setInitialPosition([
                position.coords.latitude,
                position.coords.longitude,
              ]);
            });
            setLoading(false);
          }}
        >
          <AiOutlineAim size={40} color={"#FFFFFF"} />
        </div>
      </MapContainer>
    );
  }

  return (
    <Body>
      <Map loading={loading}>
        {loading ? (
          <ProgressBar
            width={150}
            height={150}
            borderColor="#b93c8b"
            barColor="#FFFFFF"
          />
        ) : (
          displayMap(setLoading, setInitialPosition)
        )}
      </Map>
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

const Map = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: ${({ loading }) => (loading ? "center" : "flex-start")};

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 16px;
      font-weight: 600;
    }

    h4 {
      font-style: italic;
      margin-top: 3px;
      margin-bottom: 7px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    flex-direction: column;

    h5 {
      font-size: 10px;
      font-style: italic;
      margin-top: 8px;
      align-self: center;
    }
  }

  .leaflet-container {
    width: 98%;
    height: 98%;
    border-radius: 5px;
    border: 3px solid #ffffff;
    position: relative;
  }

  .actual {
    background-color: #b93c8b;
    border-radius: 50%;
    cursor: pointer;

    width: 60px;
    height: 60px;
    z-index: 5000;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 50px;
    right: 50px;
  }

  .actual:hover {
    width: 65px;
    height: 65px;
  }

  @media screen and (max-width: 1024px) {
    .leaflet-container {
      height: 93%;
    }
  }

  @media screen and (max-width: 900px) {
    .leaflet-container {
      margin-top: 5px;
      height: 89%;
    }

    .actual:hover {
      width: 60px;
      height: 60px;
    }
  }

  @media screen and (max-width: 720px) {
    .leaflet-container {
      margin-top: 10px;
      height: 85%;
    }
  }
`;
