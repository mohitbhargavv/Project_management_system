import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3001/auth/login", {
      mail_id: mailId,
      password: password,
    });
    if (res.data === "Auth Successful") {
      console.log(res.data);
      navigate("/todo");
    } else {
      navigate("/login");
    }
    console.log(`email ${mailId} password: ${password}`);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={signIn}>
        <input
          type="text"
          placeholder="mail id"
          onChange={(e) => setMailId(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/">Signup</Link>
    </div>
  );
}

export default Login;
