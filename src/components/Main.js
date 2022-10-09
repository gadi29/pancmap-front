import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import styled from "styled-components";
import axios from "axios";

import "../../node_modules/leaflet/dist/leaflet.css";
import leaf from "../assets/images/leaf-svgrepo-com.svg";
import { backUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [registers, setRegisters] = useState();
  const [loading, setLoading] = useState(true);
  const [initialPosition, setInitialPosition] = useState([
    -27.582346, -48.504342,
  ]);
  const point = new Icon({
    iconUrl: leaf,
    iconSize: [40, 40],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const response = axios.get(`${backUrl}/registers`);

    response
      .then((r) => {
        setRegisters([...r.data]);
        setLoading(false);
      })
      .catch((e) => alert(`Erro ${e.response.status}`));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setInitialPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <Body>
      <Map>
        {!loading ? (
          <MapContainer
            center={initialPosition}
            zoom={16}
            scrollWheelZoom={true}
          >
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
                  position={[
                    Number(register.latitude),
                    Number(register.longitude),
                  ]}
                  icon={point}
                >
                  <Popup>
                    <div
                      onClick={() => navigate(`/specie/${register.specieId}`)}
                    >
                      <h2>{register.title}</h2>-<h4>{register.specieId}</h4>
                    </div>

                    <h3>{register.observations}</h3>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>
        ) : (
          <h2>Carregando...</h2>
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
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .leaflet-container {
    width: 98%;
    height: 87vh;
  }
`;
