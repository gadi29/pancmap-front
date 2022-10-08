import styled from "styled-components";

export default function Header() {
  return (
    <Top>
      <div></div>
      <h1>Panc Map</h1>
      <div>
        <h2>Login</h2>
      </div>
    </Top>
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
  z-index: 2;

  h1 {
    font-size: 45px;
    font-family: "Rubik Dirt", cursive !important;
  }

  h2 {
    cursor: pointer;
  }
`;
