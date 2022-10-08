import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import { backUrl } from "../utils/constants";

export default function NewSpecie() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.superuser) {
      navigate("/");
    }
  }, [user]);

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
          ></input>
          <input
            id="general-characteristics"
            name="general-characteristics"
            type="text"
            placeholder="Características gerais da espécie"
          ></input>
          <input
            id="curiosities"
            name="curiosities"
            type="text"
            placeholder="Curiosidades"
          ></input>
          <input
            id="leaf-morfology"
            name="leaf-morfology"
            type="text"
            placeholder="Morfologia da folha"
          ></input>
          <input
            id="flower-morfology"
            name="flower-morfology"
            type="text"
            placeholder="Morfologia da flor"
          ></input>
          <input
            id="fruit-morfology"
            name="fruit-morfology"
            type="text"
            placeholder="Morfologia do fruto"
          ></input>
          <input
            id="underground-morfology"
            name="underground-morfology"
            type="text"
            placeholder="Morfologia do órgão subterrâneo"
          ></input>
          <input
            id="edible-parts"
            name="edible-parts"
            type="text"
            placeholder="Partes comestíveis"
          ></input>
          <div className="images">
            <div className="top">
              <div>
                <label htmlFor="leaf-pic">Imagem da folha:</label>
                <input id="leaf-pic" name="leaf-pic" type="file"></input>
              </div>
              <div>
                <label htmlFor="flower-pic">Imagem da flor:</label>
                <input id="flower-pic" name="flower-pic" type="file"></input>
              </div>
            </div>
            <div className="bottom">
              <div>
                <label htmlFor="fruit-pic">Imagem do fruto:</label>
                <input id="fruit-pic" name="fruit-pic" type="file"></input>
              </div>
              <div>
                <label htmlFor="underground-pic">
                  Imagem do órgão subterrâneo:
                </label>
                <input
                  id="underground-pic"
                  name="underground-pic"
                  type="file"
                ></input>
              </div>
            </div>
          </div>
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

  @media screen and (max-width: 768px) {
    form {
      button {
        font-size: 15px;
        width: 25%;
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
        width: 30%;
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
