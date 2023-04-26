// import logo from './logo.svg';
// import './App.css';
import Todo from "./WorkSpace";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoList from "./TodoList";
import Task from "./Task";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";
import axios from "axios";



function App() {
  axios.defaults.withCredentials = true;
  // useEffect(() => {
  // }, [])
  
  return (
    
    <BrowserRouter>
                <Routes>
                  
                  <Route path='/' element={<Signup />} />
                  <Route path='/todo' element={<Todo />} />

                    <Route path='/todos/:_id' element={<Task />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            
            </BrowserRouter>
    
  );
}

export default App;
