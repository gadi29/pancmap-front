import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PositionContext from "../contexts/PositionContext";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import EditRegister from "./EditRegister";
import EditSpecie from "./EditSpecie";
import Header from "./Header";
import ListSpecies from "./ListSpecies";
import Main from "./Main";
import NewRegister from "./NewRegister";

import NewSpecie from "./NewSpecie";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SpeciePage from "./SpeciePage";
import UserRegisters from "./UserRegisters";

function App() {
  const [position, setPosition] = useState([-27.582347, -48.504343]);
  let tokenStorage = localStorage.getItem("token");

  if (tokenStorage !== null) {
    tokenStorage = JSON.parse(tokenStorage);
  }

  const [token, setToken] = useState(tokenStorage);

  let userStorage = localStorage.getItem("user");

  if (userStorage !== null) {
    userStorage = JSON.parse(userStorage);
  } else {
    userStorage = { name: "Visitante", superuser: false };
  }

  const [user, setUser] = useState(userStorage);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <PositionContext.Provider value={{ position, setPosition }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/new-specie" element={<NewSpecie />} />
              <Route path="/species" element={<ListSpecies />} />
              <Route path="/specie/:specieId" element={<SpeciePage />} />
              <Route path="/edit-specie/:specieId" element={<EditSpecie />} />
              <Route path="/new-register" element={<NewRegister />} />
              <Route path="/user-registers" element={<UserRegisters />} />
              <Route
                path="/edit-register/:registerId"
                element={<EditRegister />}
              />
            </Routes>
          </BrowserRouter>
        </PositionContext.Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
