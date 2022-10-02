import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import { backUrl } from "../utils/constants";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const { data: token } = await axios.post(`${backUrl}/signin`, {
        ...user,
      });
      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
      setLoading(false);
      navigate("/main");
    } catch (error) {
      alert("E-mail ou senha incorretos!");
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSignin}>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="E-mail"
          disabled={loading}
          required
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Senha"
          disabled={loading}
          required
        />
        <button type="submit">{loading ? "Carregando..." : "Entrar"}</button>
      </form>
    </div>
  );
}
