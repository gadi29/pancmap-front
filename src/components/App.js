import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import EditSpecie from "./EditSpecie";
import Header from "./Header";
import ListSpecies from "./ListSpecies";
import NewRegister from "./NewRegister";

import NewSpecie from "./NewSpecie";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SpeciePage from "./SpeciePage";

function App() {
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
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/new-specie" element={<NewSpecie />} />
            <Route path="/species" element={<ListSpecies />} />
            <Route path="/specie/:specieId" element={<SpeciePage />} />
            <Route path="/edit-specie/:specieId" element={<EditSpecie />} />
            <Route path="/new-register" element={<NewRegister />} />
          </Routes>
        </BrowserRouter>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
