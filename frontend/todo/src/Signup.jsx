import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const Register = async(e) => {
    e.preventDefault();
    const res=await axios.post("http://localhost:3001/auth/signup", {
      mail_id: mailId,
      password: password,
    });
    if (res.data === "Auth Successful") {
      console.log(res.data);
      navigate("/todo");
    } 
    else {
      console.log(res)
      // navigate("/login");
    }
    console.log(`email: ${mailId} password: ${password}`)
  };
  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={Register}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setMailId(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <Link to="login">login</Link>
    </div>
  );
}

export default Signup;
