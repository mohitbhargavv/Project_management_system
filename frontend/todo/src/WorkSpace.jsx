import React from "react";
import Create from "./Create";
import { Link } from "react-router-dom";
import Retrieve from "./RetrieveAndDelete";

const Todo = () => {
  return (
    <React.Fragment>

      <div>
        Todo
      <Link to="/login">login</Link>
      <br />
      <Link to="/">Signup</Link>
      <br />

        <Create />
        <br />
        <Retrieve />
      </div>
    </React.Fragment>
  );
};

export default Todo;
