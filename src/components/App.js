import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import Header from "./Header";

import NewSpecie from "./NewSpecie";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  let tokenStorage = localStorage.getItem("token");

  if (tokenStorage !== null) {
    tokenStorage = JSON.parse(tokenStorage);
  }

  const [token, setToken] = useState(tokenStorage);

  let userStorage = localStorage.getItem("user");

  if (userStorage !== null) {
    userStorage = JSON.parse(userStorage);
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
          </Routes>
        </BrowserRouter>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
