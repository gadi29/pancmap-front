import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TokenContext from "../contexts/TokenContext";

import NewSpecie from "./NewSpecie";
import SignIn from "./SignIn";

function App() {
  let tokenStorage = localStorage.getItem("token");

  if (tokenStorage !== null) {
    tokenStorage = JSON.parse(tokenStorage);
  }

  const [token, setToken] = useState(tokenStorage);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/new-specie" element={<NewSpecie />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
