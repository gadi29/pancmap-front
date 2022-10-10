import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";

import UserContext from "../contexts/UserContext";

import logo from "../assets/images/logo.png";
import Modal from "./Modal";

export default function Header() {
  const { user } = useContext(UserContext);
  const [showBar, setShowBar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const data = { key: "SIGNOUT" };
  const navigate = useNavigate();

  return (
    <>
      <Modal
        data={data}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <LateralBar showBar={showBar}>
        <div className="bar">
          <h2
            onClick={() => {
              navigate("/species");
              setShowBar(!showBar);
            }}
          >
            Espécies
          </h2>
          {user.name !== "Visitante" ? (
            <>
              <h2
                onClick={() => {
                  navigate("/user-registers");
                  setShowBar(!showBar);
                }}
              >
                Seus registros
              </h2>
              <h2
                onClick={() => {
                  navigate("/new-register");
                  setShowBar(!showBar);
                }}
              >
                Novo registro
              </h2>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="back" onClick={() => setShowBar(!showBar)}></div>
      </LateralBar>
      <Top>
        <div className="left">
          <div className="lateral">
            <GiHamburgerMenu
              onClick={() => setShowBar(!showBar)}
              size={25}
              style={{ cursor: "pointer" }}
            />
          </div>
          <h2 onClick={() => navigate("/species")}>Espécies</h2>
          {user.name !== "Visitante" ? (
            <>
              <h2 onClick={() => navigate("/user-registers")}>
                Seus registros
              </h2>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="right">
          {user.name !== "Visitante" ? (
            <>
              <h2 onClick={() => navigate("/new-register")}>Novo registro</h2>
              <h3 onClick={() => setModalIsOpen(true)}>Sair</h3>
            </>
          ) : (
            <>
              <h3 onClick={() => navigate("/login")}>Login</h3>
              <h2 onClick={() => navigate("/signup")}>Cadastre-se</h2>
            </>
          )}
        </div>
      </Top>
      <Logo>
        <div onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h1>Panc Map</h1>
        </div>
      </Logo>
    </>
  );
}

const Top = styled.div`
  background-color: #b93c8b;
  color: #ffffff;

  width: 100%;
  height: 80px;
  padding: 0 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;

  .left,
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h2,
    h3 {
      height: 99%;
      margin: 0 15px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    h2:hover,
    h3:hover {
      border-bottom: 5px solid #ffffff;
      border-radius: 3px;
      font-size: 19px;
      font-weight: 600;
    }

    .lateral {
      display: none;
    }
  }

  @media screen and (max-width: 900px) {
    .center {
      h1 {
        font-size: 40px;
      }

      img {
        width: 70px;
      }
    }

    .left,
    .right {
      h2 {
        display: none;
      }

      h3:hover {
        border: none;
        font-size: 18px;
        font-weight: 400;
      }

      .lateral {
        display: flex;
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .center {
      h1 {
        display: none;
      }

      img {
        margin-right: 0;
      }
    }

    .left,
    .right {
      h3 {
        font-size: 16px;
      }

      h3:hover {
        font-size: 16px;
      }
    }
  }
`;

const Logo = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5500;
  position: fixed;
  top: 0;
  left: 0;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    h1 {
      font-size: 45px;
      font-weight: 100;
      color: #ffffff;
    }

    img {
      width: 75px;
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 900px) {
    div {
      h1 {
        font-size: 40px;
      }

      img {
        width: 70px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    div {
      h1 {
        display: none;
      }

      img {
        margin-right: 0;
      }
    }
  }
`;

const LateralBar = styled.div`
  display: ${({ showBar }) => (showBar ? "flex" : "none")};
  width: 100%;
  height: calc(100vh - 80px);
  z-index: 5000;
  position: fixed;
  top: 80px;
  left: 0;

  .bar {
    background-color: #a82b7a;
    width: 40%;

    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h2 {
      color: #ffffff;
      font-size: 18px;
      margin-top: 25px;
      margin-left: 25px;
      cursor: pointer;
    }
  }

  .back {
    width: 60%;
  }

  @media screen and (min-width: 900px) {
    display: none;
  }

  @media screen and (max-width: 720px) {
    .bar {
      width: 43%;
    }

    .back {
      width: 57%;
    }
  }

  @media screen and (max-width: 480px) {
    .bar {
      width: 50%;

      h2 {
        font-size: 16px;
      }
    }

    .back {
      width: 50%;
    }
  }

  @media screen and (max-width: 320px) {
    .bar {
      width: 60%;
    }

    .back {
      width: 40%;
    }
  }
`;
